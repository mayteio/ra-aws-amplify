import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { S3Input } from './S3Input';
import { Form } from 'react-final-form';
import { TestContext } from 'react-admin';

/** mock storage so we can 'put' without actually putting. */
let mockStoragePut: any;
jest.mock('aws-amplify', () => {
  mockStoragePut = jest.fn((key: string, options: Record<string, any>) =>
    key === 'error'
      ? Promise.reject()
      : Promise.resolve({ key: `http://${key}`, ...options })
  );
  return {
    Storage: {
      put: mockStoragePut,
    },
  };
});

/** mock uuidv4 so we have predictable results */
jest.mock('uuidv4', () => ({
  uuid: () => 'xxxx',
}));

/** Mock permissions so we can check identityId is passed */
jest.mock('react-admin', () => ({
  ...require.requireActual('react-admin'),
  usePermissions: () => ({ permissions: { claims: { identityId: 'id' } } }),
}));

/** TestComponent is required because S3Input uses React.cloneElement */
const file = (key: string = 'chucknorris.png') =>
  new File(['(⌐□_□)'], key, { type: 'image/png' });
const TestComponent: React.FC<any> = props => {
  const fileObj = file(props.error);
  return (
    <>
      <button
        onClick={() =>
          props.options.onDrop(props.multiple ? [fileObj, fileObj] : [fileObj])
        }
      >
        drop
      </button>
      props: {JSON.stringify(props)}
    </>
  );
};

describe('<S3Input />', () => {
  test('should put to storage and attach uuid, plus id and level', async () => {
    const { getByText, findByText } = render(
      <TestContext>
        <Form onSubmit={() => {}}>
          {({ values }) => (
            <>
              <S3Input source="input" level="protected">
                <TestComponent />
              </S3Input>
              {JSON.stringify(values['input'])}
            </>
          )}
        </Form>
      </TestContext>
    );

    fireEvent.click(getByText(/drop/i));
    expect(await findByText(/chucknorris-xxxx.png/i)).toBeInTheDocument();
    expect(await findByText(/protected/i)).toBeInTheDocument();
    expect(await findByText(/id/i)).toBeInTheDocument();
  });

  test('should handle multiple files', async () => {
    const { getByText, findAllByText } = render(
      <TestContext>
        <Form onSubmit={() => {}}>
          {({ values }) => (
            <>
              <S3Input source="input" multiple>
                <TestComponent />
              </S3Input>
              form values:{' '}
              {values['input'] &&
                values['input'].map((input: any, i: number) => (
                  <div key={i}>{JSON.stringify(input)}</div>
                ))}
            </>
          )}
        </Form>
      </TestContext>
    );

    fireEvent.click(getByText(/drop/i));
    expect(await findAllByText(/chucknorris-xxxx.png/i)).toHaveLength(2);
  });

  test('should handle errors files', async () => {
    const { getByText, findByText } = render(
      <TestContext>
        <Form onSubmit={() => {}}>
          {formProps => (
            <>
              <S3Input source="input" multiple>
                <TestComponent error="error" />
              </S3Input>
              form values: {JSON.stringify(formProps.values)}
            </>
          )}
        </Form>
      </TestContext>
    );

    fireEvent.click(getByText(/drop/i));
    expect(await findByText(/error/i)).toBeInTheDocument();
    // expect(await findByText(/^form values: $/i)).toBeInTheDocument();
  });
});

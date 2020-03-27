import React from 'react';
import { render } from '@testing-library/react';
import { S3Field } from './S3Field';

let mockStorageGet: any;
jest.mock('aws-amplify', () => {
  mockStorageGet = jest.fn((key: string) => Promise.resolve(`http://${key}`));
  return {
    Storage: {
      get: mockStorageGet,
    },
  };
});

const Printer: React.FC = props => <>{JSON.stringify(props)}</>;

describe('<S3Field />', () => {
  test('should pass src to child as prop', async () => {
    const { getByTestId, findByText } = render(
      <S3Field
        source="file"
        record={{
          file: {
            key: 'image.png',
          },
        }}
      >
        <Printer />
      </S3Field>
    );
    expect(getByTestId(/s3-object-loading/i)).toBeInTheDocument();
    expect(await findByText(/image.png/i)).toBeInTheDocument();
  });

  test('should return nothing if no key passed', async () => {
    const { container } = render(
      <S3Field>
        <Printer />
      </S3Field>
    );

    expect(container?.firstChild?.textContent).toBe(undefined);
  });

  test('should render protected files', async () => {
    const { findByText } = render(
      <S3Field
        source="file"
        record={{
          file: {
            key: 'image.png',
            level: 'protected',
            identityId: 'id',
          },
        }}
      >
        <Printer />
      </S3Field>
    );

    expect(await findByText(/protected/i)).toBeInTheDocument();
    expect(mockStorageGet).toHaveBeenCalledWith('image.png', {
      level: 'protected',
      identityId: 'id',
    });
  });
});

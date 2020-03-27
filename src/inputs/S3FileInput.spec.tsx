import React from 'react';
import { render } from '@testing-library/react';
import { S3FileInput } from './S3FileInput';
import { Form } from 'react-final-form';
import { TestContext } from 'react-admin';

describe('<S3FileInput />', () => {
  test('should render the image uploader', async () => {
    const { findByText } = render(
      <TestContext>
        <Form onSubmit={() => {}}>
          {() => <S3FileInput label="Upload files" source="files" />}
        </Form>
      </TestContext>
    );

    expect(await findByText(/upload files/i)).toBeInTheDocument();
  });
});

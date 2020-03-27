import React from 'react';
import { render } from '@testing-library/react';
import { S3ImageInput } from './S3ImageInput';
import { Form } from 'react-final-form';
import { TestContext } from 'react-admin';

describe('<S3ImageInput />', () => {
  test('should render the image uploader', async () => {
    const { findByText } = render(
      <TestContext>
        <Form onSubmit={() => {}}>
          {() => <S3ImageInput label="Upload images" source="image" />}
        </Form>
      </TestContext>
    );

    expect(await findByText(/upload images/i)).toBeInTheDocument();
  });
});

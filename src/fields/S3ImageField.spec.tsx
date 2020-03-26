import React from 'react';
import { render } from '@testing-library/react';
import { S3ImageField } from './S3ImageField';

let mockStorageGet: any;
jest.mock('aws-amplify', () => {
  mockStorageGet = jest.fn((key: string) => Promise.resolve(`http://${key}`));
  return {
    Storage: {
      get: mockStorageGet,
    },
  };
});

describe('<S3ImageField />', () => {
  test('should render without error', async () => {
    const { findByTitle } = render(
      <S3ImageField source="file" record={{ file: { key: 'image.png' } }} />
    );
    expect(await findByTitle(/image.png/i)).toBeInTheDocument();
  });
});

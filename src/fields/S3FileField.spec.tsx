import React from 'react';
import { render } from '@testing-library/react';
import { S3FileField } from './S3FileField';

let mockStorageGet: any;
jest.mock('aws-amplify', () => {
  mockStorageGet = jest.fn((key: string) => Promise.resolve(`http://${key}`));
  return {
    Storage: {
      get: mockStorageGet,
    },
  };
});

describe('<S3FileField />', () => {
  test('should render without error', async () => {
    const { findByText } = render(
      <S3FileField source="file" record={{ file: { key: 'info.txt' } }} />
    );
    expect(await findByText(/info.txt/i)).toBeInTheDocument();
  });
});

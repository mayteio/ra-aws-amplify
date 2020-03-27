import React from 'react';
import { render } from '@testing-library/react';
import { S3File } from './S3File';

describe('<S3File />', () => {
  test('should display image file', () => {
    const { getByTitle, getByText } = render(
      <S3File
        source="file"
        record={{
          file: {
            key: 'image.gif',
            type: 'image/gif',
          },
        }}
      />
    );
    expect(getByTitle(/icon for file type image\/gif/i)).toBeInTheDocument();
    expect(getByText(/^image.gif$/i)).toBeInTheDocument();
  });

  test('should display video icon for video files', () => {
    const { getByTitle } = render(
      <S3File
        source="file"
        record={{
          file: {
            key: 'video.mov',
            type: 'video/quicktime',
          },
        }}
      />
    );
    expect(
      getByTitle(/icon for file type video\/quicktime/i)
    ).toBeInTheDocument();
  });

  test('should display video icon for unknown file type', () => {
    const { getByTitle } = render(
      <S3File
        source="file"
        record={{
          file: {
            key: 'video.mov',
          },
        }}
      />
    );
    expect(getByTitle(/icon for file type unknown/i)).toBeInTheDocument();
  });

  test('should display file when record is the source', () => {
    const { getByTitle } = render(
      <S3File
        source="file"
        record={{
          key: 'video.mov',
          type: 'video/quicktime',
        }}
      />
    );
    expect(
      getByTitle(/icon for file type video\/quicktime/i)
    ).toBeInTheDocument();
  });

  test('should display file privacy level when specified', () => {
    const { getByText } = render(
      <S3File
        source="file"
        record={{
          key: 'video.mov',
          type: 'video/quicktime',
          level: 'protected',
        }}
      />
    );
    expect(getByText(/^video.mov - protected$/i)).toBeInTheDocument();
  });
});

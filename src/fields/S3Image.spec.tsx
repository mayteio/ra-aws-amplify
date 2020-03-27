import React from 'react';
import { render } from '@testing-library/react';
import { S3Image } from './S3Image';

describe('<S3Image />', () => {
  test('should display image when passed in a record', () => {
    const { getByTitle } = render(
      <S3Image
        src="image.png"
        source="image"
        record={{
          image: {
            key: 'image.png',
          },
        }}
      />
    );
    expect(getByTitle(/image.png/i)).toBeInTheDocument();
  });

  test('should display image when passed as a record', () => {
    const { getByTitle } = render(
      <S3Image
        src="image.png"
        source="image"
        record={{
          key: 'image.png',
        }}
      />
    );
    expect(getByTitle(/image.png/i)).toBeInTheDocument();
  });

  test('should display nothing when no src passed', () => {
    const { queryByTitle } = render(
      <S3Image
        source="image"
        record={{
          image: {
            key: 'image.png',
          },
        }}
      />
    );
    expect(queryByTitle(/image.png/i)).not.toBeInTheDocument();
  });
});

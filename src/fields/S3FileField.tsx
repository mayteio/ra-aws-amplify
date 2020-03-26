import React from 'react';
import { S3File } from './S3File';
import { S3Field } from './S3Field';

interface S3FileFieldProps {
  record?: Record<string, any>;
  source?: string;
}

export const S3FileField: React.FC<S3FileFieldProps> = props => {
  return (
    <S3Field {...props}>
      <S3File />
    </S3Field>
  );
};

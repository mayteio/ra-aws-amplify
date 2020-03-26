import React from 'react';
import { S3Field } from './S3Field';
import { S3Image } from './S3Image';

export interface S3ImageFieldProps {
  record?: Record<string, any>;
  source?: string;
  imgProps?: any;
  addLabel?: boolean;
}

export const S3ImageField: React.FC<S3ImageFieldProps> = ({
  // to avoid html img prop errors
  imgProps = {},
  ...props
}) => {
  return (
    <S3Field {...props}>
      <S3Image imgProps={imgProps} />
    </S3Field>
  );
};

S3ImageField.defaultProps = {
  addLabel: true,
};

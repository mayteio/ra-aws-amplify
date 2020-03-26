import React from 'react';
import { S3ImageFieldProps } from './S3ImageField';

export const S3Image: React.FC<S3ImageFieldProps & { src?: string }> = ({
  src,
  record,
  source,
  imgProps,
}) => {
  const title = record && source && record[source];
  return record && source ? (
    <img src={src} title={title?.key} {...imgProps} />
  ) : null;
};

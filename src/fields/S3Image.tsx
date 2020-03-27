import React from 'react';
import { S3ImageFieldProps } from './S3ImageField';
import { S3Object } from '../types';

export const S3Image: React.FC<S3ImageFieldProps & { src?: string }> = ({
  src,
  record,
  source,
  imgProps,
}) => {
  const s3Object: S3Object = (record && source && record[source]) || record;
  return s3Object && src ? (
    <img src={src} title={s3Object.key} {...imgProps} />
  ) : null;
};

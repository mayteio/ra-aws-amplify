import React from 'react';
import { ImageInput } from 'react-admin';
import { S3Input } from './S3Input';
import { S3ImageField } from '../fields';

interface S3InputProps {
  source: string;
  dropzoneOptions?: any;
  label?: string;
  level?: 'public' | 'protected' | 'private' | undefined;
}

export const S3ImageInput: React.FC<S3InputProps> = props => {
  return (
    <S3Input {...props}>
      <ImageInput>
        <S3ImageField source={props.source} />
      </ImageInput>
    </S3Input>
  );
};

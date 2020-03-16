import React from 'react';
import {
  useInput,
  ImageInput,
  TextInput,
  useNotify,
  usePermissions,
} from 'react-admin';
import { Storage } from 'aws-amplify';
import { S3ImageField } from '../S3ImageField';
import { uuid } from 'uuidv4';

interface S3InputProps {
  source: string;
  dropzoneOptions: any;
  level: 'public' | 'protected' | 'private' | undefined;
}

export const S3Input: React.FC<S3InputProps> = ({
  source,
  dropzoneOptions = {},
  level,
  ...props
}) => {
  // we use permissions to grab the identityId
  const { permissions } = usePermissions();
  const key = useInput({ source: source + '.key' });
  const identityId = useInput({ source: source + '.identityId' });
  const notify = useNotify();

  /**
   * Handle the react-dropzone onDrop
   * @param {File[]} files files dropped onto the upload area
   */
  const onDrop = (files: File[]) => {
    files.forEach(async file => {
      try {
        const result: any = await Storage.put(uuid() + '-' + file.name, file);

        key.input.onChange(result.key);
        if (level === 'protected' || level === 'private') {
          identityId.input.onChange(permissions.identityId);
        }
        // note: rawFile gets stripped when building params
      } catch (error) {
        notify('There was an error uploading your file.');
      }
    });
  };

  return (
    <>
      <ImageInput
        options={{ onDrop, ...dropzoneOptions }}
        {...props}
        source={source}
      >
        <S3ImageField source="key" />
      </ImageInput>
      <TextInput disabled source={source + '.key'} />
      <TextInput disabled source={source + '.identityId'} />
    </>
  );
};

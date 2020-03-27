import React from 'react';
import { useInput, useNotify, usePermissions } from 'react-admin';
import { Storage } from 'aws-amplify';
import { uuid } from 'uuidv4';
import { S3Object } from '../types';

interface S3InputProps {
  source: string;
  dropzoneOptions?: any;
  multiple?: boolean;
  level?: 'public' | 'protected' | 'private' | undefined;
}

export const S3Input: React.FC<S3InputProps> = ({
  source,
  dropzoneOptions = {},
  level,
  children,
  ...props
}) => {
  // we use permissions to grab the identityId
  const { permissions } = usePermissions();
  const { input } = useInput({ source });
  const notify = useNotify();

  /**
   * Handle the react-dropzone onDrop
   * @param {File[]} files files dropped onto the upload area
   */
  const onDrop = async (files: File[]) => {
    try {
      const results = await Promise.all(
        files.map(file => {
          const nameParts = file.name.split('.');
          return Storage.put(
            `${nameParts[0]}-${uuid()
              .split('-')
              .slice(0, 2)
              .join('-')}.${nameParts[1]}`,
            file
          ).then((result: any) => {
            let value: S3Object = {
              key: result.key,
              type: file.type,
              level: null,
              identityId: null,
            };
            if (level === 'protected' || level === 'private') {
              value.identityId = permissions.claims.identityId;
              value.level = level;
            }
            return value;
          });
        })
      );

      if (props.multiple) {
        input.onChange(results);
      } else {
        input.onChange(results[0]);
      }
    } catch (error) {
      input.onChange(undefined);
      notify('There was an error uploading your files.');
    }
  };

  const childProps = {
    source,
    options: { onDrop, ...dropzoneOptions },
    ...props,
  };

  // @ts-ignore
  return React.cloneElement(children, childProps);
};

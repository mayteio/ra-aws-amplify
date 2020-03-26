import React from 'react';
import { FileInput } from 'react-admin';
import { S3Input } from './S3Input';
import { S3FileField } from '../fields';

import { makeStyles } from '@material-ui/core';

interface S3InputProps {
  source: string;
  dropzoneOptions?: any;
  level?: 'public' | 'protected' | 'private' | undefined;
}

const useStyles = makeStyles({
  fileInput: {
    '& .previews > div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

export const S3FileInput: React.FC<S3InputProps> = props => {
  // S3Input clones the element and injects the logic as props
  const classes = useStyles();
  return (
    <S3Input {...props}>
      <FileInput className={classes.fileInput}>
        <S3FileField source={props.source} />
      </FileInput>
    </S3Input>
  );
};

import React from 'react';
import { S3Object } from '../types';

import ImageIcon from '@material-ui/icons/ImageRounded';
import MovieIcon from '@material-ui/icons/MovieRounded';
import DescriptionIcon from '@material-ui/icons/DescriptionRounded';
import { makeStyles, Theme, Link } from '@material-ui/core';

const getIcon = (type: string) => {
  switch (type) {
    case 'image/png':
    case 'image/gif':
    case 'image/jpeg':
    case 'image/jpg':
      return ImageIcon;
    case 'video/mp4':
    case 'video/3gpp':
    case 'video/quicktime':
    case 'video/x-msvideo':
      return MovieIcon;
    default:
      return DescriptionIcon;
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const S3File: React.FC<{
  record?: Record<string, any>;
  source?: string;
}> = ({ record, source }) => {
  const s3Object: S3Object = (record && source && record[source]) || record;
  const Icon = getIcon(s3Object.type);
  const classes = useStyles();
  return (
    <>
      <Icon
        titleAccess={`Icon for file type ${s3Object.type || 'unknown'}`}
        className={classes.icon}
      />
      <Link
        href={s3Object.key}
        title={`Open ${s3Object.key}`}
        target="_blank"
      >{`${s3Object.key}${s3Object.level ? ` - ${s3Object.level}` : ''}`}</Link>
    </>
  );
};

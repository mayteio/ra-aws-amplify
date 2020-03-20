import * as React from 'react';
import { Grid } from '@material-ui/core';

export const SanitizeGrid: React.FC<any> = ({ basePath, ...props }) => (
  <Grid {...props} />
);

import * as React from 'react';
import { CardActions, CreateButton } from 'react-admin';

export const CategoryListActions: React.FC<{ basePath?: string }> = ({
  basePath,
}) => {
  return (
    <CardActions>
      <CreateButton basePath={basePath} />
    </CardActions>
  );
};

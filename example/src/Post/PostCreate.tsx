import * as React from 'react';
import { Create, TextInput, FormWithRedirect, SaveButton } from 'react-admin';
import { Box, Grid, Toolbar, makeStyles } from '@material-ui/core';

import { MediaUploadInput } from '../common';

const useStyles = makeStyles({
  container: {
    width: 'calc(100% + 32px)',
  },
  input: {
    display: 'block',
  },
});

export const PostCreate: React.FC<any> = props => {
  const classes = useStyles();
  console.log(props);

  return (
    <Create {...props}>
      <FormWithRedirect
        render={formProps => (
          <Box p={2} component="form">
            <SanitizeGrid container className={classes.container}>
              <SanitizeGrid item xs>
                <TextInput source="title" className={classes.input} />
                <TextInput
                  source="content"
                  multiline
                  rows={5}
                  fullWidth
                  className={classes.input}
                />
                <TextInput
                  source="postImageId"
                  disabled
                  className={classes.input}
                />
              </SanitizeGrid>
              <SanitizeGrid item xs>
                <MediaUploadInput source="postImageId" {...props} />
              </SanitizeGrid>
            </SanitizeGrid>
            <Toolbar>
              <Box display="flex" justifyContent="space-between" width="100%">
                <SaveButton
                  saving={formProps.saving}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
              </Box>
            </Toolbar>
          </Box>
        )}
      ></FormWithRedirect>
    </Create>
  );
};

const SanitizeGrid: React.FC<any> = ({ basePath, ...props }) => (
  <Grid {...props} />
);

import * as React from 'react';
import {
  Create,
  TextInput,
  FormWithRedirect,
  SaveButton,
  Labeled,
} from 'react-admin';
import { Box, Grid, Toolbar, makeStyles } from '@material-ui/core';

import { MediaUploadInput } from '../Media';
import { S3FileInput } from '../../../dist';

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

  return (
    <Create {...props}>
      <FormWithRedirect
        render={formProps => (
          <Box p={2} component="form">
            <SanitizeGrid container spacing={4} className={classes.container}>
              <SanitizeGrid item xs>
                <TextInput source="title" className={classes.input} />
                <TextInput
                  source="content"
                  multiline
                  rows={5}
                  fullWidth
                  className={classes.input}
                />
              </SanitizeGrid>
              <SanitizeGrid item xs>
                <Labeled label="Featured Image">
                  <MediaUploadInput inputField="postImageId" {...props} />
                </Labeled>
                <S3FileInput
                  source="files"
                  label="Post files"
                  multiple={true}
                />
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

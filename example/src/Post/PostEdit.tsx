import * as React from 'react';
import {
  Edit,
  TextInput,
  FormWithRedirect,
  SaveButton,
  Labeled,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin';
import { Box, Toolbar, makeStyles } from '@material-ui/core';

import { MediaUploadInput } from '../Media';
import { SanitizeGrid } from '../common';

const useStyles = makeStyles({
  container: {
    width: 'calc(100% + 32px)',
  },
  input: {
    display: 'block',
  },
});

export const PostEdit: React.FC = props => {
  const classes = useStyles();
  return (
    <Edit {...props}>
      <FormWithRedirect
        render={formProps => {
          console.log(formProps);

          const initialCategories = formProps.record.categories.map(
            category => category['category.id']
          );
          console.log(initialCategories);

          return (
            <Box p={2} component="form">
              <SanitizeGrid container spacing={2} className={classes.container}>
                <SanitizeGrid item xs>
                  <TextInput source="title" className={classes.input} />
                  <TextInput
                    source="content"
                    multiline
                    rows={5}
                    fullWidth
                    className={classes.input}
                  />
                  <ReferenceArrayInput
                    label="Categories"
                    reference="Category"
                    source="PostCategory"
                    initialValue={initialCategories}
                  >
                    <AutocompleteArrayInput optionText="title" fullWidth />
                  </ReferenceArrayInput>
                </SanitizeGrid>
                <SanitizeGrid item xs>
                  <Labeled label="Featured Image">
                    <MediaUploadInput
                      source="image.id"
                      inputField="postImageId"
                      {...props}
                    />
                  </Labeled>
                </SanitizeGrid>
              </SanitizeGrid>
              <Toolbar>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <SaveButton
                    saving={formProps.saving}
                    handleSubmitWithRedirect={
                      formProps.handleSubmitWithRedirect
                    }
                  />
                </Box>
              </Toolbar>
            </Box>
          );
        }}
      ></FormWithRedirect>
    </Edit>
  );
};

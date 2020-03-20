import * as React from 'react';
import {
  Box,
  Button,
  Portal,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Theme,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { TextInput, ReferenceField, useMutation, useInput } from 'react-admin';
import { CREATE } from 'ra-core';
import { S3Input, S3ImageField } from '../../../';
import { Form, useFormState } from 'react-final-form';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export const MediaUploadInput: React.FC<any> = ({
  source,
  inputField,
  record,
  label,
  ...props
}) => {
  /** On mount, create input and set to source value if provided. */
  const { values } = useFormState();
  const { input } = useInput({ source: inputField });
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (values[source] && !mounted.current) {
      input.onChange(values[source]);
    }
    mounted.current = true;
  }, [input, source, values]);

  /** Handle modal dialog state */
  const [open, setOpen] = React.useState(false);

  /** Mutation action for saving a new media file */
  const [saveMedia, { data, loaded }] = useMutation({
    type: CREATE,
    resource: 'Media',
  });

  /** Handle popup form save, use dataProvider via hooks */
  const handleSave = data => saveMedia({ payload: { data } });

  /** Listen for successful mutation, set field and close window */
  const newlyCreatedMediaId = data?.id;
  React.useEffect(() => {
    if (newlyCreatedMediaId && loaded) {
      input.onChange(newlyCreatedMediaId);
      setOpen(false);
    }
  }, [newlyCreatedMediaId, loaded]);

  /** Handles removal of media model connection from parent model */
  const handleRemove = () => input.onChange(undefined);

  const classes = useStyles();
  return (
    <Box mb={2}>
      <ReferenceField
        basePath={props.basePath}
        reference="Media"
        source={inputField}
        record={values}
      >
        <S3ImageField source="attachment" />
      </ReferenceField>

      <Box>
        <Button onClick={() => setOpen(true)}>
          {values[inputField] ? 'Change media' : 'Add media'}
        </Button>
        {values[inputField] && (
          <Button onClick={handleRemove}>Remove Media</Button>
        )}
      </Box>
      <Portal>
        <Dialog open={open}>
          <DialogTitle className={classes.root} disableTypography>
            <Typography variant="h6">Add media</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Form onSubmit={handleSave} key={1}>
            {(props: any) => (
              <Box p={2} component="form" onSubmit={props.handleSubmit}>
                <TextInput source="name" />
                <S3Input source="attachment" />
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>
            )}
          </Form>
        </Dialog>
      </Portal>
    </Box>
  );
};

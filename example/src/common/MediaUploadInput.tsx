import * as React from 'react';
import {
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
import {
  TextInput,
  ReferenceField,
  useMutation,
  useNotify,
  useInput,
} from 'react-admin';
import { UPDATE, CREATE } from 'ra-core';
import { S3Input, S3ImageField } from '../../..';
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
  record,
  ...props
}) => {
  const { input } = useInput({ source });
  const { values } = useFormState();

  const [open, setOpen] = React.useState(false);
  const [saveMedia, { data, loaded }] = useMutation({
    type: values[source] ? UPDATE : CREATE,
    resource: 'Media',
  });

  // listen for change of mutation and close window
  const newlyCreatedMediaId = data?.id;
  React.useEffect(() => {
    if (newlyCreatedMediaId && loaded) {
      input.onChange(newlyCreatedMediaId);
      setOpen(false);
    }
  }, [newlyCreatedMediaId, loaded]);

  /** Handle popup form save, use dataProvider via hooks */
  const handleSave = data => saveMedia({ payload: { data } });

  /** Handles removal of media model connection from parent model */
  const handleRemove = () => input.onChange(undefined);

  const classes = useStyles();

  console.log(source, record);

  return (
    <>
      <ReferenceField
        basePath={props.basePath}
        reference="Media"
        source={source}
        record={record || values}
      >
        <S3ImageField source="attachment" />
      </ReferenceField>
      <Button onClick={() => setOpen(true)}>
        {values[source] ? 'Change media' : 'Add media'}
      </Button>
      <Button onClick={handleRemove}>Remove Media</Button>
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
              <form onSubmit={props.handleSubmit}>
                <TextInput source="name" />
                <S3Input source="attachment" />
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            )}
          </Form>
        </Dialog>
      </Portal>
    </>
  );
};

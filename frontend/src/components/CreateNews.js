import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const CREATE_NEWS_MUTATION = gql`
  mutation CreateNews($title: String!, $body: String!) {
    createNews(title: $title, body: $body) {
      success
      errors
    }
  }
`;

const CreateNews = () => {
  const [formState, setFormState] = useState({
    title: '',
    body: '',
  });

  const [createNews] = useMutation(CREATE_NEWS_MUTATION, {
    variables: {
      title: formState.title,
      body: formState.body,
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    createNews();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          +
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create News</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create some amazing content here...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              className="mb2"
              value={formState.title}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  title: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="name"
              label="Body"
              type="text"
              fullWidth
              className="mb2"
              value={formState.body}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  body: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default CreateNews;

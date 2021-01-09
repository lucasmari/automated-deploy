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
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      errors
    }
  }
`;

const SignIn = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: () => history.push('/'),
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    signIn();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      accent: '#ffc',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Link className="signin" onClick={handleClickOpen}>
          SignIn
        </Link>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Welcome, please enter your email and password
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="text"
              fullWidth
              value={formState.email}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value,
                })
              }
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="text"
              fullWidth
              value={formState.password}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                })
              }
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="accent">
              Cancel
            </Button>
            <Button onClick={submit} color="accent">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;

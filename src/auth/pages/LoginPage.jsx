import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from "../../hooks";

const formValidations = {
  email: [ (value) => value.includes('@'), 'Email must content an @.'],
  password: [ (value) => value.length >=1, 'Write your password'],
}

export const LoginPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector( (state) => state.auth );

  const dispatch = useDispatch();
  const { formState, email, password, onInputChange, emailValid, passwordValid, isFormValid } = useForm({
    email: 'luis@google.com',
    password: '123456'
  }, formValidations );

  const isAuthenticating = useMemo( () => status === 'checking', [status] )

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return

    // console.log({ email, password });
    dispatch( startLoginWithEmailPassword(formState) );
  }
  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={ { mt: 2 } }>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="email@google.com"
                fullWidth
                name="email" 
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={ { mt: 2 } }>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Password"
                fullWidth
                name="password" 
                value={ password }
                onChange={ onInputChange } 
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled={ isAuthenticating }
                  type='submit' 
                  variant="contained" 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled={ isAuthenticating }
                  variant="contained" 
                  fullWidth 
                  onClick={ onGoogleSignIn }>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Create an account
              </Link>
            </Grid>

          </Grid>

        </form>
    </AuthLayout>

        
     
  )
}

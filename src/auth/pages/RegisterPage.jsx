import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

const formData = {
    email: 'luis@google.com',
    password: '123456',
    displayName: 'Luis Miguel Rojas',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'email must content an @.'],
  password: [ (value) => value.length >=6, 'Password must have more than 6 characters.'],
  displayName: [ (value) => value.length >=1, 'Name is required.'],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(formState)
  }

  return (
    <AuthLayout title='Sign up'>
      <form onSubmit={ onSubmit } >
          <Grid container>
            <Grid item xs={ 12 } sx={ { mt: 2 } }>
              <TextField 
                label="Full name" 
                type="text" 
                placeholder="Your full name"
                fullWidth 
                name='displayName'
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={ { mt: 2 } }>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="email@google.com"
                fullWidth 
                name='email'
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
                name='password'
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>
            <Grid item xs={ 12 } sx={ { mt: 2 } }>
              <TextField 
                label="Confirm password" 
                type="password" 
                placeholder="Confirm password"
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange } 
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant="contained" fullWidth>
                  Create account
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>You have an account?</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                Log in
              </Link>
            </Grid>

          </Grid>

        </form>
    </AuthLayout>

        
     
  )
}

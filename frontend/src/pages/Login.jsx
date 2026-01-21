import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormik } from 'formik';
import * as Yup from 'yup'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 80dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
}));

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [success, setSuccess] = useState('')
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }

    //Validation Schemas
    const loginSchema = Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters!')
        .required('Username is required.'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters!')
        .required('Password is required.')
    })

    const registerSchema = Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters!')
        .required('Username is required.'),
      email: Yup.string()
        .email(3, 'Invalid email address.')
        .required('Email is required.'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters!')
        .matches(
          /[!@#$%^&*(),.?":{}|<>"]/,
          'Password must contain at least 1 special character'
        )
        .required('Password  is required.'),
    })

    //Formik for user register.
    const registerFormik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit: async (value, { setSubmitting, resetForm }) => {
        setError('')
        setSuccess('')

        try {
          await AxiosInstance.post('users/', values)

          setSuccess('Registration successful! Please login')
          resetForm()
          setTimeout(() => setIsLogin(true), 1500)
        } catch (registrationError) {
          const errors = registrationError.response?.data
          if (errors) {
            const errorMsg = Object.values(errors).flat().join(' ')
            setError(errorMsg)
          } else {
            setError('Registration failed. Please try again.')
          }
        } finally {
          setSubmitting(false)
        }
      }
    })

    //Formik for user login.
    const loginFormik = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit: async (value, { setSubmitting, resetForm }) => {
        setError('')
        setSuccess('')

        try {
          await AxiosInstance.post('users/post/', values)

          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)
          setUser(response.data.user)
          setSuccess('Login successful! ')
        } catch (loginError) {
          setError(loginError.response?.data?.error || 'Login fialed. Please try again.')
        } finally {
          setSubmitting(false)
        }
      }
    })

    const currentFormik = isLogin ? loginFormik : registerFormik

    const handleLogout = () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(null)
      setSuccess('Logged out successfully')
      loginFormik.resetForm()
      registerFormik.resetForm()
    }

    const toggleForm = () => {
      setIsLogin(!isLogin)
      setError('')
      setSuccess('')
      loginFormik.resetForm()
      registerFormik.resetForm()
    }

    return (
      <>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign in
              </Button>

              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Forgot your password?
              </Link>
            </Box>

            <Divider>or</Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign in with Google')}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign in with Facebook')}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>

              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link variant="body2">Sign up</Link>
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
        A
      </>
    );
  }
}

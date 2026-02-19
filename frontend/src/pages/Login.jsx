import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'


import { useFormik } from 'formik'
import { useAuth } from '../services/AuthContext'

import * as Yup from 'yup'
import AxiosInstance from '../services/Axios'

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

  const { login } = useAuth()

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
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError('')
      setSuccess('')

      try {
        const response = await AxiosInstance.post('users/post/', values)

        //Context login function
        login(response.data.user, {
          access: response.data.access,
          refresh: response.data.refresh
        })

        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        setUser(response.data.user)
        setSuccess('Login successful! ')
      } catch (loginError) {
        setError(loginError.response?.data?.error || 'Login failed. Please try again.')
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
      <form onSubmit={currentFormik.handleSubmit}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Typography>

            {error && (
              <Box sx={{ backgroundColor: '#ef8686', borderColor: 'red', color: 'red', borderRadius: '2', marginBottom: '4', paddingX: '2' }}>
                {error}
              </Box>
            )}

            {success && (
              <Box sx={{ backgroundColor: '#c9ef86', borderColor: 'green', color: 'green', borderRadius: '2', marginBottom: '4', paddingX: '2' }}>
                {success}
              </Box>
            )}


            <Box
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >

              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  id="username"
                  type="text"
                  name="username"
                  value={currentFormik.values.username}
                  onChange={currentFormik.handleChange}
                  onBlur={currentFormik.handleBlur}
                  autoComplete="username"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                />
                {currentFormik.touched.username && currentFormik.errors.username && (
                  <Typography sx={{ color: 'red', fontSize: '0.875rem' }}>{currentFormik.errors.username}</Typography>
                )}
              </FormControl>
              {!isLogin && (
                <>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                      value={currentFormik.values.email}
                      onChange={currentFormik.handleChange}
                      onBlur={currentFormik.handleBlur}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </FormControl>

                  {currentFormik.touched.email && currentFormik.errors.email && (
                    <Typography sx={{ color: 'red', marginTop: '1', fontSize: '0.875rem' }}>{currentFormik.errors.email}</Typography>
                  )}
                </>
              )}
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  value={currentFormik.values.password}
                  onChange={currentFormik.handleChange}
                  onBlur={currentFormik.handleBlur}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              {currentFormik.touched.password && currentFormik.errors.password && (
                <Typography sx={{ color: 'red', marginTop: '1', fontSize: '0.875rem' }}>{currentFormik.errors.password}</Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                onClick={currentFormik.handleSubmit}
                disabled={currentFormik.isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
              >
                {currentFormik.isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
              </Button>

              <Link
                component="button"
                type="button"
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
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <Link onClick={toggleForm} sx={{ cursor: 'pointer' }}>
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Link onClick={toggleForm} sx={{ cursor: 'pointer' }}>
                      Sign in
                    </Link>
                  </>
                )}
              </Typography>

            </Box>
          </Card>
        </SignInContainer >
      </form>
    </>
  );
}

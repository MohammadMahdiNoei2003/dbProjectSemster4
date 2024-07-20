import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter password')
    .min(6, 'At least 6 characters')
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log('Login response: ', data);
        if (!response.ok) {
          setServerError(data.message || 'Login failed.');
          setSubmitting(false);
          return;
        }
        navigate('/');
      } catch (err) {
        console.error('Error:', err);
        setServerError('Internal server error.');
        setSubmitting(false);
        return navigate('/500');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" className="h-screen">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" className="text-[#342461]">
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#342461',
                },
                '&:hover fieldset': {
                  borderColor: '#342461',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#342461',
                },
              },
              '& .MuiInputBase-input': {
                color: '#342461',
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#342461',
                },
                '&:hover fieldset': {
                  borderColor: '#342461',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#342461',
                },
              },
              '& .MuiInputBase-input': {
                color: '#342461',
              },
            }}
          />
          <a className="text-[#342461] font-normal cursor-default">
            Don’t have an account?{' '}
          </a>
          <Link to="/auth/register" className="text-[#342461] text-sm">
            Register
          </Link>
          {serverError && <div className="text-sm text-red-700 mt-2">{serverError}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#483285',
              p: 2,
              '&:hover': { backgroundColor: '#342461' },
            }}
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

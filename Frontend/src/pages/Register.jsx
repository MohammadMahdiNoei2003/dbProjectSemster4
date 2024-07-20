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
  confirmPassword: yup
    .string('Confirm password')
    .oneOf([yup.ref('password'), null], 'Failed adaptation')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log('Registration response: ', data);
        if (!response.ok) {
          setServerError(data.message || 'Failed to register.');
          return;
        }
        navigate('/auth/login');
      } catch (err) {
        console.error('Error:', err);
        setServerError('Internal server error.');
        return navigate('/500');
      } finally {
        setSubmitting(false);
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
          Register
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
            Already have an account?{' '}
          </a>
          <Link to="/auth/login" className="text-[#342461] text-sm">
            Login
          </Link>
          {serverError && <div className="text-sm text-red-700">{serverError}</div>}
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;

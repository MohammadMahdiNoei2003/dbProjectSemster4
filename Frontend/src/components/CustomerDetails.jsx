import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';

function CustomerDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/customer/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Error fetching details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }
    
      if (error) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography color="error">{error}</Typography>
          </Box>
        );
      }
=======
>>>>>>> Stashed changes
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="120vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
<<<<<<< Updated upstream
=======
>>>>>>> 1133efa (add auth middleware and tokenize frontend)
>>>>>>> Stashed changes

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      className="my-8 mb-8"
    >
      <Card
        sx={{ maxWidth: 600, boxShadow: 3, marginTop: 15, marginBottom: 15 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Customer Details
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            First name: {data.first_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Last name: {data.last_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Father name: {data.father_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Nationality: {data.nationality}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            National number: {data.national_number}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            National code: {data.national_code}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Passport number: {data.passport_number}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Education grade: {data.education_grade}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Presenter number: {data.presenter_number}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Email: {data.email}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Date of birth: {data.dob}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Gender: {data.gender_title}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            State: {data.state_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            City: {data.city_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Address: {data.address}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Postal code: {data.postal_code}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Phone: {data.phone}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Line: {data.line}
          </Typography>
          <Box mt={2} textAlign={'center'}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              className="rounded-r-none"
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/product/show')}
              className="rounded-l-none"
            >
              Products
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CustomerDetails;

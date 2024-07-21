import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';

function RepresentativeDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/representative/${id}`, {
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

    fetchData();
  }, [id]);

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

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom style={{fontWeight: 'bold'}}>
            Representative Details
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            First name: {data.first_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Last name: {data.last_name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Representing code: {data.repersenting_code}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Gender: {data.gender}
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RepresentativeDetails;

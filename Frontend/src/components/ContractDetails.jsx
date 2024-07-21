import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';

function ContractDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/contract/${id}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            console.log(result);
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

    if (!data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="textSecondary">No data found</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="120vh" className="my-8 mb-8">
            <Card sx={{ maxWidth: 600, boxShadow: 3, marginTop: 15, marginBottom: 15 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: "center" }}>
                        Contract Details
                    </Typography>
                    <hr />
                    <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: "center" }}>
                        Customer Info
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Customer number: {data.customer_number}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        First name: {data.first_name}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Last name: {data.last_name}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        National number: {data.national_number}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        National code: {data.national_code}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Presenter number: {data.presenter_number}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Email: {data.email}
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
                    <hr />
                    <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: "center" }}>
                        Representative Info
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Representative number: {data.rep_number}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Representative first name: {data.rep_first_name}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Representative last name: {data.rep_last_name}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Representing code: {data.repersenting_code}
                    </Typography>
                    <hr />
                    <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: "center" }}>
                        Contract Info
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Contract number: {data.contract_number}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Shuttle Subscription code: {data.shuttle_subscription_code}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Request type: {data.request}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Submit date: {data.submit_date}
                    </Typography>
                    <Box mt={2} textAlign={"center"}>
                        <Button variant="contained" color="primary" onClick={() => window.history.back()} className="rounded-r-none">
                            Go Back
                        </Button>
                        <Button variant="contained" color="inherit" onClick={() => window.print()} className="rounded-r-none">
                            Print 
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ContractDetails;

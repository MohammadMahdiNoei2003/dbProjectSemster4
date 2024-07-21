import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerData() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/customer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const result = await response.json();
        console.log('API Response:', result);

        const sortedData = result.sort(
          (a, b) => a.customer_number - b.customer_number
        );
        setData(sortedData);
        setTotalCount(result.length);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData([]);
        setTotalCount(0);
      }
    };

    fetchData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/customer/${id}`);
  };

  const handleProduct = (id) => {
    localStorage.setItem('customerNumber', id);
    navigate(`/product`);
  }

  const handleUpdate = (id) => {
    navigate(`/customer/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!Number.isInteger(Number(id))) {
      alert('Invalid customer ID');
      return;
    }
  
    if (window.confirm('Are you sure to delete this customer?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/customer/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        if (!response.ok) throw new Error('Failed to delete customer');
        alert('Customer deleted successfully');
        const updatedData = data.filter((item) => item.customer_number !== parseInt(id));
        setData(updatedData);
        window.location.reload();
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Failed to delete customer');
      }
    }
  };
  

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: '100vh', overflowY: 'auto' }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>
              Customer Number
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Nationality</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              National Number
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={14} style={{ textAlign: 'center' }}>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.customer_number}>
                <TableCell>{item.customer_number}</TableCell>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>{item.last_name}</TableCell>
                <TableCell>{item.nationality}</TableCell>
                <TableCell>{item.national_number}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDetails(item.customer_number)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleProduct(item.customer_number)}
                  >
                    Add Product
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleUpdate(item.customer_number)}
                    style={{ marginLeft: 8 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.customer_number)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/customer')}
        >
          Add
        </Button>
      </div>
      <div style={{ textAlign: 'center' }} className="my-4">
        Total Count: {totalCount}
      </div>
    </TableContainer>
  );
}

export default CustomerData;

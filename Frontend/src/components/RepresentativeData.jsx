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

function RepresentativeData() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/representative', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const result = await response.json();
        const sortedData = result.data
          ? result.data.sort((a, b) => a.rep_number - b.rep_number)
          : [];
        setData(sortedData);
        setTotalCount(result.totalCount || 0);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData([]);
        setTotalCount(0);
      }
    };

    fetchData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/representative/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/representative/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this representative?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/representative/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          }
        );
        if (!response.ok) throw new Error('Failed to delete representative');
        alert('Representative deleted successfully');
        const updatedData = data.filter((item) => item.rep_number !== id);
        setData(updatedData);
        window.location.reload();
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Failed to delete representative');
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
            <TableCell style={{ fontWeight: 'bold' }}>Rep Number</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              Representing Code
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Gender</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.rep_number}>
              <TableCell>{item.rep_number}</TableCell>
              <TableCell>{item.first_name}</TableCell>
              <TableCell>{item.last_name}</TableCell>
              <TableCell>{item.repersenting_code}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetails(item.rep_number)}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleUpdate(item.rep_number)}
                  style={{ marginLeft: 8 }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.rep_number)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/representative')}
        >
          Add
        </Button>
      </div>
      <div style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}>
        Total Records: {totalCount}
      </div>
    </TableContainer>
  );
}

export default RepresentativeData;

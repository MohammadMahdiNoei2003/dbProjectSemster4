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

function ContractData() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/contract', {
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
    navigate(`/contract/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/contract/edit/${id}`);
  };

  const handleDelete = async (id) => {
    console.log('Deleting contract with ID:', id);
    if (!Number.isInteger(Number(id))) {
      alert('Invalid contract ID');
      return;
    }

    if (window.confirm('Are you sure to delete this contract?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/contract/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        if (!response.ok) throw new Error('Failed to delete contract');
        alert('Contract deleted successfully');
        const updatedData = data.filter((item) => item.contract_number !== id);
        setData(updatedData);
        window.location.reload();
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Failed to delete contract');
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
              Contract number
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              Subscription code
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              Customer number
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              Representative number
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Request type</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Register date</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.contract_number}>
              <TableCell>{item.contract_number}</TableCell>
              <TableCell>{item.shuttle_subscription_code}</TableCell>
              <TableCell>{item.customer_number}</TableCell>
              <TableCell>{item.rep_number}</TableCell>
              <TableCell>{item.request}</TableCell>
              <TableCell>{item.submit_date}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetails(item.contract_number)}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleUpdate(item.contract_number)}
                  style={{ marginLeft: 8 }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.contract_number)}
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
          onClick={() => navigate('/contract')}
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

export default ContractData;

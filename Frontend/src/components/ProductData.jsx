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
  
  function ProductData() {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/product', {
            method: 'GET',
          });
          const result = await response.json();
          console.log('Fetch result:', result); // بررسی داده‌های دریافتی
          const sortedData = result
            ? result.sort((a, b) => a.product_number - b.product_number)
            : [];
          setData(sortedData);
          setTotalCount(sortedData.length);
        } catch (err) {
          console.error('Error fetching data:', err);
          setData([]);
          setTotalCount(0);
        }
      };
  
      fetchData();
    }, []);
  
    const handleUpdate = (id) => {
      navigate(`/product/edit/${id}`);
    };
  
    const handleDelete = async (id) => {
      console.log('Deleting product with ID:', id);
      if (!Number.isInteger(Number(id))) {
        alert('Invalid product ID');
        return;
      }
  
      if (window.confirm('Are you sure to delete this product?')) {
        try {
          const response = await fetch(`http://localhost:3000/product/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete product');
          alert('Product deleted successfully');
          const updatedData = data.filter((item) => item.product_number !== id);
          setData(updatedData);
          window.location.reload();
        } catch (err) {
          console.error('Error deleting:', err);
          alert('Failed to delete product');
        }
      }
    };
  
    return (
      <TableContainer component={Paper} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Product number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Customer number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Sim card serial number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Modem serial number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Mobile number</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Modem name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Service</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.product_number}>
                <TableCell>{item.product_number}</TableCell>
                <TableCell>{item.customer_number}</TableCell>
                <TableCell>{item.sim_card_serial_number}</TableCell>
                <TableCell>{item.modem_serial_number}</TableCell>
                <TableCell>{item.mobile_number}</TableCell>
                <TableCell>{item.modem_name}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleUpdate(item.product_number)} style={{ marginLeft: 8 }}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(item.product_number)} style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}>
          <Button variant="contained" color="info" onClick={() => navigate('/customer/show')}>
            Back
          </Button>
        </div>
        <div style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}>
          Total Records: {totalCount}
        </div>
      </TableContainer>
    );
  }
  
  export default ProductData;
  
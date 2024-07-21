import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Products({ isUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serverError, setServerError] = useState('');

  const [simCardSerialNumber, setSimCardSerialNumber] = useState('');
  const [modemSerialNumber, setModemSerialNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [modemName, setModemName] = useState('');
  const [service, setService] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');

  useEffect(() => {
    const storedCustomerNumber = localStorage.getItem('customerNumber');
    if (storedCustomerNumber) {
      setCustomerNumber(storedCustomerNumber);
    } else {
      console.error('No customer number found in localStorage.');
    }

    if (isUpdate && id) {
      fetch(`http://localhost:3000/product/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data); // افزودن لاگ برای بررسی داده‌ها
          setSimCardSerialNumber(data.sim_card_serial_number || '');
          setModemSerialNumber(data.modem_serial_number || '');
          setMobileNumber(data.mobile_number || '');
          setModemName(data.modem_name || '');
          setService(data.service || '');
          setCustomerNumber(data.customer_number || '');
        })
        .catch(error => console.error('Error fetching product data:', error));
    }
  }, [isUpdate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const values = {
      sim_card_serial_number: simCardSerialNumber,
      modem_serial_number: modemSerialNumber,
      mobile_number: mobileNumber,
      modem_name: modemName,
      service: service,
      customer_number: customerNumber,
    };

    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Server error:', data);
        setServerError(data.message || 'Failed to submit.');
      } else {
        const data = await response.json();
        console.log('Registration response:', data);
        navigate("/product/show");
      }
    } catch (err) {
      console.error('Error:', err);
      setServerError('Internal server error.');
      navigate('/500');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const values = {
      sim_card_serial_number: simCardSerialNumber,
      modem_serial_number: modemSerialNumber,
      mobile_number: mobileNumber,
      modem_name: modemName,
      service: service,
      customer_number: customerNumber,
    };

    try {
      const response = await fetch(`http://localhost:3000/product/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Server error:', data);
        setServerError(data.message || 'Failed to update.');
      } else {
        console.log('Update response:', data);
        navigate("/product/show");
      }
    } catch (err) {
      console.error('Error updating:', err);
      navigate('/500');
    }
  };

  return (
    <div className="container border rounded-md px-10 py-2 w-[500px] text-center m-auto my-8">
      <h1 className="text-xl text-center">{isUpdate ? 'Update Product' : 'Product Form'}</h1>
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <label
          htmlFor="customerNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Customer number:
        </label>
        <input
          type="text"
          name="customer_number"
          required
          readOnly
          value={customerNumber}
          onChange={(event) => setCustomerNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="simCardSerialNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Sim card serial number
        </label>
        <input
          type="text"
          name="sim_card_serial_number"
          required
          value={simCardSerialNumber}
          onChange={(event) => setSimCardSerialNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="modem_serial_number"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Modem serial number
        </label>
        <input
          type="text"
          name="modem_serial_number"
          value={modemSerialNumber}
          required
          onChange={(event) => setModemSerialNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="mobileNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Mobile number
        </label>
        <input
          type="text"
          name="mobile_number"
          required
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="modemName"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Modem name
        </label>
        <input
          type="text"
          name="modem_name"
          required
          value={modemName}
          onChange={(event) => setModemName(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="service"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Service
        </label>
        <input
          type="radio"
          name="service"
          value="postpaid"
          className="inline w-[10%]"
          checked={service === 'postpaid'}
          onChange={(event) => setService(event.target.value)}
        />{' '}
        Postpaid 
        <input
          type="radio"
          name="service"
          value="Prepaid"
          className="inline w-[10%]"
          checked={service === 'Prepaid'}
          onChange={(event) => setService(event.target.value)}
        />{' '}
        Prepaid
        {serverError && <div className="text-sm text-red-700">{serverError}</div>}
        <button
          type="submit"
          className="my-3 bg-[#483285] w-full rounded-md py-2 mt-8 text-center text-white hover:bg-[#342461] transition-all"
        >
          {isUpdate ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

Products.propTypes = {
  isUpdate: PropTypes.bool.isRequired,
};

export default Products;

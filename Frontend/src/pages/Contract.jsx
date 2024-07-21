import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Contract({ isUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serverError, setServerError] = useState('');

  const [subscriptionCode, setSubscriptionCode] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [repNumber, setRepNumber] = useState('');
  const [reqType, setReqType] = useState('');

  useEffect(() => {
    if (isUpdate && id) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/contract/${id}`, {
        method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
      })
        .then(response => response.json())
        .then(data => {
          setSubscriptionCode(data.shuttle_subscription_code);
          setCustomerNumber(data.customer_number);
          setRepNumber(data.rep_number);
          setReqType(data.request);
        })
        .catch(error => console.error('Error fetching contract data:', error));
    }
  }, [isUpdate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const values = {
      subscription_code: subscriptionCode,
      customer_number: customerNumber,
      rep_number: repNumber,
      req_type: reqType
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
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
        navigate("/contract/show");
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
      subscription_code: subscriptionCode,
      customer_number: customerNumber,
      rep_number: repNumber,
      request: reqType
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/contract/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Server error:', data);
        setServerError(data.message || 'Failed to update.');
      } else {
        console.log('Update response:', data);
        navigate("/contract/show");
      }
    } catch (err) {
      console.error('Error updating: ', err);
      return navigate('/500');
    }
  };

  return (
    <div className="container border rounded-md px-10 py-2 w-[500px] text-center m-auto my-8">
      <h1 className="text-xl text-center">{isUpdate ? 'Update Contract' : 'Contract Form'}</h1>
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <label
          htmlFor="subscriptionCode"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Subscription code
        </label>
        <input
          type="text"
          name="subscription_code"
          required
          value={subscriptionCode}
          onChange={(event) => setSubscriptionCode(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="customerNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Customer number
        </label>
        <input
          type="text"
          name="customer_number"
          value={customerNumber}
          required
          onChange={(event) => setCustomerNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="repNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Representative number
        </label>
        <input
          type="text"
          name="rep_number"
          required
          value={repNumber}
          onChange={(event) => setRepNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="reqType"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Request type
        </label>
        <input
          type="radio"
          name="req_type"
          value="new"
          className="inline w-[10%]"
          checked={reqType === 'new'}
          onChange={(event) => setReqType(event.target.value)}
        />{' '}
        New
        <input
          type="radio"
          name="req_type"
          value="transportation"
          className="inline w-[10%]"
          checked={reqType === 'transportation'}
          onChange={(event) => setReqType(event.target.value)}
        />{' '}
        Transportation
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

Contract.propTypes = {
  isUpdate: PropTypes.bool.isRequired,
};

export default Contract;

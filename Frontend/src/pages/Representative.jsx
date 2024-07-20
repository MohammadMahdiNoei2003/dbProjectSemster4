import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Representative({ isUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serverError, setServerError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [representingCode, setRepresentingCode] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (isUpdate && id) {
      fetch(`http://localhost:3000/representative/${id}`)
        .then(response => response.json())
        .then(data => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setRepresentingCode(data.repersenting_code);
          setGender(data.gender);
        })
        .catch(error => console.error('Error fetching representative data:', error));
    }
  }, [isUpdate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const values = {
      first_name: firstName,
      last_name: lastName,
      repersenting_code: representingCode,
      gender: gender,
    };
    
    try {
      const response = await fetch('http://localhost:3000/representative', {
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
        navigate("/representative/show");
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
      first_name: firstName,
      last_name: lastName,
      repersenting_code: representingCode,
      gender: gender,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/representative/edit/${id}`, {
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
        navigate("/representative/show");
      }
    } catch (err) {
      console.error('Error updating:', err);
      navigate('/500');
    }
  };
  

  return (
    <div className="container border rounded-md px-10 py-2 w-[500px] text-center m-auto my-8">
      <h1 className="text-xl text-center">{isUpdate ? 'Update Representative' : 'Representative Form'}</h1>
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <label
          htmlFor="firstName"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          First name
        </label>
        <input
          type="text"
          name="first_name"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="lastName"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Last name
        </label>
        <input
          type="text"
          name="last_name"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="representingCode"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Representing code
        </label>
        <input
          type="text"
          name="repersenting_code"
          required
          value={representingCode}
          onChange={(event) => setRepresentingCode(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="gender"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Gender
        </label>
        <input
          type="radio"
          name="gender"
          value="male"
          className="inline w-[10%]"
          checked={gender === 'male'}
          onChange={(event) => setGender(event.target.value)}
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          className="inline w-[10%]"
          checked={gender === 'female'}
          onChange={(event) => setGender(event.target.value)}
        />{' '}
        Female
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

Representative.propTypes = {
  isUpdate: PropTypes.bool.isRequired,
};

export default Representative;

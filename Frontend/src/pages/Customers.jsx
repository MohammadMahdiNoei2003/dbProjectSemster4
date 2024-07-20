import { useState, useEffect } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function Customers({ isUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [nationality, setNationality] = useState('');
  const [educationGrade, setEducationGrade] = useState('');
  const [nationalNumber, setNationalNumber] = useState('');
  const [presenterNumber, setPresenterNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lineNumber, setLineNumber] = useState('');

  useEffect(() => {
    if (isUpdate && id) {
      fetch(`http://localhost:3000/customer/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setJobTitle(data.job_title);
          setFatherName(data.father_name);
          setNationality(data.nationality);
          setEducationGrade(data.education_grade);
          setNationalNumber(data.national_number);
          setPresenterNumber(data.presenter_number);
          setNationalCode(data.national_code);
          setPassportNumber(data.passport_number);
          setDateOfBirth(dayjs(data.dob));
          setEmail(data.email);
          setGender(data.gender);
          setAddress(data.address);
          setState(data.state);
          setCity(data.city);
          setPostalCode(data.postal_code);
          setPhoneNumber(data.phone_number);
          setLineNumber(data.line_number);
        })
        .catch((error) =>
          console.error('Error fetching customer data:', error)
        );
    }
  }, [isUpdate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const values = {
      first_name: firstName,
      last_name: lastName,
      job_title: jobTitle,
      father_name: fatherName,
      nationality: nationality,
      education_grade: educationGrade,
      national_number: nationalNumber,
      presenter_number: presenterNumber,
      national_code: nationalCode,
      passport_number: passportNumber,
      dob: dateOfBirth.format('YYYY-MM-DD'),
      email: email,
      gender: gender,
      address: address,
      state: state,
      city: city,
      postal_code: postalCode,
      phone_number: phoneNumber,
      line_number: lineNumber,
    };
    try {
      const response = await fetch('http://localhost:3000/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Registration response: ', data);
    } catch (err) {
      console.error('Error registering: ', err);
      return navigate('/500');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const values = {
      first_name: firstName,
      last_name: lastName,
      job_title: jobTitle,
      father_name: fatherName,
      nationality: nationality,
      education_grade: educationGrade,
      national_number: nationalNumber,
      presenter_number: presenterNumber,
      national_code: nationalCode,
      passport_number: passportNumber,
      dob: dateOfBirth.format('YYYY-MM-DD'),
      email: email,
      gender: gender,
      address: address,
      state: state,
      city: city,
      postal_code: postalCode,
      phone_number: phoneNumber,
      line_number: lineNumber,
    };

    try {
      const response = await fetch(`http://localhost:3000/customer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Update response: ', data);
    } catch (err) {
      console.error('Error updating: ', err);
      return navigate('/500');
    }
  };

  return (
    <div className="container border rounded-md px-10 py-2 w-[500px] text-center m-auto my-8">
      <h1 className="text-xl text-center">
        {isUpdate ? 'Update Customer' : 'Customer Form'}
      </h1>
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
          htmlFor="fatherName"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Father name
        </label>
        <input
          type="text"
          name="father_name"
          value={fatherName}
          onChange={(event) => setFatherName(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="nationality"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          value={nationality}
          required
          onChange={(event) => setNationality(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="nationalNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          National number
        </label>
        <input
          type="text"
          name="national_number"
          value={nationalNumber}
          required
          onChange={(event) => setNationalNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="nationalCode"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          National code
        </label>
        <input
          type="text"
          name="national_code"
          value={nationalCode}
          required
          onChange={(event) => setNationalCode(event.target.value)}
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
          onChange={(event) => setGender(event.target.value)}
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          className="inline w-[10%]"
          onChange={(event) => setGender(event.target.value)}
        />{' '}
        Female
        <label
          htmlFor="dob"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Date of birth
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
        <label
          htmlFor="passportNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Passport number
        </label>
        <input
          type="text"
          name="passport_number"
          value={passportNumber}
          onChange={(event) => setPassportNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="jobTitle"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Job title
        </label>
        <input
          type="text"
          name="job_title"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="educationGrade"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Education grade
        </label>
        <input
          type="text"
          name="education_grade"
          value={educationGrade}
          required
          onChange={(event) => setEducationGrade(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="presenterNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Presenter number
        </label>
        <input
          type="text"
          name="presenter_number"
          value={presenterNumber}
          onChange={(event) => setPresenterNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="email"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="state"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          State
        </label>
        <select
          name="state"
          id="state"
          value={state}
          required
          onChange={(event) => setState(event.target.value)}
          className="block w-full mb-[15px] p-[10px] box-border border-white rounded-md bg-white"
        >
          <option value={'Alborz'}>Alborz</option>
          <option value={'Ardabil'}>Ardabil</option>
          <option value={'Bushehr'}>Bushehr</option>
          <option value={'Chaharmahal and Bakhtiari'}>
            Chaharmahal and Bakhtiari
          </option>
          <option value={'East Azerbaijan'}>East Azerbaijan</option>
          <option value={'Fars'}>Fars</option>
          <option value={'Gilan'}>Gilan</option>
          <option value={'Golestan'}>Golestan</option>
          <option value={'Hamedan'}>Hamedan</option>
          <option value={'Hormozgan'}>Hormozgan</option>
          <option value={'Ilam'}>Ilam</option>
          <option value={'Isfahan'}>Isfahan</option>
          <option value={'Kerman'}>Kerman</option>
          <option value={'Kermanshah'}>Kermanshah</option>
          <option value={'Khuzestan'}>Khuzestan</option>
          <option value={'Kohgiluyeh and Boyer-Ahmad'}>
            Kohgiluyeh and Boyer-Ahmad
          </option>
          <option value={'Kurdistan'}>Kurdistan</option>
          <option value={'Lorestan'}>Lorestan</option>
          <option value={'Markazi'}>Markazi</option>
          <option value={'Mazandaran'}>Mazandaran</option>
          <option value={'North Khorasan'}>North Khorasan</option>
          <option value={'Qazvin'}>Qazvin</option>
          <option value={'Qom'}>Qom</option>
          <option value={'Razavi Khorasan'}>Razavi Khorasan</option>
          <option value={'Semnan'}>Semnan</option>
          <option value={'Sistan and Baluchestan'}>
            Sistan and Baluchestan
          </option>
          <option value={'South Khorasan'}>South Khorasan</option>
          <option value={'Tehran'}>Tehran</option>
          <option value={'West Azerbaijan'}>West Azerbaijan</option>
          <option value={'Yazd'}>Yazd</option>
          <option value={'Zanjan'}>Zanjan</option>
        </select>
        <label
          htmlFor="city"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={(event) => setCity(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="address"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          value={address}
          required
          onChange={(event) => setAddress(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="postalCode"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Postal code
        </label>
        <input
          type="text"
          name="postal_code"
          value={postalCode}
          required
          onChange={(event) => setPostalCode(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="phoneNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Phone number
        </label>
        <input
          type="text"
          name="phone_number"
          value={phoneNumber}
          required
          onChange={(event) => setPhoneNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
        <label
          htmlFor="lineNumber"
          className="text-[15px] block w-full mt-[8px] mb-[5px] text-left font-bold"
        >
          Line number
        </label>
        <input
          type="text"
          name="line_number"
          value={lineNumber}
          required
          onChange={(event) => setLineNumber(event.target.value)}
          className="block w-full p-[8px] box-border border-[1px] border-gray-500 rounded-md text-[12px] bg-white"
        />
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

Customers.propTypes = {
  isUpdate: PropTypes.bool.isRequired,
};

export default Customers;

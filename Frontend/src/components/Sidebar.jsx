import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
<<<<<<< Updated upstream
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Button } from '@mui/material';
=======
<<<<<<< HEAD
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase } from '@mui/material';
=======
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Button } from '@mui/material';
>>>>>>> 1133efa (add auth middleware and tokenize frontend)
>>>>>>> Stashed changes
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';


function Sidebar() {
  const location = useLocation();
  return (
    <div className="h-screen w-[300px] bg-[#483285] flex flex-col fixed">
      <div className="flex flex-row justify-center items-center my-4 mr-2">
        <div className="flex items-center w-[250px] text-white text-3xl">
          {/* <SearchIcon className="mr-2" /> */}
          <ImportContactsIcon className='mr-2' />
          {/* <SearchInput
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            className="ml-1"
          /> */}
        </div>
      </div>
      <ul className="h-auto w-full p-0 flex-grow flex flex-col">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              className={`flex flex-row w-full h-[50px] m-0 text-white justify-center items-center hover:cursor-pointer hover:bg-[#342461] transition-all ${
                location.pathname === value.link ? 'bg-[#342461]' : ''
              }`}
            >
              <Link
                to={value.link}
                className="flex flex-row w-full h-full justify-center items-center"
              >
                <div className="basis-30 grid place-items-center">
                  {value.icon}
                </div>
                <div className="basis-80">{value.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-row text-white bg-[#342461] py-2 w-full px-2">
        <Link
          to="/auth/login"
          className="w-1/2 flex justify-center items-center text-white hover:bg-[#483285] hover:text-white"
        >
          <Button
            startIcon={<LoginIcon />}
            color="primary"
            className="w-1/2 hover:text-[#342461] transition-all"
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: '#aea5c7' },
              width: '100%',
              height: '100%',
            }}
          >
            Login
          </Button>
        </Link>
        <Link
          to="/auth/register"
          className="w-1/2 flex justify-center items-center text-white hover:bg-[#483285] hover:text-white"
        >
          <Button
            startIcon={<HowToRegIcon />}
            color="primary"
            className="w-1/2 hover:bg-[#aea5c7] hover:text-[#342461] transition-all"
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: '#aea5c7' },
              width: '100%',
              height: '100%',
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

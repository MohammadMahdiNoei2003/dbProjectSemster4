import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Representative from './pages/Representative';
import Contract from './pages/Contract';
import Customers from './pages/Customers';
import P500 from './components/P500';
import CustomerData from './components/CustomerData';
import RepresentativeData from './components/RepresentativeData';
import RepresentativeDetails from './components/RepresentativeDetails';
import ContractData from './components/ContractData';
import CustomerDetails from './components/CustomerDetails';
import Products from './pages/Products';
import ProductData from './components/ProductData.jsx';

function App() {
  return (
    <Router>
      <div className="App flex">
        <Sidebar />
        <div className="flex-grow ml-[300px]">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/customer" element={<Customers isUpdate={false} />} />
            <Route path="/customer/edit/:id" element={<Customers isUpdate={true} />} />
            <Route path="/representative" element={<Representative isUpdate={false} />} />
            <Route path="/representative/edit/:id" element={<Representative isUpdate={true} />} />
            <Route path="/contract" element={<Contract isUpdate={false} />} />
            <Route path="/contract/edit/:id" element={<Contract isUpdate={true} />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path='/500' element={<P500 />} />
            <Route path='/customer/show' element={<CustomerData />} />
            <Route path='/representative/show' element={<RepresentativeData />} />
            <Route path='/representative/:id' element={<RepresentativeDetails />} />
            <Route path='/contract/show' element={<ContractData />} />
            <Route path='/customer/:id' element={<CustomerDetails />} />
            <Route path='/product' element={<Products isUpdate={false} />} />
            <Route path='/product/edit/:id' element={<Products isUpdate={true} />} />
            <Route path='/product/show' element={<ProductData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

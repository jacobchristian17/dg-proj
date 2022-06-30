import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginSection from './LoginSection';
import FooterSection from './FooterSection';
import RegisterSection from './RegisterSection';
import RequireAuth from './RequireAuth';
import HomeSection from './HomeSection';
import Layout from './Layout';
import Unauthorized from './Unauthorized';
import AdminSection from './AdminSection';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/login' element={<LoginSection />} />
          <Route path='/signup' element={<RegisterSection />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* public routes */}
          <Route element={<RequireAuth allowedRoles={[1001, 2001, 2000]} />}>
            <Route path='/' element={<HomeSection />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1001]} />}>
            <Route path='/admin' element={<AdminSection />} />
          </Route>

          {/* 404 -- catch all */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Route>
      </Routes>
      <FooterSection />
    </>
  );
}

export default App;


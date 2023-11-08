import React, { Fragment } from 'react';
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";

import Register from '../Auth/Register';
import Signin from "../Auth/Signin";
import Forget from "../Auth/Forget";

import Home from '../Components/Home'

import AppLayout from '../Layout/Layout';
import UsersProfileContain from '../Components/UsersProfile';
import Password from '../Components/Password';
import Add from '../Components/Dealership/Add';
import View from '../Components/Dealership/View';


// setup fake backend

const Routers = () => {


  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
      
        <Route  path={'/'} element={<Signin />} />
          <Route  path={'/login'} element={<Signin />} />
          <Route  path={'/forget'} element={<Forget />} />
          <Route  path={'/register'} element={<Register />} />
         
          <Fragment >
          <Route element={<AppLayout />} >
         
          <Route  path={'/profile'} element={<UsersProfileContain />} />
          <Route  path={'/password'} element={<Password />} />
          <Route  path={'/home'} element={<Home />} />

          <Route  path={'/add_dealer'} element={<Add />} />
          <Route  path={'/view_dealer'} element={<View/>} />

          </Route>
          </Fragment>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;

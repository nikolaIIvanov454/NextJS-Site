'use client'

import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Products from './home_components/PoductList';

import withAuth from '../components/ProtectComponent';

function HomeComponent() {
  return (
    <div>
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}

export default withAuth(HomeComponent);

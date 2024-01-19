import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Products from './home_components/PoductList';

function HomeComponent() {
    return (
        <div>
            <Navbar />
            <Products />
            <Footer />
        </div>
    )
}

export default HomeComponent;
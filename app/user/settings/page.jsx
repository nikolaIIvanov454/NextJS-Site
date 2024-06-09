import React from 'react';

import Navbar from '@/client/components/Navbar';
import SettingsPage from '@/client/components/user/SettingsComponent';

function page() {
  return (
    <>
      <Navbar />
      <SettingsPage />
    </>
  );
}

export default page;

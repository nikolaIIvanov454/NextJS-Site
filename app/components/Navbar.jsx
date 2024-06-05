'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { signOut, useSession } from 'next-auth/react';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

function NavbarComponent() {
  const location = usePathname();

  const { data } = useSession();

  const [image, setImage] = useState(data?.user?.image || null);

  // let loadAvatar = async () => {
  //   const request = await fetch("/api/load-avatar", {
  //     method: "GET"
  //   });

  //   const response = await request.json();

  //   setImage(response.avatar);
  // }

  useEffect(() => {
    let loadAvatar = async () => {
      const request = await fetch("/api/load-avatar", {
        method: "GET"
      });

      const response = await request.json();

      setImage(response.avatar);
    }

    loadAvatar();
  }, []);  

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='/home'>
        <img
          src='https://flowbite.com/docs/images/logo.svg'
          className='mr-3 h-6 sm:h-9'
          alt='Xmax Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          SPL Addicts
        </span>
      </Navbar.Brand>
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt='User settings'
              img={
                data?.user
                  ? image
                  : 'https://ui-avatars.com/api/?name=notsigned'
              }
              rounded
            />
          }>
          <Dropdown.Header>
            <span className='block text-sm'>
              {data?.user ? data.user.name : 'Not Signed In'}
            </span>
            <span className='block truncate text-sm font-medium'>
              {data?.user ? data.user.email : ''}
            </span>
          </Dropdown.Header>
          {data?.user ? (
            <>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item href='/user/settings'>
              {location === '/user/settings' ? <div className='p-1.5 pr-20 rounded bg-blue-400'>Settings</div> : 'Settings'}
              </Dropdown.Item>
              <Dropdown.Item>Money</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => { signOut({ callbackUrl: "/login" }) }}>Sign out</Dropdown.Item>
            </>
          ) : (
            ''
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href='/home'
          className={`nav-link ${location === '/home' ? 'text-blue-700 md:hover:text-blue-400' : 'md:hover:text-blue-400'}`}>
          Home
        </Navbar.Link>
        <Navbar.Link
          href='/login'
          className={`nav-link ${
            location === '/login' ? 'text-blue-700 md:hover:text-blue-400' : 'md:hover:text-blue-400'
          }`}>
          Login
        </Navbar.Link>
        <Navbar.Link
          href='/register'
          className={`nav-link ${
            location === '/register' ? 'text-blue-700 md:hover:text-blue-400' : 'md:hover:text-blue-400'
          }`}>
          Register
        </Navbar.Link>
        <Navbar.Link
          href='/about-us'
          className={`nav-link ${
            location === '/about-us' ? 'text-blue-700 md:hover:text-blue-400' : 'md:hover:text-blue-400'
          }`}>
          About Us
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;

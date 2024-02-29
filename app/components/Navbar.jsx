'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import { useUser } from '@auth0/nextjs-auth0/client';

function NavbarComponent() {
  const location = usePathname();

  const { user, error, isLoading } = useUser();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='/home'>
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Xmax Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SPL Addicts</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={ user ? user.picture : "https://ui-avatars.com/api/?name=BassAddict" } rounded />
          }>
          <Dropdown.Header>
            <span className="block text-sm">{ user ? user.nickname : "BassAddict" }</span>
            <span className="block truncate text-sm font-medium">{ user ? user.email : "bass_addict@gmail.com" }</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item href="/api/auth/logout">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/home" className={`nav-link ${location === '/home' ? 'text-cyan-700' : ''}`}>Home</Navbar.Link>
        <Navbar.Link href="/login" className={`nav-link ${location === '/login' ? 'text-cyan-700' : ''}`}>Login</Navbar.Link>
        <Navbar.Link href="/register" className={`nav-link ${location === '/register' ? 'text-cyan-700' : ''}`}>Register</Navbar.Link>
        <Navbar.Link href="/about-us" className={`nav-link ${location === '/about-us' ? 'text-cyan-700' : ''}`}>About Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
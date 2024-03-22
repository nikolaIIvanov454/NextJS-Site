'use client';

import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function LoginFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event: FormEvent) => {
    event.preventDefault();

    signIn('credentials', { email: email, password: password, redirect: false});
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}>
        <form className='flex max-w-md flex-col gap-4'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='email1' value='Your email' />
            </div>
            <TextInput
              id='email1'
              type='email'
              onChange={(event) => setEmail(event.target.value)}
              placeholder='name@flowbite.com'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='password1' value='Your password' />
            </div>
            <TextInput
              id='password1'
              type='password'
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className='flex items-center gap-2'>
            <Checkbox id='remember' />
            <Label htmlFor='remember'>Remember me</Label>
          </div>
          <Button type='submit' onClick={login}>
            Submit
          </Button>
          <Button onClick={() => signIn('google')}>Login with Google</Button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginFormComponent;

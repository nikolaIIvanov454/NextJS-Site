'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import { useRouter } from 'next/navigation.js';

function LoginFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberCheckbox, setRememberCheckbox] = useState('');
  const [error, setError] = useState('');

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    document.cookie = `jwtToken=${session?.user.accessToken}; Secure; HttpOnly; SameSite=Strict`;
  });

  const login = async (event: FormEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      email: email,
      password: password,
      username: email.split('@')[0],
      remember: rememberCheckbox,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
    }

    router.replace('/home');
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
            {error && error}
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
            <Checkbox id='remember' onChange={(event) => setRememberCheckbox(event.target.value)} />
            <Label htmlFor='remember'>Remember me</Label>
          </div>
          <Button type='submit' className='bg-blue-700 enabled:hover:bg-blue-800' onClick={login}>
            Submit
          </Button>
          <Button className='bg-blue-700 enabled:hover:bg-blue-800' onClick={() => signIn('google')}>Login with Google</Button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginFormComponent;

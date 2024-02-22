'use client'

import React, { useState } from 'react';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function RegisterFormComponent() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerNewAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  return (
    <div>
      <Navbar />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput id="email2" type="email" onChange={(event) => setEmail(event.target.value)} placeholder="name@flowbite.com" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput id="password2" onChange={(event) => setPassword(event.target.value)} type="password" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput id="repeat-password" type="password" required shadow />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </a>
          </Label>
        </div>
        <Button onClick={registerNewAccount} type="submit">Register new account</Button>
      </form>
    </div>

    <Footer />
    </div>
  );
}

export default RegisterFormComponent;

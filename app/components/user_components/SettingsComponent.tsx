'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from 'flowbite-react';

function SettingsComponent() {
  const { data } = useSession();

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);

  const username = data.user.name;
  const email = data.user.email;
  const image = data.user.image;

  return (
    <div className='flex justify-center items-center h-96'>
      <div className='bg-gray-200 md:w-1/4 p-4 text-center'>
        <div className='flex justify-center mb-8'>
          {data?.user && data.user.image ? (
            <img
              className='w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500'
              src={image}
              alt='User avatar'
            />
          ) : (
            <div className='relative w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500 overflow-hidden'>
              <svg
                className='absolute w-auto h-auto text-gray-400 -bottom-2'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
        </div>
        <div className='mb-6'>
          <label
            htmlFor='success'
            className='block mb-2 text-sm font-medium text-blue-700 dark:text-blue-500'>
            Username:
          </label>
          <input
            type='text'
            id='success'
            className='border border-blue-500 text-blue-900 dark:text-blue-400 placeholder-blue-700 dark:placeholder-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-500'
            placeholder='Username'
            value={data?.user.name && data.user.name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor='error'
            className='block mb-2 text-sm font-medium text-red-700 dark:text-red-500'>
            Your email:
          </label>
          <input
            type='text'
            id='error'
            className='bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            placeholder='Error input'
            value={data?.user.email && data.user.email}
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
          <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
            <span className='font-medium'>Oh, snapp!</span> Some error message.
          </p>
          <div className='flex justify-center mt-6'>
            <Button size='md' isProcessing={loading} color='blue' onClick={() => {
              setLoading(true);
            }}>
              Change info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsComponent;

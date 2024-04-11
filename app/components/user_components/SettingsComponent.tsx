'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

function SettingsComponent() {
  const { data } = useSession();

  const username = data.user.name;
  const email = data.user.email;
  const image = data.user.image;

  return (
    <div className='flex justify-center items-center h-96'>
      <div className='bg-gray-200 md:w-1/4 p-4 text-center'>
        <div className='flex justify-center'>
          <img
            className='w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500'
            src={
              data?.user ? image : 'https://ui-avatars.com/api/?name=BassAddict'
            }
            alt='Bordered avatar'></img>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='success'
            className='block mb-2 text-sm font-medium text-blue-700 dark:text-blue-500'>
            Your name
          </label>
          <input
            type='text'
            id='success'
            className='border border-blue-500 text-blue-900 dark:text-blue-400 placeholder-blue-700 dark:placeholder-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-500'
            placeholder='Username'
          />
        </div>
        <div>
          <label
            htmlFor='error'
            className='block mb-2 text-sm font-medium text-red-700 dark:text-red-500'>
            Your name
          </label>
          <input
            type='text'
            id='error'
            className='bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            placeholder='Error input'
          />
          <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
            <span className='font-medium'>Oh, snapp!</span> Some error message.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsComponent;

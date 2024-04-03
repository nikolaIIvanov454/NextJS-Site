'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === 'authenticated') {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    });

    return status === 'unauthenticated' ? '' : <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

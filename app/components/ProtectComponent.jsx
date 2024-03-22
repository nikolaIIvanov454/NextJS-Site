import LoginPage from '../components/LoginForm';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = async (props) => {
    const router = useRouter();
    const { session } = useSession();
    // const defaultSession = await getServerSession();

    useEffect(() => {
      router.replace('/login');
    }, []);

    if (!session) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

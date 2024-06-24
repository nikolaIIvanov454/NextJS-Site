import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { status } = useSession();
    const router = useRouter();

    return status === "unauthenticated" ? router.push("/login") : (
      <WrappedComponent {...props} />
    );
  };

  return Wrapper;
};

export default withAuth;

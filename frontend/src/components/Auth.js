import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/User';

export default function Auth({ children }) {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push('/');
    } else if (user) {
      setIsLoading(false);
    }
  }, [user]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full fixed top-0 left-0 z-40 bg-white">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return [children];
}

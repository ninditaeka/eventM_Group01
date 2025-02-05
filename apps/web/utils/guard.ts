import { useRouter } from 'next/navigation';

const guard = function (expectedRole: string, existingRole: string) {
  const router = useRouter();
  if (existingRole == expectedRole) {
  } else {
    alert('you are not allowed to this page');
    router.push('/');
  }
};

export default guard;

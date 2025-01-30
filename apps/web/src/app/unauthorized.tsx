import Image from 'next/image';
import Login from './login/page';
import imageUnauthorized from '../../public/401-unauthorized.jpg';

export default function UnauthorizedPage() {
  return (
    <main>
      <Image
        src={imageUnauthorized}
        alt="404 Not Found"
        className="w-64 mx-auto mb-2"
        width={718}
        height={404}
      />
      <h1 className="text-4xl font-extrabold text-red-500 mb-2">
        Authorization required
      </h1>
      <Login />
    </main>
  );
}

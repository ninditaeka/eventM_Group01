import Image from 'next/image';
// import Login from '../login/page';
import imageUnauthorized from '../../../public/401-unauthorized.jpg';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <Image
        src={imageUnauthorized}
        alt="unauthorized"
        className="w-64 mx-auto mb-2"
        width={718}
        height={404}
      />
      <h1 className="text-3xl font-extrabold text-red-500 mb-4">
        Authorization required
      </h1>
      <Link href="/">
        <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow-md hover:bg-red-600 transition">
          Back to Home
        </button>
      </Link>
    </main>
  );
}

import Link from 'next/link';
import image404 from '../../public/not-found.png';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <Image
        src={image404}
        alt="404 Not Found"
        className="w-64 mx-auto mb-2"
        width={718}
        height={404}
      />
      <h1 className="text-4xl font-extrabold text-red-500 mb-2">404 Error.</h1>
      <p className="text-gray-600 mb-6">
        We can’t find the page that you’re looking for
      </p>
      <Link href="/">
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

import Link from 'next/link';

export const Header = () => {
  return (
    <div className="w-full p-4 px-5 md:px-10 flex items-center justify-between h-16 bg-white shadow-md fixed">
      <h3 className="font-mono text-pink-600 font-extrabold text-2xl ">
        EventBuzz
      </h3>
      <nav
        className="w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden sm:flex
      fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50"
      >
        <Link
          href="/"
          className="mx-2 hover:scale-110 transition-all ease duration-200"
        >
          Home
        </Link>
        <Link
          href="/categories"
          className="mx-2 hover:scale-110 transition-all ease duration-200"
        >
          Categories
        </Link>
        <Link
          href="/about"
          className="mx-2 hover:scale-110 transition-all ease duration-200"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="mx-2 hover:scale-110 transition-all ease duration-200"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

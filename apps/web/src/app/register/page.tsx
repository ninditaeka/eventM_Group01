'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string().required('Role is required'),
});

export default function Register() {
  return (
    <div className="flex px-2 md:flex-row h-[100vh]">
      <div className="md:px-40 flex-col content-center mx-10 mt-10 w-full lg:w-1/2">
        <h1 className="text-red-400 font-extrabold text-2xl md:text-2xl">
          EventBuzz
        </h1>
        <h1 className="text-black md:mt-6 mt-4 text-4xl font-extrabold md:text-4xl">
          Register
        </h1>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-auto mt-10">
              <div className="mb-5">
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  placeholder="First Name"
                />
                {errors.firstName && touched.firstName && (
                  <div className="text-red-500 text-sm">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-5">
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  placeholder="Last Name"
                />
                {errors.lastName && touched.lastName && (
                  <div className="text-red-500 text-sm">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-5">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="mb-5">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <div className="mb-5">
                <Field
                  type="text"
                  id="role"
                  name="role"
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  placeholder="Role"
                />
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 md:mt-4  md:mb-8  mb-2 text-base ">
          Have an account?
          <Link
            className="mt-6 md:ml-2 md:mt-8 text-base font-extrabold text-red-400 hover:underline"
            href={'/login'}
          >
            Log in
          </Link>
        </div>
      </div>
      <div className="hidden md:flex flex-row md:w-1/2 md:justify-end">
        <Image
          className="h-full w-full object-center object-cover rounded-lg shadow-xl dark:shadow-gray-800"
          width={718}
          height={404}
          src="/register.jpg"
          alt="register"
        />
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import Link from 'next/link';
// import { Formik, Form, FormikProps, Field } from 'formik';
// import * as Yup from 'yup';

// export default function Register() {
//   return (
//     <div className="flex px-2 md:flex-row h-[100vh]">
//       <div className="md:px-40 flex-col content-center mx-10 mt-10 w-full lg:w-1/2">
//         <h1 className="text-red-400 font-extrabold text-2xl md:text-2xl">
//           EventBuzz
//         </h1>
//         <h1 className="text-black md:mt-6 mt-4 text-4xl font-extrabold md:text-4xl">
//           Register
//         </h1>

//         <form className="w-auto mt-10 ">
//           <div className="mb-5">
//             <input
//               type="firstName"
//               id="firstName"
//               className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//               placeholder="First Name"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <input
//               type="lastName"
//               id="lastName"
//               className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//               placeholder="Last Name"
//               required
//             />
//           </div>

//           <div className="mb-5">
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <input
//               type="password"
//               id="password"
//               className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <input
//               type="role"
//               id="role"
//               className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//               placeholder="Role"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//           >
//             Submit
//           </button>
//         </form>

//         <div className="mt-4 md:mt-4  md:mb-8  mb-2 text-base ">
//           Have account?
//           <Link
//             className="mt-6 md:mt-8 text-base font-extrabold text-red-400  hover:underline"
//             href={'/login'}
//           >
//             {' '}
//             Log in
//           </Link>
//         </div>
//       </div>
//       <div className=" hidden md:flex flex-row md:w-1/2 md:justify-end">
//         <Image
//           className="h-full w-full object-center object-cover rounded-lg shadow-xl dark:shadow-gray-800"
//           width={718}
//           height={404}
//           src="/register.jpg"
//           alt="register"
//         />
//       </div>
//     </div>
//   );
// }

'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { values } from 'cypress/types/lodash';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

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
  const router = useRouter();
  const [error, setError] = useState('');
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        Cookies.set('token', data.data.token, { expires: 1 });
        toast.success('Registrasi berhasil! Silakan pilih minat Anda.');
        router.push('/interest');
      } else {
        const errorMessage =
          data.message || 'Terjadi kesalahan saat registrasi.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        );
        toast.error(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        );
      } else {
        setError(
          'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.',
        );
        toast.error(
          'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

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

              {/* <div className="mb-5">
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
              </div> */}

              <div className="mb-5">
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className={`bg-gray-50 border ${errors.role && touched.role ? 'border-red-500' : ' border-black '} text-gray-900  placeholder-gray-400 text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="Participant" label="Participant">
                    Participant
                  </option>
                  <option value="Event Organizer" label="Event Organizer">
                    Event Organizer
                  </option>
                </Field>
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm mt-1">{errors.role}</div>
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

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object({
//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
//   role: Yup.string().required('Role is required'),
// });

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

//         <Formik
//           initialValues={{
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             role: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log(values);
//           }}
//         >
//           {({ errors, touched }) => (
//             <Form className="w-auto mt-10">
//               <div className="mb-5">
//                 <Field
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//                   placeholder="First Name"
//                 />
//                 {errors.firstName && touched.firstName && (
//                   <div className="text-red-500 text-sm">{errors.firstName}</div>
//                 )}
//               </div>

//               <div className="mb-5">
//                 <Field
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//                   placeholder="Last Name"
//                 />
//                 {errors.lastName && touched.lastName && (
//                   <div className="text-red-500 text-sm">{errors.lastName}</div>
//                 )}
//               </div>

//               <div className="mb-5">
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//                   placeholder="Email"
//                 />
//                 {errors.email && touched.email && (
//                   <div className="text-red-500 text-sm">{errors.email}</div>
//                 )}
//               </div>

//               <div className="mb-5">
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//                   placeholder="Password"
//                 />
//                 {errors.password && touched.password && (
//                   <div className="text-red-500 text-sm">{errors.password}</div>
//                 )}
//               </div>

//               <div className="mb-5">
//                 <Field
//                   type="text"
//                   id="role"
//                   name="role"
//                   className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
//                   placeholder="Role"
//                 />
//                 {errors.role && touched.role && (
//                   <div className="text-red-500 text-sm">{errors.role}</div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//               >
//                 Submit
//               </button>
//             </Form>
//           )}
//         </Formik>

//         <div className="mt-4 md:mt-4  md:mb-8  mb-2 text-base ">
//           Have an account?
//           <Link
//             className="mt-6 md:ml-2 md:mt-8 text-base font-extrabold text-red-400 hover:underline"
//             href={'/login'}
//           >
//             Log in
//           </Link>
//         </div>
//       </div>
//       <div className="hidden md:flex flex-row md:w-1/2 md:justify-end">
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

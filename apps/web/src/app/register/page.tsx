'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { authRegister, checkReferralCode } from '@/services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  referral_code?: string;
}
export default function Register() {
  const router = useRouter();
  const [referralCodeValid, setReferralCodeValid] = useState<boolean | null>(
    null,
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      console.log(values);
      const response = await authRegister(values);
      console.log(response);
      toast.success('Your registration was successful!');
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResponse = (error as any).response?.data;
        if (errorResponse) {
          if (errorResponse.status === 'email already used') {
            toast.error('Email already in use. Please try another one.');
          } else {
            toast.error('Registration failed. Please try again.');
          }
        } else {
          toast.error('An unexpected error occurred: ' + error.message);
        }
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validateReferralCode = async (code: string) => {
    try {
      const data = await checkReferralCode(code);
      if (data.exists) {
        setReferralCodeValid(true);
        toast.success('Referral code is valid!');
      } else {
        setReferralCodeValid(false);
        toast.error('Referral code is invalid.');
      }
    } catch (error) {
      console.error('Error checking referral code:', error);
      setReferralCodeValid(false);
      toast.error('Error checking referral code.');
    }
  };

  return (
    <div>
      <ToastContainer />
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
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              role: '',
              referral_code: '',
            }}
            validationSchema={Yup.object({
              first_name: Yup.string().required('First Name is required'),
              last_name: Yup.string().required('Last Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              role: Yup.string().required('Role is required'),
              // referralCode: Yup.string().when('role', (role: any, schema) => {
              //   console.log(role);
              //   return role[0] === 'Participant'
              //     ? schema.required('Referral Code is required')
              //     : schema;
              // }),
            })}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="w-auto mt-10">
                <div className="mb-5">
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                    placeholder="First Name"
                  />
                  {errors.first_name && touched.first_name && (
                    <div className="text-red-500 text-sm">
                      {errors.first_name}
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                    placeholder="Last Name"
                  />
                  {errors.last_name && touched.last_name && (
                    <div className="text-red-500 text-sm">
                      {errors.last_name}
                    </div>
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
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

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
                    <div className="text-red-500 text-sm mt-1">
                      {errors.role}
                    </div>
                  )}
                </div>

                {/* <input
      
                        className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border ${
                          values.role === 'Event Organizer'
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'bg-gray-50'
                        } border-gray-800 rounded-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Put Refferal Code Here"
                        disabled={values.role === 'Event Organizer'}
                        required={values.role === 'Participant'}
                        type="string"
                        {...field}
                      /> */}

                <div className="mb-5">
                  <Field type="text" name="referral_code" id="referral_code">
                    {({ field, form: { touched, errors } }: FieldProps) => (
                      <div className="flex items-center">
                        <input
                          className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border ${
                            values.role === 'Event Organizer'
                              ? 'bg-gray-200 cursor-not-allowed'
                              : 'bg-gray-50'
                          } border-gray-800 rounded-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder="Put Referral Code Here"
                          disabled={values.role === 'Event Organizer'}
                          type="text"
                          {...field}
                        />
                        <button
                          type="button" // Specify the button type
                          className={`ml-2 p-2 text-white rounded-md text-sm ${
                            values.role === 'Event Organizer'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-yellow-300 hover:bg-yellow-600'
                          }`}
                          disabled={values.role === 'Event Organizer'} // Disable button if role is 'Event Organizer'
                          onClick={() => validateReferralCode(field.value)}
                        >
                          Used
                        </button>

                        {errors.referral_code && touched.referral_code && (
                          <div className="text-red-500 text-sm">
                            {errors.referral_code as string}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
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

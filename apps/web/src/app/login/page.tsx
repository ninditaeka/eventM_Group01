'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { authLogin } from '@/services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface FormLogInValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const handleSubmitLogin = async (
    values: FormLogInValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const response = await authLogin(values);
      console.log(response);
      toast.success('Log in successful!');
      // revalidatePath('/')
      // redirect('/');
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResponse = (error as any).response?.data;
        if (errorResponse) {
          if (errorResponse.status === 'email already used') {
            toast.error('Email already in use. Please try another one.');
          } else {
            toast.error('Log in failed. Please try again.');
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

  return (
    <div>
      <ToastContainer />
      <div className="flex px-2 flex-col md:flex-row h-[100vh]">
        <div className="md:px-40 flex-col content-center px-10 mt-10 lg:w-1/2">
          <h1 className="text-red-400 font-extrabold text-2xl md:text-2xl">
            EventBuzz
          </h1>
          <h1 className="text-black md:mt-10 mt-6 text-4xl font-extrabold md:text-4xl">
            Log in
          </h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-auto mt-10 ">
                <div className="mb-5">
                  <Field
                    type="email"
                    id="email"
                    name="email" // Ensure Field has a name attribute to match initialValues
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
                    name="password" // Ensure Field has a name attribute to match initialValues
                    placeholder="Password"
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-sm focus:ring-red-400 focus:border-red-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-600 dark:focus:border-pink-600"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleSubmitLogin;
                  }}
                  type="submit"
                  className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  Log in
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 md:mt-4  md:mb-8  mb-2 text-base ">
            Don't have an account?
            <Link
              className="mt-6 md:mt-8 text-base font-extrabold text-red-400 hover:underline"
              href={'/register'}
            >
              {' '}
              Register
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-row md:w-1/2 md:justify-end">
          <Image
            className="h-full w-full object-center object-cover rounded-lg shadow-xl dark:shadow-gray-800"
            width={718}
            height={404}
            src="/logIn.jpg"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}

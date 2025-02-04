'use client';

import Link from 'next/link';
import { Datepicker } from 'flowbite-react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useEffect, useState } from 'react';
import { createEventProcess } from '@/services/event';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { getLoginCookie } from '../../../../utils/cookies';
import UnauthorizedPage from '@/app/unauthorized/page';

interface FormCreateEvent {
  event_title: string;
  location: string;
  description: string;
  event_type: string;
  total_transaction_discount: number;
  total_seat: number;
  category: string;
  price: number;
  event_image: string;
  event_date: string;
  event_time: string;
}

const validationSchema = Yup.object({
  event_title: Yup.string().required('Event title is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  event_type: Yup.string()
    .required('Event type is required')
    .oneOf(['Paid', 'Free'], 'Invalid event type'),
  total_transaction_discount: Yup.number().required(
    'Total transaction discount is required',
  ),
  total_seat: Yup.number().required('Total seat is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().min(0, 'more than').required('Price is required'),
  event_image: Yup.string().required('Image is required'),
  event_date: Yup.string()
    // .min(new Date(), 'Expiration date must be greater than today')
    .required('Date is required'),
  // event_time: Yup.date().required('Time is required'),
  // total_seat: Yup.string().required('Total seat is required'),
  event_time: Yup.string().required('end time cannot be empty'),
  // .test('is-greater', 'end time should be greater', function (value) {
  //   const { start } = this.parent;
  //   return moment(value, 'HH:mm').isSameOrAfter(moment(start, 'HH:mm'));
  // }),
});

export default function CreateEvent() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });

  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 7));

  const initialTime = '12:00';

  const handleSubmitCreateEvent = async (
    values: FormCreateEvent,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      console.log(values);

      const response = await createEventProcess(values);

      console.log('response', response);
      toast.success('Create event successful!');
      router.push('/dashboard/event-list');
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        const errorResponse = (error as any).response?.data;
        if (errorResponse) {
          if (errorResponse.status === 'Event title already used') {
            toast.error('Event title already in use. Please try another one.');
          } else {
            toast.error('Event create failed. Please try again.');
          }
        } else {
          toast.error('An unexpected error occurred: ' + error.message);
        }
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = getLoginCookie();
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      console.log('my.name:' + jwt.name);

      setUser({
        email: jwt.email,
        name: jwt.name,
        role: jwt.role,
      });
      const existingRole = jwt.role;
      const authorized = guard('event_organizer', existingRole);
      setIsAuthorized(authorized);
    } else {
      router.push('/');
    }
  }, [router]);
  const guard = function (expectedRole: string, existingRole: string) {
    return existingRole === expectedRole; // Return true if authorized, false otherwise
  };

  // If not authorized, render the UnauthorizedPage
  if (!isAuthorized) {
    return <UnauthorizedPage />;
  }

  return (
    <div>
      <NavbarDashboard name={user.name} />
      <SideBarDashboard role={user.role} />
      <ToastContainer />
      <div className="p-4 sm:ml-64">
        <div className="flex items-center mt-20 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Event Form
          </h3>
        </div>
        <Formik
          initialValues={{
            event_title: '', // Ensure this is an empty string, not an object
            location: '',
            total_transaction_discount: 0,
            total_seat: 0,
            price: 0,
            description: '',
            event_type: '',
            category: '',
            event_image: '',
            event_date: new Date().toDateString(),
            event_time: '', // Set the default time
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitCreateEvent}
        >
          {({ errors, touched, values, setFieldValue, handleSubmit }) => (
            <Form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="event_title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Title
                  </label>
                  <Field
                    type="text"
                    name="event_title"
                    id="event_title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Event title"
                    required={true}
                  />
                  {errors.event_title && touched.event_title && (
                    <div className="text-red-500 text-sm">
                      {errors.event_title}
                    </div>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex text-sm items-center ps-3 pointer-events-none">
                      IDR
                    </div>
                    <Field type="number" name="price" id="price">
                      {({ field, form: { touched, errors } }: FieldProps) => (
                        <div>
                          <input
                            min={0}
                            className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border ${
                              values.event_type === 'Free'
                                ? 'bg-gray-200 cursor-not-allowed'
                                : 'bg-gray-50'
                            } border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="800.000"
                            // value={price}
                            // onChange={handlePriceChange}
                            disabled={values.event_type === 'Free'}
                            required={values.event_type === 'Paid'}
                            type="number"
                            {...field}
                          />
                          {errors.price && touched.price && (
                            <div className="text-red-500 text-sm">
                              {errors.price as string}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="event_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Type
                  </label>
                  <Field
                    as="select"
                    id="event_type"
                    name="event_type"
                    className={`bg-gray-50 border ${errors.event_type && touched.event_type ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option value="Paid" label="Paid">
                      Paid
                    </option>
                    <option value="Free" label="Free">
                      Free
                    </option>
                  </Field>
                  {errors.event_type && touched.event_type && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.event_type}
                    </div>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <Field
                    type="text"
                    name="location"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Jakarta"
                    required={true}
                  />
                  {errors.location && touched.location && (
                    <div className="text-red-500 text-sm">
                      {errors.location}
                    </div>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className={`bg-gray-50 border ${errors.category && touched.category ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Sport" label="Sport">
                      Sport
                    </option>
                    <option value="Conference" label="Conference">
                      Conference
                    </option>
                    <option value="Festival" label="Festival">
                      Festival
                    </option>
                    <option value="Concert" label="Concert">
                      Concert
                    </option>
                    <option value="Food & Drink" label="Food & Drink">
                      Food and Drink
                    </option>
                  </Field>
                  {errors.category && touched.category && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </div>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="total_transaction_discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Transaction Discount
                  </label>
                  <Field
                    type="number"
                    name="total_transaction_discount"
                    id="total_transaction_discount"
                  >
                    {({ field, form: { touched, errors } }: FieldProps) => (
                      <div>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="10"
                          required={true}
                          type="number"
                          min={0}
                          {...field}
                        />

                        {errors.total_transaction_discount &&
                          touched.total_transaction_discount && (
                            <div className="text-red-500 text-sm">
                              {errors.total_transaction_discount as string}
                            </div>
                          )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="total_transaction_discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Seat
                  </label>
                  <Field
                    type="number"
                    min={0}
                    name="total_seat"
                    id="total_seat"
                  >
                    {({ field, form: { touched, errors } }: FieldProps) => (
                      <div>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="10"
                          required={true}
                          type="number"
                          min={0}
                          {...field}
                        />

                        {errors.total_seat && touched.total_seat && (
                          <div className="text-red-500 text-sm">
                            {errors.total_seat as string}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <form className="max-w-l mx-auto">
                    <label
                      className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="event_image"
                    >
                      Add Image
                    </label>

                    <Field name="event_image" id="event_image" type="file">
                      {({ field, form }: FieldProps) => (
                        <div>
                          <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="event_image"
                            placeholder="upload image here"
                            type="file"
                            onChange={async (event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                const maxSize = 2 * 1024 * 1024;

                                if (file.size > maxSize) {
                                  alert('File size must be 2MB or less');
                                  return;
                                }
                                const base64 = await convertToBase64(file);
                                // console.log(base64);
                                const fileImage = base64.split(',')[1];
                                // console.log(fileImage);
                                // setBase64String(base64);
                                form.setFieldValue('event_image', fileImage);
                              }
                            }}
                            // {...field}
                          />
                          {form.errors.event_image &&
                            form.touched.event_image && (
                              <div className="text-red-500 text-sm">
                                {errors.event_image as string}
                              </div>
                            )}
                        </div>
                      )}
                    </Field>

                    {/* {errors.image && touched.image && (
                      <div className="text-red-500 text-sm">
                        {errors.image as string}
                      </div>
                    )} */}
                  </form>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="event_date"
                  >
                    Select Date
                  </label>
                  <Datepicker
                    id="event_date"
                    name="event_date"
                    // value={selectedDate ? selectedDate : undefined}
                    value={
                      typeof values.event_date === 'string'
                        ? new Date(values.event_date) // Convert string to Date
                        : values.event_date // Pass Date object directly
                    }
                    onChange={(date) => {
                      // Check and set valid Date object
                      if (date instanceof Date && !isNaN(date.getTime())) {
                        setFieldValue('event_date', date.toString());
                      } else {
                        setFieldValue('event_date', null);
                      }
                    }}
                    minDate={minDate} // Disable dates before 7 days from today
                  />

                  {errors.event_date && touched.event_date && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.event_date}
                    </div>
                  )}
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="date"
                  >
                    please select a date plus a week from today, input +7 days
                    from today
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <form className="max-w-l mx-auto">
                    <label
                      htmlFor="time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select time:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <Field
                        type="time"
                        format="h:mm a"
                        id="event_time"
                        name="event_time"
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="07:00"
                        max="23:00"
                        required
                      />

                      {errors.event_time && touched.event_time && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.event_time}
                        </div>
                      )}
                    </div>
                  </form>
                </div>

                {/* <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write event description here"
                  ></textarea>
                </div> */}

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                      errors.description && touched.description
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="Write event description here"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  handleSubmitCreateEvent;
                }}
                type="submit"
                className="text-white inline-flex items-center bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-double focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Create new event
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

// 'use client';

// import Link from 'next/link';
// import { Datepicker } from 'flowbite-react';
// import { useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { time } from 'console';

// export default function CreateEvent() {
//   const [eventType, setEventType] = useState('');
//   const [price, setPrice] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleEventTypeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setEventType(event.target.value);
//     if (event.target.value === 'Free') {
//       setPrice('');
//     }
//   };

//   const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPrice(event.target.value);
//   };

//   const today = new Date();
//   today.setDate(today.getDate() + 7);
//   const minDate = today;

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

//   const validationSchema = Yup.object({
//     event_title: Yup.string().required('Event title is required'),
//     location: Yup.string().required('Location is required'),
//     total_transaction_discount: Yup.number().required(
//       'Total transaction discount is required',
//     ),
//     total_seat: Yup.string().required('Total seat is required'),
//   });

//   return (
//     <div>
//       <nav className="fixed top-0 z-50 w-full bg-rose-400 border-b border-gray-200 dark:bg-pink-600 ">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <button
//                 data-drawer-target="logo-sidebar"
//                 data-drawer-toggle="logo-sidebar"
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-rose-700 dark:focus:ring-rose-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   ></path>
//                 </svg>
//               </button>
//               <a href="/" className="flex ms-2 md:me-24">
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white dark:text-white">
//                   EventBuzz
//                 </span>
//               </a>
//             </div>
//             <div className="flex items-center">
//               <div className="flex items-center ms-3">
//                 <div>
//                   <h1 className="text-white mr-8  font-bold text-xl">
//                     EO Name
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <aside
//         id="logo-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  dark:bg-rose-600 "
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="/dashboard"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ms-3">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/dashboard/event-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 18"
//                 >
//                   <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Event List
//                 </span>
//               </a>
//             </li>
//             <li></li>
//             <li>
//               <a
//                 href="/dashboard/attendat-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Attendant List
//                 </span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                   <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
//               </a>
//             </li>
//             <li>
//               <button className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
//                 <Link href="" className="">
//                   Create Event
//                 </Link>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       <div className="p-4 sm:ml-64">
//         <div className="flex items-center mt-20 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Create Event Form
//           </h3>
//         </div>
//         <Formik
//           initialValues={{
//             event_title: '', // Ensure this is an empty string, not an object
//             location: '',
//             total_transaction_discount: 0,
//             total_seat: 0,
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log(values); // Handle the form submission
//           }}
//         >
//           {({ errors, touched }) => (
//             <Form className="p-4 md:p-5">
//               <div className="grid gap-4 mb-4 grid-cols-2">
//                 <div className="col-span-2">
//                   <label
//                     htmlFor="event_title"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Event Title
//                   </label>
//                   <input
//                     type="text"
//                     name="event_title"
//                     id="event_title"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="Event title"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="price"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Price
//                   </label>

//                   <div className="relative">
//                     <div className="absolute inset-y-0 start-0 flex text-sm items-center ps-3 pointer-events-none">
//                       IDR
//                     </div>
//                     <input
//                       type="number"
//                       id="price"
//                       min={0}
//                       className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border ${
//                         eventType === 'Free'
//                           ? 'bg-gray-200 cursor-not-allowed'
//                           : 'bg-gray-50'
//                       } border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                       placeholder="800.000"
//                       value={price}
//                       onChange={handlePriceChange}
//                       disabled={eventType === 'Free'}
//                       required={eventType === 'Paid'}
//                     />
//                   </div>
//                 </div>

//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="event_type"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Event Type
//                   </label>
//                   <select
//                     id="event_type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     value={eventType}
//                     onChange={handleEventTypeChange}
//                   >
//                     <option value="" disabled>
//                       Select event type
//                     </option>
//                     <option value="Paid">Paid</option>
//                     <option value="Free">Free</option>
//                   </select>
//                 </div>

//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="location"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     id="location"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="Jakarta"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="category"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                   >
//                     <option value="" disabled>
//                       Select category
//                     </option>
//                     <option value="Sport">Sport</option>
//                     <option value="Conference">Conference</option>
//                     <option value="Festival">Festival</option>
//                     <option value="Concert">Concert</option>
//                     <option value="Food and Drink">Food and Drink</option>
//                   </select>
//                 </div>

//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="total_transaction_discount"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Total Transaction Discount
//                   </label>
//                   <input
//                     type="number"
//                     min={0}
//                     name="total_transaction_discount"
//                     id="total_transaction_discount"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="10"
//                     required={true}
//                   />
//                 </div>

//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     htmlFor="total_seat"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Total Seat
//                   </label>
//                   <input
//                     min={0}
//                     type="number"
//                     name="total_seat"
//                     id="total_seat"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     placeholder="100"
//                     required={true}
//                   />
//                 </div>

//                 <div className="col-span-2 sm:col-span-1">
//                   <form className="max-w-l mx-auto">
//                     <label
//                       className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       htmlFor="event_image"
//                     >
//                       Add Image
//                     </label>
//                     <input
//                       className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                       aria-describedby="event_image"
//                       id="event_image"
//                       type="file"
//                     />
//                   </form>
//                 </div>
//                 <div className="col-span-2 sm:col-span-1">
//                   <label
//                     className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     htmlFor="event_image"
//                   >
//                     Select Date
//                   </label>
//                   <Datepicker
//                     value={selectedDate ? selectedDate : undefined}
//                     onChange={handleDateChange}
//                     minDate={minDate}
//                   />
//                   <div
//                     className="mt-1 text-sm text-gray-500 dark:text-gray-300"
//                     id="date"
//                   >
//                     please select a date plus a week from today, input +7 days
//                     from today
//                   </div>
//                 </div>
//                 <div className="col-span-2 sm:col-span-1">
//                   <form className="max-w-l mx-auto">
//                     <label
//                       htmlFor="time"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Select time:
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
//                         <svg
//                           className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                       <input
//                         type="time"
//                         id="time"
//                         className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         min="07:00"
//                         max="23:00"
//                         required
//                       />
//                     </div>
//                   </form>
//                 </div>

//                 <div className="col-span-2">
//                   <label
//                     htmlFor="description"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Event Description
//                   </label>
//                   <textarea
//                     id="description"
//                     rows={4}
//                     className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Write event description here"
//                   ></textarea>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="text-white inline-flex items-center bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-double focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
//               >
//                 <svg
//                   className="me-1 -ms-1 w-5 h-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 Create new event
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { Datepicker } from 'flowbite-react';
// import { useState } from 'react';

// export default function CreateEvent() {
//   const [eventType, setEventType] = useState('');
//   const [price, setPrice] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleEventTypeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setEventType(event.target.value);
//     if (event.target.value === 'Free') {
//       setPrice('');
//     }
//   };

//   const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPrice(event.target.value);
//   };

//   const today = new Date();
//   today.setDate(today.getDate() + 7);
//   const minDate = today;

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };
//   return (
//     <div>
//       <nav className="fixed top-0 z-50 w-full bg-rose-400 border-b border-gray-200 dark:bg-pink-600 ">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <button
//                 data-drawer-target="logo-sidebar"
//                 data-drawer-toggle="logo-sidebar"
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-rose-700 dark:focus:ring-rose-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   ></path>
//                 </svg>
//               </button>
//               <a href="/" className="flex ms-2 md:me-24">
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white dark:text-white">
//                   EventBuzz
//                 </span>
//               </a>
//             </div>
//             <div className="flex items-center">
//               <div className="flex items-center ms-3">
//                 <div>
//                   <h1 className="text-white mr-8  font-bold text-xl">
//                     EO Name
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <aside
//         id="logo-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  dark:bg-rose-600 "
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="/dashboard"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ms-3">Dashboard</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/dashboard/event-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 18"
//                 >
//                   <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Event List
//                 </span>
//               </a>
//             </li>
//             <li></li>
//             <li>
//               <a
//                 href="/dashboard/attendat-list"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Attendant List
//                 </span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                   <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>

//                 <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
//               </a>
//             </li>
//             <li>
//               <button className="text-white bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
//                 <Link href="" className="">
//                   Create Event
//                 </Link>
//               </button>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       <div className="p-4 sm:ml-64">
//         <div className="flex items-center mt-20 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Create Event Form
//           </h3>
//         </div>

//         <form className="p-4 md:p-5">
//           <div className="grid gap-4 mb-4 grid-cols-2">
//             <div className="col-span-2">
//               <label
//                 htmlFor="event_title"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Event Title
//               </label>
//               <input
//                 type="text"
//                 name="event_title"
//                 id="event_title"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="Event title"
//                 required={true}
//               />
//             </div>
//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="price"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Price
//               </label>

//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 flex text-sm items-center ps-3 pointer-events-none">
//                   IDR
//                 </div>
//                 <input
//                   type="number"
//                   id="price"
//                   min={0}
//                   className={`block w-full p-2.5 ps-10 text-sm text-gray-900 border ${
//                     eventType === 'Free'
//                       ? 'bg-gray-200 cursor-not-allowed'
//                       : 'bg-gray-50'
//                   } border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                   placeholder="800.000"
//                   value={price}
//                   onChange={handlePriceChange}
//                   disabled={eventType === 'Free'}
//                   required={eventType === 'Paid'}
//                 />
//               </div>
//             </div>

//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="event_type"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Event Type
//               </label>
//               <select
//                 id="event_type"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 value={eventType}
//                 onChange={handleEventTypeChange}
//               >
//                 <option value="" disabled>
//                   Select event type
//                 </option>
//                 <option value="Paid">Paid</option>
//                 <option value="Free">Free</option>
//               </select>
//             </div>

//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="location"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 id="location"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="Jakarta"
//                 required={true}
//               />
//             </div>
//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="category"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Category
//               </label>
//               <select
//                 id="category"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               >
//                 <option value="" disabled>
//                   Select category
//                 </option>
//                 <option value="Sport">Sport</option>
//                 <option value="Conference">Conference</option>
//                 <option value="Festival">Festival</option>
//                 <option value="Concert">Concert</option>
//                 <option value="Food and Drink">Food and Drink</option>
//               </select>
//             </div>

//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="total_transaction_discount"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Total Transaction Discount
//               </label>
//               <input
//                 type="number"
//                 min={0}
//                 name="total_transaction_discount"
//                 id="total_transaction_discount"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="10"
//                 required={true}
//               />
//             </div>

//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 htmlFor="total_seat"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Total Seat
//               </label>
//               <input
//                 min={0}
//                 type="number"
//                 name="total_seat"
//                 id="total_seat"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="100"
//                 required={true}
//               />
//             </div>

//             <div className="col-span-2 sm:col-span-1">
//               <form className="max-w-l mx-auto">
//                 <label
//                   className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   htmlFor="event_image"
//                 >
//                   Add Image
//                 </label>
//                 <input
//                   className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                   aria-describedby="event_image"
//                   id="event_image"
//                   type="file"
//                 />
//               </form>
//             </div>
//             <div className="col-span-2 sm:col-span-1">
//               <label
//                 className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="event_image"
//               >
//                 Select Date
//               </label>
//               <Datepicker
//                 value={selectedDate ? selectedDate : undefined}
//                 onChange={handleDateChange}
//                 minDate={minDate}
//               />
//               <div
//                 className="mt-1 text-sm text-gray-500 dark:text-gray-300"
//                 id="date"
//               >
//                 please select a date plus a week from today, input +7 days from
//                 today
//               </div>
//             </div>
//             <div className="col-span-2 sm:col-span-1">
//               <form className="max-w-l mx-auto">
//                 <label
//                   htmlFor="time"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Select time:
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
//                     <svg
//                       className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type="time"
//                     id="time"
//                     className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     min="07:00"
//                     max="23:00"
//                     required
//                   />
//                 </div>
//               </form>
//             </div>

//             <div className="col-span-2">
//               <label
//                 htmlFor="description"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Event Description
//               </label>
//               <textarea
//                 id="description"
//                 rows={4}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Write event description here"
//               ></textarea>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="text-white inline-flex items-center bg-rose-400 hover:bg-rose-800 focus:ring-4 focus:outline-double focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
//           >
//             <svg
//               className="me-1 -ms-1 w-5 h-5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             Create new event
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

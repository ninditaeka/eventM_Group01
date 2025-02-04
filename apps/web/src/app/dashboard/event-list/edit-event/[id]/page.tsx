// 'use client';

// import Link from 'next/link';
// import { Datepicker } from 'flowbite-react';
// import { Formik, Form, Field, FieldProps } from 'formik';
// import * as Yup from 'yup';
// import NavbarDashboard from '@/components/NavbarDashboard';
// import SideBarDashboard from '@/components/SideBarDashboar';
// import { useEffect, useState } from 'react';
// import { createEventProcess } from '@/services/event';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { editEventByEO, getDetailDataEvent } from '@/services/event';
// import { useParams, useRouter } from 'next/navigation';
// import { getLoginCookie } from '../../../../../../utils/cookies';

// interface FormCreateEvent {
//   event_title: string;
//   location: string;
//   description: string;
//   event_type: string;
//   total_transaction_discount: number;
//   total_seat: number;
//   category: string;
//   price: number;
//   event_image: string;
//   event_date: string;
//   event_time: string;
// }

// const validationSchema = Yup.object({
//   event_title: Yup.string().required('Event title is required'),
//   location: Yup.string().required('Location is required'),
//   description: Yup.string().required('Description is required'),
//   event_type: Yup.string()
//     .required('Event type is required')
//     .oneOf(['paid', 'free'], 'Invalid event type'),
//   total_transaction_discount: Yup.number().required(
//     'Total transaction discount is required',
//   ),
//   total_seat: Yup.number().required('Total seat is required'),
//   category: Yup.string().required('Category is required'),
//   price: Yup.number().min(0, 'more than').required('Price is required'),
//   event_image: Yup.string().required('Image is required'),
//   event_date: Yup.string().required('Date is required'),
//   event_time: Yup.string().required('end time cannot be empty'),
// });

// export default function EditEvent() {
//   const [initialValues, setInitialValues] = useState({
//     event_title: '',
//     location: '',
//     total_transaction_discount: 0,
//     total_seat: 0,
//     price: 0,
//     description: '',
//     event_type: '',
//     category: '',
//     event_image: '',
//     event_date: new Date().toDateString(),
//     event_time: '',
//   });
//   const [editEvent, setEditEvent] = useState<any>({});
//   const [eventDetail, setEventDetail] = useState<any>({});
//   const params = useParams<{ id: string }>();

//   useEffect(() => {
//     handleGetDetailEvent();
//   }, []);

//   // const handleEditEventbyEo = async ()=>{
//   //   const editEvent = await editEventByEO()
//   //   setEditEvent(editEvent.data)
//   // }
//   // const handleEditEventbyEo = async (
//   //   values: FormCreateEvent,
//   //   { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
//   // ) => {
//   //   try {
//   //     console.log(values);

//   //     const response = await editEventByEO(values);

//   //     // console.log(response);
//   //     toast.success('Create event successful!');
//   //   } catch (error: unknown) {
//   //     console.log(error);
//   //     if (error instanceof Error) {
//   //       const errorResponse = (error as any).response?.data;
//   //       if (errorResponse) {
//   //         if (errorResponse.status === 'Event title already used') {
//   //           toast.error('Event title already in use. Please try another one.');
//   //         } else {
//   //           toast.error('Event edit failed. Please try again.');
//   //         }
//   //       } else {
//   //         toast.error('An unexpected error occurred: ' + error.message);
//   //       }
//   //     } else {
//   //       toast.error('An unknown error occurred.');
//   //     }
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };

//   const handleEditEventbyEo = async (
//     values: typeof initialValues,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
//   ) => {
//     try {
//       // Ensure data is structured correctly before sending
//       const updatedEvent = {
//         ...values,
//         event_date: values.event_date, // Ensure it's in the correct format
//         event_time: values.event_time, // Ensure it's properly formatted
//       };

//       console.log('Submitting updated event:', updatedEvent);

//       const response = await editEventByEO(updatedEvent);

//       if (response && 'status' in response && response.status === 200) {
//         toast.success('Event updated successfully!');
//         router.push('/events'); // Redirect to events list or detail page
//       } else {
//         toast.error('Failed to update event. Please try again.');
//       }
//     } catch (error) {
//       console.log('Edit event error:', error);
//       if (error instanceof Error) {
//         const errorResponse = (error as any).response?.data;
//         if (errorResponse?.status === 'Event title already used') {
//           toast.error('Event title already in use. Please try another one.');
//         } else {
//           toast.error('Event update failed. Please try again.');
//         }
//       } else {
//         toast.error('An unexpected error occurred.');
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // const handleGetDetailEvent = async () => {
//   //   console.log('params=>', params);

//   //   const eventDetail = await getDetailDataEvent(params.id);
//   //   setEventDetail(eventDetail.data);
//   //   setInitialValues({
//   //     ...initialValues,
//   //     event_title: eventDetail?.data?.title,
//   //     description: eventDetail?.data?.description,
//   //     location: eventDetail?.data?.location,
//   //     // event_date: eventDetail?.data?.date,
//   //     event_date: eventDetail?.data.date?.split('T')[0],
//   //     // event_time: eventDetail?.data?.date,
//   //     event_time: eventDetail?.data.date?.split('T')[1].slice(0.5),
//   //     // event_time: '11:00',
//   //     event_type: eventDetail?.data?.event_type,
//   //     price: eventDetail?.data?.price,
//   //     total_seat: eventDetail?.data?.total_seat,
//   //     total_transaction_discount: eventDetail?.data?.total_transaction_discount,
//   //     category: eventDetail?.data?.category,
//   //   });
//   // };
//   const handleGetDetailEvent = async () => {
//     console.log('Fetching event details for:', params.id);

//     const eventDetail = await getDetailDataEvent(params.id);
//     setEventDetail(eventDetail.data);
//     setInitialValues({
//       event_title: eventDetail?.data?.title,
//       description: eventDetail?.data?.description,
//       location: eventDetail?.data?.location,
//       event_date: eventDetail?.data.date?.split('T')[0], // Extract date
//       event_time: eventDetail?.data.date?.split('T')[1]?.slice(0, 5), // Extract time correctly
//       event_type: eventDetail?.data?.event_type,
//       price: eventDetail?.data?.price,
//       total_seat: eventDetail?.data?.total_seat,
//       total_transaction_discount: eventDetail?.data?.total_transaction_discount,
//       category: eventDetail?.data?.category,
//       event_image: eventDetail?.data?.event_image || '', // Ensure an image is set
//     });
//   };

//   console.log(JSON.stringify(eventDetail));
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: '',
//     name: '',
//     role: '',
//   });

//   const today = new Date();
//   const minDate = new Date(today.setDate(today.getDate() + 7));

//   const initialTime = '12:00';

//   const convertToBase64 = (file: File) => {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   useEffect(() => {
//     const token = getLoginCookie();
//     if (token) {
//       const jwt = JSON.parse(atob(token.split('.')[1]));
//       console.log('my.name:' + jwt.name);

//       setUser({
//         email: jwt.email,
//         name: jwt.name,
//         role: jwt.role,
//       });
//       const existingRole = jwt.role;
//       guard('event_organizer', existingRole);
//     } else {
//       alert('you are not allowed to this page');
//       router.push('/');
//     }
//   }, []);
//   const guard = function (expectedRole: string, existingRole: string) {
//     if (existingRole == expectedRole) {
//       console.log('ok');
//     } else {
//       alert('you are not allowed to this page');
//       router.push('/');
//     }
//   };

//   useEffect(() => {
//     console.log('initailvaluse:', initialValues);
//   }, [initialValues]);

'use client';

import Link from 'next/link';
import { Button, Datepicker } from 'flowbite-react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar'; // Fixed typo
import { useEffect, useState } from 'react';
import {
  createEventProcess,
  editEventByEO,
  getDetailDataEvent,
} from '@/services/event'; // Consolidated imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import { getLoginCookie } from '../../../../../../utils/cookies';
import moment from 'moment';

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
  price: Yup.number()
    .min(0, 'Price must be greater than or equal to 0')
    .required('Price is required'),
  event_image: Yup.string().required('Image is required'),
  event_date: Yup.string().required('Date is required'),
  event_time: Yup.string().required('Event time is required'),
});

export default function EditEvent() {
  const [initialValues, setInitialValues] = useState<FormCreateEvent>({
    event_title: '',
    location: '',
    total_transaction_discount: 0,
    total_seat: 0,
    price: 0,
    description: '',
    event_type: '',
    category: '',
    event_image: '',
    event_date: new Date().toISOString().split('T')[0], // Ensure it's in the correct format
    event_time: '',
  });

  const [eventDetail, setEventDetail] = useState<any>({});
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState({ email: '', name: '', role: '' });

  useEffect(() => {
    handleGetDetailEvent();
  }, []);

  const handleEditEventbyEo = async (
    values: FormCreateEvent,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      console.log(values);
      const response = (await editEventByEO(params.id, values)) as any;
      console.log('response:', response);
      if (response?.data?.status === 'success') {
        toast.success('Event updated successfully!');
        router.push('/events');
      } else {
        toast.error('Failed to update event. Please try again.');
      }
    } catch (error) {
      console.error('Edit event error:', error);
      if (error instanceof Error) {
        const errorResponse = (error as any).response?.data;
        if (errorResponse?.status === 'Event title already used') {
          toast.error('Event title already in use. Please try another one.');
        } else {
          toast.error('Event update failed. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetDetailEvent = async () => {
    try {
      const eventDetail = await getDetailDataEvent(params.id);
      setEventDetail(eventDetail.data);
      const localTime = moment
        .utc(eventDetail?.data.date)
        .local()
        .format('HH:mm');
      console.log('localtime:', localTime);
      setInitialValues({
        event_title: eventDetail?.data?.title,
        description: eventDetail?.data?.description,
        location: eventDetail?.data?.location,
        event_date: eventDetail?.data.date?.split('T')[0],
        event_time: localTime,
        event_type: eventDetail?.data?.event_type,
        price: eventDetail?.data?.price,
        total_seat: eventDetail?.data?.total_seat,
        total_transaction_discount:
          eventDetail?.data?.total_transaction_discount,
        category: eventDetail?.data?.category,
        event_image: eventDetail?.data?.event_image || '',
      });
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  useEffect(() => {
    const token = getLoginCookie();
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      setUser({ email: jwt.email, name: jwt.name, role: jwt.role });
      guard('event_organizer', jwt.role);
    } else {
      alert('You are not allowed to access this page');
      router.push('/');
    }
  }, []);

  const guard = (expectedRole: string, existingRole: string) => {
    if (existingRole !== expectedRole) {
      alert('You are not allowed to access this page');
      router.push('/');
    }
  };

  useEffect(() => {
    console.log('initialValues:', initialValues);
  }, [initialValues]);

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const today = new Date();
  const minDate = new Date();
  return (
    <div>
      <NavbarDashboard name={user.name} />
      <SideBarDashboard role={user.role} />
      <ToastContainer />
      <div className="p-4 sm:ml-64">
        <div className="flex items-center mt-20 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Event Form
          </h3>
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleEditEventbyEo}
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
                    <option value="Food and Drink" label="Food and Drink">
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
                      typeof values.event_date === 'string' && values.event_date
                        ? new Date(values.event_date) // Convert string to Date
                        : new Date(values.event_date) // Pass Date object directly
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
                  {/* {JSON.stringify(values.event_date)} */}

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
                      <Field name="event_time">
                        {({ field }: FieldProps) => (
                          <input
                            type="time"
                            form="hh:mm a"
                            id="event_time"
                            {...field}
                            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min="07:00"
                            max="23:00"
                            required
                          />
                        )}
                      </Field>
                      {errors.event_time && touched.event_time && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.event_time}
                        </div>
                      )}
                    </div>
                  </form>
                  {/* <form className="max-w-l mx-auto">
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
                  </form> */}
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
              <Button
                onClick={() => {
                  handleEditEventbyEo;
                }}
                type="submit"
                className="text-white inline-flex items-center bg-red-400 hover:bg-rose-800 focus:ring-4 focus:outline-double focus:ring-rose-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
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
                Edit Event
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

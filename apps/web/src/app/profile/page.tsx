'use client';
import 'flowbite';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
// import profileData from '@/services/user';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getLoginCookie, removeLoginCookie } from '../../../utils/cookies';
import UnauthorizedPage from '../unauthorized/page';

interface UserProfile {
  referralCode: string;
  totalPoints: number;
  user: any;
}

export default function Profile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    referralCode: '',
    totalPoints: 0,
    user: {},
  });
  const [isAuthorized, setIsAuthorized] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      const jwt = JSON.parse(atob(token.split('.')[1]));
      let userIdFromCookie = jwt.id; // Assuming the user ID is stored in the JWT

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}users/${userIdFromCookie}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.status === 'success') {
        const userProfile = response.data.data;
        console.log(userProfile);

        // Set the profile state, including couponCreated
        setProfile(userProfile);
        setIsLoggedIn(true);
      }
    } catch (error) {
      toast.error('Failed to fetch profile data');
      console.error('Error fetching profile data:', error);
    }
  };

  // const fetchProfile = async () => {
  //   try {
  //     const token = Cookies.get('token');
  //     if (!token) return;

  //     const jwt = JSON.parse(atob(token.split('.')[1]));
  //     console.log(`cookie id :${Cookies.get('user')}`);
  //     let dataUserFromCookie = Cookies.get('user')?.toString() || '{}';
  //     console.log(`id user form Cookie : ${JSON.parse(dataUserFromCookie).id}`);
  //     let userIdFromCookie = JSON.parse(dataUserFromCookie).id;
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_API_URL}users/${userIdFromCookie}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     );

  //     if (response.data.status === 'success') {
  //       console.log(response);
  //       setProfile(response.data.data);
  //       console.log(profile);
  //       setIsLoggedIn(true);
  //     }
  //   } catch (error) {
  //     toast.error('Failed to fetch profile data');
  //     console.error('Error fetching profile data:', error);
  //   }
  // };

  const decodeJWT = () => {
    try {
      const token = getLoginCookie();
      if (!token) return;

      const jwt = JSON.parse(atob(token.split('.')[1]));

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Invalid JWT token:', error);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile().catch(() => decodeJWT());
  }, []);
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
      const authorized = guard('participant', existingRole);
      setIsAuthorized(authorized);
    } else {
      router.push('/');
    }
  }, [router]);
  // const guard = function (expectedRole: string, existingRole: string) {
  //   if (existingRole == expectedRole) {
  //     console.log('ok');
  //   } else {
  //     alert('you are not allowed to this page');
  //     router.push('/');
  //   }
  // };

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

      <main className="flex">
        <div className="w-full mx-auto p-6 sm:ml-64 mt-16">
          <h1 className="text-2xl font-bold border-b pb-3 mb-6">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">First name</label>
              <input
                type="text"
                value={profile?.user?.first_name}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Last name</label>
              <input
                type="text"
                value={profile?.user?.last_name}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="text"
                value={profile?.user?.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Joined at</label>
              <input
                type="text"
                value={new Date(profile?.user?.created_at).toLocaleString(
                  'en-GB',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>

            {/* Referral Code Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 hover:shadow-md transition duration-200">
              <h2 className="text-lg font-semibold text-red-700 mb-2">
                Referral Code
              </h2>
              <p className="text-sm text-gray-700">
                Use this code to invite friends:
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-red-800">
                  {profile?.referralCode}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(profile?.referralCode);
                    toast.success('Referral code copied successfully!');
                  }}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Points Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 hover:shadow-md transition duration-200">
              <h2 className="text-lg font-semibold text-red-700 mb-2">
                Points
              </h2>
              <p className="text-sm text-gray-700">Your points:</p>
              <div className="mt-4 flex items-center">
                <span className="text-3xl font-bold text-red-800">
                  {profile?.totalPoints.toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-gray-500">point</span>
              </div>
            </div>

            {/* Discount Coupon */}
            {profile?.user?.referral_code_use ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:bg-yellow-100 hover:shadow-md transition duration-200">
                <h2 className="text-lg font-semibold text-yellow-700 mb-2">
                  Discount Coupon
                </h2>
                <p className="text-sm text-gray-700">
                  Use this coupon to get a discount:
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-800">
                    DISCOUNT 10%
                  </span>
                  <Button
                    href="/events"
                    className="bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600"
                  >
                    Use Coupon
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  No Discount Coupon Available
                </h2>
                <p className="text-sm text-gray-500">
                  You did not register with a referral code, so no discount
                  coupon is available.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

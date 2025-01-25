'use client';
import 'flowbite';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import profileData from '@/services/user';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  referralCode: string;
  points: number;
}

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: 'Ninditaa',
    // role: 'event_organizer',
    role: 'participant',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    created_at: '',
    referralCode: '',
    points: 0,
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const profile = await profileData();
    setProfile(profile?.data);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <NavbarDashboard name={userInfo.name} />
      <SideBarDashboard role={userInfo.role} />

      <main className="flex">
        <div className="w-full mx-auto p-6 sm:ml-64 mt-16">
          <h1 className="text-2xl font-bold border-b pb-3 mb-6">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">First name</label>
              <input
                type="text"
                value={profile?.first_name}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Last name</label>
              <input
                type="text"
                value={profile?.last_name}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="text"
                value={profile?.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Joined at</label>
              <input
                type="text"
                value={profile?.created_at}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 mt-1"
              />
            </div>

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
                    // navigator.clipboard.writeText(profile?.referralCode);
                    toast.success('Referral code copied successfully!');
                  }}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:bg-red-100 hover:shadow-md transition duration-200">
              <h2 className="text-lg font-semibold text-red-700 mb-2">
                Points
              </h2>
              <p className="text-sm text-gray-700">Your points:</p>
              <div className="mt-4 flex items-center">
                <span className="text-3xl font-bold text-red-800">
                  {profile?.points}
                </span>
                <span className="ml-2 text-sm text-gray-500">point</span>
              </div>
            </div>
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
                  className=" bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600"
                >
                  Use Coupon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';
import Chart from 'react-apexcharts';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import 'flowbite';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useEffect, useState } from 'react';
import { getLoginCookie } from '../../../utils/cookies';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });
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
      // console.log('role:', existingRole);
      guard('event_organizer', existingRole);
    } else {
      alert('you are not allowed to this page');
      router.push('/');
    }
  }, []);

  const guard = function (expectedRole: string, existingRole: string) {
    if (existingRole == expectedRole) {
      console.log('ok');
    } else {
      alert('you are not allowed to this page');
      router.push('/');
    }
  };

  return (
    <div>
      <NavbarDashboard name={user.name} />
      <SideBarDashboard role={user.role} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg  dark:border-gray-700 mt-14">
          <div className="flex flex-col md:flex-row px-6 gap-10 mb-10 mt-6">
            <Card href="#" className="max-w-sm ">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Ticket Sold
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Most Populer Event this Month
              </h5>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Revenue
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Seat Sold this Month
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </Card>
          </div>
        </div>
        <div className=" justify-center mt-28 flex flex-row">
          <Chart
            type="bar"
            width={1200}
            height={400}
            series={[
              {
                name: 'event x',
                data: [190, 200, 322, 343],
                color: '#0d25d6',
              },
              {
                name: 'event y',
                data: [565, 697, 563, 878],
                color: '#ff0000',
              },
              {
                name: 'event a',
                data: [423, 200, 344, 343],
                color: '#f0f',
              },
              {
                name: 'event z',
                data: [565, 697, 563, 378],
                color: '#dd0',
              },
            ]}
            options={{
              chart: {
                toolbar: {
                  show: true,
                },
              },
              responsive: [
                {
                  breakpoint: 1024,
                  options: {
                    chart: {
                      width: '100%',
                    },
                    legend: {
                      position: 'bottom',
                    },
                  },
                },
                {
                  breakpoint: 768,
                  options: {
                    chart: {
                      width: '100%',
                    },
                    legend: {
                      position: 'bottom',
                      fontSize: '12px',
                    },
                  },
                },
              ],
            }}
          ></Chart>
        </div>
      </div>
    </div>
  );
}

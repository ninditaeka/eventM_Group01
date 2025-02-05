'use client';
import Chart from 'react-apexcharts';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import 'flowbite';
import NavbarDashboard from '@/components/NavbarDashboard';
import SideBarDashboard from '@/components/SideBarDashboar';
import { useEffect, useState } from 'react';
import { getLoginCookie } from '../../../utils/cookies';

import { useParams, useRouter } from 'next/navigation';
import UnauthorizedPage from '../unauthorized/page';
import {
  getGrafikbyId,
  getTotalSeatbyId,
  getPopularEventbyId,
  getRevenuebyId,
} from '@/services/payment';

export default function Dashboard() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState({
    email: '',
    name: '',
    role: '',
  });
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [totalSeat, setTotalSeat] = useState<number | null>(null);

  const [popularEvent, setPopularEvent] = useState();
  const [revenue, setRevenue] = useState<number | null>(null);
  const [graphicChart, setGraphicChart] = useState();

  const resultTotalSeat = async () => {
    const totalSeatResult = await getTotalSeatbyId(Number(params.id));
    setTotalSeat(totalSeatResult.totalSeats);
  };
  const resultPopularEvent = async () => {
    const PopularEventById = await getPopularEventbyId(Number(params.id));
    setPopularEvent(PopularEventById.event.title);
    console.log('PopularEventById', PopularEventById);
  };
  const resultRevenue = async () => {
    const revenueById = await getRevenuebyId(Number(params.id));
    setRevenue(revenueById.totalPayment);
    console.log(revenueById);
  };

  const resultGrafik = async () => {
    const grafikById = await getGrafikbyId(Number(params.id));

    setGraphicChart(grafikById);
    console.log('grafikById', grafikById);
  };

  useEffect(() => {
    resultTotalSeat();
    resultPopularEvent();
    resultRevenue();
    resultGrafik();
  }, [params.id]);

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* <NavbarDashboard name={user.name} />
      <SideBarDashboard role={user.role} /> */}
      <NavbarDashboard name={user.name} onToggleSidebar={toggleSidebar} />
      <SideBarDashboard role={user.role} isOpen={isSidebarOpen} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg  dark:border-gray-700 mt-14">
          <div className="flex flex-col md:flex-row px-6 gap-40 mb-10 mt-6 justify-center">
            <Card className="w-full h-48 flex flex-col justify-center ">
              <h5 className="text-2xl font-bold tracking-tight  space-y-4  justify-center text-gray-900 dark:text-white">
                Total Ticket Sold
              </h5>
              <p className="font-normal text-gray-700 text- xl justify-center dark:text-gray-400">
                {totalSeat ?? 'Loading...'} Tickets
              </p>
            </Card>
            <Card className="w-full h-48 flex flex-col justify-center">
              <h5 className="text-2xl font-bold tracking-tight justify-center text-gray-900 dark:text-white">
                Most Populer Event
              </h5>

              <p className="font-normal text-gray-700  justify-center dark:text-gray-400">
                {popularEvent ?? 'Loading...'}
              </p>
            </Card>
            <Card className="w-full h-48 flex flex-col justify-center">
              <h5 className="text-2xl font-bold tracking-tight justify-center text-gray-900 dark:text-white">
                Revenue
              </h5>
              <p className="font-normal text-gray-700 justify-center dark:text-gray-400">
                {revenue ? `IDR ${revenue.toLocaleString()}` : 'Loading...'}
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
                name: 'Revenue',
                data: (graphicChart as any)?.map((data: any) => data.data),
              },
            ]}
            options={{
              xaxis: {
                categories: (graphicChart as any)?.map(
                  (data: any) => data.name,
                ),
              },
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

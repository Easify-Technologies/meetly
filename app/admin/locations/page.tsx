'use client';

import React from 'react';
import Link from 'next/link';
import { useFetchAllLocations } from '@/app/queries/fetch-locations';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from '@/components/ui/loader';
import Image from 'next/image';

interface LocationProps {
  id: string;
  city: string;
  country: string;
  imageUrl: string;
}

const Page = () => {
  const { data: locations, isPending } = useFetchAllLocations(); 

  if(isPending) return <Loader />

  return (
    <>
      <section className='w-full h-screen bg-[#FFFFF5]'>
        <div className="max-w-6xl mx-auto py-8 md:px-0 px-4">
          <div className="flex flex-row gap-1.5 items-center justify-center flex-nowrap">
            <Link
              href="/admin/dashboard"
              className="rounded-full hover:bg-[#2f1107] hover:text-white flex items-center justify-center p-2 mt-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </Link>
            <h3 className="text-2xl md:text-3xl font-bold">All Locations</h3>
          </div>
          <div className='w-full mt-10'>
            <div className="[&>div]:max-h-96">
              <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                <TableHeader className="sticky top-0 z-10 bg-[#ffd100] backdrop-blur-xs">
                  <TableRow className="border-none">
                    <TableHead className='text-[#2f1107]'>S. No</TableHead>
                    <TableHead className='text-[#2f1107]'>City</TableHead>
                    <TableHead className='text-[#2f1107]'>Country</TableHead>
                    <TableHead className='text-[#2f1107]'>Image</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations && locations.map((location: LocationProps, idx: number) => (
                    <TableRow className="even:bg-[#2f1107] hover:bg-[#2f1107]/30 border-none even:text-white" key={location.id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{location?.city}</TableCell>
                      <TableCell>{location?.country}</TableCell>
                      <TableCell>
                        <Image
                          className='w-[50px] h-[50px] object-cover'
                          src={location?.imageUrl}
                          alt={location.city}
                          width={50}
                          height={50}
                          quality={100}
                          priority
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
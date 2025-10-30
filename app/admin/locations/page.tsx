'use client';

import React from 'react';
import Link from 'next/link';
import { useFetchAllLocations } from '@/app/queries/fetch-locations';

import { FaPlus } from "react-icons/fa";
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

  if (isPending) return <Loader />

  return (
    <>
      <section className="w-screen min-h-screen bg-[#FFFFF5] relative">
        <div className="w-full mx-auto py-8 px-4 md:px-8">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center flex-nowrap justify-between">
            <div className='flex items-center'>
              <Link
                href="/admin/dashboard"
                className="rounded-full hover:bg-[#2f1107] hover:text-white flex items-center justify-center p-2 transition-colors duration-300"
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
            <Link href="/admin/add-location" className='bg-[#ffd100] text-[#2f1107] rounded-md transition-colors duration-300 p-2 text-sm font-semibold border border-[#2f1107] flex items-center gap-2 hover:bg-[#2f1107] hover:text-[#ffd100]'>
              <FaPlus />
              <span>Add Location</span>
            </Link>
          </div>

          {/* Table */}
          <div className="w-full mt-10 overflow-x-auto">
            <div className="[&>div]:max-h-[70vh]">
              <Table className="w-full border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                <TableHeader className="sticky top-0 bg-[#ffd100] backdrop-blur-xs">
                  <TableRow className="border-none">
                    <TableHead className="text-[#2f1107] whitespace-nowrap">S. No</TableHead>
                    <TableHead className="text-[#2f1107] whitespace-nowrap">City</TableHead>
                    <TableHead className="text-[#2f1107] whitespace-nowrap">Country</TableHead>
                    <TableHead className="text-[#2f1107] whitespace-nowrap">Image</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations?.map((location: LocationProps, idx: number) => (
                    <TableRow
                      key={location.id}
                      className="even:bg-[#2f1107] hover:bg-[#2f1107]/30 border-none even:text-white"
                    >
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="whitespace-nowrap">{location?.city}</TableCell>
                      <TableCell className="whitespace-nowrap">{location?.country}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start">
                          <Image
                            className="w-12 h-12 object-cover rounded-md"
                            src={location?.imageUrl}
                            alt={location?.city}
                            width={50}
                            height={50}
                            quality={100}
                            priority
                          />
                        </div>
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
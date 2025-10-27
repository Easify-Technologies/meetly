'use client';

import React from 'react';
import Link from 'next/link';
import Loader from '@/components/ui/loader';
import Image from 'next/image';
import { useFetchAllUsers } from '@/app/queries/admin/fetch-users';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface UserProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    city: string;
    country: string;
    dateOfBirth: string;
    connectionStyles: string;
    communicationStyles: string;
    socialStyles: string;
    healthAndFitness: string;
    family: string;
    spirituality: string;
    politicalNews: string;
    incorrectHumor: string;
    kindOfPeople: string[];
}

const Page = () => {
    const { data: users, isPending } = useFetchAllUsers();

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
                        <h3 className="text-2xl md:text-3xl font-bold">All Users</h3>
                    </div>
                    <div className='w-full mt-10'>
                        <div className="[&>div]:max-h-96">
                            <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                                <TableHeader className="sticky top-0 z-10 bg-[#ffd100] backdrop-blur-xs">
                                    <TableRow className="border-none">
                                        <TableHead className='text-[#2f1107]'>S. No</TableHead>
                                        <TableHead className='text-[#2f1107]'>Name</TableHead>
                                        <TableHead className='text-[#2f1107]'>Email</TableHead>
                                        <TableHead className='text-[#2f1107]'>Phone Number</TableHead>
                                        <TableHead className='text-[#2f1107]'>Gender</TableHead>
                                        <TableHead className='text-[#2f1107]'>Date Of Birth</TableHead>
                                        <TableHead className='text-[#2f1107]'>City</TableHead>
                                        <TableHead className='text-[#2f1107]'>Country</TableHead>
                                        <TableHead className='text-[#2f1107]'>Connection Style</TableHead>
                                        <TableHead className='text-[#2f1107]'>Communication Style</TableHead>
                                        <TableHead className='text-[#2f1107]'>Family</TableHead>
                                        <TableHead className='text-[#2f1107]'>Humor</TableHead>
                                        <TableHead className='text-[#2f1107]'>Health & Fitness</TableHead>
                                        <TableHead className='text-[#2f1107]'>Politics</TableHead>
                                        <TableHead className='text-[#2f1107]'>Kind of People</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users && users.map((user: UserProps, idx: number) => (
                                        <TableRow className="even:bg-[#2f1107] hover:bg-[#2f1107]/30 border-none even:text-white" key={user.id}>
                                            <TableCell className="font-medium">{idx + 1}</TableCell>
                                            <TableCell>{user?.name}</TableCell>
                                            <TableCell>{user?.email}</TableCell>
                                            <TableCell>{user?.phoneNumber}</TableCell>
                                            <TableCell>{user?.gender}</TableCell>
                                            <TableCell>{user?.dateOfBirth}</TableCell>
                                            <TableCell>{user?.city}</TableCell>
                                            <TableCell>{user?.country}</TableCell>
                                            <TableCell>{user?.connectionStyles}</TableCell>
                                            <TableCell>{user?.communicationStyles}</TableCell>
                                            <TableCell>{user?.family}</TableCell>
                                            <TableCell>{user?.incorrectHumor}</TableCell>
                                            <TableCell>{user?.healthAndFitness}</TableCell>
                                            <TableCell>{user?.politicalNews}</TableCell>
                                            <TableCell>{user?.kindOfPeople?.join(", ")}</TableCell>
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
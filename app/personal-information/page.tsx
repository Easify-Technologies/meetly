'use client';

import React from 'react'
import Navbar from '@/components/ui/Navbar';
import Link from 'next/link';

import PhoneNumberInput from '@/components/comp-46';

const Page = () => {
  return (
    <>
      <Navbar />

      <section className='w-full h-full relative bg-[#FFFFF5]'>
        <div className='max-w-2xl mx-auto py-8 md:px-0 px-4'>
          <div className='flex flex-row gap-1.5 items-center justify-center flex-nowrap'>
            <Link href="/settings" className='rounded-full hover:bg-[#2f1107] hover:text-white flex items-center justify-center p-2 mt-2 transition-colors duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            </Link>
            <h3 className='text-2xl md:text-3xl font-bold'>Personal Information</h3>
          </div>
          <form className='w-full mt-5'>
            <div className='flex flex-col gap-2 items-start justify-start'>
              <label htmlFor="first_name" className='text-[#2f1107] font-semibold'>First Name</label>
              <input type="text" id='first_name' name='first_name' className='w-full rounded-md border border-[#2f1107] text-[#2f1107] outline-none text-sm font-semibold p-2' />
            </div>
            <div className='flex flex-col gap-2 items-start justify-start mt-6'>
              <label htmlFor="last_name" className='text-[#2f1107] font-semibold'>Last Name</label>
              <input type="text" id='last_name' name='last_name' className='w-full rounded-md border border-[#2f1107] text-[#2f1107] outline-none text-sm font-semibold p-2' />
            </div>
            <div className='flex flex-col gap-2 items-start justify-start mt-6'>
              <label htmlFor="email" className='text-[#2f1107] font-semibold'>Email</label>
              <input type="email" id='email' name='email' className='w-full rounded-md border border-[#2f1107] text-[#2f1107] outline-none text-sm font-semibold p-2' />
            </div>
            <PhoneNumberInput />
          </form>
        </div>
      </section>
    </>
  )
}

export default Page
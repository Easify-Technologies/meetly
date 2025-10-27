'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useProfileDetails } from '../queries/profile';
import Loader from '@/components/ui/loader';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGetAllEvents } from '../queries/get-events';

const bookingOptions = [
  {
    id: "0199a5a6-f73f-70ca-8e36-dd6d925f18e7",
    date: "Sunday, 26th October",
    time: "10:30",
  },
  {
    id: "0199c9b3-747b-72b1-8e37-22abee0d9dab",
    date: "Sunday, 2nd November",
    time: "10:30",
  },
  {
    id: "0199edbf-faf7-7053-894c-cf8feb4ca84b",
    date: "Sunday, 9th November",
    time: "10:30",
  },
];

const Page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.email ?? '';

  const [booking, setBooking] = useState("");
  const { data: profile, isLoading } = useProfileDetails(userId);
  const { data: events } = useGetAllEvents();
  console.log(events);

  if (isLoading) return <Loader />

  return (
    <>
      <Navbar />

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto h-full">
          <div className="h-full flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="relative h-full bg-background">
                <div className="absolute inset-x-0 top-0 overflow-hidden z-0 lg:hidden" style={{ height: "calc(40vh)" }}>
                  <div className="relative" style={{ height: "calc(30vh)" }}>
                    <Image alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" src="/photo-1629914707102-d04d7262ef96.jpeg" width={100} height={100} quality={100} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none"></div>
                  </div>
                  <div className="absolute left-0 right-0 flex items-center justify-center pointer-events-none" style={{ bottom: "0" }}>
                    <p className="text-base md:text-lg text-muted-foreground text-center">Nope, no extra kins down here.</p>
                  </div>
                </div>
                <div className="h-full flex flex-col overflow-hidden lg:overflow-visible lg:bg-popover">
                  <div className="hidden lg:block flex-shrink-0 p-4">
                    <div className="relative z-10 rounded-full">
                      <div className="flex justify-center items-center py-2">
                        <Link href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-primary" aria-hidden="true">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <p className="text-sm text-center underline decoration-dashed">{profile?.city}, {profile?.country}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto lg:p-4 relative lg:static">
                    <div className="h-full flex flex-col lg:h-auto">
                      <div className="flex-1 transition-[height] duration-500 ease-in-out lg:hidden" style={{ maxHeight: "20vh", minHeight: "20vh" }}></div>
                      <div className="relative bg-muted lg:bg-popover shadow-md rounded-t-[3rem] transition-all lg:hidden -mb-30 z-10">
                        <div className="px-6 py-4 pb-32">
                          <div className="relative z-10 rounded-full">
                            <div className="flex justify-center items-center py-2">
                              <Link href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-primary" aria-hidden="true">
                                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <p className="text-sm text-center underline decoration-dashed">{profile?.city}, {profile?.country}</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 flex flex-col bg-popover rounded-t-[3rem] shadow-t-2xl z-20">
                        <div className="flex-1 flex flex-col p-4 lg:p-0 ">
                          <div className="space-y-6 h-full">
                            <form className="h-full flex flex-col">
                              <div className="space-y-6 flex-1">
                                {/* <div className="text-center">
                                  <h2 className="text-4xl md:text-5xl lg:text-6xl">Book your next Kin</h2>
                                  <div className="flex items-center justify-center gap-2 mt-5">
                                    <p className="text-base md:text-lg text-muted-foreground">5 people are waiting for you</p>
                                  </div>
                                </div> */}
                                <RadioGroup
                                  className="grid gap-3 outline-none"
                                  onValueChange={(value) => setBooking(value)}
                                  value={booking}
                                >
                                  {bookingOptions.map((option) => (
                                    <div
                                      key={option.id}
                                      className="relative flex w-full items-center gap-2 border border-input p-4 rounded-full shadow-xs outline-none has-data-[state=checked]:border-bg-[#2F1107]/50 hover:bg-[#2F1107]/10"
                                    >
                                      <RadioGroupItem
                                        value={option.id}
                                        id={option.id}
                                        className="order-1 after:absolute after:inset-0 cursor-pointer border-[#2F1107]
                                        text-[#2F1107]
                                        data-[state=checked]:bg-[#2F1107]
                                        data-[state=checked]:border-[#2F1107]
                                        data-[state=checked]:text-[#2F1107]"
                                        />
                                      <div className="grid grow gap-2">
                                        <Label htmlFor={option.id} className='flex items-center gap-2'>
                                          <h4 className="font-semibold md:text-xl text-lg text-[#2F1107]">
                                            {option.date}
                                          </h4>
                                          <div className="flex items-start text-center justify-center bg-[#2F1107] rounded-full px-3 py-2">
                                            <span className="text-lg font-medium text-white leading-none">
                                              {option.time}
                                            </span>
                                            <span className="text-[10px] text-white ml-1 leading-none translate-y--1">
                                              am
                                            </span>
                                          </div>
                                        </Label>
                                      </div>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                              <div className="shrink-0 py-6">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all outline-none bg-[#FFD100] text-[#2F1107] hover:bg-[#FFD100]/90 h-12 px-4 py-2 rounded-full w-full cursor-pointer" type="button">Book my seat</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-muted">
          <Image alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" src="/photo-1629914707102-d04d7262ef96.jpeg" width={100} height={100} quality={100} priority />
        </div>
      </div>
    </>
  )
}

export default Page
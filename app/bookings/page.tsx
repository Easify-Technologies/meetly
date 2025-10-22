'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  console.log('User session:', session);

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
                    <Image alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" src="/photo-1629914707102-d04d7262ef96.jpeg" width={100} height={100} />
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
                          <p className="text-sm text-center underline decoration-dashed">Trastevere, Rome</p>
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
                                <p className="text-sm text-center underline decoration-dashed">Trastevere, Rome</p>
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
                                <div className="text-center">
                                  <h2 className="text-4xl md:text-5xl lg:text-6xl">Book your next Kin</h2>
                                  <div className="flex items-center justify-center gap-2 mt-5">
                                    <p className="text-base md:text-lg text-muted-foreground">5 people are waiting for you</p>
                                  </div>
                                </div>

                              </div>
                              <div className="shrink-0 py-5">
                                <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-[#2F1107] text-white hover:bg-[#2F1107]/90 h-12 px-4 py-2 rounded-full w-full" type="button">Book my seat</button>
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
          <Image alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" src="/photo-1629914707102-d04d7262ef96.jpeg" width={100} height={100} />
        </div>
      </div>
    </>
  )
}

export default Page
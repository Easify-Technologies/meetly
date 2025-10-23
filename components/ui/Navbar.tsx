'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            {/* Desktop Navbar */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center min-h-0 lg:min-h-20 p-4 w-full">
                    <Link className="flex items-center gap-2 w-20 active" href="#" data-status="active" aria-current="page">
                        <Image
                            src="/Mocha-e1760632297719.webp"
                            alt="Meetly"
                            width={200}
                            height={200}
                            quality={100}
                            priority
                        />
                    </Link>
                    <div className="hidden lg:flex items-center gap-6">
                        <Link data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive underline-offset-4 hover:underline rounded-full has-[&gt;svg]:px-4 w-fit h-fit p-0 active" href="/" data-status="active" aria-current="page">Home</Link>
                        <Link data-slot="button" href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive underline-offset-4 hover:underline rounded-full has-[&gt;svg]:px-4 w-fit h-fit p-0">Connect</Link>
                        <Link data-slot="button" href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive underline-offset-4 hover:underline rounded-full has-[&gt;svg]:px-4 w-fit h-fit p-0">Help</Link>
                        <Link data-slot="button" href="/settings" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive underline-offset-4 hover:underline rounded-full has-[&gt;svg]:px-4 w-fit h-fit p-0">Settings</Link>
                    </div>
                    <div className="flex items-center justify-end"></div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="z-50 block lg:hidden fixed bottom-0 left-0 w-full">
                <div className="bg-popover backdrop-blur-xl z-100 mb-1">
                    <div className="relative px-2 py-2 ">
                        <nav className="flex items-center justify-around">
                            <Link className="flex flex-col items-center justify-center gap-1 h-auto py-2 px-8 rounded-full transition-all duration-200 min-w-[60px] max-w-[80px] flex-1 active:scale-95 bg-[#2F1107] text-primary-foreground hover:bg-[#2F1107]/90" href="/" data-status="active" aria-current="page">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-5 w-5 transition-colors text-primary-foreground" aria-hidden="true">
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    </svg>
                                </div>
                                <span className="text-xs font-medium transition-colors leading-none text-primary-foreground">Home</span>
                            </Link>
                            <Link className="flex flex-col bg-muted items-center justify-center gap-1 h-auto py-2 px-8 rounded-full transition-all duration-200 min-w-[60px] max-w-[80px] flex-1 hover:bg-accent/50 active:scale-95" href="#">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-5 w-5 transition-colors" aria-hidden="true">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                    </svg>
                                </div>
                                <span className="text-xs font-medium transition-colors leading-none">Connect</span>
                            </Link>
                            <Link className="flex flex-col bg-muted items-center justify-center gap-1 h-auto py-2 px-8 rounded-full transition-all duration-200 min-w-[60px] max-w-[80px] flex-1 hover:bg-accent/50 active:scale-95" href="#">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-5 w-5 transition-colors" aria-hidden="true">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                    </svg>
                                </div>
                                <span className="text-xs font-medium transition-colors leading-none">Help</span>
                            </Link>
                            <Link className="flex flex-col bg-muted items-center justify-center gap-1 h-auto py-2 px-8 rounded-full transition-all duration-200 min-w-[60px] max-w-[80px] flex-1 hover:bg-accent/50 active:scale-95" href="/settings">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-5 w-5 transition-colors" aria-hidden="true">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <span className="text-xs font-medium transition-colors leading-none">Profile</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
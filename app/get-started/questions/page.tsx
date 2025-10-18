'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Page = () => {
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto h-full">
                        <div className="h-full flex flex-col p-4">
                            <div className="">
                                <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center min-h-0 lg:min-h-20 p-4 w-full">
                                    <div className="flex items-center gap-2 w-20">
                                        <Image
                                            src="/Mocha-e1760632297719.webp"
                                            alt="Meetly"
                                            width={200}
                                            height={200}
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                    <div className="hidden lg:flex items-center gap-6"></div>
                                    <div className="flex items-center justify-end"></div>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto">
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 overflow-y-auto flex flex-col gap-6 text-center px-4 pt-10 pb-4">
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">How do you usually connect with people?</h1>
                                        <form className="flex flex-col gap-4">
                                            
                                        </form>
                                    </div>
                                    <div className="p-4 bg-background">
                                        <Link href={``} data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500" role="link" aria-disabled="true">Next</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-muted">
                        <div className="absolute right-1/8 h-2/3 w-auto">
                            <Image
                                src="/colleagues-having-a-coffee-break-1024x752.webp"
                                alt="Meetly"
                                width={600}
                                height={600}
                                quality={100}
                                priority
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
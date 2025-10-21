'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress"

const Page = () => {
    const [progress, setProgress] = useState(10);
    const [showMatchedSection, setShowMatchedSection] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const progressTimer = setTimeout(() => setProgress(66), 500);

        const redirectTimer = setTimeout(() => {
            setShowMatchedSection(true);

            const params = new URLSearchParams(window.location.search);
            const query = params.toString();

            router.push(`/get-started/user-details?${query}`, { scroll: false });
        }, 1000);

        return () => {
            clearTimeout(progressTimer);
            clearTimeout(redirectTimer);
        };
    }, []);

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
                                        {showMatchedSection ? (
                                            <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">You&apos;re in. Your table&apos;s ready.</h1>
                                        ) : (
                                            <>
                                                <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">One moment, we are finding a table for you</h1>
                                                <Progress value={progress} className="w-full" />
                                            </>
                                        )}
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
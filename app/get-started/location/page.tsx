'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFetchCafes } from '@/app/queries/fetch-cafes';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Cafes {
    id: string;
    name: string;
    address: string;
    location: {
        id: string;
        name: string;
        country: string;
        imageUrl: string;
    };
}

const Page = () => {
    const searchParams = useSearchParams();
    const cityId = searchParams.get('city_id') ?? "";

    const { data: cafes = [], isPending } = useFetchCafes(cityId);
    const [selectedCafe, setSelectedCafe] = useState("");

    if (isPending) return <div>Loading...</div>;
    if (!cafes.length) return <div>No cafes found.</div>;

    const locationImage = cafes[0].location.imageUrl;
    const locationName = cafes[0].location.name;
    const locationCountry = cafes[0].location.country;

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
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2F1107] font-semibold">Where are you located?</h1>
                                        <p className="text-base md:text-lg text-[#2F1107]">You can change this anytime</p>
                                        <form className="flex flex-col gap-4">
                                            <div className='border rounded-lg overflow-hidden'>
                                                <div className='h-32 w-full overflow-hidden bg-muted'>
                                                    {locationImage && (
                                                        <Image
                                                            src={locationImage}
                                                            alt={locationName}
                                                            width={100}
                                                            height={100}
                                                            quality={100}
                                                            priority
                                                            className='h-full w-full object-cover'
                                                        />
                                                    )}
                                                </div>
                                                <div className='p-4'>
                                                    <div className='flex justify-between items-start mb-4'>
                                                        <div className="flex flex-col gap-2 items-start justify-start">
                                                            <h3 className="font-medium text-lg">{locationName}</h3>
                                                            <p className="text-sm text-muted-foreground text-left">{locationCountry}</p>
                                                        </div>
                                                        <Link href="/get-started" type="button" className='inline-flex justify-center items-center text-sm md:text-base whitespace-nowrap font-medium transition-all text-[#2F1107] bg-[#FFD100] rounded-full cursor-pointer px-3 py-2 hover:bg-[#2F1107] hover:text-[#ffd100] duration-500'>Change</Link>
                                                    </div>
                                                    <div className='space-y-3'>
                                                        {cafes.length > 0 && (
                                                            <RadioGroup
                                                                className="w-full"
                                                                value={selectedCafe}
                                                                onValueChange={(value) => setSelectedCafe(value)}
                                                            >
                                                                {cafes.map((cafe: Cafes) => (
                                                                    <div
                                                                        key={cafe.id}
                                                                        className="relative flex w-full items-start gap-3 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-[#2F1107]"
                                                                    >
                                                                        <RadioGroupItem
                                                                            id={cafe.id}
                                                                            value={cafe.id}
                                                                            aria-describedby={cafe.name}
                                                                            className="
                                                                            border-[#2F1107]
                                                                            text-[#2F1107]
                                                                            data-[state=checked]:bg-[#2F1107]
                                                                            data-[state=checked]:border-[#2F1107]
                                                                            data-[state=checked]:text-[#2F1107]"
                                                                        />
                                                                        <div className="flex flex-col gap-2">
                                                                            <Label htmlFor={cafe.id}>{cafe.name}</Label>
                                                                            <p className="text-xs text-muted-foreground">{cafe.address}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-4 bg-background">
                                        <Link href={`/get-started/questions?city_id=${cityId}&cafe_id=${selectedCafe}`} data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500" role="link" aria-disabled="true">Next</Link>
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
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useFetchAllCafes } from '@/app/queries/fetch-cafes';
import { useAddEvents } from '@/app/queries/admin/add-events';
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Loader from '@/components/ui/loader';

interface EventsProps {
    date: string;
    city: string;
    country: string;
    cafeId?: string;
}

interface CafeOption {
    id: string;
    name: string;
}

const Page = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [formData, setFormData] = useState<EventsProps>({
        date: "",
        city: "",
        country: "",
        cafeId: ""
    });

    const { data: cafes, isFetching } = useFetchAllCafes();
    const { mutate, isPending, isSuccess, isError, data, error } = useAddEvents();
    const cafeOptions = cafes?.map((cafe: CafeOption) => ({
        id: cafe.id,
        name: cafe.name,
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSaveEvent = () => {
        mutate(formData);
    }

    if (isFetching) return <Loader />

    return (
        <>
           <section className="w-screen min-h-screen bg-[#FFFFF5] relative">
                <div className="w-full mx-auto py-8 px-4 md:px-8 flex flex-col justify-center md:items-start items-center">
                    <form encType='multipart/form-data' className="flex flex-col w-full gap-4 max-w-sm">
                        <h1 className="text-4xl text-[#2f1107] font-semibold md:text-5xl lg:text-6xl text-center mb-4">Add Events</h1>
                        <div className="grid w-full items-center gap-3">
                            <div className="relative">
                                <select className='file:text-foreground mb-5 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-16 w-full min-w-0 rounded-full border bg-muted px-5 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm' name="country" id="country" onChange={handleInputChange} value={formData.country}>
                                    <option value="">Select Country</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Czechia">Czechia</option>
                                    <option value="Austria">Austria</option>
                                </select>
                                <select className='file:text-foreground mb-5 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-16 w-full min-w-0 rounded-full border bg-muted px-5 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm' name="city" id="city" onChange={handleInputChange} value={formData.city}>
                                    <option value="">Select City</option>
                                    <option value="Budapest">Budapest</option>
                                    <option value="Prague">Prague</option>
                                    <option value="Bratislava">Bratislava</option>
                                    <option value="Vienna">Vienna</option>
                                </select>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date"
                                            className="file:text-foreground mb-5 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-16 w-full min-w-0 rounded-full border bg-muted px-5 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm justify-between"
                                        >
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(newDate) => {
                                                setDate(newDate);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    date: newDate ? newDate.toISOString().split("T")[0] : "",
                                                }));
                                                setOpen(false);
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <select className='file:text-foreground mb-5 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-16 w-full min-w-0 rounded-full border bg-muted px-5 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm' name="cafeId" id="cafeId" onChange={handleInputChange} value={formData.cafeId}>
                                    <option value="">Select Cafe</option>
                                    {cafeOptions?.map((cafe: CafeOption) => (
                                        <option key={cafe.id} value={cafe.id}>
                                            {cafe.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {isError && (
                                <p data-slot="form-message" className="text-destructive text-sm">{(error as Error).message}</p>
                            )}
                            {isSuccess && data?.message && (
                                <p data-slot="form-message" className="text-green-500 text-sm">{data.message}</p>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col gap-4 justify-center items-center">
                            <button onClick={handleSaveEvent} disabled={isPending} className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer text-sm md:text-base font-medium transition-all bg-[#FFD100] text-[#2f1107] hover:bg-[#FFD100]/90 h-12 px-4 py-2 rounded-full w-full" type="button">
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
           </section>
        </>
    )
}

export default Page
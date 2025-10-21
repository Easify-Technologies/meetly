'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

const Page = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [formData, setFormData] = useState({
        gender: "",
        dateOfBirth: "",
    });

    const handleNext = () => {
        if (!formData.gender || !date) return;

        const params = new URLSearchParams(window.location.search);

        params.set("gender", formData.gender);
        params.set("dateOfBirth", date.toISOString().split("T")[0]);

        router.replace(`?${params.toString()}`, { scroll: false });

        router.push(`/get-started/matching?${params.toString()}`);
    }

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
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What gender are you?</h1>
                                        <RadioGroup
                                            className="flex gap-2 items-center justify-center w-full mx-auto py-3"
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({ ...prev, gender: value }))
                                            }
                                        >
                                            <label className="relative w-1/2 flex cursor-pointer flex-col items-center gap-3 rounded-full border border-input px-2 py-5 text-center shadow-xs transition-all">
                                                <RadioGroupItem id="male" value="male" className="sr-only after:absolute after:inset-0" />
                                                <p className="text-sm leading-none font-bold text-foreground">Male</p>
                                            </label>
                                            <label className="relative w-1/2 flex cursor-pointer flex-col items-center gap-3 rounded-full border border-input px-2 py-5 text-center shadow-xs transition-all">
                                                <RadioGroupItem id="female" value="female" className="sr-only after:absolute after:inset-0" />
                                                <p className="text-sm leading-none font-bold text-foreground">Female</p>
                                            </label>
                                        </RadioGroup>
                                        <div className='py-6 border-t border-[#f7f0f2]'>
                                            <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What is your date of birth?</h1>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-full py-8 px-5 rounded-full justify-between font-medium mt-10"
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
                                                        onSelect={(date) => {
                                                            setDate(date);
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                dateOfBirth: date ? date.toISOString().split("T")[0] : "",
                                                            }));
                                                            setOpen(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background">
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={!formData.gender || !date}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            Next
                                        </button>
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
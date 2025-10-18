'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const cityId = searchParams.get('city_id') ?? "";
    const cafeId = searchParams.get('cafe_id') ?? "";

    const [step, setStep] = useState(1);
    const [selectedStyle, setSelectedStyle] = useState("");
    const [formData, setFormData] = useState({
        connectionStyle: "",
        communicationStyle: "",
        socialStyle: "",
        healthFitnessStyle: "",
    });

    const connectionStyles = [
        {
            label: "I ask questions",
            value: "ask_questions"
        },
        {
            label: "I share stories",
            value: "share_stories"
        },
        {
            label: "I listen",
            value: "listen"
        }
    ];

    const communicationStyles = [
        {
            label: "Talking about life",
            value: "talking_about_life"
        },
        {
            label: "Exploring ideas",
            value: "exploring_ideas"
        },
        {
            label: "Asking big questions",
            value: "asking_big_questions"
        },
        {
            label: "Finding common ground",
            value: "finding_common_ground"
        },
    ];

    const socialStyles = [
        {
            label: "Nature",
            value: "nature"
        },
        {
            label: "The City",
            value: "the_city"
        },
        {
            label: "At Home",
            value: "at_home"
        }
    ];

    const healthFitnessStyles = [
        {
            label: "It's a big part of my lifestyle",
            value: "big_part_of_lifestyle"
        },
        {
            label: "I care, but I keep it balanced",
            value: "balanced"
        },
        {
            label: "Not a major focus right now",
            value: "not_major_focus"
        }
    ];

    const stepHeadings: { [key: number]: string } = {
        1: "How do you usually connect with people?",
        2: "What makes a conversation meaningful to you?",
        3: "I prefer spending more time in?",
        4: "How much does health and fitness matter to you?"
    };

    const stepConfig: { [key: number]: { key: string; options: { label: string; value: string; }[] } } = {
        1: { key: "connectionStyle", options: connectionStyles },
        2: { key: "communicationStyle", options: communicationStyles },
        3: { key: "socialStyle", options: socialStyles },
        4: { key: "healthFitnessStyle", options: healthFitnessStyles },
    };

    const handleNext = () => {
        if (!selectedStyle) return;

        const { key } = stepConfig[step];
        const updatedForm = { ...formData, [key]: selectedStyle };
        setFormData(updatedForm);

        const params = new URLSearchParams(searchParams.toString());
        params.set(key, selectedStyle);

        router.replace(`?${params.toString()}`, { scroll: false });

        if (step < 4) {
            setStep(step + 1);
            setSelectedStyle("");
        } else {
            console.log("✅ Final Form Data:", updatedForm);
        }
    };

    const { options } = stepConfig[step];

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
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">{stepHeadings[step]}</h1>
                                        <div className="flex gap-2 items-center justify-center w-full mx-auto py-2">
                                            {[...Array(9)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-8 h-1 rounded-full ${i < step ? "bg-[#2F1107]" : "bg-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className='space-y-3'>
                                            <RadioGroup
                                                className="w-full gap-7"
                                                value={selectedStyle}
                                                onValueChange={(value) => setSelectedStyle(value)}
                                            >
                                                {options.map((style, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center border-b border-[#2F1107] justify-between pb-2"
                                                    >
                                                        <Label
                                                            className="text-sm font-medium text-[#2F1107]"
                                                            htmlFor={style.value}
                                                        >
                                                            {style.label}
                                                        </Label>
                                                        <RadioGroupItem
                                                            className="border-[#2F1107]
                                                            text-[#2F1107]
                                                            data-[state=checked]:bg-[#2F1107]
                                                            data-[state=checked]:border-[#2F1107]
                                                            data-[state=checked]:text-[#2F1107]"
                                                            value={style.value}
                                                            id={style.value}
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-background">
                                        <button
                                            type='button'
                                            onClick={handleNext}
                                            disabled={!selectedStyle}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {step === 1 ? "Next" : "Finish"}
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
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Page = () => {
    const [payment, setPayment] = useState("");

    return (
        <>
            <Navbar />

            <section className='overflow-y-auto flex flex-col flex-1 pt-10 md:px-0 px-4 w-full h-full md:flex-initial bg-[#FFFFF5]'>
                <div className="max-w-xl mx-auto w-full flex flex-col flex-1">
                    <div className='flex flex-col w-full gap-4 md:gap-6 items-stretch justify-start flex-nowrap flex-1 min-h-0'>
                        <div className='flex flex-row gap-3 items-center justify-between flex-nowrap'>
                            <div className="flex flex-col w-full gap-1 items-stretch justify-start flex-nowrap">
                                <div className="flex flex-row gap-1 items-center justify-start flex-nowrap">
                                    <h1 className="text-2xl md:text-3xl font-bold font-serif">Book your next Kin</h1>
                                </div>
                                <p className="text-base text-muted-foreground">Friends are waiting for you</p>
                            </div>
                        </div>
                        <RadioGroup
                            className="grid gap-6 outline-none"
                            value={payment}
                            onValueChange={(value) => setPayment(value)}
                        >
                            {/* One-Time Payment Option */}
                            <div
                                className={`relative flex w-full items-start gap-3 border p-4 rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${payment === "oneTime"
                                        ? "bg-[#2F1107] border-[#2F1107] text-white scale-[1.02]"
                                        : "bg-white border-gray-300 hover:bg-[#2F1107]/10 text-[#2F1107]"
                                    }`}
                                onClick={() => setPayment("oneTime")}
                            >
                                <RadioGroupItem
                                    value="oneTime"
                                    id="one-time"
                                    className="mt-1 text-[#2F1107] data-[state=checked]:bg-white data-[state=checked]:border-white"
                                />
                                <Label htmlFor="one-time" className="flex flex-col gap-1 cursor-pointer w-full">
                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`text-lg md:text-xl font-semibold ${payment === "oneTime" ? "text-white" : "text-[#2F1107]"
                                                }`}
                                        >
                                            One Time
                                        </span>
                                        <span
                                            className={`text-base md:text-lg font-bold ${payment === "oneTime" ? "text-[#FFD100]" : "text-[#2F1107]"
                                                }`}
                                        >
                                            $300.00
                                        </span>
                                    </div>
                                    <span
                                        className={`text-sm ${payment === "oneTime" ? "text-white/80" : "text-[#2F1107]/70"
                                            }`}
                                    >
                                        Pay once and enjoy lifetime access without renewal.
                                    </span>
                                </Label>
                            </div>

                            {/* Subscription Payment Option (Recommended) */}
                            <div
                                className={`relative flex w-full items-start gap-3 border p-4 rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${payment === "subscription"
                                        ? "bg-[#2F1107] border-[#2F1107] text-white scale-[1.02]"
                                        : "bg-white border-gray-300 hover:bg-[#2F1107]/10 text-[#2F1107]"
                                    }`}
                                onClick={() => setPayment("subscription")}
                            >
                                {/* Recommended Badge */}
                                <span className="absolute -top-3 right-3 bg-[#FFD100] text-[#2F1107] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                    Recommended
                                </span>

                                <RadioGroupItem
                                    value="subscription"
                                    id="subscription"
                                    className="mt-1 text-[#2F1107] data-[state=checked]:bg-white data-[state=checked]:border-white"
                                />
                                <Label htmlFor="subscription" className="flex flex-col gap-1 cursor-pointer w-full">
                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`text-lg md:text-xl font-semibold ${payment === "subscription" ? "text-white" : "text-[#2F1107]"
                                                }`}
                                        >
                                            Subscription
                                        </span>
                                        <span
                                            className={`text-base md:text-lg font-bold ${payment === "subscription" ? "text-[#FFD100]" : "text-[#2F1107]"
                                                }`}
                                        >
                                            $30.00 / month
                                        </span>
                                    </div>
                                    <span
                                        className={`text-sm ${payment === "subscription" ? "text-white/80" : "text-[#2F1107]/70"
                                            }`}
                                    >
                                        Pay monthly and cancel anytime.
                                    </span>
                                </Label>
                            </div>
                        </RadioGroup>
                        <button type="button" className='bg-[#2f1107] rounded-full w-full py-3 text-base font-semibold transition-colors duration-500 text-white cursor-pointer hover:bg-[#ffd100] hover:text-[#2f1107]'>Proceed to Checkout</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page
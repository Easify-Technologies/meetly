'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { useAddUser } from "@/app/queries/add-user";

interface UserDetailsProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  city_id?: string;
  cafe_id?: string;
  connectionStyle?: string;
  communicationStyle?: string;
  socialStyle?: string;
  healthFitnessStyle?: string;
  family?: number;
  spirituality?: number;
  politicsNews?: number;
  humor?: number;
  peopleType?: string[];
  gender?: string;
  dateOfBirth?: string;
  [key: string]: any;
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<UserDetailsProps>({
    name: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const { name, email, phoneNumber, password } = formData;

  useEffect(() => {
    const entries = Array.from(searchParams.entries());
    const queryParams = Object.fromEntries(entries);

    const parsedParams: Partial<UserDetailsProps> = Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (["family", "spirituality", "politicsNews", "humor"].includes(key)) {
          acc[key] = Number(value);
        } else if (key === "peopleType") {
          acc[key] = decodeURIComponent(value).split(",");
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {} as Partial<UserDetailsProps>
    );

    setFormData((prev) => ({
      ...prev,
      ...parsedParams,
    }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const { mutate, isPending, isSuccess, isError, data, error } = useAddUser();

  const handleSubmitUserDetails = () => {
    console.log("Final submitted data:", formData);
    mutate(formData);
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
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What is your name?</h1>
                    <input type="text" value={name} id="name" name="name" onChange={handleChange} className="bg-muted px-5 py-2 outline border-0 rounded-full w-full h-12 text-[#2F1107] font-medium text-base" />
                    <div className='pt-6 border-t border-[#f7f0f2]'>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What is your email?</h1>
                      <input type="email" value={email} id="email" name="email" onChange={handleChange} className="bg-muted px-5 py-2 outline border-0 rounded-full w-full h-12 text-[#2F1107] font-medium text-base mt-6" />
                    </div>
                    <div className='py-6 border-t border-[#f7f0f2]'>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What is phone number?</h1>
                      <input type="text" value={phoneNumber} id="phoneNumber" name="phoneNumber" onChange={handleChange} className="bg-muted px-5 py-2 outline border-0 rounded-full w-full h-12 text-[#2F1107] font-medium text-base mt-6" />
                    </div>
                    <div className='py-6 border-t border-[#f7f0f2]'>
                      <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#2F1107] font-semibold">What is your password?</h1>
                      <input type="password" value={password} id="password" name="password" onChange={handleChange} className="bg-muted px-5 py-2 outline border-0 rounded-full w-full h-12 text-[#2F1107] font-medium text-base mt-6" />
                    </div>
                  </div>
                  <div className="p-4 bg-background">
                    <button
                      disabled={isPending}
                      onClick={handleSubmitUserDetails}
                      type="button"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isPending ? "Signing up..." : "Sign up"}
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
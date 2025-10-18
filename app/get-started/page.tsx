import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const page = () => {
  const locationsOptions = [
    { 
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Metro Manila',
      country: 'Philippines',
      imageUrl: "/location/photo-1754388298164-4db76ebc1276.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Jakarta',
      country: 'Indonesia',
      imageUrl: "/location/photo-1670163297171-075c1bbad3b0.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Seoul',
      country: 'South Korea',
      imageUrl: "/location/photo-1735253499196-8f261d5551c4.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Bali',
      country: 'Indonesia',
      imageUrl: "/location/photo-1655100021097-372e99cd9965.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Osaka',
      country: 'Japan',
      imageUrl: "/location/photo-1746431565053-87d6cc1c4e50.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Kyoto',
      country: 'Japan',
      imageUrl: "/location/photo-1588677979404-ff19ee781344.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Tokyo',
      country: 'Japan',
      imageUrl: "/location/photo-1699444116939-41ecae88b19a.jpeg"
    },
    {
      uuid: Math.random().toString(36).substring(2, 15),
      name: 'Stockholm ',
      country: 'Sweden',
      imageUrl: "/location/photo-1645096685522-5de4fd482ffd.jpeg"
    }
  ];

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
                      <div className="flex justify-end">
                        <button type="button" title="Use my location" className="p-2 cursor-pointer rounded hover:bg-muted/50 transition-colors flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#2F1107] hover:text-foreground" aria-hidden="true">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                          </svg>
                          <span className="text-sm">Use my location</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
                        {locationsOptions.map((location) => (
                          <button key={location.uuid} id={location.uuid} type="button" className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#2F1107] focus:ring-offset-2">
                            <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                              <Image width={100} height={100} alt="Metro Manila" className="h-full w-full object-cover transition-transform group-hover:scale-110" src={location.imageUrl} />
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm line-clamp-1">{location.name}</h3>
                              <p className="text-xs text-[#2F1107] line-clamp-1">{location.country}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </form>
                  </div>
                  <div className="p-4 bg-background">
                    <Link href="" data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500" role="link" aria-disabled="true">Next</Link>
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

export default page
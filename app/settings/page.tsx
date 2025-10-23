'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Loader from '@/components/ui/loader';
import { format } from "date-fns";
import { useProfileDetails } from '../queries/profile';
import Link from 'next/link';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const connectionStyles = [
    { label: "I ask questions", value: "ask_questions" },
    { label: "I share stories", value: "share_stories" },
    { label: "I listen", value: "listen" }
];

const communicationStyles = [
    { label: "Talking about life", value: "talking_about_life" },
    { label: "Exploring ideas", value: "exploring_ideas" },
    { label: "Asking big questions", value: "asking_big_questions" },
    { label: "Finding common ground", value: "finding_common_ground" }
];

const socialStyles = [
    { label: "Nature", value: "nature" },
    { label: "The City", value: "the_city" },
    { label: "At Home", value: "at_home" }
];

const healthFitnessStyles = [
    { label: "It's a big part of my lifestyle", value: "big_part_of_lifestyle" },
    { label: "I care, but I keep it balanced", value: "balanced" },
    { label: "Not a major focus right now", value: "not_major_focus" }
];

const kindOfPeople = [
    { label: "Creatives, artists and musicians", value: "creative" },
    { label: "Entrepreneurs and founders", value: "entrepreneurs" },
    { label: "Sporty, active and outdoorsy", value: "sporty" },
    { label: "Parents and family-focused", value: "parents" },
    { label: "Retired - giving back", value: "retired" },
    { label: "Deep thinkers, readers and reflective types", value: "deep_thinkers" },
    { label: "Adventurers, travelers and explorers", value: "adventurers" },
    { label: "I don't mind, everyone has a story", value: "everyone_has_story" },
];

const Page = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const email = session?.user?.email ?? "";

    const { data: profile, isLoading } = useProfileDetails(email);

    const formattedDate = profile?.dateOfBirth
        ? format(new Date(profile.dateOfBirth), "MMMM do, yyyy")
        : "";

    const peopleConnection = connectionStyles.find(
        (item) => item.value === profile?.connectionStyles
    );
    const conversation = communicationStyles.find(
        (item) => item.value === profile?.communicationStyles
    );
    const spendingTime = socialStyles.find(
        (item) => item.value === profile?.socialStyles
    );
    const healthFitness = healthFitnessStyles.find(
        (item) => item.value === profile?.healthAndFitness
    );
    const meetingPeople = kindOfPeople.filter((item) =>
        profile?.kindOfPeople?.includes(item.value)
    );

    if (isLoading) return <Loader />

    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/logout", { email });
            if (res.status === 200) {
                await signOut({ redirect: true, callbackUrl: "/login" });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto h-full">
                    <div className="h-full flex flex-col">
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <div className="relative h-full bg-background">
                                <div className="absolute inset-x-0 top-0 overflow-hidden z-0 lg:hidden" style={{ height: "calc(40vh)" }}>
                                    <div className="relative" style={{ height: "calc(30vh)" }}>
                                        <div className="w-full h-full bg-muted">
                                            <div className="max-w-1/2 mx-auto pt-12">
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
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none"></div>
                                    </div>
                                </div>
                                <div className="h-full flex flex-col overflow-hidden lg:overflow-visible lg:bg-popover">
                                    <div className="flex-1 overflow-y-auto lg:p-4 relative lg:static">
                                        <div className="h-full flex flex-col lg:h-auto">
                                            <div className="flex-1 transition-[height] duration-500 ease-in-out lg:hidden" style={{ maxHeight: "20vh", minHeight: "20vh" }}></div>
                                            <div className="relative bg-muted lg:bg-popover rounded-t-[3rem] transition-all lg:hidden max-h-0 z-10 shadow-none">
                                                <div className="px-6 py-4 pb-32">
                                                    <div className="h-4"></div>
                                                </div>
                                            </div>
                                            <div className="relative flex-1 flex flex-col bg-popover rounded-t-[3rem] shadow-t-2xl z-20">
                                                <div className="flex-1 flex flex-col p-4 lg:p-0 ">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col items-center justify-center gap-4">
                                                            <div className="relative -mt-18 lg:mt-0 flex justify-center">
                                                                <div className="relative cursor-pointer group">
                                                                    <span data-slot="avatar" className="relative flex size-8 shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white">
                                                                        <span data-slot="avatar-fallback" className="bg-muted flex size-full items-center justify-center rounded-full text-xl">{profile?.name[0].toUpperCase()}</span>
                                                                    </span>
                                                                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera w-8 h-8 text-white" aria-hidden="true">
                                                                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                                                                            <circle cx="12" cy="13" r="3"></circle>
                                                                        </svg>
                                                                    </div>
                                                                    <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground size-9 absolute bottom-0 right-0 rounded-full hover:bg-secondary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen" aria-hidden="true">
                                                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2f1107] font-semibold">{profile?.name}</h2>
                                                                <div className="text-center mt-2 flex flex-col gap-0">
                                                                    <p className="text-muted-foreground text-sm">Ticket Credits</p>
                                                                    <p className="text-2xl text-foreground h-8">0</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 flex flex-col gap-4">
                                                            <div className="flex flex-col gap-4 bg-card rounded-lg p-4 border">
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="text-base md:text-lg text-muted-foreground">Personal Information</h3>
                                                                    <button data-slot="button" className="inline-flex items-center justify-center whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-full px-3 has-[&gt;svg]:px-2.5 gap-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen h-4 w-4" aria-hidden="true">
                                                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                                                                        </svg>Edit </button>
                                                                </div>
                                                                <div className="flex flex-col gap-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-4 w-4" aria-hidden="true">
                                                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                                                <circle cx="12" cy="7" r="4"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Name</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-4 w-4" aria-hidden="true">
                                                                                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                                                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Email</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.email}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-4 w-4" aria-hidden="true">
                                                                                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Phone</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.phoneNumber}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4" aria-hidden="true">
                                                                                <path d="M8 2v4"></path>
                                                                                <path d="M16 2v4"></path>
                                                                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                                                <path d="M3 10h18"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Date of Birth</p>
                                                                            <p className="text-base md:text-lg break-words">{formattedDate}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-4 w-4" aria-hidden="true">
                                                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                                                <circle cx="12" cy="7" r="4"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Gender</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.gender}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-4 bg-card rounded-lg p-4 border">
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="text-base md:text-lg text-muted-foreground">Survey Questions</h3>
                                                                    <button data-slot="button" className="inline-flex items-center justify-center whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-full px-3 has-[&gt;svg]:px-2.5 gap-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen h-4 w-4" aria-hidden="true">
                                                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                                                                        </svg>Edit </button>
                                                                </div>
                                                                <div className="flex flex-col gap-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-4 w-4" aria-hidden="true">
                                                                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">How do you usually connect with people?</p>
                                                                            <p className="text-base md:text-lg break-words">{peopleConnection?.label}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4" aria-hidden="true">
                                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                                                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                                                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                                                <circle cx="9" cy="7" r="4"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">What makes a conversation meaningful to you?</p>
                                                                            <p className="text-base md:text-lg break-words">{conversation?.label}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4" aria-hidden="true">
                                                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                                                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">I prefer spending more time in?</p>
                                                                            <p className="text-base md:text-lg break-words">{spendingTime?.label}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-4 w-4" aria-hidden="true">
                                                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">How much does health and fitness matter to you?</p>
                                                                            <p className="text-base md:text-lg break-words">{healthFitness?.label}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4" aria-hidden="true">
                                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                                                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                                                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                                                <circle cx="9" cy="7" r="4"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">How important is family to you?</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.family}/10</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain h-4 w-4" aria-hidden="true">
                                                                                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                                                                                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                                                                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                                                                                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                                                                                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                                                                                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                                                                                <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                                                                                <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                                                                                <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">How important is spirituality to you?</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.spirituality}/10</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-newspaper h-4 w-4" aria-hidden="true">
                                                                                <path d="M15 18h-5"></path>
                                                                                <path d="M18 14h-8"></path>
                                                                                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
                                                                                <rect width="8" height="4" x="10" y="6" rx="1"></rect>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Do you enjoy discussing politics/news?</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.politicalNews}/10</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smile h-4 w-4" aria-hidden="true">
                                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                                                                <line x1="9" x2="9.01" y1="9" y2="9"></line>
                                                                                <line x1="15" x2="15.01" y1="9" y2="9"></line>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">Do you enjoy politically incorrect humor?</p>
                                                                            <p className="text-base md:text-lg break-words">{profile?.incorrectHumor}/10</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-muted-foreground">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round h-4 w-4" aria-hidden="true">
                                                                                <path d="M18 21a8 8 0 0 0-16 0"></path>
                                                                                <circle cx="10" cy="8" r="5"></circle>
                                                                                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-xs text-muted-foreground">What kind of people do you like to meet?</p>
                                                                            <p className="text-base md:text-lg break-words">{meetingPeople.length > 0
                                                                                ? meetingPeople.map((p) => p.label).join(", ")
                                                                                : null}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col w-full gap-2">
                                                                <div data-orientation="horizontal" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"></div>
                                                                <Link href="#">
                                                                    <div className="flex flex-row justify-between px-4 py-1 items-center hover:bg-muted/50 transition-colors">
                                                                        <div className="flex flex-col gap-1">
                                                                            <p className="text-base md:text-lg">Terms of Service</p>
                                                                        </div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 min-w-4 text-muted-foreground" aria-hidden="true">
                                                                            <path d="M5 12h14"></path>
                                                                            <path d="m12 5 7 7-7 7"></path>
                                                                        </svg>
                                                                    </div>
                                                                </Link>
                                                                <div data-orientation="horizontal" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"></div>
                                                                <Link href="#">
                                                                    <div className="flex flex-row justify-between px-4 py-1 items-center hover:bg-muted/50 transition-colors">
                                                                        <div className="flex flex-col gap-1">
                                                                            <p className="text-base md:text-lg">Privacy Policy</p>
                                                                        </div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 min-w-4 text-muted-foreground" aria-hidden="true">
                                                                            <path d="M5 12h14"></path>
                                                                            <path d="m12 5 7 7-7 7"></path>
                                                                        </svg>
                                                                    </div>
                                                                </Link>
                                                                <div data-orientation="horizontal" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"></div>
                                                                <Link href="#">
                                                                    <div className="flex flex-row justify-between px-4 py-1 items-center hover:bg-muted/50 transition-colors">
                                                                        <div className="flex flex-col gap-1">
                                                                            <p className="text-base md:text-lg">Community Guidelines</p>
                                                                        </div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 min-w-4 text-muted-foreground" aria-hidden="true">
                                                                            <path d="M5 12h14"></path>
                                                                            <path d="m12 5 7 7-7 7"></path>
                                                                        </svg>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <button onClick={handleLogout} data-slot="button" className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-secondary bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-12 px-4 py-2 rounded-full w-full gap-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4" aria-hidden="true">
                                                                    <path d="m16 17 5-5-5-5"></path>
                                                                    <path d="M21 12H9"></path>
                                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                                </svg>
                                                                Logout
                                                            </button>
                                                            <div className='pb-16 md:pb-0'>
                                                                <button data-slot="dialog-trigger" className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 h-12 px-4 py-2 rounded-full w-full text-destructive hover:text-destructive hover:bg-destructive/10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«rbh»" data-state="closed">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2 h-4 w-4 mr-2" aria-hidden="true">
                                                                        <path d="M3 6h18"></path>
                                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                        <line x1="10" x2="10" y1="11" y2="17"></line>
                                                                        <line x1="14" x2="14" y1="11" y2="17"></line>
                                                                    </svg>
                                                                    Delete Account
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        </>
    )
}

export default Page
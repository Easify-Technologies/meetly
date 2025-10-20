"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([10]);
  const [formData, setFormData] = useState({
    connectionStyle: "",
    communicationStyle: "",
    socialStyle: "",
    healthFitnessStyle: "",
    family: "",
    spirituality: "",
    politicsNews: "",
    humor: "",
    peopleType: ""
  });

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

  const stepHeadings: { [key: number]: string } = {
    1: "How do you usually connect with people?",
    2: "What makes a conversation meaningful to you?",
    3: "I prefer spending more time in?",
    4: "How much does health and fitness matter to you?",
    5: "How important is family to you?",
    6: "How important is spirituality to you?",
    7: "Do you enjoy discussing politics/news?",
    8: "Do you enjoy politically incorrect humor?",
    9: "What kind of people do you like to meet?"
  };

  const stepConfig: {
    [key: number]: {
      key: string;
      type: "radio" | "slider" | "multi";
      options?: { label: string; value: string }[];
    };
  } = {
    1: { key: "connectionStyle", type: "radio", options: connectionStyles },
    2: { key: "communicationStyle", type: "radio", options: communicationStyles },
    3: { key: "socialStyle", type: "radio", options: socialStyles },
    4: { key: "healthFitnessStyle", type: "radio", options: healthFitnessStyles },
    5: { key: "family", type: "slider" },
    6: { key: "spirituality", type: "slider" },
    7: { key: "politicsNews", type: "slider" },
    8: { key: "humor", type: "slider" },
    9: {
      key: "peopleType",
      type: "multi",
      options: [
        { label: "Creatives, artists and musicians", value: "creative" },
        { label: "Entrepreneurs and founders", value: "entrepreneurs" },
        { label: "Sporty, active and outdoorsy", value: "sporty" },
        { label: "Parents and family-focused", value: "parents" },
        { label: "Retired - giving back", value: "retired" },
        { label: "Deep thinkers, readers and reflective types", value: "deep_thinkers" },
        { label: "Adventurers, travelers and explorers", value: "adventurers" },
        { label: "I don't mind, everyone has a story", value: "everyone_has_story" },
      ]
    }
  };

  // current step config
  const currentConfig = stepConfig[step];
  const options = currentConfig.options;

  // compute whether Next should be disabled
  const isDisabled = (() => {
    if (currentConfig.type === "radio") return !selectedStyle;
    if (currentConfig.type === "slider") return !(sliderValue && sliderValue.length > 0);
    if (currentConfig.type === "multi") return !(selectedMulti && selectedMulti.length > 0);
    return true;
  })();

  const handleNext = () => {
    // determine value based on step type
    const { key, type } = currentConfig;

    let valueToSave: string | null = null;
    if (type === "radio") {
      valueToSave = selectedStyle || null;
    } else if (type === "slider") {
      valueToSave = (sliderValue && sliderValue.length > 0) ? String(sliderValue[0]) : null;
    } else if (type === "multi") {
      valueToSave = (selectedMulti && selectedMulti.length > 0) ? selectedMulti.join(",") : null;
    }

    if (!valueToSave) {
      // nothing selected for this step; do not proceed
      return;
    }

    const updatedForm = { ...formData, [key]: valueToSave };
    setFormData(updatedForm);

    // Update URL query params client-side without reload
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, valueToSave);
    router.replace(`?${params.toString()}`, { scroll: false });

    // Advance to next step (or finish)
    if (step < 9) {
      setStep((s) => s + 1);
      // reset states for next step
      setSelectedStyle("");
      setSelectedMulti([]);
      setSliderValue([10]);
    } else {
      // final step reached
      console.log("✅ Final Form Data:", updatedForm);
      // optionally navigate to a summary or submit endpoint here
    }
  };

  // handle multi selection clicks (max 3)
  const toggleMulti = (val: string) => {
    setSelectedMulti((prev) => {
      const exists = prev.includes(val);
      if (exists) return prev.filter((p) => p !== val);
      if (prev.length >= 3) return prev; // enforce max 3 selections
      return [...prev, val];
    });
  };

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
                      {currentConfig.type === "radio" && (
                        <RadioGroup
                          className="w-full gap-7"
                          value={selectedStyle}
                          onValueChange={(value) => setSelectedStyle(value)}
                        >
                          {options?.map((style, index) => (
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
                      )}

                      {currentConfig.type === "slider" && (
                        <div className="w-full flex flex-col items-center gap-6">
                          <Slider
                            value={sliderValue}
                            onValueChange={setSliderValue}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full max-w-md"
                          />
                          <div className="flex justify-between text-center text-muted-foreground text-sm w-full max-w-md">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <span
                                key={i}
                                className={`w-0 flex justify-center ${sliderValue[0] === i + 1
                                  ? "font-bold text-foreground"
                                  : "text-muted-foreground"
                                  }`}
                              >
                                {i + 1}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentConfig.type === "multi" && (
                        <div className="flex flex-col gap-3">
                          {currentConfig.options?.map((option) => {
                            const checked = selectedMulti.includes(option.value);
                            return (
                              <label
                                key={option.value}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${checked ? "bg-[#FFD100] text-[#2F1107]" : ""}`}
                              >
                                <input
                                  type="checkbox"
                                  value={option.value}
                                  checked={checked}
                                  onChange={() => toggleMulti(option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            );
                          })}
                          <p className="text-xs text-muted-foreground">You can select up to 3</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-background">
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isDisabled}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base font-medium transition-all select-none bg-[#FFD100] text-[#2F1107] hover:bg-[#2F1107] hover:text-[#ffd100] h-12 px-4 py-2 rounded-full w-full duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {step === 9 ? "Finish" : "Next"}
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
  );
}

export default Page;
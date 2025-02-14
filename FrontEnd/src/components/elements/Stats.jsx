import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export const Stats = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-24">
      <h2 className="mb-8 text-center text-base text-grey-900 sm:text-lg md:mb-16">
        BUILD TRUST WITH YOUR USERS WITH A
        <span className="text-[#008170]"> RELIABLE NEUROTECH AI</span>
      </h2>

      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={93}
          suffix="%"
          subheading="Accuracy in real-time brain activity analysis"
        />
        <div className="h-[1px] w-12 bg-[#008170] sm:h-12 sm:w-[1px]" />
        <Stat
          num={20}
          suffix="K+"
          subheading="Successful AI-powered diagnoses"
        />
        <div className="h-[1px] w-12 bg-[#008170] sm:h-12 sm:w-[1px]" />
        <Stat
          num={99.8}
          decimals={1}
          suffix="%"
          subheading="Ensuring uninterrupted AI uptime."
        />
      </div>
    </div>
  );
};

const Stat = ({ num, suffix, decimals = 0, subheading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold sm:text-6xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-48 text-center text-neutral-600">{subheading}</p>
    </div>
  );
};

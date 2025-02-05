import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiXSquare } from "react-icons/fi";

export const Pricing = () => {
  const [selected, setSelected] = useState("annual");
  return (
    <div >
      <section className="mx-auto max-w-7xl px-2 py-24 md:px-4">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-4xl font-bold leading-[1.15] md:text-6xl md:leading-[1.15]">
          Pricing
        </h2>
        <Toggle selected={selected} setSelected={setSelected} />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          <PriceColumn
            title="Basic"
            price="FREE"
            statement="For individuals seeking an entry-level AI assistant to streamline neuro healthcare tasks. Free forever."
            items={[
              {
                children: "Limited User License",
                checked: true,
              },
              {
                children: "Basic Neuro Data Analysis",
                checked: true,
              },
              {
                children: "Basic Reporting",
                checked: true,
              },
              {
                children: "Limited AI Support",
                checked: true,
              },
              {
                children: "Data Encryption",
                checked: false,
              },
              {
                children: "Enterprise Support",
                checked: false,
              },
              {
                children: "Custom AI Model Deployment",
                checked: false,
              },
              {
                children: "Advanced Predictive Analytics",
                checked: false,
              },
            ]}
          />
          <PriceColumn
            title="Professional"
            price={selected === "monthly" ? "29" : "19"}
            statement="For healthcare professionals seeking robust AI tools to improve patient care and neuro healthcare efficiency."
            highlight
            items={[
              {
                children: "User Licenses",
                checked: true,
              },
              {
                children: "Advanced Neuro Data Analysis",
                checked: true,
              },
              {
                children: "Customized Reporting",
                checked: true,
              },
              {
                children: "AI-Driven Recommendations",
                checked: true,
              },
              {
                children: "Data Encryption",
                checked: true,
              },
              {
                children: "Enterprise Support",
                checked: true,
              },
              {
                children: "Custom AI Model Deployment",
                checked: false,
              },
              {
                children: "Advanced Predictive Analytics",
                checked: false,
              },
            ]}
          />
          <PriceColumn
            title="Enterprise"
            price={selected === "monthly" ? "49" : "39"}
            statement="For large healthcare teams needing advanced enterprise-scale AI features for neuro care."
            items={[
              {
                children: "User Licenses",
                checked: true,
              },
              {
                children: "Complete Neuro Data Analysis",
                checked: true,
              },
              {
                children: "Fully Customizable Reporting",
                checked: true,
              },
              {
                children: "Real-Time AI-Driven Insights",
                checked: true,
              },
              {
                children: "Enhanced Data Encryption",
                checked: true,
              },
              {
                children: "24/7 Enterprise Support",
                checked: true,
              },
              {
                children: "Custom AI Model Deployment",
                checked: true,
              },
              {
                children: "Advanced Predictive Analytics",
                checked: true,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

const PriceColumn = ({ highlight, title, price, statement, items }) => {
  return (
    <div
      style={{
        boxShadow: highlight ? "0px 6px 0px rgb(24, 24, 27)" : "",
      }}
      className={`relative w-full rounded-lg p-6 md:p-8 ${highlight ? "border-2 border-zinc-900 bg-white" : ""}`}
    >
      {highlight && (
        <span className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-[#008170] px-2 py-0.5 text-sm text-white">
          Most Popular
        </span>
      )}

      <p className="mb-6 text-xl font-medium">{title}</p>
      <div className="mb-6 flex items-center gap-3">
        <AnimatePresence mode="popLayout">
          <motion.span
            initial={{
              y: 24,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -24,
              opacity: 0,
            }}
            key={price}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="block text-6xl font-bold"
          >
            ${price}
          </motion.span>
        </AnimatePresence>
        <motion.div layout className="font-medium text-zinc-600">
          <span className="block">/user</span>
          <span className="block">/month</span>
        </motion.div>
      </div>

      <p className="mb-8 text-lg">{statement}</p>

      <div className="mb-8 space-y-2">
        {items.map((i) => (
          <CheckListItem key={i.children} checked={i.checked}>
            {i.children}
          </CheckListItem>
        ))}
      </div>

      <button
        className={`w-full rounded-lg p-3 text-base uppercase text-white transition-colors ${
          highlight
            ? "bg-[#008170] hover:bg-[#006f59]"
            : "bg-zinc-900 hover:bg-zinc-700"
        }`}
      >
        Try it now
      </button>
    </div>
  );
};

const Toggle = ({ selected, setSelected }) => {
  return (
    <div className="relative mx-auto mt-3 flex w-fit items-center rounded-full bg-zinc-200">
      <button
        className="relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
        onClick={() => {
          setSelected("monthly");
        }}
      >
        <span className="relative z-10">Monthly</span>
      </button>
      <button
        className="relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
        onClick={() => {
          setSelected("annual");
        }}
      >
        <span className="relative z-10">Annually</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "annual" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full border border-zinc-900 bg-white"
        />
      </div>
    </div>
  );
};

const CheckListItem = ({ children, checked }) => {
  return (
    <div className="flex items-center gap-2 text-lg">
      {checked ? (
        <FiCheckCircle className="text-xl text-[#008170]" />
      ) : (
        <FiXSquare className="text-xl text-zinc-400" />
      )}
      {children}
    </div>
  );
};

import React from 'react';
import newwave from '../../assets/newwave.png'

const Features = () => {
  return (
    <section
      className="w-full h-200 flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${newwave})` }}
      id="projects"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-[30px_100px] w-full">
        {/* Left Column (Odd Numbers) */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">01</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">AI-Powered Precision</h2>
              <p className="text-left">
                Our AI analyzes medical data with exceptional accuracy, enabling faster, more informed diagnoses for better patient outcomes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">03</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">Easy & Faster Diagnoses</h2>
              <p className="text-left">
                Our solution streamlines workflows and reduces diagnosis time, allowing clinicians to focus more on patient care.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">05</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">Seamless Integration</h2>
              <p className="text-left">
                Our solution integrates effortlessly with existing systems, minimizing disruption and enhancing operational efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Even Numbers) */}
        <div className="flex flex-col gap-8 pt-12">
          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">02</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">Personalized Treatment Plans</h2>
              <p className="text-left">
                We provide insights tailored to each patient, enabling healthcare professionals to create personalized care plans with confidence.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">04</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">Real-Time Insights</h2>
              <p className="text-left">
                Access actionable data in real-time, empowering clinicians to make faster decisions and improve patient care.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <h1 className="text-5xl font-bold">06</h1>
            <div>
              <h2 className="text-xl font-semibold text-left">Data Security First</h2>
              <p className="text-left">
                We prioritize patient privacy and data security with top-tier encryption, ensuring compliance and trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

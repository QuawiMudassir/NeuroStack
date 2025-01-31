import ApHeroBg from "../../assets/ApHeroBg.png"


export default function AssistantPalHero() {
    return (
      <div className="h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center">
          
          <div className="text-left md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Hi, I am <span className="text-[#008170]">NeuroAssist PAL</span>
            </h1>
            <h3 className="text-2xl text-gray-700">
              Empowering Neurological Care With AI-Driven Insights
            </h3>
            <button className="mt-4 bg-[#008170] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#006a5b] transition">
              Learn More
            </button>
          </div>
  
          
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={ApHeroBg} 
              alt="NeuroAssist PAL" 
              className="w-full md:w-[100%] lg:w-[100%] h-auto"
            />
          </div>
  
        </div>
      </div>
    );
  }
  
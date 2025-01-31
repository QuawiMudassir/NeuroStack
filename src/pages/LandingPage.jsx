import Navbar from "../components/ui/Navbar";
import AssistantPalHero from "../components/elements/AssistantPalHero";
import Features from "../components/elements/Features";
import {Pricing} from "../components/elements/Pricing"
import {Stats} from "../components/elements/Stats"
import ContactSales from "../components/elements/ContactSales";
import Footer from "../components/ui/Footer";

function LandingPage(){
    return(
        <div>
            <Navbar />
            <AssistantPalHero />
            <Features />
            <Stats />
            <Pricing />
            <ContactSales />
            <Footer />
        </div>
        
        
    )
}

export default LandingPage;
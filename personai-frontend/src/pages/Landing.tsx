import { FAQSection } from "../components/section/FAQSection";
import { Navbar } from "../components/section/Navbar";
import { HeroSection } from "../components/section/HeroSection";
import { Footer } from "../components/section/Footer";

export function Landing(){
    return(
        <div className="h-screen w-screen bg-white">
            <Navbar />
            <HeroSection />
            <FAQSection />
            <Footer />
        </div>
    )
}
import Overflowspread from "@/app/_components/OverflowSpread"
import AboutHero from "@/app/_sections/AboutHero"
import AboutServices from "@/app/_sections/AboutServices"
import FAQs from "@/app/_sections/FAQs"

function About() {
    return (
        <div>
            <AboutHero />
            <AboutServices />
            <Overflowspread/>
            <FAQs />
        </div>
    )
}

export default About

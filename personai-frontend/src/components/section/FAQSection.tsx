import { Accordian } from "../Accordian";

export function FAQSection (){
    return(
        <div className="text-center px-8 mt-8 flex flex-col items-center">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Questions & answers</h1>
                <div className="lg:max-w-[920px] my-8">
                    <Accordian 
                        question="1. What makes PersonAi different from a regular notes app?" 
                        answer="Unlike basic note-taking tools, PersonAi uses AI to summarize content, understand your notes, and help you recall key information — it&apos;s like having a second brain that thinks with you."
                    />
                    <Accordian
                        question="2. Can I save links like YouTube videos, tweets, or articles?"
                        answer="Absolutely! Just drop in a link — PersonAi will extract the core insights and summarize the content so you don&apos;t have to revisit it every time."
                    />
                    <Accordian
                        question="3. Is my data secure and private?"
                        answer="Yes. Your notes and content are stored securely and are only accessible to you. We prioritize privacy and never share your data with third parties."
                    />
                    <Accordian
                        question="4. Can I share my second brain with others?"
                        answer="Definitely! You can share your entire second brain with friends, teammates, or the public with a button toggle — your knowledge, your rules."
                    />
                </div>
            </div>
    )
}
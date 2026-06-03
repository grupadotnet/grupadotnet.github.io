import {useEffect, useState} from "react";

const PHRASES = [
    "POZNAJ NASZE KOŁO NAUKOWE!",
    "ZBUDUJ Z NAMI COŚ NIESAMOWITEGO.",
    "ROZWIJAJ Z NAMI SWOJE PASJE!"
];

export default function Hello() {
    const [text] = useState(() => {
        const randomIndex = Math.floor(Math.random() * PHRASES.length);
        return PHRASES[randomIndex];
    });
    const [id, setId] = useState<number>(0)

    useEffect(()=>{
        const typewriterInterval = setInterval(()=>{
            setId((prevId)=> {
            if(prevId >= text.length) {
                clearInterval(typewriterInterval);
                return prevId
            }
            console.log(prevId + 1)
            return prevId + 1
            })
        },150)

        return () => clearInterval(typewriterInterval)
    },[])



    return(
        <>
            <div className={"h-[100vh] w-full flex"} id={"HELLO"}>
                <p className={"text-[clamp(3rem,7vw,8rem)] mt-[35vh] w-7/8 m-auto text-balance text-white font-extralight"}>

                    <span className={"helloText"}>{text.slice(0,id)}</span><span className={"text-transparent"}>{text.slice(id,text.length)}</span>

                </p>
            </div>
        </>
    )
}
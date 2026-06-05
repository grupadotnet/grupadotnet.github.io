import {useEffect, useRef, useState} from "react";

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
    const VisibleRef = useRef<HTMLSpanElement>(null);

    useEffect(()=>{
        const typewriterInterval = setInterval(()=>{
            setId((prevId)=> {
            if(prevId >= text.length) {
                clearInterval(typewriterInterval);
                VisibleRef.current?.classList.add("after:animate-(--blink)")
                return prevId
            }
            console.log(prevId + 1)
            return prevId + 1
            })
        },125)

        return () => clearInterval(typewriterInterval)
    },[text.length])



    return(
        <>
            <div className={"h-screen w-full flex"} id={"HELLO"}>
                <p className={"text-[clamp(3rem,7vw,8rem)] mt-[35vh] w-7/8 m-auto text-balance text-white font-extralight"}>

                    <span className={"helloText after:content-['|']"} ref={VisibleRef}>{text.slice(0,id)}</span><span className={"text-transparent"}>{text.slice(id+1,text.length)}</span>

                </p>
            </div>
        </>
    )
}
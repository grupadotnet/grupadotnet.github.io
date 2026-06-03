import {useEffect, useState} from "react";

export default function Hello() {
    const [textInvisible, setTextInvisible] = useState<string>("POZNAJ NASZE KOŁO NAUKOWE!")
    const [textVisible, setTextVisible] = useState<string>("")

    function handleTypewriterStep(){
        setTextVisible(()=>textVisible.concat(textInvisible.charAt(0)))
        setTextInvisible(()=> textVisible.substring(2))
    }

    useEffect(() => {
        const typewritterInterval = setInterval(() => {
            if(textInvisible.length == 0) clearInterval(typewritterInterval)
            handleTypewriterStep();
        },100)

    })

    return(
        <>
            <div className={"from-(--primary-from) to-(--primary-to) bg-linear-[201.03deg] h-[100vh] w-full flex"} id={"HELLO"}>
                <p className={"text-[clamp(1rem,7vw,8rem)] mt-[35vh] w-7/8 m-auto text-balance text-white font-extralight"}>

                    <span>{textVisible}</span><span>{textInvisible}</span>

                </p>
            </div>
        </>
    )
}
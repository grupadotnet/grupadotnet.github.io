import LogoCyber from "../assets/icons/Cybersec_MOCK.svg"
import LogoWebapp from "../assets/icons/Webappdev_MOCK.svg"

import {useRef, useState} from "react";

const SECTION_DATA:string[][] = [["WEBAPPDEV","Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in metus dictum, viverra nunc nec, molestie lorem. Nunc dui quam, ultrices at sagittis quis, laoreet vulputate urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pharetra sed turpis in venenatis. Vivamus sit amet venenatis justo. Etiam fringilla eros massa, et sollicitudin tellus volutpat et. Integer porttitor risus ante, condimentum ultrices enim vestibulum eu. ",LogoWebapp],
    ["CYBERSECURITY","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus enim vestibulum ipsum sagittis vehicula. Praesent eu quam at velit sodales varius. Curabitur congue ultricies orci vel pharetra. Pellentesque varius magna eget porttitor pharetra. Proin ultrices, nibh id tempus varius, est arcu tempus ante, vehicula facilisis orci metus in augue. In rutrum risus non quam aliquam porta. Cras fermentum leo eget sem convallis tincidunt. Praesent rutrum vestibulum odio, sit amet tincidunt tellus facilisis vitae. Aenean semper est ac magna tincidunt, et ultricies neque bibendum. ",LogoCyber]]
export default function Sections(){
    const [sectionID, setSectionID] = useState<number>(0)
    const SectionDescRef = useRef<HTMLDivElement>(null)


    return (
        <div className={"bg-white"}>
            <div className={"flex items-center h-[50vh] w-7/8 m-auto text-lg"}>
                <div className={"flex flex-col *:m-8 justify-center w-1/4"} id={"SEKCJE"}>
                    {SECTION_DATA.map((section_data,i)=>
                        <div key={section_data[0]} className={"cursor-pointer flex section-title items-center"}
                             onClick={()=> {
                                 setSectionID(()=>i);
                                SectionDescRef.current?.animate(
                                    [{ opacity: 0, transform: "translateY(5px)" },
                                    { opacity: 1, transform: "none" }],
                                    { duration: 250, easing: "ease-out" })
                             }}>
                        <img srcSet={section_data[2]} alt={ section_data[0] + " logo"} className={"mr-5 size-18"}/>
                        <span>{section_data[0]}</span>
                    </div>)}
                </div>
                <div className={"flex items-center text-justify w-3/4 justify-center"} ref={SectionDescRef}>
                    {SECTION_DATA[sectionID][1]}
                </div>
            </div>
        </div>
    )
}
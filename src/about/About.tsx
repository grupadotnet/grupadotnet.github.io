import {useOnInView} from "react-intersection-observer";

export default function About() {

    const AboutRef = useOnInView(
        (inView, entry) => {
            if(inView){
                entry.target.classList.add("show")
            }
        },
        {
            threshold: 0.6,
            triggerOnce: true,
        }

    );

    return (
        <div className="about bg-white">
            <section className={"flex items-center h-200 w-7/8 m-auto text-lg"} ref={AboutRef}>
                <p className={"text-3xl w-1/4 title"} id={"O_NAS"}>O NAS</p>
                <p className={"text-justify w-3/4 description"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed imperdiet urna viverra risus porttitor eleifend. Quisque faucibus ut ante vel pretium. Nulla a odio mauris. Phasellus faucibus blandit nulla, vel tempus diam tempus et. Nunc odio augue, pulvinar id ligula nec, pretium sodales ipsum. Morbi vel tellus at dui lobortis tincidunt. Pellentesque finibus nibh magna, at ultricies nunc accumsan quis. Maecenas bibendum neque libero, nec molestie dui vestibulum ac. Integer urna ligula, sollicitudin in sem et, bibendum rhoncus sapien. Etiam lectus diam, ultrices sit amet pretium ac, dignissim id sapien. Donec imperdiet tincidunt urna. Duis quis imperdiet justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Nullam tincidunt sit amet massa a facilisis. Praesent convallis sit amet dolor id luctus.
                </p>
            </section>
        </div>
    )
}
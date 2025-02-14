import Tap from "./UI/Tap.tsx";
import {motion} from "framer-motion";
import {useState} from "react";
import {TiLocationArrow} from "react-icons/ti";
import Features from "./Features.tsx";

export default  function SlideTaps() {
    const [position, setPosition] = useState({
        width:0,
        opacity:0,
        left:0,
    });
    return (
        <>
            <div onMouseLeave={() => {
                setPosition(pv => ({
                    ...pv,
                    opacity:0,
                }))
            }} className={'hidden md:flex relative mx-auto w-fit rounded-full'}>

                <Tap setPosition={setPosition}>
                    nexus <TiLocationArrow/>
                </Tap>
                <Tap setPosition={setPosition}>
                    vault <TiLocationArrow/>
                </Tap>
                <Tap setPosition={setPosition}>
                    features
                </Tap>
                <Tap setPosition={setPosition}>
                    about
                </Tap>
                <Tap setPosition={setPosition}>
                    contact
                </Tap>
                <motion.div animate={position}
                            className={'absolute z-0 h-5 w-36 rounded-full bg-white md:h-10 self-center'}/>
            </div>
        </>

    )
}
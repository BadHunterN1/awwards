import {useEffect, useRef, useState} from "react";

import Button from "./UI/Button.tsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';

const totalVideos = 4;
export default  function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [loadedVideos, setLoadedVideos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const nextVideoRef = useRef<HTMLVideoElement>(null);

    // currentIndex + 1 and if it more than total videos return to 1
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
    function getVideoSrc(index: number) {
        return `videos/hero-${index}.mp4`
    }

    function handleVideoLoad() {
        setLoadedVideos(prev => prev+1)


    }

    function handleMiniVdClick() {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', {visibility: 'visible'});

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 0.5,
                ease: 'power1.inOut',
                onStart: () => {
                    if (nextVideoRef.current) {
                        nextVideoRef.current.play().catch(error => {
                            console.error('Error playing video:', error);
                        });
                    }
                },
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1,
                ease: 'power1.inOut',
                delay: 1
            })
        }
    }, {dependencies:[currentIndex], revertOnUpdate: true})

    useGSAP(() => {

    })

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div className='relative z-10 h-dvh w-screen overflow-hidden rounded-b-lg bg-blue-75' id='video-frame'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVdClick}
                             className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video loop muted id='current-video'
                                   onLoadedData={handleVideoLoad}
                                   className='size-64 origin-center scale-150 object-cover object-center'
                                   ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} />
                        </div>
                    </div>
                    <video id='next-video' ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                           onLoadedData={handleVideoLoad}
                    />
                    <video src={ getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                           autoPlay loop muted onLoadedData={handleVideoLoad}
                           className='absolute left-0 top-0 size-full object-cover object-center'
                    />
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    G<b>a</b>ming
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full '>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            redefi<b>n</b>e
                        </h1>
                        <p className='text-xl mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter The Metagame Layer <br/> Unleash the play Economy
                        </p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass='!bg-yellow-300 flex-center gap-1'/>
                    </div>
                </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
                G<b>a</b>ming
            </h1>
        </div>
    )
}
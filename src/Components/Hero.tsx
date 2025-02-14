import {useEffect, useRef, useState} from "react";

import Button from "./UI/Button.tsx";
import {TiLocationArrow} from "react-icons/ti";
import useHook, {useHookVideos} from "./hooks/useHook.ts";

const totalVideos = 4;
const words = ['','g<b>a</b>ming', 'ide<b>n</b>tity', 're<b>a</b>lity', 'ag<b>e</b>ntic ai'];

export default  function Hero() {
    const [controlVideo, setControlVideo] = useState({
        currentIndex: 1,
        hasClicked: false,
        isNext: false,
        nextIndex: 2,
        nextIndex1: 3,
    });
    const [isInteractable, setIsInteractable] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const miniVideoContainerRef = useRef<HTMLDivElement>(null);
    const videoFrameRef = useRef<HTMLDivElement>(null);

    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideo1Ref = useRef<HTMLVideoElement>(null);
    const nextVideo2Ref = useRef<HTMLVideoElement>(null);

    // currentIndex + 1 and if it more than total videos return to 1
    const upcomingVideoIndex = (controlVideo.currentIndex % totalVideos) + 1;

    function getVideoSrc(index: number) {
        return `videos/hero-${index}.mp4`
    }

    function handleVideoLoad() {
        setLoadedVideos(prev => prev + 1);
    }

    function handleMiniVdClick() {
        if (controlVideo.hasClicked || !isInteractable) return;
        setIsInteractable(false);
        setControlVideo(prev => {
            return {
                ...prev,
                hasClicked: true,
                currentIndex: upcomingVideoIndex
            }
        });
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    const refs = {
        sectionRef,
        miniVideoContainerRef,
        nextVideoRef,
    }

    useHook(refs);

    const states = {
        controlVideo,
        setControlVideo,
        setIsInteractable,
        nextVideo1Ref,
        nextVideo2Ref,
    }
    useHookVideos(states);

    return (
        <div ref={sectionRef} className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading && (
                <div className={'flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50'}>
                    <div className={'three-body' }>
                        <div className={'three-body__dot'}/>
                        <div className={'three-body__dot'}/>
                        <div className={'three-body__dot'}/>
                    </div>
                </div>
            )}
            <div ref={videoFrameRef} className='relative z-10 h-dvh w-screen overflow-hidden rounded-b-lg bg-blue-75' id='video-frame'>
                <div>
                    <div ref={miniVideoContainerRef} className='mask-clip-path absolute-center absolute z-50 size-44 md:size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVdClick}
                             className={`origin-center transition-all duration-500 delay-200 ease-in
                             `}>
                            <video
                                   loop muted id='current-video'
                                   onLoadedData={handleVideoLoad}
                                   className='size-64 origin-center scale-150 object-cover object-center '
                                   ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} />
                        </div>
                    </div>
                    <video id='next-video' ref={nextVideo1Ref} src={getVideoSrc(controlVideo.nextIndex)} loop muted
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                           onLoadedData={handleVideoLoad}
                    />
                    <video id='next-video1' ref={nextVideo2Ref} src={getVideoSrc(controlVideo.nextIndex1)} loop muted
                    className='absolute-center invisible absolute z-30 size-64 object-cover object-center'
                           onLoadedData={handleVideoLoad}
                    />
                    <video src={getVideoSrc(1)}
                           autoPlay loop muted onLoadedData={handleVideoLoad}
                           className='absolute left-0 top-0 size-full object-cover object-center'
                    />
                </div>
                <div className="absolute bottom-5 right-5 z-40 min-h-[50px]">
                    <h1
                        className='special-font hero-heading text-blue-75 word-container-current'
                        dangerouslySetInnerHTML={{
                            __html: words[controlVideo.currentIndex - 1]
                        }}
                        style={{ position: 'absolute', bottom: 0, right: 0 }}
                    />
                    <h1
                        className='special-font hero-heading text-blue-75 word-container-next'
                        dangerouslySetInnerHTML={{
                            __html: words[controlVideo.currentIndex === words.length ? 1 : controlVideo.currentIndex ]
                        }}
                    />
                </div>
                <div className='absolute left-0 top-0 z-40 size-full '>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            redefi<b>n</b>e
                        </h1>
                        <p className='text-xl mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter The Metagame Layer <br/> Unleash the play Economy
                        </p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass='bg-yellow-300! flex-center gap-1'/>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-5 right-5 min-h-[50px]">
                <h1
                    className='special-font hero-heading text-black word-container-next'
                    dangerouslySetInnerHTML={{
                        __html: words[controlVideo.currentIndex === words.length ? 1 : controlVideo.currentIndex ]
                    }}
                />
            </div>
        </div>
    )
}
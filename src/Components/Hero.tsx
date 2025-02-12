import {useEffect, useRef, useState} from "react";

import Button from "./UI/Button.tsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const totalVideos = 4;
    let nextIndex = 2;
    let nextIndex1 = 3;
const words = ['','g<b>a</b>ming', 'ide<b>n</b>tity', 're<b>a</b>lity', 'ag<b>e</b>ntic ai']
export default  function Hero() {
    const [controlVideo, setControlVideo] = useState({
        currentIndex: 1,
        hasClicked: false,
        isNext: false,
    });
    const [isInteractable, setIsInteractable] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const miniVideoContainerRef = useRef<HTMLDivElement>(null);
    const videoFrameRef = useRef<HTMLDivElement>(null);

    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideo1Ref = useRef<HTMLVideoElement>(null);
    const nextVideo2Ref = useRef<HTMLVideoElement>(null);

    // currentIndex + 1 and if it more than total videos return to 1
    const upcomingVideoIndex = (controlVideo.currentIndex % totalVideos) + 1;
    console.log(upcomingVideoIndex)
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

    useGSAP(() => {
        if (!miniVideoContainerRef.current || !isInteractable) return;

        const card = miniVideoContainerRef.current;
        const bounds = card.getBoundingClientRect();

        // Animation config
        const config = {
            rotationStrength: 25,    // Reduced from 15 for subtler effect
            perspective: 800,       // Increased for more realistic depth
            smoothing: 0.1,        // Lower = smoother movement
            scale: 1.02            // Reduced scale effect
        };

        function animateCard(e: MouseEvent) {
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            // Calculate rotation based on mouse distance from center
            const rotateY = ((e.clientX - centerX) / bounds.width) * config.rotationStrength;
            const rotateX = ((e.clientY - centerY) / bounds.height) * -config.rotationStrength;

            gsap.to(card, {
                rotateX,
                rotateY,
                scale: config.scale,
                duration: config.smoothing,
                ease: "power2.out",
                transformPerspective: config.perspective,
                transformOrigin: "center"
            });
        }

        function resetCard() {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.4,
                ease: "power3.out"
            });
        }

        card.addEventListener('mousemove', animateCard);
        card.addEventListener('mouseleave', resetCard);

        return () => {
            card.removeEventListener('mousemove', animateCard);
            card.removeEventListener('mouseleave', resetCard);
        };
    }, [isInteractable]);

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    useGSAP(() => {
        if (controlVideo.hasClicked) {
            if (!controlVideo.isNext) {
                gsap.set('#next-video', { visibility: 'visible' });
                gsap.to('#next-video', {
                    transformOrigin: 'center center',
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    duration: 0.35,
                    ease: 'power1.inOut',
                    onStart: () => {
                        if (nextVideoRef.current) {
                            nextVideoRef.current.play().catch(console.error);
                        }
                    },
                    onComplete: () => {
                        if (nextVideo2Ref.current) {
                            nextVideo2Ref.current.pause();
                        } else {
                            console.error("nextVideo2Ref is null. Video element not found.");
                        }
                        if (nextIndex === 2 && nextIndex1 === 1 && !controlVideo.isNext ) {
                            nextIndex1 = 3;
                        }
                        gsap.to('#next-video1', { visibility: 'hidden', zIndex: '30', width:'0', height:'0', transform:'-50% -50%',top: '50%', left: '50%' });
                        gsap.to('#next-video', { zIndex: '20'});
                        if (nextIndex === 4 ) {
                            nextIndex1 = 1;
                        }
                        setControlVideo(prev => {
                            return {
                               ...prev,
                                hasClicked: false,
                                isNext: !prev.isNext
                            };
                        });
                        setTimeout(() => {
                            setIsInteractable(true);
                        }, 500);
                    }
                });
            } else {
                gsap.set('#next-video1', { visibility: 'visible' });
                gsap.to('#next-video1', {
                    transformOrigin: 'center center',
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    duration: 0.35,
                    ease: 'power1.inOut',
                    onStart: () => {
                        if (nextVideo1Ref.current) {
                            nextVideo1Ref.current.play().catch(console.error);
                        }
                    },
                    onComplete: () => {
                        gsap.to('#next-video', { visibility: 'hidden', zIndex: '30', width:'0', height:'0', transform:'-50% -50%',top: '50%', left: '50%' });
                        gsap.to('#next-video1', {zIndex: '20'});
                        nextIndex = 4;
                        if (nextIndex === 4 && nextIndex1 === 1 ) {
                            nextIndex = 2;
                        }
                        setControlVideo(prev => {
                            return {
                                ...prev,
                                hasClicked: false,
                                isNext: !prev.isNext
                            };
                        });
                        setTimeout(() => {
                            setIsInteractable(true);
                        }, 500);
                    }
                });
            }

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'power1.inOut',
                delay: 0.45,
            })
            gsap.to('#current-video', {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power1.inOut',
            })

            const tl = gsap.timeline();
            const currentContainer = document.querySelector('.word-container-current');
            const nextContainer = document.querySelectorAll('.word-container-next');

            if (currentContainer && nextContainer) {
                // Reset positions
                gsap.set(currentContainer, {
                    x: 0,
                    opacity: 1,
                });

                gsap.set(nextContainer, {
                    x: controlVideo.isNext ? '100%' : '-100%',
                    opacity: 0,
                });

                // Animation
                tl.to(currentContainer, {
                    x: controlVideo.isNext ? '-100%' : '100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                })
                    .to(nextContainer, {
                        x: '0%',
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    }, '<');
            }
        }
    }, { dependencies: [controlVideo.currentIndex] });
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%',
        })

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,

            }
        })
    })

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading && (
                <div className={'flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'}>
                    <div className={'three-body' }>
                        <div className={'three-body__dot'}/>
                        <div className={'three-body__dot'}/>
                        <div className={'three-body__dot'}/>
                    </div>
                </div>
            )}
            <div ref={videoFrameRef} className='relative z-10 h-dvh w-screen overflow-hidden rounded-b-lg bg-blue-75' id='video-frame'>
                <div>
                    <div ref={miniVideoContainerRef} className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVdClick}
                             className={`origin-center scale-50 opacity-0 transition-all duration-500 delay-200 ease-in
                             ${isInteractable ? 'hover:scale-100 hover:opacity-100' : ''}`}>
                            <video
                                   loop muted id='current-video'
                                   onLoadedData={handleVideoLoad}
                                   className='size-64 origin-center scale-150 object-cover object-center '
                                   ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} />
                        </div>
                    </div>
                    <video id='next-video' ref={nextVideoRef} src={getVideoSrc(nextIndex)} loop muted
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                           onLoadedData={handleVideoLoad}
                    />
                    <video id='next-video1' ref={nextVideo1Ref} src={getVideoSrc(nextIndex1)} loop muted
                    className='absolute-center invisible absolute z-30 size-64 object-cover object-center'
                           onLoadedData={handleVideoLoad}
                    />
                    <video ref={nextVideo2Ref} src={getVideoSrc(1)}
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
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass='!bg-yellow-300 flex-center gap-1'/>
                    </div>
                </div>
            </div>
            {/*<h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'*/}
            {/*    dangerouslySetInnerHTML={{*/}
            {/*        __html: words[controlVideo.currentIndex]*/}
            {/*    }}/>*/}
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
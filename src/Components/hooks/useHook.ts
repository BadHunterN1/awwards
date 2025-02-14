import {Dispatch, RefObject, SetStateAction, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type refs = {
    sectionRef: RefObject<HTMLDivElement |null>,
    miniVideoContainerRef: RefObject<HTMLDivElement |null>,
    nextVideoRef: RefObject<HTMLVideoElement |null>,
}

type controlVideoProps = {
    currentIndex: number;
    hasClicked: boolean;
    isNext: boolean;
    nextIndex:number;
    nextIndex1: number;
}
type states = {
    controlVideo: controlVideoProps
    nextVideo2Ref: RefObject<HTMLVideoElement | null>;
    nextVideo1Ref: RefObject<HTMLVideoElement | null>;
    setControlVideo: Dispatch<SetStateAction<controlVideoProps>>
    setIsInteractable: Dispatch<SetStateAction<boolean>>
}

export default function useHook({sectionRef, miniVideoContainerRef, nextVideoRef}:refs) {
    const [isHovered, setIsHovered] = useState(false);
    const animationStateRef = useRef<string>('idle');

    useGSAP(() => {
        if (!sectionRef.current || !miniVideoContainerRef.current || !nextVideoRef.current) return;

        const section = sectionRef.current;
        const miniContainer = miniVideoContainerRef.current;
        const nextVideo = nextVideoRef.current;
        const elements = [miniContainer, nextVideo];

        const enterAnimation = gsap.timeline({ paused: true })
            .fromTo(elements, {
                scale: 0,
                delay: 0.5,
            }, {
                scale: 0.5,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                onStart: () => {
                    animationStateRef.current = 'entering';
                },
                onComplete: () => {
                    if (animationStateRef.current === 'entering') {
                        animationStateRef.current = 'idle';
                    }
                }
            });

        const config = {
            rotationStrength: 25,
            perspective: 500,
            smoothing: 0.3,
            scale: 1.12
        };

        let mouseMoveTimeout: number | undefined;
        let isMouseIdle = true;
        let reenterDelay: number | undefined;

        function handleMouseEnter() {
            if (reenterDelay) {
                clearTimeout(reenterDelay);
                reenterDelay = undefined;
            }
            if (animationStateRef.current === 'leaving') {
                gsap.killTweensOf(elements);
                reenterDelay = setTimeout(() => {
                    animationStateRef.current = 'idle';
                    reenterDelay = undefined;
                }, 100) as unknown as number;
                return;
            }
            if (animationStateRef.current !== 'idle' && animationStateRef.current !== 'entering') {
                return;
            }
            setIsHovered(true);
            clearTimeout(mouseMoveTimeout);
            isMouseIdle = false;
            enterAnimation.play();
        }

        function handleMouseLeave() {
            if (animationStateRef.current === 'entering') {
                enterAnimation.pause();
            }
            animationStateRef.current = 'leaving';

            setIsHovered(false);
            clearTimeout(mouseMoveTimeout);
            isMouseIdle = true;
            gsap.to(elements, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    if (animationStateRef.current === 'leaving') {
                        animationStateRef.current = 'idle';
                    }
                }
            });
            gsap.to(elements, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.3
            });
        }

        function handleMouseMove(e: MouseEvent) {
            if (!isHovered || animationStateRef.current === 'leaving') return;

            if (isMouseIdle) {
                isMouseIdle = false;
                gsap.to(elements, {
                    scale: config.scale,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out"
                });
            }

            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => {
                if (isHovered) {
                    gsap.to([miniContainer], {
                        scale: 0,
                        opacity: 0,
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.4,
                        ease: "power3.in"
                    });
                    isMouseIdle = true;
                }
            }, 700);

            // Apply rotation
            const bounds = section.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            const rotateY = ((e.clientX - centerX) / bounds.width) * config.rotationStrength;
            const rotateX = ((e.clientY - centerY) / bounds.height) * -config.rotationStrength;

            gsap.to(elements, {
                rotateX,
                rotateY,
                scale: config.scale,
                duration: config.smoothing,
                ease: "power2.out",
                transformPerspective: config.perspective,
                transformOrigin: "center"
            });
        }
        function handleDocumentEvents() {
            if (isHovered) {
                handleMouseLeave();
            }
        }
        section.addEventListener('mouseenter', handleMouseEnter);
        section.addEventListener('mouseleave', handleMouseLeave);
        section.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('blur-sm', handleDocumentEvents);
        document.addEventListener('mouseleave', handleDocumentEvents);

        return () => {
            clearTimeout(mouseMoveTimeout);
            section.removeEventListener('mouseenter', handleMouseEnter);
            section.removeEventListener('mouseleave', handleMouseLeave);
            section.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('blur-sm', handleDocumentEvents);
            document.removeEventListener('mouseleave', handleDocumentEvents);
        };
    }, [isHovered]);
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
                end: 'bottom =+100',
                scrub: true,

            }
        })
    })
}

export function useHookVideos({nextVideo1Ref, nextVideo2Ref, controlVideo,setControlVideo,setIsInteractable}:states) {
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
                        if (nextVideo1Ref.current) {
                            nextVideo1Ref.current.play().catch(console.error);
                        }
                    },
                    onComplete: () => {
                        if (nextVideo2Ref.current) {
                            nextVideo2Ref.current.pause();
                        } else {
                            console.error("nextVideo2Ref is null. Video element not found.");
                        }
                        if (controlVideo.nextIndex === 2 && controlVideo.nextIndex1 === 1 && !controlVideo.isNext ) {
                            controlVideo.nextIndex1 = 3;
                        }
                        gsap.to('#next-video1', { visibility: 'hidden', zIndex: '30', width:'0', height:'0', transform:'-50% -50%',top: '50%', left: '50%' });
                        gsap.to('#next-video', { zIndex: '20'});
                        if (controlVideo.nextIndex === 4 ) {
                            controlVideo.nextIndex1 = 1;
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
                        if (nextVideo2Ref.current) {
                            nextVideo2Ref.current.play().catch(console.error);
                        }
                    },
                    onComplete: () => {
                        gsap.to('#next-video', { visibility: 'hidden', zIndex: '30', width:'0', height:'0', transform:'-50% -50%',top: '50%', left: '50%' });
                        gsap.to('#next-video1', {zIndex: '20'});
                        controlVideo.nextIndex = 4;
                        if (controlVideo.nextIndex === 4 && controlVideo.nextIndex1 === 1 ) {
                            controlVideo.nextIndex = 2;
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

            gsap.set('#current-video', {opacity:0})
            gsap.fromTo('#current-video', {
                transformOrigin: 'center center',
                opacity: 0,
                duration: 0.2,
                ease: 'power1.inOut',
            },{
                opacity: 1,
                scale: 0.5,
                duration:0.2,
                delay:1.5,
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

}

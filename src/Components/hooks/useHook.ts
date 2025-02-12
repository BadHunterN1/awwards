import {RefObject, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

type refs = {
    sectionRef: RefObject<HTMLDivElement |null>,
    miniVideoContainerRef: RefObject<HTMLDivElement |null>,
    nextVideoRef: RefObject<HTMLVideoElement |null>,
}

export default function useHook({sectionRef, miniVideoContainerRef, nextVideoRef}:refs) {
    const [isHovered, setIsHovered] = useState(false);

    useGSAP(() => {
        if (!sectionRef.current || !miniVideoContainerRef.current || !nextVideoRef.current) return;

        const section = sectionRef.current;
        const miniContainer = miniVideoContainerRef.current;

        const enterAnimation = gsap.timeline({ paused: true })
            .fromTo([miniContainer, nextVideoRef.current], {
                scale: 0,
                delay: 0.5,
            }, {
                scale: 0.5,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            });

        const config = {
            rotationStrength: 25,
            perspective: 500,
            smoothing: 0.3,
            scale: 1.12
        };

        let mouseMoveTimeout: number | undefined;
        let isMouseIdle = true;

        function handleMouseEnter() {
            setIsHovered(true);
            clearTimeout(mouseMoveTimeout);
            isMouseIdle = false;
            enterAnimation.play();
        }

        function handleMouseLeave() {
            setIsHovered(false);
            clearTimeout(mouseMoveTimeout);
            isMouseIdle = true;
            gsap.to([miniContainer, nextVideoRef.current], {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in"
            });
            gsap.to([miniContainer, nextVideoRef.current], {
                rotateX: 0,
                rotateY: 0,
                duration: 0.3
            });
        }

        function handleMouseMove(e: MouseEvent) {
            if (!isHovered) return;

            // If mouse was idle and now moving again, restore full animation
            if (isMouseIdle) {
                isMouseIdle = false;
                gsap.to([miniContainer, nextVideoRef.current], {
                    scale: config.scale,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }

            // Reset the idle timeout on each mouse move
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
            }, 1500);

            // Apply rotation
            const bounds = section.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            const rotateY = ((e.clientX - centerX) / bounds.width) * config.rotationStrength;
            const rotateX = ((e.clientY - centerY) / bounds.height) * -config.rotationStrength;

            gsap.to([miniContainer, nextVideoRef.current], {
                rotateX,
                rotateY,
                scale: config.scale,
                duration: config.smoothing,
                ease: "power2.out",
                transformPerspective: config.perspective,
                transformOrigin: "center"
            });
        }

        section.addEventListener('mouseenter', handleMouseEnter);
        section.addEventListener('mouseleave', handleMouseLeave);
        section.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(mouseMoveTimeout);
            section.removeEventListener('mouseenter', handleMouseEnter);
            section.removeEventListener('mouseleave', handleMouseLeave);
            section.removeEventListener('mousemove', handleMouseMove);
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
                end: 'bottom center',
                scrub: true,

            }
        })
    })
}


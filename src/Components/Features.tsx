import {ReactElement, useRef} from "react";
import {TiLocationArrow} from "react-icons/ti";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type BentoCardProps = {
    src: string;
    title: ReactElement;
    description?: string;
    isComingSoon?: boolean;
}

type BentoTiltProps = {
    children: ReactElement;
    className?: string;
}
function BentoTilt({children, className = ''}:BentoTiltProps) {
    const itemRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!itemRef.current) return;

            const { width, height, left, top } = itemRef.current.getBoundingClientRect();

            const relativeX = (e.clientX - left) / width;
            const relativeY = (e.clientY - top) / height;

            const tiltX = (relativeX - 0.5) * 22;
            const tiltY = (relativeY - 0.5) * -22;

            gsap.to(itemRef.current, {
                rotateX: tiltY,
                rotateY: tiltX,
                scale: 0.98,
                duration: 0.3, // Smoother effect
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            if (!itemRef.current) return;

            gsap.to(itemRef.current, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const elements = gsap.utils.toArray<HTMLElement>(".Bento-pop");

        elements.forEach((el, i) => {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    y: -10,
                    scale: 0.95, // Slightly smaller for a "pop-in" effect
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: i * 0.1, // Stagger effect
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
        if (itemRef.current) {
            itemRef.current.addEventListener("mousemove", handleMouseMove);
            itemRef.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            itemRef.current?.removeEventListener("mousemove", handleMouseMove);
            itemRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={itemRef} className={`popup Bento-pop opacity-0 ${className}`}
        >
            {children}
        </div>
    )
}
function BentoCard({src, title, description,isComingSoon}:BentoCardProps) {
    return (
        <div className={'relative size-full'}>
            <video className={'absolute left-0 top-0 size-full object-cover object-center'} src={src} loop muted autoPlay/>
            <div className={'relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'}>
                <div>
                    <h1 className={'bento-title special-font'}>{title}</h1>
                    {description && <p className={'mt-3 max-w-64 text-xs md:text-base'}>{description}</p>}
                </div>
                {isComingSoon && <h3 className={' special-font font-bold text-neutral-700 text-xs bg-black rounded-full w-fit flex items-center px-5 py-2 uppercase cursor-default select-none'}> <TiLocationArrow/>coming soon!</h3>}
            </div>
        </div>
    )
}

export default  function Features() {
    return (
        <section id={'features'} className={'bg-black pd-52'}>
            <div className={'container mx-auto px-3 md:px-10'}>
                <div className={'px-5 py-32'}>
                    <p className={'font-circular-web text-lg text-blue-50'}>Into the Metagame Layer</p>
                    <p className={'max-w-md font-circular-web text-lg text-blue-50 opacity-50'}>
                        Immerse your self in a rich and ever-expanding universe where a vibrant array of products converge into an interconnected overlay experience on your world.
                    </p>
                </div>
                <BentoTilt className={'border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'}>
                    <BentoCard src={'videos/feature-1.mp4'} title={<>radia<b>n</b>t</>} description={'A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'} isComingSoon/>
                </BentoTilt>
                <div className={'grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'}>
                    <BentoTilt className={'bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'}>
                        <BentoCard src={'videos/feature-2.mp4'} title={<>zig<b>m</b>a</>} description={'Experience a unique blend of classic and modern gaming experiences, all within one metagame app.'}/>
                    </BentoTilt>
                    <BentoTilt className={'bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'}>
                        <BentoCard src={'videos/feature-3.mp4'} title={<>n<b>e</b>us</>} description={'Unlock a vast and diverse collection of exclusive products, all in one metagame app.'}/>
                    </BentoTilt>
                    <BentoTilt className={'bento-tilt_1 me-14 md:col-span-1 md:me-0 '}>
                        <BentoCard src={'videos/feature-4.mp4'} title={<>az<b>u</b>l</>} description={'A cross-world AI Agent-elevating your gameplay to be more fun and productive.'}/>
                    </BentoTilt>
                    <BentoTilt className={'bento-tilt_2 '}>
                        <div className={'flex size-full flex-col justify-between bg-violet-300 p-5'}>
                            <h1 className={'bento-title special-font max-w-64'}>M<b>o</b>re C<b>o</b>ming Soo<b>n</b>!</h1>
                            <TiLocationArrow className={'m-5 scale-5 self-end'}/>
                        </div>
                    </BentoTilt>
                    <BentoTilt className={'bento-tilt_2 '}>
                        <video src={'videos/feature-5.mp4'} loop muted autoPlay className={'size-full object-cover object-center'}/>
                    </BentoTilt>
                </div>
            </div>
        </section>
    )
}
import AnimatedTitle from "./UI/AnimatedTitle.tsx";
import {useRef} from "react";
import gsap from "gsap";
import RoundedCorners from "./UI/RoundedCorners.tsx";
import Button from "./UI/Button.tsx";

export default  function Story() {
    const frameRef = useRef<HTMLImageElement>(null);

    function handleMouseLeave() {
        const element = frameRef.current;

        gsap.to(element, {
            duration: 0.3,
            rotateX:0,
            rotateY:0,
            ease:'power1.inOut',
        })
    }

    function handleMouseMove(e: React.MouseEvent<HTMLImageElement>) {
        const {clientX, clientY} = e;
        const element = frameRef.current;

        if (!element) return;

        const bound = element.getBoundingClientRect();

        const x = clientX - bound.left;
        const y = clientY - bound.top;

        // calc center of the img
        const centerX = bound.width / 2;
        const centerY = bound.height / 2;

        const rotateX = ((y-centerY) / centerY) * -10;
        const rotateY = ((x-centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease:'power1.inOut',
        })
    }
    
    return (
        <section id={'story'} className={'min-h-dvh w-screen bg-black text-blue-50'}>
            <div className={'overflow-hidden flex size-full flex-col items-center py-10 pb-24'}>
                <p className={'font-general text-sm uppercase md:text=[10px] '}>
                    the multiversal ip world
                </p>
                <div className={'relative size-full '}>
                    <AnimatedTitle title={'the st<b>o</b>ry of <br/> the hidden real<b>b</b>'}
                                   containerClass={'mt-5 pointer-events-none mix-blend-difference relative z-10'}
                    />
                    <div className={'story-img-container'}>
                        <div className={'story-img-mask'}>
                            <div className={'story-img-content'}>
                                <img ref={frameRef} src={'/img/entrance.webp'}
                                alt={'entrance'}
                                className={'object-contain'}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleMouseLeave}
                                onMouseUp={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                                />
                            </div>
                        </div>
                        <RoundedCorners/>
                    </div>
                </div>

                <div className={'-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'}>
                    <div className={'flex h-full w-fit flex-col items-center md:items-start'}>
                        <p className={'mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'}>
                            Where realms converge, lies Zentry and the boundless piller. Discover its secerts and shape your fate amidst infinite opportunity.
                        </p>
                        <Button title={'discover prologue'} id={'realm-button'} containerClass={'mt-5'} />
                    </div>

                </div>
            </div>
        </section>
    )
}
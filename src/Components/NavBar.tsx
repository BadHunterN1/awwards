import {useEffect, useRef, useState} from "react";
import Button from "./UI/Button.tsx";
import {TiLocationArrow} from "react-icons/ti";
import {useWindowScroll} from "react-use";
import gsap from "gsap";
import SlideTaps from "./SlideTaps.tsx";

export default  function NavBar() {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisiable, setIsNavVisiable] = useState(true);

    const {y:currentScrollY} = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0 ){
            setIsNavVisiable(true);
            navContainerRef.current?.classList.remove('floating-nav');
        }else if (currentScrollY > lastScrollY) {
            setIsNavVisiable(false);
            navContainerRef.current?.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisiable(true);
            navContainerRef.current?.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisiable? 0 : -100,
            opacity: isNavVisiable? 1 : 0,
            ease: 'power4.inOut',
            duration: 0.2,
        })
    }, [isNavVisiable]);

    const navContainerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
        setAudioPlaying(prev => !prev);
        setIsIndicatorActive(prev => !prev);
    }

    useEffect(() => {
    if (audioPlaying){
        audioRef.current?.play();
    }else  {
        audioRef.current?.pause();
    }
    }, [audioPlaying]);

    useEffect(() => {
        if (hasClicked) return;

        const handleClick = () => {
            setHasClicked(true);
            audioRef.current?.play().catch((err) => console.error("Audio playback failed:", err));
            toggleAudio();
            window.removeEventListener("click", handleClick);
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [hasClicked]);

    return (
        <div ref={navContainerRef} className={'fixed inset-x-0 top-4 z-40 h-20 border-none transition-all duration-700 sm:inset-x-6'}>
            <header className={'absolute top-1/2 w-full -translate-y-1/2 '}>
                <nav className={'flex size-full items-center justify-between p-4'}>
                    <div className={'flex items-center gap-7 '}>
                        <img src={'/img/logo.png'} alt={'logo'} className={'w-10'}/>
                        <Button id={'product-button'} title={'products'} rightIcon={ <TiLocationArrow/>} containerClass={'bg-blue-50 flex items-center justify-center gap-1'}/>
                    </div>
                        <div className={'flex h-full items-center'}>
                            <SlideTaps/>
                            <button onClick={toggleAudio} className={'ml-10 flex items-center space-x-0.5 py-2 cursor-pointer'}>
                                <audio ref={audioRef} className={'hidden'} src={'/audio/loop.mp3'} loop/>
                                {[1,2,3,4].map(bar => (
                                    <div key={bar} style={{animationDelay: `${bar * 0.1}s`}}
                                         className={`indicator-line ${isIndicatorActive? 'active' : ''}`}/>))}
                            </button>
                        </div>
                </nav>
            </header>
        </div>
    )
}
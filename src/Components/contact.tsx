import Button from "./UI/Button.tsx";
import AnimatedTitle from "./UI/AnimatedTitle.tsx";

type ImageClipBoxProps = {
    src:string;
    clipClass:string;
}

function ImageClipBox({src, clipClass}:ImageClipBoxProps) {
    return (
        <div className={clipClass}>
            <img src={src}/>
        </div>
    )
}

export default  function Contact() {

    return (
        <div id={'contact'} className={'my-20 min-h-96 w-screen px-5 md:px-20'}>
            <div className={'relative rounded-lg bg-black py-24 text-blue-50'}>
                <div className={'absolute -left-20 top-0 hidden h-full w-72 sm:block lg:left-20 lg:w-96'}>
                    <ImageClipBox clipClass={'contact-clip-path-1'} src={'img/contact-1.webp'}/>
                    <ImageClipBox clipClass={'contact-clip-path-2 translate-y-60 lg:translate-y-20 hidden lg:block'} src={'img/contact-2.webp'}/>
                </div>
                <div className={'absolute -top-40 sm:left-20 left-[55%] -translate-x-1/2 sm:translate-x-0 w-60 sm:top-1/2 md:left-auto md:-right-10 lg:top-20 lg:w-80'}>
                    <ImageClipBox clipClass={'absolute md:scale-125'} src={'img/swordman-partial.webp'}/>
                    <ImageClipBox clipClass={'sword-man-clip-path md:scale-125'} src={'img/swordman.webp'}/>
                </div>
                <div className={'relative mix-blend-exclusion flex flex-col items-center text-center'}>
                    <p className={'font-general text-[16px] uppercase'}>Join Zentry</p>

                    <AnimatedTitle  title={'Lets B<b>u</b>ild The <br/> New era of <br/> g<b>a</b>ming t<b>o</b>gether'}/>
                    <Button title={'contact us'} id={'contact-button'} containerClass={'mt-10 cursor-pointer'}/>
                </div>
            </div>
        </div>
    )
}
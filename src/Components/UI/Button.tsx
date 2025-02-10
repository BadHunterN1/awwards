import {JSX} from "react";

type ButtonProps = {
    title: string;
    id: string;
    containerClass: string;
    rightIcon?: JSX.Element;
    leftIcon?: JSX.Element;
}

export  default  function Button({title, id, rightIcon , leftIcon,containerClass}: ButtonProps) {
    return (
        <button id={id} className={`group relative z-10 w-fit cursor-pointer  overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
            {leftIcon}
            <span className='relative inline-flex overflow-hidden font-general text-sm font-bold uppercase'>
            <div>
                {title}
            </div>
            </span>
            {rightIcon}
        </button>
    )
}
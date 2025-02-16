import { JSX } from "react";

type ButtonProps = {
	title: string;
	id: string;
	containerClass: string;
	rightIcon?: JSX.Element;
	leftIcon?: JSX.Element;
};

export default function Button({
	title,
	id,
	rightIcon,
	leftIcon,
	containerClass,
}: ButtonProps) {
	return (
		<button
			id={id}
			className={`group relative z-10 w-fit cursor-pointer transition-all overflow-hidden rounded-3xl hover:rounded-xl origin-right
  [transform:perspective(500px)_rotateY(0deg)_skewX(0deg)]
  hover:[transform:perspective(500px)_rotateY(10deg)_skewX(-10deg)] duration-500 bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
			{leftIcon}
			<span className="relative text-center inline-flex overflow-hidden font-general text-sm font-bold uppercase">
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
					{title}
				</div>
				<div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
					{title}
				</div>
			</span>
			{rightIcon}
		</button>
	);
}

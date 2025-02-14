import {Dispatch, ReactNode, SetStateAction, useRef} from "react";

interface TapProps {
    setPosition: Dispatch<SetStateAction<{ width: number; opacity: number; left: number }>>;
    children: ReactNode;
}

export default function Tap({ setPosition, children }: TapProps) {
    const ref = useRef<HTMLAnchorElement | null>(null);

    return (
      <a
        className="relative flex z-10 nav-hover-btn px-4 py-2"
        href={`#${children?.toString().toLocaleLowerCase()}`}
        ref={ref}
        onMouseEnter={() => {
          if (!ref.current) return;

          const { width } = ref.current.getBoundingClientRect();

          setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        }}
      >
        {children}
      </a>
    );
}
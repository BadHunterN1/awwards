import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Button from "./UI/Button.tsx";
import { TiLocationArrow } from "react-icons/ti";
import Loading from "./UI/Loading.tsx";

const totalVideos = 4;
const words = [
	"",
	"g<b>a</b>ming",
	"ide<b>n</b>tity",
	"re<b>a</b>lity",
	"ag<b>e</b>ntic ai",
];

export default function Hero() {
	const [controlVideo, setControlVideo] = useState({
		currentIndex: 1,
		hasClicked: false,
		isNext: false,
		nextIndex: 2,
		nextIndex1: 3,
	});
	const [isInteractable, setIsInteractable] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const sectionRef = useRef<HTMLDivElement>(null);
	const miniVideoContainerRef = useRef<HTMLDivElement>(null);
	const videoFrameRef = useRef<HTMLDivElement>(null);

	const firstVideoRef = useRef<HTMLVideoElement>(null);
	const nextVideoRef = useRef<HTMLVideoElement>(null);
	const nextVideo1Ref = useRef<HTMLVideoElement>(null);
	const nextVideo2Ref = useRef<HTMLVideoElement>(null);

	// currentIndex + 1 and if it more than total videos return to 1
	const upcomingVideoIndex = (controlVideo.currentIndex % totalVideos) + 1;

	function getVideoSrc(index: number) {
		return `videos/hero-${index}.mp4`;
	}

	const handleVideoLoad = useMemo(() => {
		return function () {
			setLoadedVideos((prev) => prev + 1);
		};
	}, []);

	function handleMiniVdClick() {
		if (controlVideo.hasClicked || !isInteractable) return;
		setIsInteractable(false);
		setControlVideo((prev) => {
			return {
				...prev,
				hasClicked: true,
				currentIndex: upcomingVideoIndex,
			};
		});
	}

	useEffect(() => {
		if (loadedVideos === totalVideos) {
			setIsLoading(false);
		}
	}, [loadedVideos]);

	const refs = {
		sectionRef,
		miniVideoContainerRef,
		nextVideoRef,
		isClicked: controlVideo.hasClicked,
	};

	useHook(refs);

	const states = {
		controlVideo,
		setControlVideo,
		setIsInteractable,
		firstVideoRef,
		nextVideo1Ref,
		nextVideo2Ref,
	};
	useHookVideos(states);

	return (
		<div
			ref={sectionRef}
			className="relative min-h-screen w-screen overflow-x-hidden">
			{isLoading && <Loading />}
			<div
				ref={videoFrameRef}
				className="relative z-10 min-h-screen w-screen overflow-hidden rounded-b-lg bg-blue-75"
				id="video-frame">
				<div>
					<div
						ref={miniVideoContainerRef}
						className="mask-clip-path absolute-center absolute z-50 size-44 md:size-64 cursor-pointer overflow-hidden rounded-lg">
						<div onClick={handleMiniVdClick} className={`origin-center`}>
							<video
								loop
								muted
								id="current-video"
								onLoadedData={handleVideoLoad}
								className="size-64 origin-center scale-150 object-cover object-center "
								ref={nextVideoRef}
								src={getVideoSrc(upcomingVideoIndex)}
							/>
						</div>
					</div>
					<video
						id="next-video"
						ref={nextVideo1Ref}
						src={getVideoSrc(controlVideo.nextIndex)}
						loop
						muted
						className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
					<video
						id="next-video1"
						ref={nextVideo2Ref}
						src={getVideoSrc(controlVideo.nextIndex1)}
						loop
						muted
						className="absolute-center invisible absolute z-30 size-64 object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
					<video
						ref={firstVideoRef}
						src={getVideoSrc(1)}
						autoPlay
						loop
						muted
						onLoadedData={handleVideoLoad}
						className="absolute left-0 top-0 size-full object-cover object-center"
					/>
				</div>
				<div className="absolute bottom-5 right-5 z-40 min-h-[50px]">
					<h1
						className="special-font hero-heading text-blue-75 word-container-current"
						dangerouslySetInnerHTML={{
							__html: words[controlVideo.currentIndex - 1],
						}}
						style={{ position: "absolute", bottom: 0, right: 0 }}
					/>
					<h1
						className="special-font hero-heading text-blue-75 word-container-next"
						dangerouslySetInnerHTML={{
							__html:
								words[
									controlVideo.currentIndex === words.length
										? 1
										: controlVideo.currentIndex
								],
						}}
					/>
				</div>
				<div className="absolute left-0 top-0 z-40 size-full ">
					<div className="mt-24 px-5 sm:px-10">
						<h1 className="special-font hero-heading text-blue-100">
							redefi<b>n</b>e
						</h1>
						<p className="text-xl mb-5 max-w-64 font-robert-regular text-blue-100">
							Enter The Metagame Layer <br /> Unleash the play Economy
						</p>
						<Button
							id="watch-trailer"
							title="Watch Trailer"
							leftIcon={<TiLocationArrow />}
							containerClass="bg-yellow-300! flex-center gap-1"
						/>
					</div>
				</div>
			</div>
			<div className="absolute bottom-5 right-5 min-h-[50px]">
				<h1
					className="special-font hero-heading text-black word-container-next"
					dangerouslySetInnerHTML={{
						__html:
							words[
								controlVideo.currentIndex === words.length
									? 1
									: controlVideo.currentIndex
							],
					}}
				/>
			</div>
		</div>
	);
}

type refs = {
	sectionRef: RefObject<HTMLDivElement | null>;
	miniVideoContainerRef: RefObject<HTMLDivElement | null>;
	nextVideoRef: RefObject<HTMLVideoElement | null>;
	isClicked: boolean;
};

type controlVideoProps = {
	currentIndex: number;
	hasClicked: boolean;
	isNext: boolean;
	nextIndex: number;
	nextIndex1: number;
};
type states = {
	controlVideo: controlVideoProps;
	firstVideoRef: RefObject<HTMLVideoElement | null>;
	nextVideo2Ref: RefObject<HTMLVideoElement | null>;
	nextVideo1Ref: RefObject<HTMLVideoElement | null>;
	setControlVideo: Dispatch<SetStateAction<controlVideoProps>>;
	setIsInteractable: Dispatch<SetStateAction<boolean>>;
};

function useHook({
	sectionRef,
	miniVideoContainerRef,
	nextVideoRef,
	isClicked,
}: refs) {
	const [isHovered, setIsHovered] = useState(false);
	const animationStateRef = useRef<string>("idle");

	useGSAP(() => {
		//dont change anything down here until i say
		if (
			!sectionRef.current ||
			!miniVideoContainerRef.current ||
			!nextVideoRef.current
		)
			return;

		const section = sectionRef.current;
		const miniContainer = miniVideoContainerRef.current;
		const nextVideo = nextVideoRef.current;
		const elements = [miniContainer, nextVideo];

		const enterAnimation = gsap.timeline({ paused: true }).fromTo(
			elements,
			{
				scale: 0,
				delay: 0.5,
			},
			{
				scale: 0.5,
				opacity: 1,
				duration: 0.5,
				ease: "power3.out",
				onStart: () => {
					animationStateRef.current = "entering";
				},
				onComplete: () => {
					if (animationStateRef.current === "entering") {
						animationStateRef.current = "idle";
					}
				},
			}
		);

		const config = {
			rotationStrength: 25,
			perspective: 500,
			smoothing: 0.3,
			scale: 1.12,
		};

		let mouseMoveTimeout: ReturnType<typeof setTimeout> | undefined;
		let isMouseIdle = true;
		let reenterDelay: number | undefined;

		function handleMouseEnter() {
			if (reenterDelay) {
				clearTimeout(reenterDelay);
				reenterDelay = undefined;
			}
			if (animationStateRef.current === "leaving") {
				gsap.killTweensOf(elements);
				reenterDelay = setTimeout(() => {
					animationStateRef.current = "idle";
					reenterDelay = undefined;
				}, 100) as unknown as number;
				return;
			}
			if (
				(animationStateRef.current !== "idle" &&
					animationStateRef.current !== "entering") ||
				isClicked
			) {
				return;
			}
			setIsHovered(true);
			clearTimeout(mouseMoveTimeout);
			isMouseIdle = false;
			enterAnimation.play();
		}

		function handleMouseLeave() {
			if (animationStateRef.current === "entering") {
				enterAnimation.pause();
			}
			animationStateRef.current = "leaving";

			setIsHovered(false);
			clearTimeout(mouseMoveTimeout);
			isMouseIdle = true;
			gsap.to(elements, {
				scale: 0,
				opacity: 0,
				duration: 0.4,
				ease: "power3.in",
				onComplete: () => {
					if (animationStateRef.current === "leaving") {
						animationStateRef.current = "idle";
					}
				},
			});
			gsap.to(elements, {
				rotateX: 0,
				rotateY: 0,
				duration: 0.3,
			});
		}

		function handleMouseMove(e: MouseEvent) {
			if (!isHovered || animationStateRef.current === "leaving") return;

			if (isMouseIdle) {
				isMouseIdle = false;
				gsap.to(elements, {
					scale: config.scale,
					opacity: 1,
					duration: 0.7,
					ease: "power3.out",
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
						ease: "power3.in",
					});
					isMouseIdle = true;
				}
			}, 700);

			// Apply rotation
			const bounds = section.getBoundingClientRect();
			const centerX = bounds.left + bounds.width / 2;
			const centerY = bounds.top + bounds.height / 2;

			const rotateY =
				((e.clientX - centerX) / bounds.width) * config.rotationStrength;
			const rotateX =
				((e.clientY - centerY) / bounds.height) * -config.rotationStrength;

			gsap.to(elements, {
				rotateX,
				rotateY,
				scale: config.scale,
				duration: config.smoothing,
				ease: "power2.out",
				transformPerspective: config.perspective,
				transformOrigin: "center",
			});
		}
		function handleDocumentEvents() {
			if (isHovered) {
				handleMouseLeave();
			}
		}
		// Add device orientation handler for mobile
		function handleDeviceOrientation(event: DeviceOrientationEvent) {
			if (!isHovered || animationStateRef.current === "leaving") return;

			if (isMouseIdle) {
				isMouseIdle = false;
				gsap.to(elements, {
					scale: config.scale,
					opacity: 1,
					duration: 0.7,
					ease: "power3.out",
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
						ease: "power3.in",
					});
					isMouseIdle = true;
				}
			}, 700);

			const beta = event.beta || 0;
			const gamma = event.gamma || 0;

			const rotateX =
				(Math.max(-30, Math.min(30, beta / 3)) * -config.rotationStrength) / 30;
			const rotateY =
				(Math.max(-15, Math.min(15, gamma / 2)) * config.rotationStrength) / 15;

			gsap.to(elements, {
				rotateX,
				rotateY,
				scale: config.scale,
				duration: config.smoothing,
				ease: "power2.out",
				transformPerspective: config.perspective,
				transformOrigin: "center",
			});
		}

		// Handle device orientation permission
		function setupDeviceOrientation() {
			if (
				typeof window.DeviceOrientationEvent !== "undefined" &&
				"requestPermission" in window.DeviceOrientationEvent
			) {
				(
					DeviceOrientationEvent as unknown as {
						requestPermission(): Promise<PermissionState>;
					}
				)
					.requestPermission()
					.then((permissionState: PermissionState) => {
						if (permissionState === "granted") {
							window.addEventListener(
								"deviceorientation",
								handleDeviceOrientation
							);
						}
					})
					.catch(console.error);
			} else {
				window.addEventListener("deviceorientation", handleDeviceOrientation);
			}
		}
		section.addEventListener("mouseenter", handleMouseEnter);
		section.addEventListener("mouseleave", handleMouseLeave);
		section.addEventListener("mousemove", handleMouseMove);
		// Check if device supports orientation events
		if (window.DeviceOrientationEvent) {
			const requestPermission = (
				DeviceOrientationEvent as unknown as {
					requestPermission(): Promise<PermissionState>;
				}
			).requestPermission;
			if (typeof requestPermission === "function") {
				section.addEventListener("touchstart", setupDeviceOrientation, {
					once: true,
				});
			} else {
				window.addEventListener("deviceorientation", handleDeviceOrientation);
			}
		}
		window.addEventListener("blur", handleDocumentEvents);
		document.addEventListener("mouseleave", handleDocumentEvents);

		return () => {
			clearTimeout(mouseMoveTimeout);
			section.removeEventListener("mouseenter", handleMouseEnter);
			section.removeEventListener("mouseleave", handleMouseLeave);
			section.removeEventListener("mousemove", handleMouseMove);
			if (window.DeviceOrientationEvent) {
				window.removeEventListener(
					"deviceorientation",
					handleDeviceOrientation
				);
				if (
					typeof (
						DeviceOrientationEvent as {
							requestPermission?: () => Promise<PermissionState>;
						}
					).requestPermission === "function"
				) {
					section.removeEventListener("touchstart", setupDeviceOrientation);
				}
			}
			window.removeEventListener("blur", handleDocumentEvents);
			document.removeEventListener("mouseleave", handleDocumentEvents);
		};
	}, [isHovered]);
	useGSAP(() => {
		gsap.set("#video-frame", {
			clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
			borderRadius: "0 0 40% 10%",
		});

		gsap.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0 0 0 0",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom =+100",
				scrub: true,
			},
		});
	});
}

function useHookVideos({
	nextVideo1Ref,
	nextVideo2Ref,
	controlVideo,
	setControlVideo,
	firstVideoRef,
	setIsInteractable,
}: states) {
	useGSAP(
		() => {
			if (!controlVideo.hasClicked) return;
			gsap.set("#current-video", { opacity: 0, scale: 0 });
			gsap.to(
				"#current-video",

				{
					opacity: 1,
					scale: 1,
				}
			);
			if (!controlVideo.isNext) {
				gsap.set("#next-video", { visibility: "visible" });
				gsap.to("#next-video", {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 0.35,
					ease: "power1.inOut",
					onStart: () => {
						if (nextVideo1Ref.current) {
							nextVideo1Ref.current.play().catch(console.error);
						}
					},
					onComplete: () => {
						if (firstVideoRef.current) {
							firstVideoRef.current.pause();
						}
						if (nextVideo2Ref.current) {
							nextVideo2Ref.current.pause();
						} else {
							console.error("nextVideo2Ref is null. Video element not found.");
						}
						if (
							controlVideo.nextIndex === 2 &&
							controlVideo.nextIndex1 === 1 &&
							!controlVideo.isNext
						) {
							controlVideo.nextIndex1 = 3;
						}
						gsap.to("#next-video1", {
							visibility: "hidden",
							zIndex: "30",
							width: "0",
							height: "0",
							transform: "-50% -50%",
							top: "50%",
							left: "50%",
						});
						gsap.to("#next-video", { zIndex: "20" });
						if (controlVideo.nextIndex === 4) {
							controlVideo.nextIndex1 = 1;
						}
						setControlVideo((prev) => {
							return {
								...prev,
								hasClicked: false,
								isNext: !prev.isNext,
							};
						});
						setTimeout(() => {
							setIsInteractable(true);
						}, 1000);
					},
				});
			} else {
				gsap.set("#next-video1", { visibility: "visible" });
				gsap.to("#next-video1", {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 0.35,
					ease: "power1.inOut",
					onStart: () => {
						if (nextVideo2Ref.current) {
							nextVideo2Ref.current.play().catch(console.error);
						}
					},
					onComplete: () => {
						gsap.to("#next-video", {
							visibility: "hidden",
							zIndex: "30",
							width: "0",
							height: "0",
							transform: "-50% -50%",
							top: "50%",
							left: "50%",
						});
						gsap.to("#next-video1", { zIndex: "20" });
						controlVideo.nextIndex = 4;
						if (controlVideo.nextIndex === 4 && controlVideo.nextIndex1 === 1) {
							controlVideo.nextIndex = 2;
						}
						setControlVideo((prev) => {
							return {
								...prev,
								hasClicked: false,
								isNext: !prev.isNext,
							};
						});
						setTimeout(() => {
							setIsInteractable(true);
						}, 1000);
					},
				});
			}

			const tl = gsap.timeline();
			const currentContainer = document.querySelector(
				".word-container-current"
			);
			const nextContainer = document.querySelectorAll(".word-container-next");

			if (currentContainer && nextContainer) {
				// Reset positions
				gsap.set(currentContainer, {
					x: 0,
					opacity: 1,
				});

				gsap.set(nextContainer, {
					x: controlVideo.isNext ? "100%" : "-100%",
					opacity: 0,
				});

				// Animation
				tl.to(currentContainer, {
					x: controlVideo.isNext ? "-100%" : "100%",
					opacity: 0,
					duration: 0.5,
					ease: "power2.inOut",
				}).to(
					nextContainer,
					{
						x: "0%",
						opacity: 1,
						duration: 0.5,
						ease: "power2.inOut",
					},
					"<"
				);
			}
		},
		{ dependencies: [controlVideo.currentIndex] }
	);
}

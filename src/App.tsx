import { Suspense, lazy, useEffect, useState } from "react";

import NavBar from "./Components/NavBar.tsx";
import Hero from "./Components/Hero.tsx";
import Loading from "./Components/UI/Loading.tsx";

const About = lazy(() => import("./Components/About.tsx"));
const Features = lazy(() => import("./Components/Features.tsx"));
const Story = lazy(() => import("./Components/Story.tsx"));
const Contact = lazy(() => import("./Components/contact.tsx"));
const Footer = lazy(() => import("./Components/Footer.tsx"));

function App() {
	const [heroLoaded, setHeroLoaded] = useState(false);

	useEffect(() => {
		// Mark Hero as loaded after initial render
		setHeroLoaded(true);
	}, []);

	return (
		<main className="relative min-h-screen w-screen overflow-x-hidden">
			<NavBar />
			<Hero />
			{heroLoaded && (
				<Suspense fallback={<Loading />}>
					<About />
					<Features />
					<Story />
					<Contact />
					<Footer />
				</Suspense>
			)}
		</main>
	);
}

export default App;

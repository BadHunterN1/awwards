import {FaDiscord, FaFacebook, FaStoreAlt} from "react-icons/fa";

const socialLinks = [
    { href: "#", icon: <FaDiscord /> },
    { href: "https://www.facebook.com/ahmed.moh232/", icon: <FaFacebook /> },
    { href: "https://funbox-ecommernce.vercel.app/", icon: <FaStoreAlt /> },
];

const Footer = () => {
    return (
        <footer className="w-screen bg-[#040404] py-4 text-blue-50">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-center text-lg font-light md:text-left">
                    ©BadHunter 2025. Created With Love.
                </p>

                <div className="flex justify-center gap-4  md:justify-start">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-50 transition-colors text-lg duration-500 ease-in-out hover:text-neutral-700"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a
                    href="#"
                    className="text-center rounded-2xl bg-blue-50 duration-300 text-black  p-4 text-sm font-light md:text-right"
                >
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
};

export default Footer;
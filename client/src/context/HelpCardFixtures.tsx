import { IoIosMegaphone, IoMdPaper } from "react-icons/io";
import { TbMessages } from "react-icons/tb";
import { FaGears, FaMagnifyingGlass, FaSquareTwitter, FaRegMessage } from "react-icons/fa6";
import { MdDisplaySettings, MdSecurity, MdOutlineSettingsRemote } from "react-icons/md";
import { BsEnvelopePaperHeart } from "react-icons/bs";

export const helpCards = [
    {
        icon: <IoIosMegaphone />,
        title: "Annonces",
        description: "We keep an eye open: here are the latest information to know",
    },
    {
        icon: <TbMessages />,
        title: "First Steps",
        description: "To get off on the right foot! On the right way!",
    },
    {
        icon: <FaGears />,
        title: "Account Settings",
        description: "You are unique and so is your account",
    },
    {
        icon: <MdDisplaySettings />,
        title: "Server Configuration",
        description: "Almost as exciting as interior design",
    },
    {
        icon: <BsEnvelopePaperHeart />,
        title: "Quests & Promotions",
        description: "Welcome, traveler! Would you like to see our quests?",
    },
    {
        icon: <IoMdPaper />,
        title: "Payments & Billing",
        description: "That feeling when you look at your bank account",
    },
    {
        icon: <MdSecurity />,
        title: "Security, Privacy and Policies",
        description: "Maintain a secure environment for you and your friends",
    },
    {
        icon: <FaMagnifyingGlass />,
        title: "Known Issues, Bugs and Resolution",
        description: "All-you-can-eat buffet of solutions to solve your problems!",
    },
];

export const otherHelpCards = [
    {
        icon: <FaRegMessage />,
        title: "Game Developers",
        description: "Your help center for bot, app and game development!",
    },
    {
        icon: <MdOutlineSettingsRemote />,
        title: "Application Help Center",
        description: "Learn how to use, find and add apps on GamerZ!",
    },
    {
        icon: <FaSquareTwitter />,
        title: "X",
        description: "A quick question? Contact us on X!",
    },
];
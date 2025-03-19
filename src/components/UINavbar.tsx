import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { language } from "../util/types";

import { Link } from "react-router-dom";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { SlidesContext } from "./AppView";
import SvgAssets from "./SvgAssets";

const languages: language[] = [{
    key: 'en',
    lang: 'english',
},
{
    key: 'es',
    lang: 'spanish'
},
{
    key: 'ja',
    lang: 'japanese'
}]

const hashHome = ['home', 'about', 'skills'];
const hashContacts = ['contacts'];

const UIDropdown = (props: { 
    icon: ReactNode, 
    rotatable?: boolean,
    children?: ReactNode, 
    className?: string,
}) => {
    const { children, icon, className } = props;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div ref={dropdownRef} className={`relative flex flex-col`}>
            <button onClick={() => {
                setIsOpen(!isOpen);
            }} 
            onMouseEnter={() => {setIsOpen(true)}}
            >
                <div className={`${isOpen && props.rotatable ? 'rotate-180' : 'rotate-0'}`}>{icon}</div>
            </button>
            {isOpen && (
                <div className={`${className} startup absolute flex flex-col left-0 top-[32px] text-sm md:text-base rounded-lg border-2 bg-[#ffffff] border-[#f0f0f0] dark:bg-[#000000] dark:border-[#0f0f0f] `}>
                    { children }
                </div>
            )}
        </div>
    )
}

const UINavbar = (props: {
    isHomePage: boolean, 
    language: string, 
    setLanguage: React.Dispatch<React.SetStateAction<string>>, 
    currentColor: React.MutableRefObject<string>
}) => {
    const { isHomePage, language, setLanguage, currentColor } = props;

    const { slides, swiper, getTranslatedText } = useContext(SlidesContext);

    const [hash, setHash] = useState<string>(window.location.hash);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedDarkMode = localStorage.getItem('DarkMode');
        if (!savedDarkMode) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
    
    const hashProjects = useRef<string[]>(slides.map(item => item.name.toLowerCase()));

    const [barWidth, setBarWidth] = useState<number>(((swiper?.current?.swiper.activeIndex != null) ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1));

    const MarkActive = (items: string[]): boolean => {
        return items.find(hashes => hashes === hash.substring(1)) !== undefined // Get #about => about
    }
    
    const NavbarStatus = (item: string): JSX.Element => {
        return isHomePage ? 
            <a href={`/#${item}`} className={"font-text pt-[2px] select-none"}>
                {getTranslatedText(item)}
            </a>
            :
            <Link to={`/#${item}`} className={"font-text pt-[2px] select-none"} onClick={() => {setHash(`#${item}`)}}>
                {getTranslatedText(item)}
            </Link>
    }

    // Activates on every page once
    useEffect(() => {
        hashProjects.current.push('projects', 'portfolio');
        if (hashProjects.current.find(project => project === window.location.pathname.substring(10)) !== undefined) { // Check if undefined project path: ex. /projects/BGMAPP !== undefined
            setHash('#projects');
        }

        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        const OnSlideChanged = () => {
            // console.log(((swiper?.current?.swiper.activeIndex != null)  ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1))
            setBarWidth(((swiper?.current?.swiper.activeIndex != null) ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1))
        };

        const OnProjectEnter = () => {
            setHash('#projects');
        };
        
        // Runs everytime a switch to a new window is changed
        const OnWindChanged = () => {
            setBarWidth(((swiper?.current?.swiper.activeIndex != null) ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1))
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('OnWindChanged', OnWindChanged);
        window.addEventListener('OnProjectEnter', OnProjectEnter)
        document.addEventListener('OnSlideChanged', OnSlideChanged);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('OnWindChanged', OnWindChanged);
            window.removeEventListener('OnProjectEnter', OnProjectEnter)
            document.removeEventListener('OnSlideChanged', OnSlideChanged)
        };
    }, []);

    useEffect(() => {
        document.documentElement.className = darkMode ? 'dark' : 'light';
        if (isHomePage) {
            document.documentElement.style.setProperty('--swiper-pagination-color', darkMode ? "#f0f0f0" : "#0f0f0f");
        }
    }, [darkMode])

    const SwiperBar = () => {
        return (
            <div className="flex flex-col items-center">
            <div className="w-full h-[2px] bg-[#808080] rounded-full">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${barWidth * 100}%`, background: currentColor.current}}/>
            </div>
        </div>
        )
    }

    return (
        <>
        <Navbar
        height={2}
        position="sticky"
        isBlurred={false}
        >
            <NavbarContent justify="start">
                <NavbarItem isActive={MarkActive(hashHome)}>
                    <div className="flex gap-2">
                        <UIDropdown icon={<MenuIcon/>}>
                            <button className={"rounded-t-lg p-1 hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} 
                            onClick={() => {
                                if (isHomePage) {
                                    currentColor.current = !darkMode ? "#f0f0f0" : "#0f0f0f";
                                }
                                setDarkMode(!darkMode);
                                localStorage.setItem('DarkMode', JSON.stringify(!darkMode));
                                }}>
                                {darkMode ? <DarkModeIcon htmlColor={darkMode ? "white" : "black"}/> : <BrightnessIcon htmlColor={darkMode ? "white" : "black"}/>}
                            </button>
                            <UIDropdown icon={
                                <div className="hover:bg-[#e9e9e95d] rounded-b-lg pb-1 dark:hover:bg-[#353535a2]">
                                    <SvgAssets icon={language}/>
                                </div>
                            }>
                                {languages.map(language => (
                                    <button key={language.key} className={"p-1 first:rounded-t-lg last:rounded-b-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} onClick={() => {
                                        localStorage.setItem('Language', language.key);
                                        setLanguage(language.key);
                                        }}>
                                        <div className={"flex flex-row p-[2px] gap-1 font-text " + (language.key === 'ja' ? ' w-[130px] ' : '') }>
                                            <SvgAssets icon={language.key}/>
                                            <span>{getTranslatedText(language.lang)}</span>
                                        </div>
                                    </button>
                                ))}
                            </UIDropdown>
                        </UIDropdown>
                        {NavbarStatus('home')}
                    </div>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center">
                <NavbarItem className="flex flex-row gap-2" isActive={MarkActive(hashProjects.current)}>
                    {NavbarStatus('projects')}
                    <UIDropdown rotatable icon={<ArrowDropDownIcon/>}>
                        {slides.map(project => (
                            <div className="first:rounded-t-lg last:rounded-b-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"> 
                                <Link key={project.name} to={`/projects/${project.name.toLowerCase()}`}>
                                    <button className={"w-full text-start p-1"} onClick={() => {
                                        setHash(`#${project.name}`);
                                        }}>
                                            <span className="inline-flex gap-1 p-[2px] font-title ">
                                                <div className="min-w-[28px]">
                                                    {project.icon}
                                                </div>
                                                <span className={`bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>
                                                {project.name}
                                                </span>
                                            </span>
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </UIDropdown>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem isActive={MarkActive(hashContacts)}>
                    {NavbarStatus('contacts')}
                </NavbarItem>
            </NavbarContent>

        </Navbar>
        <SwiperBar/>
        </>
    );
}

export default UINavbar;
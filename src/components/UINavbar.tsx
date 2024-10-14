import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { language } from "../Types/types";

import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
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
    const [showProjectDropdown, setShowProjectDropdown] = useState<boolean>(false);
    const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);
    const isHovering = useRef<boolean>(false);

    const hashProjects = useRef<string[]>(slides.map(item => item.name.toLowerCase()));

    const [barWidth, setBarWidth] = useState<number>(((swiper?.current?.swiper.activeIndex != null) ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1));

    function closeAll() {
        // isClicked.current = false;
        // if (isHovering.current) {
        //     return;
        // }
        setShowMenuDropdown(false); 
        setShowProjectDropdown(false);
        setShowLangDropdown(false); 
    }

    const MarkActive = (items: string[]): boolean => {
        return items.find(hashes => hashes === hash.substring(1)) !== undefined // Get #about => about
    }
    
    const NavbarStatus = (item: string): JSX.Element => {
        if (isHomePage) {
            return (
            <a href={`/#${item}`} className={"font-text pt-[2px] select-none"} onClick={() => {
                closeAll();
                }}>
                    {getTranslatedText(item)}
            </a>)
        }
        return (
            <Link to={`/#${item}`} className={"font-text pt-[2px] select-none"} onClick={() => {
                setHash(`#${item}`);
                }}>
                    {getTranslatedText(item)}
            </Link>)
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
            // closeAll();
        };

        const handleClickOutside = () => {
            // console.log('clicked outside');
            closeAll();
        };
        
        // Runs everytime a switch to a new window is changed
        const OnWindChanged = () => {
            setBarWidth(((swiper?.current?.swiper.activeIndex != null) ? swiper?.current?.swiper.activeIndex+1 : 1) / (swiper?.current?.swiper.slides.length ? (swiper?.current?.swiper.slides.length) : 1))

        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('OnWindChanged', OnWindChanged);
        document.addEventListener('OnSlideChanged', OnSlideChanged);
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('OnWindChanged', OnWindChanged);
            document.removeEventListener('OnSlideChanged', OnSlideChanged)
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.documentElement.className = darkMode ? 'dark' : 'light';
        if (isHomePage) {
            document.documentElement.style.setProperty('--swiper-pagination-color', darkMode ? "#f0f0f0" : "#0f0f0f");
            currentColor.current = darkMode ? "#f0f0f0" : "#0f0f0f";
        }
    }, [darkMode])

    const UIDropdown = (props: { 
        children: React.ReactNode, 
        showDropdown: boolean, 
        setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
        activeIcon: JSX.Element, 
        mainIcon: JSX.Element
        className?: string,
    }) => {
        const { children, showDropdown, setShowDropdown, activeIcon, mainIcon, className } = props;
    
        return (
            <div className="relative flex flex-col">
                <button onClick={() => {setShowDropdown(!showDropdown)}} 
                onMouseEnter={() => {setShowDropdown(true) }} onMouseLeave={() => isHovering.current = false}>
                    {showDropdown ? activeIcon : mainIcon}
                </button>
                {showDropdown && (
                    <div className={`${className} absolute flex flex-col left-0 top-[32px] rounded-lg border-2 bg-[#ffffff] border-[#f0f0f0] dark:bg-[#000000] dark:border-[#0f0f0f] `}
                    // onMouseEnter={() => isHovering.current = true} onMouseLeave={() => isHovering.current = false}
                    >
                        { children }
                    </div>
                )}
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
                <UIDropdown showDropdown={showMenuDropdown} setShowDropdown={setShowMenuDropdown} mainIcon={<MenuIcon/>} activeIcon={<MenuIcon/>}>
                    <button className={"rounded-lg p-1 hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} 
                    onClick={() => {
                        setDarkMode(!darkMode);
                        localStorage.setItem('DarkMode', JSON.stringify(!darkMode));
                        }}>
                        {darkMode ? <DarkModeIcon htmlColor={darkMode ? "white" : "black"}/> : <BrightnessIcon htmlColor={darkMode ? "white" : "black"}/>}
                    </button>
                    <UIDropdown showDropdown={showLangDropdown} setShowDropdown={setShowLangDropdown} mainIcon={<SvgAssets icon={language}/>} 
                        activeIcon={
                        <div className="hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]">
                            <SvgAssets icon={language}/>
                        </div>
                        }>
                        {languages.map(language => (
                            <button key={language.key} className={"w-full p-1 rounded-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} onClick={() => {
                                localStorage.setItem('Language', language.key);
                                setShowLangDropdown(false); 
                                setLanguage(language.key);
                                }}>
                                <div className={"flex flex-row p-[2px] gap-1 font-text " + (language.key === 'ja' ? ' w-[130px] ' : '') }>
                                    <SvgAssets icon={language.key}/>
                                    <span>{getTranslatedText(language.lang)}</span>
                                </div>
                            </button>
                        ))}
                    </UIDropdown>
                    <div className="pb-1"/>
                </UIDropdown>
                <NavbarItem isActive={MarkActive(hashHome)}>
                    {NavbarStatus('home')}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center">
                <NavbarItem className="flex flex-row gap-1" isActive={MarkActive(hashProjects.current)}>
                    {NavbarStatus('projects')}
                    <UIDropdown showDropdown={showProjectDropdown} setShowDropdown={setShowProjectDropdown} mainIcon={<ArrowDropDownIcon/>} activeIcon={<ArrowDropUpIcon/>} className="w-[162px]">
                        {slides.map(project => (
                            <Link key={project.name} to={`/projects/${project.name.toLowerCase()}`}>
                                <button className={"w-full p-1 rounded-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} onClick={() => {
                                    setHash(`#${project.name}`);
                                    }}>
                                    <div className={"flex flex-row p-[2px] gap-1 font-title" }>
                                        {project.icon}
                                        <span className={`bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{project.name}</span>
                                    </div>
                                </button>
                            </Link>
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
        <div className="flex flex-col items-center">
            <div className="w-full h-[2px] bg-[#808080] rounded-full">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${barWidth * 100}%`, background: currentColor.current}}/>
            </div>
        </div>
        </>
    );
}

export default UINavbar;
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { svg, language } from "../Types/types";

import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { SlidesContext } from "./AppView";
import SvgAssets from "./SvgAssets";

const UINavbar = (props: {
    isHomePage: boolean, 
    language: string, 
    setLanguage: React.Dispatch<React.SetStateAction<string>>, 
    currentColor: React.MutableRefObject<string>
}) => {
    const { isHomePage, language, setLanguage, currentColor } = props;

    const { getTranslatedText, slides } = useContext(SlidesContext);

    const wrapper = useRef<HTMLDivElement>(null);
    const [hash, setHash] = useState<string>(window.location.hash);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedDarkMode = localStorage.getItem('DarkMode');
        if (savedDarkMode == null) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
    const [showProjectDropdown, setShowProjectDropdown] = useState<boolean>(false);
    const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);
    const isHovering = useRef<boolean>(false);

    const hashHome = ['home', 'about'];
    const hashProjects = slides.map(item => item.name); // To mark active when viewing the project cards
    hashProjects.push('projects', 'portfolio');
    const hashContacts = ['contacts'];

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
        },
    ]

    function closeAll() {
        if (isHovering.current) {
            return;
        }
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
        if (hashProjects.find(project => project === window.location.pathname.substring(10)) !== undefined) { // Check if undefined project path: ex. /projects/BGMAPP !== undefined
            setHash('#projects');
        }

        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        const OnSlideChanged = () => {
            closeAll();
        };

        const handleClickOutside = () => {
            // console.log('clicked outside');
            closeAll();
        };

        window.addEventListener('hashchange', handleHashChange);
        document.addEventListener('OnSlideChanged', OnSlideChanged)
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
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
    }) => {
        const { children, showDropdown, setShowDropdown, activeIcon, mainIcon } = props;
    
        return (
            <div className="relative flex flex-col">
                <button onMouseEnter={() => {setShowDropdown(true); isHovering.current = true}} onMouseLeave={() => isHovering.current = false}>
                    {showDropdown ? activeIcon : mainIcon}
                </button>
                {showDropdown && (
                    <div ref={wrapper} className={"absolute flex flex-col left-0 top-[32px] rounded-lg border-2 bg-[#ffffff] border-[#f0f0f0] dark:bg-[#000000] dark:border-[#0f0f0f]"}>
                        { children }
                    </div>
                )}
            </div>
        )
    }

    return (
        <Navbar // Displays buttons 
        isBordered
        height={2}
        position="sticky"
        isBlurred={false}
        classNames={{
            item: [
                "data-[active=true]:after:text-bold",
            ]
        }}
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
                    <UIDropdown showDropdown={showLangDropdown} setShowDropdown={setShowLangDropdown} mainIcon={<SvgAssets icon={language as svg}/>} 
                        activeIcon={
                        <div className="hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]">
                            <SvgAssets icon={language as svg}/>
                        </div>
                        }>
                        {languages.map(language => (
                            <button key={language.key} className={"w-full p-1 rounded-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} onClick={() => {
                                localStorage.setItem('Language', language.key);
                                setShowLangDropdown(false); 
                                setLanguage(language.key);
                                }}>
                                <div className={"flex flex-row p-[2px] gap-1 font-text " + (language.key === 'ja' ? ' w-[130px] ' : '') }>
                                    <SvgAssets icon={language.key as svg}/>
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
                <NavbarItem className="flex flex-row gap-1" isActive={MarkActive(hashProjects)}>
                    {NavbarStatus('projects')}
                    <UIDropdown showDropdown={showProjectDropdown} setShowDropdown={setShowProjectDropdown} mainIcon={<ArrowDropDownIcon/>} activeIcon={<ArrowDropUpIcon/>}>
                        {slides.map(project => (
                            <Link key={project.name} to={`/projects/${project.name}`}>
                                <button className={"w-full p-1 rounded-lg hover:bg-[#e9e9e95d] dark:hover:bg-[#353535a2]"} onClick={() => {
                                    setHash(`#${project.name}`);
                                    }}>
                                    <div className={"flex flex-row p-[2px] gap-1 font-title " }>
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
    );
}

export default UINavbar;
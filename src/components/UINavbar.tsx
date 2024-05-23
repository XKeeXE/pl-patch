import { Button, Dropdown, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, } from "@nextui-org/react";

import LanguageSelect from "./LanguageSelect";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { RouteToLink, slide, TranslatedText } from "../Types/types";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UIDropdown from "./UIDropdown";

const UINavbar = (props: {darkMode: boolean, language: string, showMenuDropdown: boolean, showProjectDropdown: boolean, setLanguage: React.Dispatch<React.SetStateAction<string>>, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, setShowMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowProjectDropdown: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText, slides: slide[]}) => {
    const { darkMode, language, showMenuDropdown, showProjectDropdown, setDarkMode, setLanguage, setShowMenuDropdown, setShowProjectDropdown, getTranslatedText, slides } = props;

    const [isHomePage, setIsHomePage] = useState<boolean>(true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [hash, setHash] = useState<string>(window.location.hash);

    const clickedItem = useRef<string>('');

    const hashHome = ['home', 'about'];
    const hashProjects = slides.map(item => item.name);
    hashProjects.push('projects', 'portofolio');
    const hashContacts = ['contacts'];

    // const settingsItem: JSX.Element[] = [
            // <LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>,
            // <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
            //     {darkMode ? <DarkModeIcon/> : <BrightnessIcon/>}
            // </Button>
    //     ];

    function MarkActive(items: string[]): boolean {
        return hash === '#' + items.find(item => ('#' + item) === hash) ? true : false
    }
    
    const NavbarStatus = (item: string): JSX.Element => {
        if (isHomePage) {
            return (
            <a href={'#' + item} className="text-black font-text pt-[2px]" 
                onClick={() => {
                    setShowMenuDropdown(false); 
                    setShowProjectDropdown(false)}}>
                        {getTranslatedText(item)}
            </a>)
        }
        return (
            <Link to={"/#" + item} className="text-black font-text pt-[2px]" 
                onClick={() => {
                    setShowMenuDropdown(false); 
                    setShowProjectDropdown(false); 
                    clickedItem.current = item}}>
                        {getTranslatedText(item)}
            </Link>)
    }

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/')
    }, [])

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };
    
        window.addEventListener('hashchange', handleHashChange);
    
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
    }, [hash]);

    return (
        <Navbar // Displays buttons 
        isBordered
        height={2}
        position="sticky"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={false}
        classNames={{
            item: [
                // "data-[active=true]:after:content-['']",
                "data-[active=true]:after:text-bold",
                // "data-[active=true]:after:bottom-0",
                // "data-[active=true]:after:left-0",
                // "data-[active=true]:after:right-0",
                // "data-[active=true]:after:h-[2px]",
                // "data-[active=true]:after:rounded-[2px]",
                // "data-[active=true]:after:bg-primary",
            ]
            // base: ' border-b-2  ' + (darkMode ? 'bg-[#181818ee] border-gray-200' : ' bg-[#F689A81c]'),
        }}
        >
            <NavbarContent className="" justify="start">
                <UIDropdown darkMode={darkMode} showDropdown={showMenuDropdown} setShowDropdown={setShowMenuDropdown} mainIcon={<MenuIcon/>} activeIcon={<MenuIcon/>}>
                    <ul>
                        <li>
                        <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <DarkModeIcon/> : <BrightnessIcon/>}
                        </Button>
                        </li>
                        <li>
                            <LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>
                        </li>
                    </ul>
                </UIDropdown>
                <NavbarItem isActive={MarkActive(hashHome)}>
                    {NavbarStatus('home')}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent 
            justify="center">
                <NavbarItem className="flex flex-row gap-1" isActive={MarkActive(hashProjects)}>
                    {NavbarStatus('projects')}
                    <UIDropdown darkMode={darkMode} showDropdown={showProjectDropdown} setShowDropdown={setShowProjectDropdown} mainIcon={<ArrowDropDownIcon/>} activeIcon={<ArrowDropUpIcon/>}>
                        <ul>
                            {slides.map(project => (
                                <li>
                                    <Link to={"/projects/" + project.name} >
                                        <button className="w-full p-1 rounded-lg hover:bg-[#353535a2] " onClick={() => {setShowMenuDropdown(false); setShowProjectDropdown(false);}}>
                                            <div className="flex flex-row p-[2px] gap-1 text-white">
                                                {project.icon}
                                                {project.name}
                                            </div>
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
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
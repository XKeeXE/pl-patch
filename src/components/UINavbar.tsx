import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/react";

import LanguageSelect from "./LanguageSelect";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { TranslatedText } from "../Types/types";

import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const UINavbar = (props: {darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, language: string, 
    setLanguage: React.Dispatch<React.SetStateAction<string>>, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText}) => {
    const { darkMode, setDarkMode, language, setLanguage, setOpenModal, getTranslatedText } = props;

    const [isHomePage, setIsHomePage] = useState<boolean>(true);

    const clickedItem = useRef<string>('');

    interface navBarEnd {
        name: string,
        url: string,
        icon: JSX.Element
    }

    const navBarItemsEnd: navBarEnd[] = [
        {name: getTranslatedText('resume'), url: '/Resume Patch.pdf', icon: <ContactPageIcon htmlColor='pink'/>} ,
        {name: getTranslatedText('email'), url: 'mailto:patch.rodriguez.medina@gmail.com', icon: <EmailIcon htmlColor='pink'/>} ,
        {name: 'GitHub', url: 'https://github.com/XKeeXE', icon: <GitHubIcon htmlColor='pink'/>}
    ];

    function NavbarOptions(): JSX.Element {
        return (
            <>
            <LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>
            <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <DarkModeIcon htmlColor="pink"/> : <BrightnessIcon htmlColor='pink'/>}
            </Button>
            </>
        )
    }
    
    function NavbarStatus(item: string): JSX.Element {
        if (isHomePage) {
            return <a href={'#' + item} className="text-black font-text">{getTranslatedText(item)}</a>
        }
        return <Link to="/" onClick={() => {setIsHomePage(true); clickedItem.current = item}}>{getTranslatedText(item)}</Link>
    }

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/')
        // console.log(window.location.pathname === '/');
        if (isHomePage) {
            window.location.hash = clickedItem.current;
        }
    })

    return (
        <>
        <Navbar // Displays buttons 
        isBordered
        height={14}
        position="sticky"
        isBlurred={false}
        classNames={{
            item: [
                // "data-[active=true]:after:content-['']",
                "data-[active=true]:after:text-lg",
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
            <NavbarContent 
            className="" 
            justify="start">
                {/* <a href="#home" className="text-black font-text">{getTranslatedText('home')}</a> */}
                {/* {isHomePage ? <a href="#home" className="text-black font-text">{getTranslatedText('home')}</a> : <Link to="/#home" className="text-black font-text">{getTranslatedText('home')}</Link>} */}
                {/* <div className="hidden sm:flex gap-2">
                    {NavbarOptions()}
                </div> */}
                {/* <Link to="#home" className="text-black font-text">{getTranslatedText('home')}</Link> */}
                {NavbarStatus('home')}
            </NavbarContent>

            <NavbarContent 
            justify="center">
                <NavbarBrand className="flex flex-row gap-4">
                    {/* <LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/> */}
                    {/* <a href="#projects" className="text-black font-text">{getTranslatedText('projects')}</a> */}
                    {/* <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <DarkModeIcon htmlColor="pink"/> : <BrightnessIcon htmlColor='pink'/>}
                    </Button> */}
                    {/* <Link ="#projects" className="text-black font-text">{getTranslatedText('projects')}</Link> */}
                    {/* <button onClick={() => {
                        console.log(isHomePage);
                        // console.log();
                    }}>Test</button> */}
                    {NavbarStatus('projects')}
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem >
                    {NavbarStatus('contacts')}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        </>
        //  <Navbar // Displays buttons 
        //  isBordered
        //  height={14}
        //  position="sticky"
        //  isBlurred={false}
        //  classNames={{
        //      item: [
        //          // "data-[active=true]:after:content-['']",
        //          "data-[active=true]:after:text-lg",
        //          // "data-[active=true]:after:bottom-0",
        //          // "data-[active=true]:after:left-0",
        //          // "data-[active=true]:after:right-0",
        //          // "data-[active=true]:after:h-[2px]",
        //          // "data-[active=true]:after:rounded-[2px]",
        //          // "data-[active=true]:after:bg-primary",
        //      ]
        //      // base: ' border-b-2  ' + (darkMode ? 'bg-[#181818ee] border-gray-200' : ' bg-[#F689A81c]'),
        //  }}
        //  >
        //  <NavbarContent 
        //  className="" 
        //  justify="start">
        //      <a href="#home" className="text-black font-text">{getTranslatedText('home')}</a>
        //      {/* {isHomePage ? <a href="#home" className="text-black font-text">{getTranslatedText('home')}</a> : <Link to="/#home" className="text-black font-text">{getTranslatedText('home')}</Link>} */}
        //      {/* <div className="hidden sm:flex gap-2">
        //          {NavbarOptions()}
        //      </div> */}
        //      {/* <Link to="#home" className="text-black font-text">{getTranslatedText('home')}</Link> */}
        //  </NavbarContent>

        //  <NavbarContent 
        //  justify="center">
        //      <NavbarBrand className="flex flex-row gap-4">
        //          {/* <LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/> */}
        //          <a href="#projects" className="text-black font-text">{getTranslatedText('projects')}</a>
        //          {/* <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
        //              {darkMode ? <DarkModeIcon htmlColor="pink"/> : <BrightnessIcon htmlColor='pink'/>}
        //          </Button> */}
        //          {/* <Link ="#projects" className="text-black font-text">{getTranslatedText('projects')}</Link> */}
        //      </NavbarBrand>
        //  </NavbarContent>

        //  <NavbarContent justify="end">
        //      <NavbarItem >
        //          {/* <Link to="#contacts" className="text-black font-text" onClick={() => {console.log(window.location.href.includes('#contacts'))}}>{getTranslatedText('contacts')}</Link> */}
        //          <a href="#contacts" className="text-black font-text">{getTranslatedText('contacts')}</a>
        //      </NavbarItem>
        //  </NavbarContent>
        //  </Navbar>
    );

}

export default UINavbar;
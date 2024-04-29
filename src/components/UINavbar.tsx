import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer, Switch } from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

import LanguageSelect from "./LanguageSelect";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const UINavbar = (props: any) => {
    const { darkMode, setDarkMode, language, setLanguage, setOpenModal, getTranslatedText } = props;

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

    function HandleLinkClick(url: string) {
        window.open(url);
    };

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

    return (
        <Navbar // Displays buttons 
        isBordered
        isBlurred={false}
        classNames={{
            base: ' border-b-2  ' + (darkMode ? 'bg-[#18181855] border-gray-200' : ' bg-[#F689A81c]'),
        }}
        >
        <NavbarContent 
        className="" 
        justify="start">
            <div className="hidden sm:flex gap-2">
                {NavbarOptions()}

            </div>
        </NavbarContent>

        <NavbarContent 
        // className="sm:hidden pr-3 font-custom" 
        justify="center">
            <NavbarBrand>
                <Button className="bg-gradient-to-b from-[#f2c9cf] to-[#e984a9] text-white border-2 border-gray-200 hover:border-gray-400" variant="flat" size="sm" aria-label="about" onClick={() => setOpenModal(true)}>
                    {getTranslatedText('aboutHeader')}
                </Button>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem 
            className="flex sm:gap1"
            >
                {navBarItemsEnd.map((item, index) => (
                    <Tooltip key={index} title={item.name}>
                        <Button key={index} variant="light" size="sm" isIconOnly disableAnimation onClick={() => {HandleLinkClick(item.url)}}>
                            {item.icon}
                        </Button>
                    </Tooltip>
                ))}
                <div className="sm:hidden flex flex-row-reverse">
                    {NavbarOptions()}
                </div>
            </NavbarItem>
            <Link className="hidden sm:flex" isExternal showAnchorIcon href={"https://github.com/XKeeXE/pl-patch"}>Source Code</Link>
        </NavbarContent>
        </Navbar>
    );

}

export default UINavbar;
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer } from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

import LanguageSelect from "./LanguageSelect";

import BrightnessIcon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const UINavbar = (props: any) => {
    const { language, setLanguage, darkMode, setDarkMode, setOpenModal, getTranslatedText } = props;

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

    return (
        <Navbar // Displays buttons 
        className="absolute bg-background/60"
        isBordered
        position="sticky">
        <NavbarContent className="sm:hidden" justify="start">
            <LanguageSelect language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>
            {/* <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <DarkModeIcon htmlColor="white"/> : <BrightnessIcon htmlColor='white'/>}
            </Button> */}
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3 font-custom" justify="center">
            <NavbarBrand>
                <Button variant="ghost" size="sm" as={Link} aria-label="github" onClick={() => setOpenModal(true)}>
                    {getTranslatedText('aboutHeader')}
                </Button>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem className="flex gap-2">
                {navBarItemsEnd.map((item, index) => (
                    <Tooltip key={index} title={item.name}>
                        <Button key={index} variant="light" size="sm" isIconOnly disableAnimation onClick={() => {HandleLinkClick(item.url)}}>
                            {item.icon}
                        </Button>
                    </Tooltip>
                ))}
            </NavbarItem>
            <Link isExternal showAnchorIcon href={"https://github.com/XKeeXE/pl-patch"}>Source Code</Link>
        </NavbarContent>
        </Navbar>
    );

}

export default UINavbar;
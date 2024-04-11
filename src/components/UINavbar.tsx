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

    // const menuItems = [
    //     "Profile",
    //     "Dashboard",
    //     "Activity",
    //     "Analytics",
    //     "System",
    //     "Deployments",
    //     "My Settings",
    //     "Team Settings",
    //     "Help & Feedback",
    //     "Log Out",
    //   ];

    interface navBarStart {

    }

    interface navBarEnd {
        name: string,
        url: string,
        icon: JSX.Element
    }

    // const navBarItemsStart: navBarStart[] = {

    // }

    const navBarItemsEnd: navBarEnd[] = [
        {name: getTranslatedText('resume'), url: '\Resume Patch.pdf', icon: <ContactPageIcon htmlColor='white'/>} ,
        {name: getTranslatedText('email'), url: 'mailto:patch.rodriguez.medina@gmail.com', icon: <EmailIcon htmlColor='white'/>} ,
        {name: 'GitHub', url: 'https://github.com/XKeeXE', icon: <GitHubIcon htmlColor='white'/>}
    ];

    function HandleLinkClick(url: string) {
        window.open(url);
    }

    return (
        <Navbar
        className="absolute bg-background/60"
        isBordered
        
        position="sticky"
        //   isBlurred={false}
        //   isMenuOpen={isMenuOpen}
        //   onMenuOpenChange={setIsMenuOpen}
        >
        <NavbarContent className="sm:hidden" justify="start">
            <LanguageSelect language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>
            {/* <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} /> */}
            <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <DarkModeIcon htmlColor="white"/> : <BrightnessIcon htmlColor='white'/>}
            </Button>
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3 font-custom" justify="center">
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                {/* <p className="font-bold text-inherit">Test</p> */}

                <Button variant="ghost" size="sm" as={Link} aria-label="github" onClick={() => setOpenModal(true)}>
                    {getTranslatedText('aboutHeader')}
                </Button>
            </NavbarBrand>
        </NavbarContent>

        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
            <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarItem>
            <Link color="foreground" href="#">
            Features
            </Link>
            </NavbarItem>
            <NavbarItem isActive>
            <Link href="#" aria-current="page">
            Customer
            </Link>
            </NavbarItem>
            <NavbarItem>
            <Link color="foreground" href="#">
            Integrations
            </Link>
            </NavbarItem>
        </NavbarContent> */}

        <NavbarContent justify="end">
            <NavbarItem>
                {navBarItemsEnd.map(item => (
                    <Tooltip title={item.name}>
                        <Button variant="light" size="sm" isIconOnly disableAnimation onClick={() => {HandleLinkClick(item.url)}}>
                            {item.icon}
                        </Button>
                    </Tooltip>
                ))}
            </NavbarItem>
        </NavbarContent>

        {/* <NavbarMenu>
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                color={
                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
                >
                {item}
                </Link>
            </NavbarMenuItem>
            ))}
        </NavbarMenu> */}
        </Navbar>
    );

}

export default UINavbar;
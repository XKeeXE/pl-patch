import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TranslatedText } from "../Types/types";
import SVGAssets from "./SvgAssets";

const LanguageSelect = (props: {darkMode: boolean, language: string, setLanguage: React.Dispatch<React.SetStateAction<string>>, getTranslatedText: TranslatedText}) => {
    const { darkMode, language, setLanguage, getTranslatedText } = props;

    interface language {
        key: string,
        lang: string,
        icon: JSX.Element,
    }

    const languages: language[] = [{
            key: 'en',
            lang: 'english',
            icon: <SVGAssets key={'US'}/>
        },
        {
            key: 'es',
            lang: 'spanish',
            icon: <SVGAssets key={'PR'}/>
        },
        {
            key: 'ja',
            lang: 'japanese',
            icon: <SVGAssets key={'JA'}/>
        },
    ]
    
    const CheckLanguage = () => {
        switch(language) {
            case 'es': return <SVGAssets key={'PR'}/>;
            case 'en': return <SVGAssets key={'US'}/>;
            case 'ja': return <SVGAssets key={'JA'}/>;
            default: return <SVGAssets key={'US'}/>;
        };
    }

    useEffect(() => {
        switch(language) {
            case 'es': return;
            case 'en': return;
            case 'ja': return;
            default: setLanguage('en');
        }
    }, [])

    return (
        <Dropdown radius="sm" classNames={{
            base: "rounded-lg border-2 " + (darkMode ? "border-gray-200" : "border-gray-100"),
            content: "p-0 border-small border-divider " + (darkMode ? "bg-[#181818]" : "bg-[#fafafa]"),
        }}>
            <DropdownTrigger>
                <Button variant="light" size="sm" isIconOnly aria-label="language">
                    <CheckLanguage/>
                </Button>
            </DropdownTrigger>

            <DropdownMenu variant="flat" aria-label="language-menu" 
            onAction={(key) => {
                localStorage.setItem('Language', key.toString());
                setLanguage(key.toString());
                }}>
                {languages.map(language => (
                    <DropdownItem key={language.key} startContent={language.icon}>
                        {getTranslatedText(language.lang)}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default LanguageSelect;
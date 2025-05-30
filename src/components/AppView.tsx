import { createContext, RefObject, useEffect, useRef, useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
import GroupIcon from '@mui/icons-material/Group';
import { LanguageTranslations, slide } from '../util/types';
import { Routes, Route } from "react-router-dom";
import ProjectView from './ProjectView';
import ErrorView from './ErrorView';
import SvgAssets from './SvgAssets';
import { SwiperRef } from 'swiper/react';
import React from 'react';
import * as images from '../util/images';

const slides: slide[] = [
    {
        color: '#0030e7',
        gradient: 'from-[#0009ff] from-0% to-[#006ae7] to-40%',
        icon: <SvgAssets icon='Symbiomata.png' />,
        header: 'Imgs/SYMBIOMATA/Symbiomata_Header.png',
        name: 'SYMBIOMATA',
        images: images.SYMBIOMATA,
        video: 'https://www.youtube.com/watch?v=XeHJk2QApac',
        links: [{
            text: 'Download',
            url: 'https://drive.google.com/file/d/16Z4LDvYdeoUD-FA3us8k2M9qOYqUZUCO/view?usp=drive_link'
        }]
    },
    {
        color: '#bebee8ff',
        gradient: 'from-[#363379ff] from-0%  to-[#4c47a4ff] to-100%',
        icon: <SvgAssets icon='Tsukumo.png' />,
        // header: 'Tsukumo_Header.png',
        name: 'TSUKUMO',
        images: images.TSUKUMO,
        video: 'https://vimeo.com/1053277652',
        links: [{
            text: 'Website',
            url: 'https://sneorino.itch.io/tsukumo-tempo'
    }]
    },
    {
        color: '#7a0a9c',
        gradient: 'from-[#8208de] from-20%  to-[#6d0c6e] to-100%',
        icon: <SvgAssets icon='BGMAPP.ico'/>,
        name: 'BGMAPP',
        images: images.BGMAPP,
        video: `https://www.youtube.com/watch?v=X1pwlqSlpTc`,
        links: [{
            text: 'GitHub',
            url: 'https://github.com/XKeeXE/bgm-app'
        },
        {
            text: 'Download',
            url: 'https://drive.google.com/file/d/1ipaUW8aSPM68mBA_ge3d9jJzDfo2DKKo/view?usp=sharing'
        }
        ]
    },
    {
        color: '#5e9cff',
        gradient: 'from-[#9181ff] from-10% to-[#00d6ff] to-50%',
        icon: <SvgAssets icon='Nekomata.ico' />,
        name: 'NEKOMATA',
        images: images.NEKOMATA,
        video: `${process.env.PUBLIC_URL}/Videos/NEKOMATA.mp4`,
        links: [{
            text: 'Website',
            url: 'https://sneorino.itch.io/nekomata'
        },
        {
            text: 'Download',
            url: 'https://drive.google.com/file/d/1K6vL-DLXzOLSPFHdqZSOA3TR8JXo5VJl/view?usp=drive_link'
        }]
    },
    {
        color: '#d33636',
        gradient: 'from-[#d53030] from-0% via-[#cb3b3b] via-50% to-[#910a0a] to-100%',
        icon: <SvgAssets icon='onigiri' />,
        header: 'Imgs/ONIGIRI/Onigiri_Header.png',
        name: 'ONIGIRI',
        images: images.ONIGIRI,
        video: 'https://www.youtube.com/watch?v=Y9xsck9kelo',
        links: [{
            text: 'Download',
            url: 'https://drive.google.com/file/d/1-ZuUA72Iqf5Hyf0OQYJZvxxtHo6QNsAZ/view?usp=sharing'
        }]
    },
    {
        color: '#4caee4',
        gradient: 'from-[#3b87c5] from-0% to-[#59a6e0] to-60%',
        icon: <SvgAssets icon='Remu.png'/>,
        name: 'REMU',
        images: images.REMU,
        video: 't',
        links: [{
            text: 'Discord',
            url: 'https://discord.com/oauth2/authorize?client_id=1085660593672953957'
        }]
    },
    {
        color: '#1e65c9',
        gradient: 'from-[#373ba6] from-0% via-[#0290f2] via-20% to-[#373ba6] to-100%',
        icon: <WallpaperIcon />,
        name: 'L2DWP',
        images: images.L2DWP,
        video: `https://www.youtube.com/watch?v=1iJIBD7xCi8`,
        links: [{
            text: 'GitHub',
            url: 'https://github.com/XKeeXE/Live2DWallpaper'
        }]
    },
    {
        color: '#b6b6b6',
        gradient: 'from-[#a1a1a1] from-40% to-[#6c6c6c] to-100%',
        icon: <GroupIcon/>,
        name: 'BURROUGHS',
        images: undefined,
        video: 't',
        links: []
    },
    ];

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

function GetCurrentLanguage(): string {
    if (localStorage.getItem('Language')) { // get saved language
        return localStorage.getItem('Language') as string;
    }
    if (!['es', 'en', 'ja'].includes(navigator.language)) { // To check website usable languages
        return 'en';
    }
    return navigator.language;
}

export const SlidesContext = createContext<{
    isHomePage: boolean,
    swiper: RefObject<SwiperRef> | null,
    getTranslatedText: (_langKey: string, _params?: { [key: string]: string|number|boolean }) => string, 
    getTranslatedParagraph: (_langKey: string, _className: string, _params?: { [key: string]: string|number|boolean|JSX.Element }) => JSX.Element,
    slides: slide[]
}>({
    isHomePage: true,
    swiper: null,
    getTranslatedText: (_langKey: string, _params?: { [key: string]: string|number|boolean }) => '', 
    getTranslatedParagraph: (_langKey: string, _className: string, _params?: { [key: string]: string|number|boolean|JSX.Element }) => <></>,
    slides: slides
});

const AppView = () => {
    const [language, setLanguage] = useState<string>(GetCurrentLanguage() as string);
    const [isHomePage, setIsHomePage] = useState<boolean>(true);

    const swiper = useRef<SwiperRef>(null);
    const currentColor = useRef<string>('');

    /**
     * The file languages.json contains keys of languages which contained text in their corresponding language.
     * @param key The key of the translated text.
     * @param params In the language.json file the translated text can accept text surrounded by '<>' to replace with a dynamic value
     * (Can be strings, number, booleans, or JSX.Elements).
     * @returns The translated string.
     */
    function getTranslatedText(key: string, params?: { [key: string]: string|number|boolean }): string {
        const languageTranslations: LanguageTranslations = data[language];

        let translation = languageTranslations[key] || 'null'; // The corresponding translated text or 'Text not found' if the key is incorrect or missing in the JSON
        if (params) {
            Object.keys(params).forEach(paramKey => {
                const regex = new RegExp(`<${paramKey}>`, 'g'); // Create a regex for the placeholder
                translation = translation.replace(regex, params[paramKey].toString()); // Replace with the value
            });
        }
        return translation;
    }

    /**
     * Similar to getTranslatedText() except that instead of returning a string returns a JSX element 
     * with a paragraph element containing span elements.
     * @param key The key of the translated text.
     * @param className The optimal CSS tailwind styling.
     * @param params In the language.json file the translated text can accept text surrounded by '<>' to replace with a dynamic value
     * (Can be strings, number, booleans, or JSX.Elements).
     * @returns An HTML paragraph element containing HTML span elements.
     */
    function getTranslatedParagraph(key: string, className: string, params?: { [key: string]: string|number|boolean|JSX.Element }): JSX.Element {
        const languageTranslations: LanguageTranslations = data[language];
        const nodes: React.ReactNode[] = []
        const nodeParams: string[] = []

        let translation = languageTranslations[key] || 'null';

        if (params) {
            Object.keys(params).forEach(paramKey => {
                const regex = new RegExp(`<${paramKey}>`, 'g');
                if (React.isValidElement(params[paramKey])) {
                    nodes.push(params[paramKey]); // Add the react nodes to the array
                    nodeParams.push(`<${paramKey}>`); // Add the regex of the param key
                } else {
                    translation = translation.replace(regex, params[paramKey].toString());
                }
            });
            const regex = new RegExp("(<[^>]+>|[^<]+)", "g");
            if (nodes.length > 0) { // If there are JSX elements in the params
                const resultArray = translation.match(regex)?.map(str => str).filter(str => str) as string[]; // Cut the paragraph in pieces between the <paramKeys>
                return (
                    <p className={className}>
                        {resultArray.map((splitLine, index) => (
                            <span key={`paragraphLine_${index}`}>
                                {nodeParams.includes(splitLine) ? nodes[nodeParams.indexOf(splitLine)] : splitLine.split('\n').map((line, indexLine2) => (
                                    <span key={`splitLine_${index}_${indexLine2}`}>
                                        {line}
                                        {indexLine2 < splitLine.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </p>
                );
            }
        }
        return ( // No JSX node was detected therefore we just paragraph the text
            <p className={className}>
                {translation.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        {index < translation.split('\n').length - 1 && <br />}
                    </span>
                ))}
            </p>
        )
    }

    function getDarkMode() {
        const darkMode = localStorage.getItem('DarkMode');
        if (!darkMode) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return darkMode === "true";
    }

    // Only activates one time only when first opening the website
    useEffect(() => {
        // console.log("everywhere")
        const OnProjectEnter = () => {
            document.documentElement.style.setProperty('--swiper-button-color', currentColor.current);
            document.documentElement.style.setProperty('--swiper-pagination-color', currentColor.current);
        }

        const OnHomePage = () => {
            currentColor.current = getDarkMode() ? "#f0f0f0" : "#0f0f0f";
            document.documentElement.style.setProperty('--swiper-pagination-color', currentColor.current);
        }

        window.addEventListener('OnProjectEnter', OnProjectEnter);
        window.addEventListener('OnHomePage', OnHomePage);

        return () => {
            window.removeEventListener('OnProjectEnter', OnProjectEnter);
            window.removeEventListener('OnHomePage', OnHomePage);
            };
    }, []);

    return (
        <SlidesContext.Provider value={{slides, swiper, isHomePage, getTranslatedText, getTranslatedParagraph}}>
            <UINavbar language={language} setLanguage={setLanguage} isHomePage={isHomePage} currentColor={currentColor}/> 
            <Routes>
                <Route path='/' element={<WindView language={language} setIsHomePage={setIsHomePage} />}/>
                <Route path='/projects/:projectName' element={<ProjectView setIsHomePage={setIsHomePage} currentColor={currentColor}/>}/>
                <Route path='*' element={<ErrorView setIsHomePage={setIsHomePage} />}/>
            </Routes>
        </SlidesContext.Provider>
    )
}

export default AppView;
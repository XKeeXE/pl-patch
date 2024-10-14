import { createContext, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';

import { image, LanguageTranslations, slide } from '../Types/types';
import { Routes, Route, useNavigate } from "react-router-dom";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import LibraryMusic from '@mui/icons-material/LibraryMusicOutlined';
import ProjectView from './ProjectView';
import ErrorView from './ErrorView';
import { NextUIProvider } from '@nextui-org/react';
import SvgAssets from './SvgAssets';
import { SwiperRef } from 'swiper/react';
import React from 'react';

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

const imagesBGM: image[] = [{
    url: 'Imgs/BGMApp/View.jpg',
    title: 'View',
},
{
    url: 'Imgs/BGMApp/InputSearch.jpg',
    title: 'InputSearch',
},
{
    url: 'Imgs/BGMApp/ContextMenu.jpg',
    title: 'ContextMenu',
},
{
    url: 'Imgs/BGMApp/Shuffle.jpg',
    title: 'Shuffle',
},
]

const imagesL2DWP: image[] = [{
    url: 'Imgs/L2DWP/CharacterIdle.png',
    title: 'CharacterIdle'
},
{
    url: 'Imgs/L2DWP/CharacterTalk.png',
    title: 'CharacterTalk',
},
{
    url: 'Imgs/L2DWP/CharacterUI.png',
    title: 'CharacterUI',
},
{
    url: 'Imgs/L2DWP/NextCharacterTalk.png',
    title: 'NextCharacterTalk',
},
]

const imagesSYMBIOMATA: image[] = [{
    url: 'Imgs/SYMBIOMATA/Slash.png',
    title: 'Slash',
},
{
    url: 'Imgs/SYMBIOMATA/VRPov.png',
    title: 'VRPov'
},
{
    url: 'Imgs/SYMBIOMATA/Zipline.png',
    title: 'Zipline',
},
{
    url: 'Imgs/SYMBIOMATA/2D.png',
    title: '2D',
},
]

const imagesONIGIRI: image[] = [{
    url: 'Imgs/ONIGIRI/BossEntrance.png',
    title: 'BossEntrance',
},
{
    url: 'Imgs/ONIGIRI/Mage.png',
    title: 'Mage',
},
{
    url: 'Imgs/ONIGIRI/Unblockable.png',
    title: 'Unblockable',
},
{
    url: 'Imgs/ONIGIRI/Boss.png',
    title: 'Boss',
},
{
    url: 'Imgs/ONIGIRI/BossParry.png',
    title: 'BossParry',
},
]

const imagesNEKOMATA: image[] = [{
    url: 'Imgs/NEKOMATA/Tutorial.png',
    title: 'Tutorial',
},
{
    url: 'Imgs/NEKOMATA/BossFight.png',
    title: 'BossFight',
},
{
    url: 'Imgs/NEKOMATA/MinionFight.png',
    title: 'MinionFight',
},
{
    url: 'Imgs/NEKOMATA/PlagueRatBoss.png',
    title: 'PlagueRatBoss',
}
]

const slides: slide[] = [

{
    color: '#0030e7',
    gradient: 'from-[#0009ff] from-0% to-[#006ae7] to-40%',
    icon: <SvgAssets icon='symbiomata' />,
    name: 'SYMBIOMATA',
    images: imagesSYMBIOMATA,
    video: 't',
    links: [{
        text: 'Download',
        url: ''
    }]
},
{
    color: '#d33636',
    gradient: 'from-[#d53030] from-0% via-[#cb3b3b] via-50% to-[#910a0a] to-100%',
    icon: <SvgAssets icon='onigiri' />,
    name: 'ONIGIRI',
    images: imagesONIGIRI,
    video: 't',
    links: [{
        text: 'Download',
        url: ''
    }]
},
{
    color: '#5e9cff',
    gradient: 'from-[#9181ff] from-10% to-[#00d6ff] to-90%',
    icon: <SvgAssets icon='nekomata' />,
    name: 'NEKOMATA',
    images: imagesNEKOMATA,
    video: 'Videos/NEKOMATA.mp4',
    links: [{
        text: 'Website',
        url: 'https://sneorino.itch.io/nekomata'
    },
    {
        text: 'Download',
        url: ''
    }]
},
{
    color: '#7a0a9c',
    gradient: 'from-[#8208de] from-0% to-[#6d0c6e] to-100%',
    icon: <LibraryMusic/>,
    name: 'BGMAPP',
    images: imagesBGM,
    video: 'Videos/BGMAPP.mp4',
    links: [{
        text: 'GitHub',
        url: 'https://github.com/XKeeXE/bgm-app'
    },
    {
        text: 'Download',
        url: ''
    }
    ]
},
{
    color: '#1e65c9',
    gradient: 'from-[#373ba6] from-0% via-[#0290f2] via-50% to-[#373ba6] to-100%',
    icon: <WallpaperIcon />,
    name: 'L2DWP',
    images: imagesL2DWP,
    video: 'Videos/L2DWP.mp4',
    links: [{
        text: 'GitHub',
        url: 'https://github.com/XKeeXE/Live2DWallpaper'
    }]
},
// {
//     color: '',
//     gradient: '',
//     icon: <OnigiriIcon />,
//     name: 'BURROUGHS',
//     images: imagesSYMBIOMATA,
//     video: 't',
//     demoComponent: undefined,
//     links: [{
//     title: '',
//     url: ''
// }]
// },

];

// export const SlidesContext = createContext({
//     slides: slides,
//     swiper: null,
//     isHomePage: true,
//     getTranslatedText: (langKey: string, _params?: { [key: string]: string|number }) => langKey, 
//     getTranslatedParagraph: (_langKey: string, _className?: string, _params?: { [key: string]: string|number }) => <></>,
// });

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
    // const [language, setLanguage] = useState<string>('en');
    
    const [isHomePage, setIsHomePage] = useState<boolean>(true);

    const swiper = useRef<SwiperRef>(null);
    const currentColor = useRef<string>('');

    // const navigate = useNavigate();

    /**
     * The file languages.json contains keys of languages which contained text in their corresponding language.
     * @param key The key of the translated text.
     * @param params In the language.json file the translated text can accept text surrounded by '<>' to replace with a dynamic value
     * (Can be strings, number, booleans, or JSX.Elements).
     * @returns The translated string.
     */
    function getTranslatedText(key: string, params?: { [key: string]: string|number|boolean }): string {
        const languageTranslations: LanguageTranslations = data[language];

        let translation = languageTranslations[key] || 'Text not found'; // The corresponding translated text or 'Text not found' if the key is incorrect or missing in the JSON
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

        let translation = languageTranslations[key] || 'Text not found';

        let nodes: React.ReactNode[] = []
        let nodeParams: string[] = []

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
            let regex = /(<[^>]+>|[^<]+)/g;
            if (nodes.length > 0) {
                let resultArray = translation.match(regex)?.map(str => str).filter(str => str) as string[]; // Cut the paragraph in pieces between the <paramKeys>
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

        // slides.current = [
        //     {
        //         color: '#7a0a9c',
        //         gradient: 'from-[#8208de] from-0% to-[#6d0c6e] to-100%',
        //         icon: <LibraryMusic/>,
        //         logo: 'Icons/Oni.png',
        //         name: 'BGMAPP',
        //         images: imagesBGM,
        //         video: 'Videos/BGM-APPDemoVid.mp4',
        //         demoComponent: <BGMApp />,
        //         links: [{
        //             text: 'GitHub',
        //             url: 'https://github.com/XKeeXE/bgm-app'
        //         },
        //         {
        //             text: getTranslatedText('download'),
        //             url: ''
        //         }
        //         ]
        //     },
        //     {
        //         color: '#1e65c9',
        //         gradient: 'from-[#373ba6] from-0% via-[#0290f2] via-50% to-[#373ba6] to-100%',
        //         icon: <WallpaperIcon />,
        //         logo: 'Icons/L2DWP.png',
        //         name: 'L2DWP',
        //         images: imagesL2DWP,
        //         video: 'Videos/L2DWPDemoVid.mp4',
        //         demoComponent: <L2DWP/>,
        //         links: [{
        //             text: 'GitHub',
        //             url: 'https://github.com/XKeeXE/Live2DWallpaper'
        //         }]
        //     },
        //     {
        //         color: '#d33636',
        //         gradient: 'from-[#d53030] from-0% via-[#cb3b3b] via-50% to-[#910a0a] to-100%',
        //         icon: <SvgAssets icon='onigiri' />,
        //         logo: '',
        //         name: 'ONIGIRI',
        //         images: imagesONIGIRI,
        //         video: 't',
        //         demoComponent: undefined,
        //         links: [{
        //             text: getTranslatedText('download'),
        //             url: ''
        //         }]
        //     },
        //     // {
        //     //     color: '',
        //     //     gradient: '',
        //     //     icon: <OnigiriIcon />,
        //     //     logo: '',
        //     //     name: 'BURROUGHS',
        //     //     images: imagesSYMBIOMATA,
        //     //     video: 't',
        //     //     demoComponent: undefined,
        //     //     links: [{
        //     //     title: '',
        //     //     url: ''
        //     // }]
        //     // },
        //     {
        //         color: '#0030e7',
        //         gradient: 'from-[#0009ff] from-0% to-[#006ae7] to-40%',
        //         icon: <ViewInArIcon />,
        //         logo: 'Icons/SYMBIOMATA.png',
        //         name: 'SYMBIOMATA',
        //         images: imagesSYMBIOMATA,
        //         video: 't',
        //         demoComponent: undefined,
        //         links: [{
        //             text: '',
        //             url: ''
        //         }]
        //     },
        //     {
        //         color: '#5e9cff',
        //         gradient: 'from-[#9181ff] from-10% to-[#00d6ff] to-90%',
        //         icon: <PetsIcon />,
        //         logo: '',
        //         name: 'NEKOMATA',
        //         images: imagesNEKOMATA,
        //         video: 't',
        //         demoComponent: undefined,
        //         links: [{
        //             text: getTranslatedText('website'),
        //             url: 'https://sneorino.itch.io/nekomata'
        //         },
        //         {
        //             text: getTranslatedText('download'),
        //             url: ''
        //         }]
        //     }];

        return () => {
            window.removeEventListener('OnProjectEnter', OnProjectEnter);
            window.removeEventListener('OnHomePage', OnHomePage);
            };
    }, []);

    return (
        <SlidesContext.Provider value={{slides, swiper, isHomePage, getTranslatedText, getTranslatedParagraph}}>
            {/* <NextUIProvider navigate={navigate}> */}
                <UINavbar language={language} setLanguage={setLanguage} isHomePage={isHomePage} currentColor={currentColor}/> 
                <Routes>
                    <Route path='/' element={<WindView language={language} setIsHomePage={setIsHomePage} />}/>
                    <Route path='/projects/:projectName' element={<ProjectView setIsHomePage={setIsHomePage} currentColor={currentColor}/>}/>
                    <Route path='*' element={<ErrorView setIsHomePage={setIsHomePage} />}/>
                </Routes>
            {/* </NextUIProvider> */}
        </SlidesContext.Provider>
    )
}

export default AppView;
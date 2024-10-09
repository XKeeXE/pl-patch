import { createContext, useEffect, useRef, useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';

import { image, LanguageTranslations, slide } from '../Types/types';
import { Routes, Route, useNavigate } from "react-router-dom";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import PetsIcon from '@mui/icons-material/Pets';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LibraryMusic from '@mui/icons-material/LibraryMusicOutlined';
import ProjectView from './ProjectView';
import BGMApp from './demo/BGMApp';
import L2DWP from './demo/L2DWP';
import ErrorView from './ErrorView';
import { NextUIProvider } from '@nextui-org/react';
import SvgAssets from './SvgAssets';

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

function GetCurrentLanguage(): string {
    if (localStorage.getItem('Language')) { // get saved language
        return localStorage.getItem('Language') as string;
    }
    if (navigator.language !== 'es' || 'en' || 'ja') { // To check website usable languages
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

const imagesPCVR: image[] = [{
    url: 'Imgs/PCVR/Slash.png',
    title: 'Slash',
},
{
    url: 'Imgs/PCVR/VRPov.png',
    title: 'VRPov'
},
{
    url: 'Imgs/PCVR/Zipline.png',
    title: 'Zipline',
},
{
    url: 'Imgs/PCVR/2D.png',
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
    color: '#7a0a9c',
    gradient: 'from-[#8208de] from-0% to-[#6d0c6e] to-100%',
    icon: <LibraryMusic/>,
    logo: 'Icons/Oni.png',
    name: 'BGMAPP',
    images: imagesBGM,
    video: 'Videos/BGM-APPDemoVid.mp4',
    demoComponent: <BGMApp />,
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
    logo: 'Icons/L2DWP.png',
    name: 'L2DWP',
    images: imagesL2DWP,
    video: 'Videos/L2DWPDemoVid.mp4',
    demoComponent: <L2DWP/>,
    links: [{
        text: 'GitHub',
        url: 'https://github.com/XKeeXE/Live2DWallpaper'
    }]
},
{
    color: '#d33636',
    gradient: 'from-[#d53030] from-0% via-[#cb3b3b] via-50% to-[#910a0a] to-100%',
    icon: <SvgAssets icon='onigiri' />,
    logo: '',
    name: 'ONIGIRI',
    images: imagesONIGIRI,
    video: 't',
    demoComponent: undefined,
    links: [{
        text: 'Download',
        url: ''
    }]
},
// {
//     color: '',
//     gradient: '',
//     icon: <OnigiriIcon />,
//     logo: '',
//     name: 'BURROUGHS',
//     images: imagesPCVR,
//     video: 't',
//     demoComponent: undefined,
//     links: [{
//     title: '',
//     url: ''
// }]
// },
{
    color: '#0030e7',
    gradient: 'from-[#0009ff] from-0% to-[#006ae7] to-40%',
    icon: <ViewInArIcon />,
    logo: 'Icons/PCVR.png',
    name: 'PCVR',
    images: imagesPCVR,
    video: 't',
    demoComponent: undefined,
    links: [{
        text: '',
        url: ''
    }]
},
{
    color: '#5e9cff',
    gradient: 'from-[#9181ff] from-10% to-[#00d6ff] to-90%',
    icon: <PetsIcon />,
    logo: '',
    name: 'NEKOMATA',
    images: imagesNEKOMATA,
    video: 't',
    demoComponent: undefined,
    links: [{
        text: 'Website',
        url: 'https://sneorino.itch.io/nekomata'
    },
    {
        text: 'Download',
        url: ''
    }]
}];

export const SlidesContext = createContext({
    isHomePage: true,
    getTranslatedText: (langKey: string) => langKey, 
    slides: slides
});

// export const SlidesContext = createContext<{
//     isHomePage: boolean,
//     getTranslatedText: (langKey: string) => string,
//     slides: slide[]
// }>({
//     isHomePage: true,
//     getTranslatedText: () => {return '';},
//     slides: []
// });

const AppView = () => {
    const [language, setLanguage] = useState<string>(GetCurrentLanguage() as string);
    const [isHomePage, setIsHomePage] = useState<boolean>(true);

    const navigate = useNavigate();

    const currentColor = useRef<string>('');

    function getTranslatedText(key: string): string {
        const languageTranslations: LanguageTranslations | undefined = data[language];
        
        if (languageTranslations) {
            return languageTranslations[key] || 'Text not found';
        }
        return 'Language not found';
    }

    // No Direct File System Access: You cannot read files from the file system directly in a React app running in the browser. You can only access files that are served by your web server.
    // function GetScreenshots(project: string, title: string): image[] {
        
    // }

    // Only activate once when first entering
    useEffect(() => {
        // console.log("everywhere")
        const OnProjectEnter = () => {
            document.documentElement.style.setProperty('--swiper-button-color', currentColor.current);
            document.documentElement.style.setProperty('--swiper-pagination-color', currentColor.current);
        }
        window.addEventListener('OnProjectEnter', OnProjectEnter);

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
        //     //     images: imagesPCVR,
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
        //         logo: 'Icons/PCVR.png',
        //         name: 'PCVR',
        //         images: imagesPCVR,
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
            };
    }, []);

    return (
        <SlidesContext.Provider value={{isHomePage, getTranslatedText, slides}}>
            <NextUIProvider navigate={navigate}>
                <UINavbar language={language} setLanguage={setLanguage} isHomePage={isHomePage} currentColor={currentColor}/> 
                <Routes>
                    <Route path='/' element={<WindView language={language} setIsHomePage={setIsHomePage} />}/>
                    <Route path='/projects/:projectName' element={<ProjectView setIsHomePage={setIsHomePage} currentColor={currentColor}/>}/>
                    <Route path='*' element={<ErrorView setIsHomePage={setIsHomePage} />}/>
                </Routes>
            </NextUIProvider>
        </SlidesContext.Provider>
    )
}

export default AppView;
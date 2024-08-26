import { useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';

import { image, LanguageTranslations, slide } from '../Types/types';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate   } from "react-router-dom";
import LanguageSelect from './LanguageSelect';
import ProjectView from './ProjectView';
import BGMApp from './demo/BGMApp';
import L2DWP from './demo/L2DWP';
import ErrorView from './ErrorView';
import OnigiriIcon from './svgIcons/OnigiriIcon';
import { NextUIProvider } from '@nextui-org/react';

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = () => {
    const [language, setLanguage] = useState<string>('en');
    const [isHomePage, setIsHomePage] = useState<boolean>(true);

    const navigate = useNavigate();

    function getTranslatedText(key: string): string {
        const languageTranslations: LanguageTranslations | undefined = data[language];
        
        if (languageTranslations) {
          return languageTranslations[key] || 'Text not found';
        } else {
          return 'Language not found';
        }
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
            url: 'Imgs/L2DWP/NextCharacterIdle.png',
            title: 'NextCharacterIdle',
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

    const slides: slide[] = [
        {
            color: '#7a0a9c',
            gradient: 'from-[#8208de] from-0% to-[#6d0c6e] to-100%',
            icon: <OnigiriIcon />,
            logo: 'Icons/Oni.png',
            name: 'BGMAPP',
            images: imagesBGM,
            video: 'Videos/BGM-APPDemoVid.mp4',
            demoComponent: <BGMApp />,
            downloadLink: '',
            sourceCode: 'https://github.com/XKeeXE/bgm-app',
        },
        {
            color: '#1e65c9',
            gradient: 'from-[#373ba6] from-0% via-[#0290f2] via-50% to-[#373ba6] to-100%',
            icon: <OnigiriIcon />,
            logo: 'Icons/L2DWP.png',
            name: 'L2DWP',
            images: imagesL2DWP,
            video: 'Videos/L2DWPDemoVid.mp4',
            demoComponent: <L2DWP/>,
            downloadLink: '',
            sourceCode: 'https://github.com/XKeeXE/Live2DWallpaper',
        },
        {
            color: '#d33636',
            gradient: 'from-[#d53030] from-0% via-[#cb3b3b] via-50% to-[#910a0a] to-100%',
            icon: <OnigiriIcon />,
            logo: '',
            name: 'ONIGIRI',
            images: imagesONIGIRI,
            video: 't',
            demoComponent: undefined,
            downloadLink: '',
            sourceCode: ''
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
        //     downloadLink: '',
        //     sourceCode: '',
        // },
        {
            color: '#0030e7',
            gradient: 'from-[#0009ff] from-0% to-[#006ae7] to-40%',
            icon: <OnigiriIcon />,
            logo: 'Icons/PCVR.png',
            name: 'PCVR',
            images: imagesPCVR,
            video: 't',
            demoComponent: undefined,
            downloadLink: '',
            sourceCode: '',
        },
        {
            color: '#5e9cff',
            gradient: 'from-[#9181ff] from-10% to-[#00d6ff] to-90%',
            icon: <OnigiriIcon />,
            logo: '',
            name: 'NEKOMATA',
            images: imagesPCVR,
            video: 't',
            demoComponent: undefined,
            downloadLink: '',
            sourceCode: '',
        }
    ];

    return (
        <NextUIProvider navigate={navigate}>
            <UINavbar language={language} setLanguage={setLanguage} isHomePage={isHomePage} getTranslatedText={getTranslatedText} slides={slides}/> 
            <Routes>
                <Route path='/' element={<WindView setIsHomePage={setIsHomePage} language={language} getTranslatedText={getTranslatedText} slides={slides}/>}/>
                <Route path='/projects/:projectName' element={<ProjectView setIsHomePage={setIsHomePage} getTranslatedText={getTranslatedText} slides={slides}/>}/>
                <Route path='*' element={<ErrorView setIsHomePage={setIsHomePage} getTranslatedText={getTranslatedText} />}/>
            </Routes>
        </NextUIProvider>
    )
}

export default AppView;
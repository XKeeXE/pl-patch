import React, { useEffect, useRef, useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';
import AboutMeModal from './AboutMeModal';

import { image, LanguageTranslations, slide } from '../Types/types';
import { BrowserRouter as Router, Routes, Route, Link   } from "react-router-dom";
import LanguageSelect from './LanguageSelect';
import ProjectView from './ProjectView';
import BGMApp from './demo/BGMApp';
import UnityView from './demo/UnityView';
import ErrorView from './ErrorView';
import OnigiriIcon from './svgIcons/OnigiriIcon';

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = (props: {darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { darkMode, setDarkMode } = props;
    const [language, setLanguage] = useState<string>('en');
    const [showProjectDropdown, setShowProjectDropdown] = useState<boolean>(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);

    function getTranslatedText(key: string): string {
        const languageTranslations: LanguageTranslations | undefined = data[language];
        
        if (languageTranslations) {
          return languageTranslations[key] || 'Text not found';
        } else {
          return 'Language not found';
        }
    }

    const imagesBGM: image[] = [{
            url: 'Imgs/BGMApp/Awake.png',
            title: 'Awake',
        },
        {
            url: 'Imgs/BGMApp/Layout.png',
            title: 'Layout',
        },
        {
            url: 'Imgs/BGMApp/Results&Queue.png',
            title: 'Results&Queue',
        },
        {
            url: 'Imgs/BGMApp/Navbar.png',
            title: 'Navbar',
        },
        {
            url: 'Imgs/BGMApp/List&Search.png',
            title: 'List&Search',
        },
        {
            url: 'Imgs/BGMApp/ContextMenu.png',
            title: 'ContextMenu',
        }
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

    const slides: slide[] = [{
            icon: <OnigiriIcon/>,
            logo: 'Icons/Oni.png',
            name: 'BGMApp',
            images: imagesBGM,
            video: 'Videos/BGM-APPDemoVid.mp4',
            demoComponent: <BGMApp/>,
            sourceCode: 'https://github.com/XKeeXE/bgm-app'
        },
        {
            icon: <OnigiriIcon/>,
            logo: 'Icons/L2DWP.png',
            name: 'L2DWP',
            images: imagesL2DWP,
            video: 'Videos/L2DWPDemoVid.mp4',
            demoComponent: <UnityView/>,
            sourceCode: 'https://github.com/XKeeXE/Live2DWallpaper',
        },
        {
            icon: <OnigiriIcon/>,
            logo: 'Icons/PCVR.png',
            name: 'PCVR',
            images: imagesPCVR,
            video: 't',
            demoComponent: undefined,
            sourceCode: '',
        }
    ];

    return (
        <>
        <Router>
            <Routes>
                <Route path='/' element={<WindView darkMode={darkMode} language={language} showMenuDropdown={showMenuDropdown} showProjectDropdown={showProjectDropdown} 
                setDarkMode={setDarkMode} setLanguage={setLanguage} setShowMenuDropdown={setShowMenuDropdown} setShowProjectDropdown={setShowProjectDropdown} 
                getTranslatedText={getTranslatedText} slides={slides}/>}/>

                {/* <Route path="/test" element={<LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>}/> */}
                
                <Route path='/projects/:projectName' element={<ProjectView darkMode={darkMode} language={language} showMenuDropdown={showMenuDropdown} 
                showProjectDropdown={showProjectDropdown} setDarkMode={setDarkMode} setLanguage={setLanguage} setShowMenuDropdown={setShowMenuDropdown} 
                setShowProjectDropdown={setShowProjectDropdown} getTranslatedText={getTranslatedText} slides={slides}/>}/>

                <Route path='*' element={<ErrorView/>}/>
            </Routes>
        </Router>
        </>
    )
}

export default AppView;
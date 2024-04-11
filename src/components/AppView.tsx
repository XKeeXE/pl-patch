import React, { useState } from 'react';
import logo from './logo.svg';
// import { Button } from '@nextui-org/react';
import LanguageSelect from './LanguageSelect'
import WindView from './WindView';
import { Card, CardBody, Image } from '@nextui-org/react';
import ParticlesView from './ParticlesView';
import UINavbar from './UINavbar';
import AboutMeModal from './AboutMeModal';

interface LanguageTranslations {
    [key: string]: string;
}

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = () => {
    
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [language, setLanguage] = useState<string>(navigator.language);
    const [darkMode, setDarkMode] = useState<boolean>(true);

    function getTranslatedText(key: string): string {
        const languageTranslations: LanguageTranslations | undefined = data[language];
        
        if (languageTranslations) {
          return languageTranslations[key] || 'Text not found';
        } else {
          return 'Language not found';
        }
    }

    return (
        <>
        <AboutMeModal openModal={openModal} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/>
        <UINavbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/>
        <div className="relative " style={{
            // background: 'linear-gradient(to left, #2e026d, #15162c)',
            height: '100vh',
            // background: 'linear-gradient(to bottom, #5500ff, #8800ff, #bb00ff, #ee00ff)',
            // background: 'linear-gradient(to bottom, #000033, #000066, #000099, #0000cc, #0000ff)',
            // background:  'linear-gradient(to bottom, #000000, #00162a, #004f70, #013a8c, #02011b)',
        }}>
            <div className="flex items-center justify-end w-full" style={{
                // backgroundColor: 'red',
                paddingTop: '30px',
                paddingRight: '50px'
            }}>
            </div>
            <div className="absolute flex items-center bottom-0 justify-center w-full" style={{
                paddingBottom: '30px',
                paddingRight: '50px'
            }}>
            </div>
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a> */}
            </header>
            <WindView language={language} getTranslatedText={getTranslatedText}/>
        </div>
        </>
    )
}

export default AppView;
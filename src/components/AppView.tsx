import React, { useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';
import AboutMeModal from './AboutMeModal';

interface LanguageTranslations {
    [key: string]: string;
}

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = () => {
    
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [language, setLanguage] = useState<string>(navigator.language);
    const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

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
            // background: 'linear-gradient(0, rgba(242,201,207,1) 0%, rgba(229,107,111,1) 20%, rgba(216,108,111,1) 40%, rgba(199,122,167,1) 60%, rgba(230,126,164,1) 80%, rgba(242,201,207,1) 100%)',
            // background: 'linear-gradient(to bottom, #000033, #000066, #000099, #0000cc, #0000ff)',
            // background:  'linear-gradient(to bottom, #000000, #00162a, #004f70, #013a8c, #02011b)',
        }}>
            <div className="flex items-center justify-end w-full" style={{
                paddingTop: '30px',
                paddingRight: '50px'
            }}>
            </div>
            <div className="absolute flex items-center bottom-0 justify-center w-full" style={{
                paddingBottom: '30px',
                paddingRight: '50px'
            }}>
            </div>
            <WindView language={language} getTranslatedText={getTranslatedText}/>
        </div>
        </>
    )
}

export default AppView;
import React, { useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';
import AboutMeModal from './AboutMeModal';

interface LanguageTranslations {
    [key: string]: string;
}

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = (props: any) => {
    const { darkMode, setDarkMode } = props;
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [language, setLanguage] = useState<string>(navigator.language);

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
        <AboutMeModal darkMode={darkMode} openModal={openModal} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/>
        <UINavbar darkMode={darkMode} language={language} setLanguage={setLanguage} setDarkMode={setDarkMode} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/>
        <WindView darkMode={darkMode} language={language} getTranslatedText={getTranslatedText}/>
        </>
    )
}

export default AppView;
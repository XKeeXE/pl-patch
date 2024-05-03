import React, { useState } from 'react';
import WindView from './WindView';
import UINavbar from './UINavbar';
import AboutMeModal from './AboutMeModal';

import { LanguageTranslations } from '../Types/types';
import { BrowserRouter as Router, Routes, Route   } from "react-router-dom";
import Test from './Test';
import LanguageSelect from './LanguageSelect';
import ProjectView from './ProjectView';

const data: { [key: string]: LanguageTranslations } = require('../assets/languages.json');

const AppView = (props: {darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { darkMode, setDarkMode } = props;
    const [openModal, setOpenModal] = useState<boolean>(true);
    // const [language, setLanguage] = useState<string>(navigator.language);
    const [language, setLanguage] = useState<string>('en');

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
        {/* <AboutMeModal darkMode={darkMode} openModal={openModal} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/> */}
        <Router>
            <UINavbar darkMode={darkMode} language={language} setLanguage={setLanguage} setDarkMode={setDarkMode} setOpenModal={setOpenModal} getTranslatedText={getTranslatedText}/>
            <Routes>
                <Route path='/' element={<WindView darkMode={darkMode} language={language} getTranslatedText={getTranslatedText}/>}/>
                <Route path="test" element={<LanguageSelect darkMode={darkMode} language={language} setLanguage={setLanguage} getTranslatedText={getTranslatedText}/>}/>
                <Route path='/projects/:id' element={<ProjectView/>}/>
            </Routes>
        </Router>
        </>
    )
}

export default AppView;
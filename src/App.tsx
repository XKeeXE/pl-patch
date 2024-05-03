import './App.css';
import ParticlesView from './components/ParticlesView';
import AppView from './components/AppView';
import { useState } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);
    // const [darkMode, setDarkMode] = useState<boolean>(false);
    return (
        <>
        {/* <ParticlesView darkMode={darkMode}/> */}
        <AppView darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    );
}

export default App;

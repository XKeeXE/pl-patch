import './App.css';
import ParticlesView from './components/ParticlesView';
import AppView from './components/AppView';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
    // const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // useEffect(() => {
    //     document.documentElement.className = darkMode ? 'dark' : 'light';
    // }, [darkMode])

    return (
        <>
        {/* <ParticlesView/> */}
        {/* <section>
            <div className='air air1'/>
            <div className='air air2'/>
            <div className='air air3'/>
        </section> */}
        <Router>
            <AppView />
        </Router>
        </>
    );
}

export default App;

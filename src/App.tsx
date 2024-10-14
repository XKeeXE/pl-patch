import './App.css';
import ParticlesView from './components/ParticlesView';
import AppView from './components/AppView';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
    return (
        <>
        {/* <ParticlesView/> */}
        <Router>
            <AppView />
        </Router>
        </>
    );
}

export default App;

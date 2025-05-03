import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 
import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const ParticlesView = () => {
     
    const [ init, setInit ] = useState(false);

    const options: ISourceOptions = {
        fullScreen: {
            enable: true,
            zIndex: 1,
        },
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    
                },
            },
            color: {
                value: "#ffffff",
            },
            shape: {
                type: "circle",
                close: true,
            },
            stroke: {
                width: 0,
                color: "#000000",
            },
            opacity: {
                value: 0.5,
                animation: {
                    enable: false,
                    speed: 1,
                    sync: false,
                },
            },
            size: {
                value: 3,
                animation: {
                    enable: false,
                    speed: 40,
                    sync: false,
                },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                attract: {
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200
                    },
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
                
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    }

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const [opacity, setOpacity] = useState(1);

    const handleParticleDestroy = () => {
        if (opacity > 0.1) {
        setOpacity(0.1);
        } else {
        setOpacity(1);
        }
    };


    return (<>
        { init && <Particles id="tsparticles" options={options}/>}
        </>)
}

export default ParticlesView;
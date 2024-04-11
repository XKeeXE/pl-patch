import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Engine, Particle } from "@tsparticles/engine";

const ParticlesView = () => {
    const [ init, setInit ] = useState(false);

    const options = useMemo(() => {
        return {
            particles: {
                color: {
                    value: "#ffffff",
                },
                move: {
                    enable: true,
                    gravity: {
                        enable: true
                    }
                },
                shape: {
                    type: "circle",
                },
            },
        };
    }, [])

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

    // const particlesInit = useCallback((engine: Engine) => {
    //     loadSlim(engine);
    // }, [])

    const [opacity, setOpacity] = useState(1);

    const handleParticleDestroy = () => {
        if (opacity > 0.1) {
        setOpacity(0.1);
        } else {
        setOpacity(1);
        }
    };


    return ( 
        <>
            { init && <Particles
            id="tsparticles"
            // particlesLoaded={particlesLoaded}
            // particlesLoaded={handl}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                },
                // fpsLimit: 120,
                interactivity: {
                    onDestroy: {
                        enable: true,
                        mode: 'split',
                      },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    // links: {
                    //     color: "#ffffff",
                    //     distance: 150,
                    //     enable: true,
                    //     opacity: 0.5,
                    //     width: 1,
                    // 
                    move: {
                        
                        direction: "bottom",
                        enable: true,
                        // gravity: {
                        //     enable: true,
                        // },
                        // outModes: {
                        //     default: "bounce",
                        // },
                        // random: true,
                        // trail: {
                        //     enable: true,
                        //     length: 1,
                        //     fill: {
                        //         color: "#0d47a1",
                        //     },
                        // },
                        speed: { min: 6, max: 10 } ,
                        straight: true,
                        // rotate: {
                        //     value: 45, // Set the rotation angle in degrees
                        //   },
                    },
                    reduceDuplicates: true,
                    trails: {
                        enable: true,
                        fillColor: '#ffffff',
                    },
                    number: {
                        // density: {
                        //     enable: true,
                        //     // area: 800,
                        // },
                        value: 20,
                    },
                    opacity: {
                        value: { min: 0.3, max: 1 } ,
                        // random: true, // Randomize particle opacity
                      },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 5 },
                    },
                },
                // detectRetina: true,
            }}
        />
}
        </>
    )
}

export default ParticlesView;
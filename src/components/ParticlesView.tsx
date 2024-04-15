import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 

import type { ISourceOptions } from "@tsparticles/engine";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Engine, Particle } from "@tsparticles/engine";

const ParticlesView = () => {
    const [ init, setInit ] = useState(false);

    const options: ISourceOptions = {
        key: "images",
        name: "Images",
        background: {
            color: "#ffffff",
        },
        // interactivity: {
        //     events: {
        //         onClick: {
        //             enable: true,
        //             mode: "push",
        //         },
        //         onHover: {
        //             enable: true,
        //             mode: "bubble",
        //         },
        //     },
        //     modes: {
        //         bubble: {
        //             distance: 400,
        //             duration: 2,
        //             opacity: 0.8,
        //             size: 40,
        //         },
        //         push: {
            //             quantity: 4,
            //         },
            //     },
            // },
            particles: {
            color: {
                value: "#ffffff",
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'bottom',
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 1,
            },
            rotate: {
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false,
                },
                direction: "random",
                value: {
                    min: 0,
                    max: 360,
                },
            },
            shape: {
                // type: 'star',
                type: "image",
                options: {
                    image: [
                        {
                            name: "sakura1",
                        },
                        {
                            name: "sakura2",
                        },
                        {
                            name: "sakura3",
                        },
                //         {
                //             name: "berries",
                //         },
                //         {
                //             name: "cherry",
                //         },
                //         {
                //             name: "grapes",
                //         },
                //         {
                //             name: "lemon",
                //         },
                //         {
                //             name: "orange",
                //         },
                //         {
                //             name: "peach",
                //         },
                //         {
                //             name: "pear",
                //         },
                //         {
                //             name: "pepper",
                //         },
                //         {
                //             name: "plum",
                //         },
                //         {
                //             name: "star",
                //         },
                //         {
                //             name: "strawberry",
                //         },
                //         {
                //             name: "watermelon",
                //         },
                //         {
                //             name: "watermelon_slice",
                //         },
                    ],
                },
            },
            size: {
                value: 16,
            },
        },
        preload: [
            {
                src: "sakura1.png",
                name: "sakura1",
                width: 32,
                height: 32,
            },
            {
                src: "sakura2.png",
                name: "sakura2",
                width: 32,
                height: 32,
            },
            {
                src: "sakura3.png",
                name: "sakura3",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/berries.png",
                name: "berries",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/cherry.png",
                name: "cherry",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/grapes.png",
                name: "grapes",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/lemon.png",
                name: "lemon",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/orange.png",
                name: "orange",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/peach.png",
                name: "peach",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/pear.png",
                name: "pear",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/pepper.png",
                name: "pepper",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/plum.png",
                name: "plum",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/star.png",
                name: "star",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/strawberry.png",
                name: "strawberry",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/watermelon.png",
                name: "watermelon",
                width: 32,
                height: 32,
            },
            {
                src: "https://particles.js.org/images/fruits/watermelon_slice.png",
                name: "watermelon_slice",
                width: 32,
                height: 32,
            },
        ],
    };

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
            
            options={options
                // background: {
                //     color: {
                //         value: "#0d47a1",
                //     },
                // },
                // preload: {
                //     src: "https://particles.js.org/images/fruits/apple.png",
                //     gif: false,
                //     height: 32,
                //     name: 'apple',
                //     width: 32,
                // },
                // // fpsLimit: 120,
                // interactivity: {
                //     onDestroy: {
                //         enable: true,
                //         mode: 'split',
                //       },
                // },
                
                // particles: {
                //     color: {
                //         value: "#ffffff",
                //     },
                //     // links: {
                //     //     color: "#ffffff",
                //     //     distance: 150,
                //     //     enable: true,
                //     //     opacity: 0.5,
                //     //     width: 1,
                //     // 
                //     move: {
                        
                //         direction: "bottom",
                //         enable: true,
                //         // gravity: {
                //         //     enable: true,
                //         // },
                //         // outModes: {
                //         //     default: "bounce",
                //         // },
                //         // random: true,
                //         // trail: {
                //         //     enable: true,
                //         //     length: 1,
                //         //     fill: {
                //         //         color: "#0d47a1",
                //         //     },
                //         // },
                //         speed: { min: 6, max: 10 } ,
                //         straight: true,
                //         attract: {
                //             rotate: {
                //                 x: 3000,
                //                 y: 3000,
                //             }
                //         }
                //         // rotate: {
                //         //     value: 45, // Set the rotation angle in degrees
                //         //   },
                //     },
                //     reduceDuplicates: true,
                //     // trails: {
                //     //     enable: true,
                //     //     fillColor: '#ffffff',
                //     // },
                //     number: {
                //         // density: {
                //         //     enable: true,
                //         //     // area: 800,
                //         // },
                //         limit: {
                //             mode: 'delete',
                //             value: 0,
                //         },
                //         value: 20,
                //     },
                //     opacity: {
                //         value: { min: 0.3, max: 1 } ,
                //         // random: true, // Randomize particle opacity
                //       },
                //     shape: {
                //         type: "image",
                //         // options: {
                //         //     name: 'apple',
                //         // }
                        
                //     },
                //     size: {
                //         value: { min: 2, max: 5 },
                //     },
                // },
                // // detectRetina: true,
                
            }
        />
}
        </>
    )
}

export default ParticlesView;
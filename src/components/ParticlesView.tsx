import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 
import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const ParticlesView = (props: any) => {
    const { darkMode } = props; 
    const [ init, setInit ] = useState(false);

    const options: ISourceOptions = {
        key: "images",
        name: "Images",
        background: {
            color: darkMode ? '#181818' : '#ffffff',
        },
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
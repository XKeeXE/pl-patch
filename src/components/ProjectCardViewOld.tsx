import { Button, Card, CardBody, CardFooter, Image, Link, ScrollShadow, Spacer, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

import { slide, TranslatedText } from '../Types/types';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProjectCardViewOld = (props: {darkMode: boolean, language: string, getTranslatedText: TranslatedText, slides: slide[], currentSlide: slide}) => {
	const { darkMode, language, getTranslatedText, slides, currentSlide } = props;

    const [demoAvailable, setDemoAvailable] = useState<boolean>(false);
    const [logoVisible, setLogoVisible] = useState<boolean>(true);

    const currentTitle = useRef<string>('');

    const title = getTranslatedText('title' + currentSlide.name);
	const [project, setProject] = useState<string>(currentSlide.logo);
    const [textTutorial, setTextTutorial] = useState<string>(getTranslatedText('tutorial'));
    
    useEffect(() => {
        if (currentSlide.demoComponent !== undefined) {
            setDemoAvailable(true);
        }
    }, [])

    useEffect(() => {
        if (currentTitle.current === '') {
            setTextTutorial(getTranslatedText('tutorial'));
        } else { // Load the text tutorial into a new language from the previous selected tutorial
            setTextTutorial(getTranslatedText('title' + currentTitle.current + currentSlide.name) + ": " + getTranslatedText('desc' + currentTitle.current + currentSlide.name));
        }
    }, [language])

    function DemoComponent(): JSX.Element {
        if (currentSlide.demoComponent !== undefined) {
            return currentSlide.demoComponent;
        }
        return <></>
    }

    function ViewController(): JSX.Element {
        switch (project) { // The view to display on the main card
            case currentSlide.video: // Display a preview of the project
                return <video controls className=" w-[82%]"><source src={currentSlide.video} type="video/mp4"/></video>
            case 'demo': // Display the demo version of the project
                return DemoComponent();
            default: // Display screenshot
                return <img src={project} alt={project} className="object-cover overflow-y-hidden"/>;
        }
    }

    return (
        <Card // The canvas where every single detail about a project is displayed
            shadow="none"
            radius="sm"
            className="bg-transparent">
            <CardBody className="flex flex-col xl:flex-row gap-4 justify-center xl:h-[90vh]">
                <ScrollShadow className="relative w-full h-[50vh] xl:w-[16vw] xl:h-[82vh] xl:scrollbar-hide xl:min-w-[250px] 2xl:w-[25vw]">
                    {currentSlide.images.map((image: { title: string; url: string }) => (
                        <>
                        <Card key={image.title} className="bg-transparent justify-center" isPressable shadow="none" onPress={() => {
                            setProject(image.url); 
                            setLogoVisible(false);
                            currentTitle.current = image.title;
                            setTextTutorial(getTranslatedText('title' + image.title + currentSlide.name) + ": " + getTranslatedText('desc' + image.title + currentSlide.name));
                        }}>
                            <Image
                                className="object-cover"
                                shadow="sm"
                                radius="md"
                                alt={image.title}
                                src={image.url}
                            />
                            <CardFooter className="absolute bottom-0 border-default-600 z-10 border-t-1 bg-[#00000099]">
                                <p className="text-white">{getTranslatedText('title' + image.title + currentSlide.name)}</p>
                            </CardFooter>
                        </Card>
                        <Spacer y={2}/>
                        </>
                    ))}
                </ScrollShadow>
                
                <Card // Display of the desired view
                className="bg-transparent xl:w-[55vw] 2xl:w-[40vw] flex flex-col gap-[2px] " shadow='none'>
                    <div className={"self-center rounded-lg  " + (darkMode ? "bg-[#18181855] border-slate-300" : "bg-[#ffffffce]")}>
                        <p className="select-none self-center text-xs sm:text-base md:text-base lg:text-xl 
                        2xl:text-2xl font-title rounded-lg bg-gradient-to-b from-pink-200 via-pink-300 to-[#F689A8] bg-clip-text text-transparent"
                        >{title}</p>
                    </div>
                    <CardBody className={"relative items-center flex flex-col justify-center aspect-video rounded-lg overflow-y-hidden " + (darkMode ? "bg-[#44444417]" : " bg-background/80")}>
                        <Button 
                        className={"absolute top-0 z-10 right-0 border-2 " + (darkMode ? "border-gray-200" : "")} 
                        radius="full" variant="light" size="sm" isIconOnly aria-label="clear" onClick={() => {
                            setProject(currentSlide.logo);
                            setLogoVisible(true)
                            currentTitle.current = '';
                            setTextTutorial(getTranslatedText('tutorial'));
                        }}><CloseIcon htmlColor={darkMode ? 'gray' : 'gray'}/>
                        </Button>
                        {logoVisible ? <img src={currentSlide.logo} alt={currentSlide.logo} 
                        className={"absolute object-cover rounded-full overflow-y-hidden border-2 bg-gradient-to-t from-[#f2c9cf] to-[#e984a9] " + 
                        (darkMode ? "border-gray-200" : "")}/> : <></>}
                        {ViewController()}
                    </CardBody>
                    <CardFooter className="w-full items-center flex flex-col gap-4 ">
                        <Textarea 
                        className="select-none w-full"
                        minRows={2} maxRows={7} isReadOnly variant="bordered" value={textTutorial} classNames={{
                            inputWrapper: 'bg-gradient-to-t from-[#f2c9cf] to-[#e67ea4]',
                            input: ' text-slate-50',
                        }}/>
                        <div className="flex flex-row gap-4">
                            <Button className="bg-gradient-to-bl from-[#f2c9cf] to-[#e984a9] text-white border-2 border-gray-200 hover:border-gray-400" 
                            variant="flat" radius="sm" size="md" aria-label="demo" isDisabled={!demoAvailable} onClick={() => {setProject('demo'); setLogoVisible(false)}}>
                                {getTranslatedText('demo')}
                            </Button>
                            <Button className="bg-gradient-to-br from-[#f2c9cf] to-[#e984a9] text-white border-2 border-gray-200 hover:border-gray-400" 
                            variant="flat" radius="sm" size="md" aria-label="demo" onClick={() => {setProject(currentSlide.video); setLogoVisible(false)}}>
                                {getTranslatedText('video')}
                            </Button>
                        </div>
                        <Spacer y={2} />
                    </CardFooter>
                </Card>
                
                <div // Displays the full details of about the project, project credits, and project source code available on github
                    className="items-center flex flex-col gap-2 xl:w-[19vw] 2xl:w-[25vw] ">
                    <Card className="hidden xl:flex items-center gap-2 bg-gradient-to-br from-[#f2c9cf] to-[#e67ea4] border-2 border-gray-200" shadow="none">
                        <p className="font-title text-white">{getTranslatedText('projectList')}</p>
                        <div className={"grid-cols-2 grid bg-transparent justify-items-center items-center"} >
                            {slides.map((slide: slide) => (
                                <div className="relative w-[190px] aspect-square">
                                    <Image className={"object-cover p-1" + (slide.name === currentSlide.name ? " " : "")} src={slide.logo}/>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className="w-full" shadow="none">
                        <Textarea fullWidth isReadOnly variant="bordered" minRows={5} maxRows={15} 
                        label={<p className=" font-title text-white">{getTranslatedText('detailsHeader')}</p>} 
                        value={getTranslatedText('details' + currentSlide.name)} classNames={{
                            inputWrapper: 'bg-gradient-to-br from-[#f2c9cf] to-[#e67ea4]',
                            input: 'text-white',
                            label: 'self-center',
                        }}/>
                    </Card>
                    <Link isExternal showAnchorIcon href={currentSlide.sourceCode} anchorIcon={<GitHubIcon />}>{"Source Code"}</Link>
                    <Spacer y={4}/>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProjectCardViewOld;
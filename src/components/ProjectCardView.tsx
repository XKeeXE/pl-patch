import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link, ScrollShadow, Spacer, Textarea } from "@nextui-org/react";
import logo from '../logo.svg';
import { ImageList, ImageListItem, Paper } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

import CloseIcon from '@mui/icons-material/Close';

import GitHubIcon from '@mui/icons-material/GitHub';

const ProjectCardView = (props: any) => {
	const { getTranslatedText, demoAvailable, icon, name, images, video, demoComponent, sourceCode } = props;

	const projectCredits = getTranslatedText('credits1' + name) + '\n' + getTranslatedText('credits2' + name) + '\n' + getTranslatedText('credits3' + name) + '\n' as string;

    const title = getTranslatedText('title' + name);
	const [project, setProject] = useState<string>(icon);
    const [textTutorial, setTextTutorial] = useState<string>(getTranslatedText('tutorial'));

    function ViewController() {
        switch (project) { // The view to display on the main card
            case icon: // Display the project icon
                return <img src={project} className="rounded-full" style={{
                    borderWidth: '2px',
                    maxWidth: '80%', 
                    maxHeight: '100%',
                    background: 'white',
                    objectFit: 'cover',
                }}/>;
            case video: // Display a preview of the project
                return <video controls><source src={video} type="video/mp4"/></video>
            case 'demo': // Display the demo version of the project
                return demoComponent;
            default: // Display screenshot
                return <img src={project} style={{
                    maxWidth: '80%', 
                    maxHeight: '100%',
                    objectFit: 'cover',
                }}/>;
        }
    }

    return (
        <Card // The canvas where every single detail about a project is displayed
            shadow="none"
            radius="lg"
            className="bg-background/60"
            style={{
                marginLeft: '60px',
                marginTop: '35px',
                marginRight: '60px',
                height: '88vh',
                width: '95vw',
                minWidth: '700px',
				minHeight: '620px',
            }}>
            <CardBody>
                <div className="relative flex items-center bottom-0 self-center justify-center h-full" style={{
                    borderWidth: '2px',
                    borderColor: 'black',
                    width: '100%',
                }}>
                    <ScrollShadow hideScrollBar className="absolute gap-2" style={{
                        left: '2%',
                        height: '80vh',
                        overflow: 'scroll',
                        overflowX: 'hidden',
						width: '20vw',
                    }}>
                        {images.map((item: { url: string; title: string; desc: string }) => (
                            <>
                            <Card className=" bg-background/60" isPressable shadow="none" style={{
                                width: '20vw',
                                minWidth: '145px'
                            }} onPress={() => {
                                setProject(item.url); 
                                setTextTutorial(getTranslatedText('title' + item.title + name) + ": " + getTranslatedText('desc' + item.title + name));
                            }}>
                                <Image
                                    className="w-full h-full object-cover"
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.title}
                                    src={item.url}
                                />
                                <CardFooter className="absolute bottom-0 border-default-600 dark:border-default-100 z-10 " style={{
                                    backgroundColor: '#00000066',
                                    borderTopWidth: '1px',
                                }}>
                                    <p className="text-white">{getTranslatedText('title' + item.title + name)}</p>
                                </CardFooter>
                            </Card>
                            <Spacer y={2}/>
                            </>
                        ))}
                    </ScrollShadow>

					<Card // Display of the desired view
					className="bg-background/60" 
					shadow={'none'} style={{
						width: '50%',
						height: '90%',
					}}>
						<CardBody className="relative items-center flex flex-col">
							<p className="select-none text-large">{title}</p>
							<Card className="relative flex items-center justify-center bg-background/60 dark:bg-default-100/50 " isBlurred style={{
								overflow: 'hidden',
								aspectRatio: '16/9',
								width: '100%', 
								height: '90%', 
							}}>
								<Button className="absolute top-0 z-10" radius="full" variant="light" size="sm" isIconOnly aria-label="clear" style={{
									right: '0px',
								}} onClick={() => {
									setProject(icon);
                                    setTextTutorial(getTranslatedText('tutorial'));
								}}><CloseIcon/>
								</Button>
                                {ViewController()}
							</Card>
						</CardBody>
						<CardFooter>
							<div className="w-full items-center flex flex-col">
                                <Card className="w-full" isBlurred shadow="none">
								    <Textarea className="select-none" minRows={2} maxRows={5} isReadOnly variant="bordered" value={textTutorial}/>
                                </Card>
                                <Spacer y={4} />
                                <div className="flex flex-row " style={{
                                    gap: '10%',
                                }}>
                                    <Button variant="ghost" radius="sm" size="md" aria-label="demo" isDisabled={!demoAvailable} onClick={() => {setProject('demo')}}>
                                        {getTranslatedText('demo')}
                                    </Button>
                                    <Button variant="ghost" radius="sm" size="md" aria-label="demo" onClick={() => {setProject(video)}}>
                                        {getTranslatedText('video')}
                                    </Button>
                                </div>
                                
							</div>
						</CardFooter>
					</Card>

                    <div // Displays the full details of about the project, project credits, and project source code available on github
                        className="absolute items-center flex flex-col gap-2" style={{
						height: '92%',
						// minHeight: '200px',
						// maxHeight: '800px',
						width: '20%',
						right: '2%',
					}}>
                        <Card className="w-full" isBlurred shadow="none">
                            <Textarea fullWidth isReadOnly variant="bordered" minRows={10} maxRows={20} label={getTranslatedText('detailsHeader')} value={getTranslatedText('details' + name)}/>
                        </Card>
                        <Card className="w-full"  isBlurred shadow="none">
						    <Textarea fullWidth isReadOnly variant="bordered" minRows={3} maxRows={3} label={getTranslatedText('creditsHeader')} value={projectCredits}/>
                        </Card>
						<Link isExternal showAnchorIcon href={sourceCode} anchorIcon={<GitHubIcon />}>{"Source Code"}</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProjectCardView;
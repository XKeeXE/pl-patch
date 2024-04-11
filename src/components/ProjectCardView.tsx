import { Button, Card, CardBody, CardFooter, Image, Link, Spacer, Textarea } from "@nextui-org/react";
import logo from '../logo.svg';
import { ImageList, ImageListItem, Paper } from "@mui/material";
import { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';

import GitHubIcon from '@mui/icons-material/GitHub';

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];

const ProjectCardView = (props: any) => {
	const { getTranslatedText, projectName, projectDetails, projectTutorial, projectCredits1, projectCredits2, projectCredits3, projectCredits4, sourceCode } = props;

	const projectCredits = projectCredits1 + projectCredits2 + projectCredits3 + projectCredits4 as string;

	const [proyect, setProyect] = useState<string>('');

    return (
        <Card 
            // className="" 
            shadow="none"
            radius="lg"
            className="bg-background/60"
            style={{
                marginLeft: '60px',
                marginTop: '35px',
                marginRight: '60px',
                
                height: '88vh', // 100% of the viewport height
                width: '95vw', // 100% of the viewport width
                // overflow: 'hidden',
                // margin: '50px'
                // border: '5px',
                // borderWidth: '20px'
                // border: '2px'
            }}>
            <CardBody>
                <div className="relative flex items-center bottom-0 self-center justify-center h-full" style={{
                    borderWidth: '2px',
                    // borderBlock: '1px',
                    borderColor: 'black',
                    width: '100%',
                    // background: 'red'
                    // padding: '2px'
                    // marginLeft: '120px',
                    // marginRight: '190px',
                    // marginBottom: '100px',
                    // marginTop: '50px'
                }}>
                    <div className="absolute " style={{
						left: '2%',
					}}>
                        <ImageList sx={{ width: 500, height: '90%' }} cols={3} rowHeight={164}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                <img
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
									onClick={() => {(setProyect(item.img))}}
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
					<Card className="bg-background/60" shadow={'none'} style={{
						width: '50%',
						height: '80%',
					}}>
						<CardBody className="relative items-center">
							{/* <h1>{projectName}</h1> */}
							<p className="select-none">{projectName}</p>
							<Paper style={{
								// width: '50%',
								// height: '800px',
								// maxWidth: '900px',
								// minHeight: '500px',
								// maxHeight: '200px',
								// border: '2px',
								// background: 'red',
								overflow: 'hidden',
								aspectRatio: '16/9',
								width: '100%',  // Set the desired width
								height: '100%', // Set the desired height
								// maxWidth: '100%',
								// maxHeight: '100%',
								backgroundColor: 'white'
							}}>
								<Button className="absolute" radius="full" variant="light" size="sm" isIconOnly aria-label="clear" 
								style={{
									// marginLeft: '5px',
									right: '13px',
								}}
								onClick={() => {
									setProyect('')
								}}><CloseIcon/>
								</Button>
								<img src={proyect} style={{
									maxWidth: '80%', 
									maxHeight: '100%',
									objectFit: 'cover',
								}}/>
							</Paper>
						</CardBody>
						<CardFooter>
							<Textarea isReadOnly variant="bordered" value={getTranslatedText('projTutorial')}/>
						</CardFooter>
					</Card>
                    <div className="absolute " style={{
						// position: 'absolute',
						height: '92%',
						// minHeight: '200px',
						// maxHeight: '800px',
						width: '20%',
						// background: 'red',
						right: '2%',
					}}>
                        <Textarea fullWidth isReadOnly variant="bordered" minRows={10} maxRows={20} label={getTranslatedText('projDetailsHeader')} value={projectDetails} style={{
							overflow: 'auto',
						}}/>
						<Spacer y={4} />
						<Textarea fullWidth isReadOnly variant="bordered" minRows={3} maxRows={5} label={getTranslatedText('projCreditsHeader')} value={projectCredits} style={{
							overflow: 'auto',
						}}/>
						<Spacer y={4} />
						<Link isExternal showAnchorIcon href={sourceCode} anchorIcon={<GitHubIcon />}>{"Source Code"}</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProjectCardView;
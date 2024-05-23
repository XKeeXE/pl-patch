import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { link } from "../Types/types";

const LinksCard = (props: { headerText: string, linkItems: link[]}) => {
    const { headerText, linkItems } = props;
    return (
        <div className='flex justify-center h-full w-full '>
            <Card className='w-[15vw] self-center' shadow='none'>
                <CardHeader className='flex justify-center'>
                    <p className='self-center font-title'>{headerText}</p>
                </CardHeader>
                <CardBody className='flex flex-col gap-2'>
                    {linkItems.map(item => (
                        <Button onClick={() => {
                            window.open(item.url, '_blank');
                        }}
                        // endContent={item.icon}
                        >
                            {item.text}
                        </Button>
                    ))}
                </CardBody>
            </Card>
        </div>
    )
}

export default LinksCard;
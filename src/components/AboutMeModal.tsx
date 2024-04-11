import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutMeModal = (props: any) => {
    const { openModal, setOpenModal, getTranslatedText } = props;
    
    const currentYear = new Date().getFullYear();
    const startYear = 2017

    return (
      <>
        {/* <Button onPress={onOpen}>Open Modal</Button> */}
        <Modal isOpen={openModal} onOpenChange={setOpenModal} >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-custom">{getTranslatedText('aboutHeader')}</ModalHeader>
                <ModalBody>
                    <p className="font-custom"> 
                        {getTranslatedText('aboutIntro1') + (currentYear - startYear).toString() + " " + getTranslatedText('aboutIntro2')}
                    </p>
                    <p className="font-custom">
                        {getTranslatedText('aboutCenter')}
                    </p>
                    <p className="font-custom">
                        {getTranslatedText('aboutEnd')}
                    </p>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}

export default AboutMeModal;
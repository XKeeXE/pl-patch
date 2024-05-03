import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import CloseIcon from '@mui/icons-material/Close';
import { TranslatedText } from "../Types/types";

const AboutMeModal = (props: {darkMode: boolean, openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText}) => {
    const { darkMode, openModal, setOpenModal, getTranslatedText } = props;
    
    const currentYear = new Date().getFullYear();
    const startYear = 2017

    return (
      <>
        <Modal className={" " + (darkMode ? " bg-[#181818] text-white" : " text-[#181818]")} isOpen={openModal} onOpenChange={setOpenModal} backdrop="transparent"  scrollBehavior="inside" 
        closeButton={
        <Button radius="full" variant="light" size="sm" isIconOnly aria-label="modal-close"> 
            <CloseIcon/>
        </Button>}
        classNames={{
            // base: 'bg-gradient-to-b from-[#f2c9cf] to-[#e984a9] border-2 border-gray-200',
            base: 'border-2 border-gray-200',
            closeButton: ' '
        }}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader 
                className="flex flex-col gap-1 self-center font-text"
                >{getTranslatedText('aboutHeader')}</ModalHeader>
                <ModalBody>
                    <p className="text-sm md:text-base font-text"> 
                        {getTranslatedText('aboutIntro1') + (currentYear - startYear).toString() + " " + getTranslatedText('aboutIntro2')}
                    </p>
                    <p className="text-sm md:text-base font-text">
                        {getTranslatedText('aboutCenter')}
                    </p>
                    <p className="text-sm md:text-base font-text">
                        {getTranslatedText('aboutEnd')}
                        <Link href="mailto:patch.rodriguez.medina@gmail.com">{getTranslatedText('aboutHyperlink')}</Link>
                        {getTranslatedText('aboutPoint')}
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
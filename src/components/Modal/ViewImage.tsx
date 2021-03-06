import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg="pGray.800" maxW="max-content">
        <Image
          src={imgUrl}
          alt="image modal"
          maxWidth="900px"
          maxHeight="600px"
        />
        <ModalFooter
          bgColor="pGray.800"
          borderRadius="0px 0px 4px 4px"
          justifyContent="flex-start"
        >
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

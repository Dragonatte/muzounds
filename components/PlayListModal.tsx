import { Dispatch, FC, JSX, SetStateAction } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/react";

interface PlayListModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PlayListModal: FC<PlayListModalProps> = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  return (
    <Modal backdrop={"blur"} isOpen={open} onClose={() => setOpen(false)}>
      <ModalContent>
        <ModalHeader>Añadir a una PlayList</ModalHeader>
        <ModalBody>
          <Button>Playlist Coche</Button>
          <Button>Playlist Estudio</Button>
          <Button>Playlist Random</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

PlayListModal.propTypes = {};

export default PlayListModal;

import React, { ReactNode } from "react";

import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";

type Props = {
 error: string | null;
 onClear: () => void;
 show?: boolean;
};

const ErrorModal: React.FC<Props> = ({ error, onClear, show }) => {
 return (
  <Modal
   onCancel={onClear}
   header="An Error Occurred!"
   show={!!error && !!show}
   footer={<Button onClick={onClear}>Okay</Button>}
  >
   <p>{error}</p>
  </Modal>
 );
};

export default ErrorModal;

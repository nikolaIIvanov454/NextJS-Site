"use client";

import { Modal } from "flowbite-react";
import { HiBadgeCheck } from "react-icons/hi";

function SuccessPopup({ openModal, text, setOpenModal }) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiBadgeCheck className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessPopup;

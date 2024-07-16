"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

import "@/app/css/styles.css";

function EditModal({ openModal, setOpenModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [path, setPath] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Промяна на информация за потребител
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Потребителско име" />
              </div>
              <TextInput
                id="username"
                placeholder="Потребителско име"
                className="focus:border-blue-500 focus:ring-blue-500"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Имейл" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                className="focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="path" value="Път към снимка" />
              </div>
              <TextInput
                id="path"
                placeholder="Път"
                className="focus:border-blue-500 focus:ring-blue-500"
                value={path}
                onChange={(event) => setPath(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-center w-full">
              <Button color={"blue"}>Промяна на информацията</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;

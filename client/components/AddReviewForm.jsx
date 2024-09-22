"use client";

import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

function AddReviewComponent({ openModal, setOpenModal }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  function onCloseModal() {
    setOpenModal(false);
    setReview("");
    setRating(0);
  }

  function handleSubmit() {
    // Add logic to handle the review submission here
    console.log("Review submitted:", { review, rating });
    onCloseModal();
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Your Review
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rating" value="Рейтинг:" />
              </div>
              <TextInput
                id="rating"
                type="number"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="review" value="Твоето ревю:" />
              </div>
              <Textarea
                id="review"
                placeholder="Напиши ревю тук..."
                rows={8}
                value={review}
                onChange={(event) => setReview(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <Button className="bg-blue-600 enabled:hover:bg-blue-700" onClick={handleSubmit}>Напиши ревю</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddReviewComponent;

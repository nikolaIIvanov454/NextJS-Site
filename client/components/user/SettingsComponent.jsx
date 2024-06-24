"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "flowbite-react";

import "@/app/css/avatar-change-style.css";

function SettingsComponent() {
  const { data: session, update } = useSession();

  const [image, setImage] = useState(session?.user?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState(session?.user.name || "");
  const [mail, setMail] = useState(session?.user.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleImageUpload = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageFile(file);
      setImage(reader.result);
      console.log(reader.result);
    };
  };

  let handleChange = async () => {
    setLoading(true);

    let data = new FormData();
    data.set("username", username);
    data.set("email", mail);
    data.set("image", imageFile);

    try {
      const request = await fetch("/api/update-info", {
        method: "POST",
        body: data,
      });

      const response = await request.json();

      if (response.message === "Success!") {
        await update({
          user: {
            name: username,
            email: mail,
            image: response.imageUrl,
          },
        });
      }

      setMessage(response.message || response.error);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch("/api/load-avatar");

        if (response.ok) {
          const data = await response.json();
          
          setImage(data.avatar);
        }
      } catch (error) {
        console.error('An error occurred while loading avatar:', error);
      }
    };

    fetchAvatar();
  }, []);

  console.log(image);

  return (
    <div className="flex justify-center items-center h-5/6">
      <div className="bg-gray-200 dark:bg-gray-700 p-4 text-center h-auto">
        <div className="flex justify-center mb-8">
          {session?.user && session.user.image ? (
            <div className="relative w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500 overflow-hidden ">
              <div className="personal-image">
                <label className="label">
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                  />
                  <figure className="personal-figure">
                    <img src={image} alt="picture" />
                    <div id="center">
                      <figcaption className="personal-figcaption">
                        <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" />
                      </figcaption>
                    </div>
                  </figure>
                </label>
              </div>
            </div>
          ) : (
            <div className="relative w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500 overflow-hidden ">
              <div className="personal-image">
                <label className="label">
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                  />
                  <figure className="personal-figure">
                    <img src={image} alt="picture" />
                    <div id="center">
                      <figcaption className="personal-figcaption">
                        <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" />
                      </figcaption>
                    </div>
                  </figure>
                </label>
              </div>
            </div>
          )}
        </div>
        <div>{message && message}</div>

        <div className="mb-6">
          <label
            htmlFor="success"
            className="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-500"
          >
            Username:
          </label>
          <input
            type="text"
            id="success"
            className="border border-blue-500 text-blue-900 dark:text-blue-400 placeholder-blue-700 dark:placeholder-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="error"
            className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
          >
            Your email:
          </label>
          <input
            type="text"
            id="error"
            className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            placeholder="Error input"
            value={mail}
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oh, snapp!</span> Some error message.
          </p>
          <div className="flex justify-center mt-6">
            <Button
              size="md"
              isProcessing={loading}
              color="blue"
              onClick={handleChange}
            >
              Change info
            </Button>
          </div>
        </div>
      </div>
      <div className="box-content h-screen"></div>
    </div>
  );
}

export default SettingsComponent;

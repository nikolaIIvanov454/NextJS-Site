"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "flowbite-react";

import "@/app/css/avatar-change-style.css";

function SettingsComponent() {
  const { data: session, update } = useSession();

  const [image, setImage] = useState(null);
  const [test, setTest] = useState(null);
  const [username, setUsername] = useState(session?.user.name || "");
  const [mail, setMail] = useState(session?.user.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleImageUpload = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();

    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);

    // When the file reading is done
    reader.onload = () => {
      // Set the image state to the data URL
      setImage(reader.result);
    };
  };

  let handleChange = async () => {
    setLoading(true);

    let data = new FormData();
    data.set("username", username);
    data.set("email", mail);
    data.set("image", test);

    try {
      const request = await fetch("/api/update-info", {
        method: "POST",
        body: data,
      });

      const response = await request.json();

      if (response) {
        setLoading(false);
      }

      if (response.message === "Success!") {
        await update({
          user: {
            name: username,
            email: mail,
          },
        });
      }

      setMessage(response.message);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-5/6">
      <div className="bg-gray-200 p-4 text-center">
        <div className="flex justify-center mb-8">
          {session?.user && session.user.image ? (
            <div className="relative w-20 h-20">
              <img
                className="w-full h-full p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500 cursor-pointer transition ease-in-out delay-150 bg-blue-600 hover:bg-blue-400 duration-300 hover:filter hover:brightness-90 dark:hover:brightness-110"
                src={session.user.image}
                alt="User avatar"
              />
            </div>
          ) : (
            <div className="relative w-20 h-20 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500 overflow-hidden ">
              {image ? (
                <div className="personal-image">
                  <label className="label">
                    <input
                      type="file"
                      name="picture"
                      id="picture"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        if (event.target.files[0]) {
                          setTest(event.target.files[0]);
                          setImage(URL.createObjectURL(event.target.files[0]));
                        }
                      }}
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
              ) : (
                <div className="personal-image">
                  <label className="label">
                    <input type="file" onChange={handleImageUpload} name="picture" id="picture" accept="image/png, image/jpeg"/>
                    <figure className="personal-figure">
                      <svg className=" personal avatar text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                      <div id="center">
                        <figcaption className="personal-figcaption">
                          <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png"></img>
                        </figcaption>
                      </div>
                    </figure>
                  </label>
                </div>
              )}
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
    </div>
  );
}

export default SettingsComponent;

"use client";

import React, { useState } from "react";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

import "@/app/css/styles.css"

function RegisterFormComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerNewAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email.split("@")[0],
          email: email,
          password: password,
          role: "standard",
          avatar: ""
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@flowbite.com"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput id="repeat-password" type="password" required shadow />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" className="border-blue-700 text-blue-600 focus:ring-blue-600 dark:focus:ring-blue-600" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <a
                href="#"
                color="blue"
                className="hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </Label>
          </div>
          <Button
            color={"blue"}
            className="enabled:hover:bg-blue-800"
            onClick={registerNewAccount}
            type="submit"
          >
            Register new account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterFormComponent;

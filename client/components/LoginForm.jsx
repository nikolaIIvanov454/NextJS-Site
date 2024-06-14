"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Checkbox, Label, Popover, TextInput } from "flowbite-react";

import "@/app/css/style.css";

function LoginFormComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validator, setValidator] = useState({
    minLength: false,
    upperLowerCase: false,
    hasSymbol: false,
    longPassword: false,
  });
  const [rememberCheckbox, setRememberCheckbox] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordInput = (e) => {
    const password = e.target.value;

    setPassword(password);

    setValidator({
      minLength: password.length >= 8,
      upperLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasSymbol: /[#$&]/.test(password),
      longPassword: password.length >= 12,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      username: email.split("@")[0],
      email: email,
      password: password,
      remember: rememberCheckbox,
      callbackUrl: "/home",
    });

    if (result.error) {
      setError(result.error);
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
            {error && error}
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              className={"focus:border-blue-700"}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <Popover
              trigger="hover"
              content={
                <div className="space-y-2 p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Must have at least 8 characters
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {validator.longPassword ? (
                      <>
                        <div className="h-1 bg-green-400"></div>
                        <div className="h-1 bg-green-400"></div>
                        <div className="h-1 bg-green-400"></div>
                        <div className="h-1 bg-green-400"></div>
                      </>
                    ) : (
                      <>
                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                      </>
                    )}
                  </div>
                  <p>It’s better to have:</p>
                  <ul>
                    <li className="mb-1 flex items-center">
                      {validator.upperLowerCase ? (
                        <svg
                          className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      )}
                      Upper & lower case letters
                    </li>
                    <li className="mb-1 flex items-center">
                      {validator.hasSymbol ? (
                        <svg
                          className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      )}
                      A symbol (#$&)
                    </li>
                    <li className="flex items-center">
                      {validator.longPassword ? (
                        <svg
                          className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      )}
                      A longer password (min. 12 chars.)
                    </li>
                  </ul>
                </div>
              }
            >
              <TextInput
                id="password1"
                type="password"
                onChange={handlePasswordInput}
                required
              />
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onChange={(event) => setRememberCheckbox(event.target.checked)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="bg-blue-700 enabled:hover:bg-blue-800"
            onClick={login}
          >
            Submit
          </Button>
          <Button
            className="bg-blue-700 enabled:hover:bg-blue-800"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
          >
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormComponent;

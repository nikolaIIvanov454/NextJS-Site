"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

import ThemeSwitcher from "@/client/components/theme/ThemeSwitcher";

function NavbarComponent() {
  const location = usePathname();

  const { data } = useSession();

  const [image, setImage] = useState(data?.user?.image || null);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const response = await fetch("/api/load-avatar");

        if (response.ok) {
          const data = await response.json();

          setImage(data.avatar);
        } else {
          console.error("Failed to load avatar");
        }
      } catch (error) {
        console.error("An error occurred while loading avatar:", error);
      }
    };

    loadAvatar();
  }, []);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/home">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Xmax Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          SPL Addicts
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="flex mr-5 items-center">
          <div className="transition-colors duration-700">
            <ThemeSwitcher />
          </div>
        </div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                data?.user
                  ? image
                  : "https://ui-avatars.com/api/?name=notsigned"
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {data?.user ? data.user.name : "Not Signed In"}
            </span>
            <span className="block truncate text-sm font-medium">
              {data?.user ? data.user.email : ""}
            </span>
          </Dropdown.Header>
          {data?.user ? (
            <>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item href="/user/settings">
                {location === "/user/settings" ? (
                  <div className="p-1.5 pr-20 rounded bg-blue-400">
                    Settings
                  </div>
                ) : (
                  "Settings"
                )}
              </Dropdown.Item>
              <Dropdown.Item>Money</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Sign out
              </Dropdown.Item>
            </>
          ) : (
            ""
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/home"
          className={`nav-link ${
            location === "/home"
              ? "text-blue-700 md:hover:text-blue-400"
              : "md:hover:text-blue-400"
          }`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/login"
          className={`nav-link ${
            location === "/login"
              ? "text-blue-700 md:hover:text-blue-400"
              : "md:hover:text-blue-400"
          }`}
        >
          Login
        </Navbar.Link>
        <Navbar.Link
          href="/register"
          className={`nav-link ${
            location === "/register"
              ? "text-blue-700 md:hover:text-blue-400"
              : "md:hover:text-blue-400"
          }`}
        >
          Register
        </Navbar.Link>
        <Navbar.Link
          href="/about-us"
          className={`nav-link ${
            location === "/about-us"
              ? "text-blue-700 md:hover:text-blue-400"
              : "md:hover:text-blue-400"
          }`}
        >
          About Us
        </Navbar.Link>
        <Navbar.Link
          href="/admin"
          className={`nav-link ${
            location === "/admin"
              ? "text-blue-700 md:hover:text-blue-400"
              : "md:hover:text-blue-400"
          }`}
        >
          Admin
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;

"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Conference Info", href: "/", icon: HomeIcon, current: true },
  {
    name: "Participation Process",
    href: "/participation-process",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Topics", href: "/topics", icon: FolderIcon, current: false },
  {
    name: "Committee",
    icon: UsersIcon,
    current: false,
    subItems: [
      { name: "Speakers", href: "/speackers" },
      { name: "Chair", href: "/chair" },
      { name: "Co-Chair", href: "/co-chair" },
      { name: "Sponsorship", href: "/sponsorship" },
      { name: "Web Chairs", href: "/web-chairs" },
      { name: "Publicity & Communication", href: "/publicity-communication" },
      { name: "Registration Chairs", href: "/registration-chairs" },
      { name: "Publication Chairs", href: "/publication-chairs" },
      { name: "Speakers Session Chairs", href: "/speakers-session-chairs" },
      {
        name: "Organizing Local Committee",
        href: "/organizing-local-committee",
      },
      { name: "Scientific Committee", href: "/scientific-committee" },
    ],
  },
  { name: "Program", href: "/program", icon: CalendarIcon, current: false },
  {
    name: "Editions",
    href: "/editions",
    icon: DocumentDuplicateIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});

  const toggleSubMenu = (name) => {
    setOpenSubMenu((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      {/* Button to open sidebar */}
      <button className="p-2 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Bars3Icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
      </button>

      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col bg-gray-900 text-gray-300 p-4">
                  <div className="flex h-16 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/assets/img/logo.png"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-col gap-y-2">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "flex items-center gap-x-2 rounded-md p-2 text-sm font-semibold cursor-pointer"
                            )}
                            onClick={
                              item.subItems
                                ? () => toggleSubMenu(item.name)
                                : null
                            }
                          >
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                            {item.name}
                          </a>
                          {item.subItems && openSubMenu[item.name] && (
                            <ul className="ml-4 mt-1 space-y-1">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.name}>
                                  <a
                                    href={subItem.href}
                                    className="block text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-1 text-sm"
                                  >
                                    {subItem.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li className="mt-auto">
                        <a
                          href="#"
                          className="flex items-center gap-x-2 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72">
        <div className="flex flex-col bg-gray-900 text-gray-300 p-4 h-full">
          <div className="flex h-16 items-center">
            <img
              className="h-14 w-auto"
              src="/assets/img/logo.png"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-col gap-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "flex items-center gap-x-2 rounded-md p-2 text-sm font-semibold cursor-pointer"
                    )}
                    onClick={
                      item.subItems ? () => toggleSubMenu(item.name) : null
                    }
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                    {item.name}
                  </a>
                  {item.subItems && openSubMenu[item.name] && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            className="block text-gray-400 hover:text-white hover:bg-gray-800 rounded-md p-1 text-sm"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-2 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

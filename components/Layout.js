import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import SigninPopupModal from "./SigninPopupModal";
import { Menu, Transition } from "@headlessui/react";

import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const menuItems = [
  {
    label: "List a new home",
    icon: PlusIcon,
    href: "/addProducts",
  },
  {
    label: "My homes",
    icon: HomeIcon,
    href: "/products",
  },
  {
    label: "Favorites",
    icon: HeartIcon,
    href: "/favorites",
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    onClick: () => null,
  },
];

const Layout = ({ children = null }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const user = null;
  const isLoadingUser = false;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>Mi Mundo Creativo</title>
        <meta name="title" content="SupaaShopp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col font-['Poppins'] bg-[linear-gradient(90deg, #161122 21px, transparent 1%) center, linear-gradient(#161122 21px, transparent 1%) center, #a799cc]">
        <header className="w-full shadow-lg h-28">
          <div className="container h-full mx-auto">
            <div className="flex items-center justify-between h-full px-5 space-x-5">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <span className="text-2xl font-semibold tracking-wide text-white">
                    <span className="text-3xl text-success">M</span>i
                    <span className="text-3xl text-success">M</span>undo
                    <span className="text-3xl text-success">C</span>reativo
                  </span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/addProducts">
                  <a className="px-4 py-5 ml-4 font-semibold transition rounded-md bg-info text-primary hover:bg-primary hover:text-info focus:outline-none focus:ring-4 focus:ring-primaryfocus:ring-opacity-50">
                    Agregar Producto
                  </a>
                </Link>
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-full shrink-0 w-9 h-9">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || "Avatar"}
                            layout="fill"
                          />
                        ) : (
                          <UserIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 shrink-0 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-1 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex items-center px-4 py-4 mb-2 space-x-2">
                          <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-full shrink-0 w-9 h-9">
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || "Avatar"}
                                layout="fill"
                              />
                            ) : (
                              <UserIcon className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                        <div className="py-2">
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className="px-2 last:border-t last:pt-2 last:mt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link href={href}>
                                      <a className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-100">
                                        <Icon className="w-5 h-5 text-gray-500 shrink-0" />
                                        <span>{label}</span>
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      className="flex items-center w-full px-4 py-2 space-x-2 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="w-5 h-5 text-gray-500 shrink-0" />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-5 ml-4 font-extrabold transition rounded-md bg-info hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-primary hover:text-info"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container flex-grow mx-auto">
          <div className="px-4 py-12">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>
        <SigninPopupModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;

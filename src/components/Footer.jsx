import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  }

  const router = useRouter();
  const isWelcomePage = router.pathname === "/welcome";

  return (
    <div className="w-full py-5 text-center text-gray-800 fixed left-0 bottom-0">
      <div className="flex items-center px-10 justify-between">
        <div className='flex flex-row gap-4'>{[
          { icon: <FaTwitter />, link: "https://google.com" },
          { icon: <FaInstagram />, link: "https://google.com" },
          { icon: <FaLinkedin />, link: "https://google.com" },
          { icon: <FaDiscord />, link: "https://google.com" },
        ]?.map((socialLink, socialLinkIndex) => (
          <Link key={socialLinkIndex} href={socialLink?.link}
            className="text-2xl text-gray-900 hover:text-gray-700"
          >
            {socialLink?.icon}
          </Link>
        ))}</div>
        {isWelcomePage && (
          <button
            className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={showModal}
          >
            Discover the game rules
          </button>

        )}
        <Transition.Root show={isModalVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsModalVisible}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">

                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h2" className="text-xl font-text  text-center leading-6 text-gray-900">
                              Game Rules
                            </Dialog.Title>
                            <div className="mt-1">
                              <p className='font-text'>Game rules</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex font-text w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                          onClick={handleOk}
                        >
                          Got it
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
      </div>
    </div>
  );
}

export default Footer;

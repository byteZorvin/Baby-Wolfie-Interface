import Navbar from "@/components/Navbar";
import { useState } from "react";
import babyWolfImage from "@/utils/wolf.png";
import rabbitImage from "@/utils/Rabbit.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DAPP_ADDRESS, APTOS_FAUCET_URL, APTOS_NODE_URL, NETWORK } from "@/config/constants";
import { AptosClient } from "aptos";
import { Input } from "antd";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getRabbitAddress, getWolfieAddress } from "./stake";

const content = [
  { id: 1, value: '', name: 'Baby Wolfies love $FUR and they are eager to steal them from rabbits. You should try staking your Baby Wolf.' },
  { id: 2, value: babyWolfImage, name: 'Baby Wolf' },
  { id: 3, value: rabbitImage, name: 'Rabbit' },
  { id: 4, value: '', name: 'Rabbits generate $FUR tokens while being staked. They might become handy later on in the game' },
]

const Forest = () => {
  const [buttonText, setButtonText] = useState('Go Back to the main menu');
  const { account, signAndSubmitTransaction, connected } = useWallet();
  const [mintTxn, setMintTxn] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);
  const [collectionSupply, setCollectionSupply] = useState(0);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const client = new AptosClient(APTOS_NODE_URL);
  const [rabbitMinted, setRabbitMinted] = useState();
  const [babyWolfieMinted, setBabyWolfieMinted] = useState();

  function is_connected () {
    if (!connected) {
      alert("Please connect your wallet to play the game");
    }
    return connected;
  }

  const showModal = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    mint_nft();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handleButtonClick = () => {
    console.log("Forest clicked")
    setButtonText('Enter the Forest');
  };

  async function getCollectionSupply() {
    //TODO
  }

  async function readEvent(limit, type) {
    const events = await client.getEventsByEventHandle(
      `${DAPP_ADDRESS}`,
      `${DAPP_ADDRESS}::NFTCollection::Events`,
      type,
      {
        limit
      }
    );

    console.log("Events", events);
    return events;
  }

  function mint() {
    return {
      function: `${DAPP_ADDRESS}::NFTCollection::mint`,
      functionArguments: [
        account.address,
        amount,
      ],
    };
  }

  async function mint_nft() {
    if (!is_connected()) return;
    console.log(account.address);
    try {
      const rabbit_address = await getRabbitAddress(client);
      const wolfie_address = await getWolfieAddress(client);
      const res = await signAndSubmitTransaction(
        {
          data: mint(),
        },
        {
          gas_unit_price: 100
        }
      )
      if (res) {
        await client.waitForTransaction(res.hash);
          setMintTxn(res.hash);
          setMintTxn(res.hash);
          console.log(res.hash);
          setIsSuccessModalVisible(true);
        setMintTxn(res.hash);
          console.log(res.hash);
          setIsSuccessModalVisible(true);
      }
      const events = await readEvent(amount, "asset_minting_events");
      let rabbit_minted = 0, wolfie_minted = 0;
      events.forEach(event => {
        event.data.asset_minted == rabbit_address ? rabbit_minted++ : null;
        event.data.asset_minted == wolfie_address ? wolfie_minted++ : null;
      });
      console.log(rabbit_minted, wolfie_minted);
      setBabyWolfieMinted(wolfie_minted);
      setRabbitMinted(rabbit_minted);
      setIsSuccessModalVisible(true);
    } catch(e) {
      console.log("Could not mint due to: ", e);
    }
  }

  return (
    <div className="bg-container">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar buttonText={buttonText} handleButtonClick={handleButtonClick} buttonLink="/" />
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto py-32 lg:py-32">
          <h1 className="text-6xl text-center font-headline text-[#0583d7e7]" >
            Welcome to the forest!
          </h1>
          <p className="mt-6 text-2xl text-center leading-8 text-white font-text ">
            In Baby Wolfies, you&apos;re able to play two characters
          </p>
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                {content.map((item) => (
                  <div key={item.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-2xl leading-7 text-white font-text">{item.name}</dt>
                    {item.id !== 1 && item.id !== 4 &&
                      <dd>
                        <Image
                          src={item.value}
                          className="max-w-full h-auto mx-auto border-2 border-gray-800 rounded-md"
                          width={150}
                          height={150}
                          alt="NFT"
                        />
                      </dd>
                    }
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="text-center">
            <button
              className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={showModal}
            >
              Mint my NFT
            </button>
          </div>

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
                            <Dialog.Title as="h2" className="text-xl font-text leading-6 text-gray-900">
                              Enter the amount of NFTs you want to mint &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </Dialog.Title>
                            <div className="mt-1">
                              <Input type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex font-text w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                          onClick={handleOk}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex font-text w-full justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Modal for displaying transaction successful */}
          <Transition.Root show={isSuccessModalVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsSuccessModalVisible(false)}>
              {/* Modal content */}
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

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
                            <Dialog.Title as="h2" className="text-2xl font-text leading-6 text-gray-900">
                              Transaction Successful
                            </Dialog.Title>
                            <div className="mt-2 text-lg font-text">
                              {rabbitMinted>0 && babyWolfieMinted> 0 && <p>You have successfully minted {rabbitMinted} rabbit {rabbitMinted > 1 ? 's' : ''} and {babyWolfieMinted} baby wolfie {babyWolfieMinted > 1 ? 's' : ''}!!🎉</p>}
                              {rabbitMinted>0 && <p>You have successfully minted {rabbitMinted} rabbit {rabbitMinted > 1 ? 's' : ''} !!🎉</p>}
                              {babyWolfieMinted>0 && <p>You have successfully minted {babyWolfieMinted} baby wolfie {babyWolfieMinted > 1 ? 's' : ''}!!🎉</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="mt-3 inline-flex font-text w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg text-white shadow-sm hover:bg-gray-700 sm:mt-0 sm:w-auto"
                          onClick={() => setIsSuccessModalVisible(false)}
                        >
                          Close
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
      <Footer />
    </div>
  )
}

export default Forest;

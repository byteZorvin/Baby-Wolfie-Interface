import Navbar from "@/components/Navbar";
import { useState } from "react";
import babyWolfImage from "@/utils/wolf.png";
import rabbitImage from "@/utils/Rabbit.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DAPP_ADDRESS, APTOS_FAUCET_URL, APTOS_NODE_URL, NETWORK } from "@/config/constants";
import { AptosClient } from "aptos";
import { Modal, Input } from "antd";

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
  const client = new AptosClient(APTOS_NODE_URL);

  const is_connected = () => {
    if (!connected) {
      alert("Please connect your wallet to play the game");
    }
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

  function mint() {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::baby_wolfie::mint",
      type_arguments: [],
      arguments: [
        account.address,
        amount,
      ],
    };
  }

  async function mint_nft() {
    is_connected();
    const res = await signAndSubmitTransaction(
      mint(),
      { gas_unit_price: 100 }
    );
    if(res) {
      await client.waitForTransaction(res.hash);
      setMintTxn(res.hash);
      console.log(res.hash);
    }
  }

  return (
    <div className="bg-container">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar buttonText={buttonText} handleButtonClick={handleButtonClick} buttonLink="/" />
        {/* <Navbar/> */}
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto py-32 lg:py-32">
          <h1 className="text-6xl text-center font-headline text-[#00a0fce7]" >
            Welcome to the forest!
          </h1>
          <p className="mt-6 text-2xl text-center leading-8 text-gray-800 font-text ">
            In Baby Wolfies, you're able to play two characters
          </p>
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                {content.map((item) => (
                  <div key={item.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-2xl leading-7 text-gray-800 font-text">{item.name}</dt>
                    {item.id !== 1 && item.id !== 4 &&
                      <dd>
                        <Image
                          src={item.value}
                          className="max-w-full h-auto mx-auto border-2 border-gray-800 rounded-md"
                          width={150}
                          height={150}
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
          <Modal
            title="Enter your Amount"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
              <Input type="number" 
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Forest;

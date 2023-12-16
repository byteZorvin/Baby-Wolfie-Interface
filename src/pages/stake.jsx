import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import babyWolfImage from "../utils/wolf.png";
import rabbitImage from "../utils/Rabbit.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DAPP_ADDRESS, APTOS_FAUCET_URL, APTOS_NODE_URL, NETWORK } from "@/config/constants";
import { Input } from "antd";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";


const Stake = () => {
    const [buttonText, setButtonText] = useState('Go Back to the forest');
    const { account, signAndSubmitTransaction, connected } = useWallet();
    const [stakeTxn, setStakeTxn] = useState('');
    const [unstakeTxn, setUnstakeTxn] = useState('');
    const [amount, setAmount] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const client = new AptosClient(APTOS_NODE_URL);

    const [content, setContent] = useState([
        { id: 1, value: '', name: '', stakeButton: '', unstake: '' },
        { id: 2, value: babyWolfImage, name: 'Baby Wolf', stakeButton: 'Stake', unstake: 'Unstake' },
        { id: 3, value: rabbitImage, name: 'Rabbit', stakeButton: 'Stake', unstake: 'Unstake' },
        { id: 4, value: '', name: 'Rabbits generate $FUR tokens while being staked. They might become handy later on in the game', stakeButton: '' },
    ]);

    useEffect(() => {
        async function fetchBalances() {
            const rabbitBalanceRes = await getRabbitBalance();
            const babyWolfBalanceRes = await getBabyWolfieBalance();

            setContent(prevContent => {
                const updatedContent = [...prevContent];
                updatedContent[0].name = `You own ${babyWolfBalanceRes[0]} Baby Wolf and ${rabbitBalanceRes[0]} Rabbit. Stake your NFTs to get rewards every cycle (24 hours)`;
                return updatedContent;
            });
        }

        fetchBalances();
    }, [connected, account]);

    const is_connected = () => {
        if (!connected) {
            alert("Please connect your wallet to play the game");
        }
    }

    const showModal = (itemId, action) => {
        setSelectedItemId(itemId);
        setModalAction(action);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    // const handleStakeButtonClick = (itemId) => {
    //     console.log(`Stake button clicked for item ${itemId}`);
    //     setSelectedItemId(itemId);
    //     stake_nft(itemId);
    // }

    // const handleUnstakeButtonClick = (itemId) => {
    //     console.log(`Unstake button clicked for item ${itemId}`);
    //     setSelectedItemId(itemId);
    //     unstake_nft(itemId);
    // }

    async function getMetadata(itemId) {
        is_connected();
        try {
            let tokenName;
            if (itemId == 2) {
                tokenName = "Baby Wolfie Token";
            }
            else if (itemId == 3) {
                tokenName = "Rabbit Token";
            }
            const res = await client.view({
                function: `${DAPP_ADDRESS}::NFTCollection::get_metadata`,
                type_arguments: [],
                arguments: [tokenName]
            });
            return res;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    async function stake(itemId) {
        const metadata = await getMetadata(itemId);
        console.log("Metadata", metadata[0].inner);
        if (!metadata) {
            console.error("Failed to retrieve metadata. Cannot proceed with stake");
            return null;
        }
        const payload = {
            function: `${DAPP_ADDRESS}::NFTCollection::stake`,
            typeArguments: [],
            functionArguments: [
                metadata[0].inner,
                amount,
            ]
        };
        console.log("Payload", payload);
        return payload;
    }

    async function stake_nft(itemId) {
        try {
            is_connected();
            console.log("Staking");
            const res = await signAndSubmitTransaction(
                {
                    sender: account.address,
                    data: await stake(itemId),
                },
                {
                    gas_unit_price: 100
                }
            );
            console.log(res);
            setStakeTxn(res.hash);
        }
        catch (e) {
            console.error("Failed to stake", e);
        }
    }

    async function unstake(itemId) {
        const metadata = await getMetadata(itemId);
        if (!metadata) {
            console.error("Failed to retrieve metadata. Cannot proceed with unstake");
            return null;
        }
        const payload = {
            function: `${DAPP_ADDRESS}::NFTCollection::unstake`,
            typeArguments: [],
            functionArguments: [
                metadata[0].inner,
                amount,
            ]
        };
        console.log("Payload", payload);
        return payload;
    }

    async function unstake_nft(itemId) {
        try {
            is_connected();
            console.log("Unstaking");
            const res = await signAndSubmitTransaction(
                {
                    data: await unstake(itemId),
                },
                {
                    gas_unit_price: 100
                }
            );
            console.log(res);
            setUnstakeTxn(res.hash);
        }
        catch (e) {
            console.error("Failed to unstake", e);
        }
    }

    const handleButtonClick = () => {
        console.log("Forest clicked")
        setButtonText('Enter the Forest');
    };

    async function getStakingBalance() {
        is_connected();
        try {
            const res = await client.view({
                function: `${DAPP_ADDRESS}::NFTCollection::get_staking_balance`,
                type_arguments: [],
                arguments: [
                    account.address,
                    "Rabbit Token",
                ]
            });
            console.log("Staking Balance res", res);
            return res;
        }
        catch (e) {
            console.error("Failed to get staking balance", e);
        }
    }

    async function getRabbitBalance() {
        is_connected();
        try {
            const res = await client.view({
                function: `${DAPP_ADDRESS}::NFTCollection::get_balance_rabbit`,
                type_arguments: [],
                arguments: [
                    account.address,
                ]
            });
            console.log("User Rabbit Balance res", res);
            return res;
        }
        catch (e) {
            console.error("Failed to get user rabbit balance", e);
        }
    }

    async function getBabyWolfieBalance() {
        is_connected();
        try {
            const res = await client.view({
                function: `${DAPP_ADDRESS}::NFTCollection::get_balance_baby_wolfie`,
                type_arguments: [],
                arguments: [
                    account.address,
                ]
            });
            console.log("User Baby Wolfie Balance res", res);
            return res;
        }
        catch (e) {
            console.error("Failed to get user baby wolfie balance", e);
        }
    }


    return (
        <div className="bg-container">
            <header className="absolute inset-x-0 top-0 z-50">
                <Navbar buttonText={buttonText} handleButtonClick={handleButtonClick} buttonLink="/welcome" />
                {/* <Navbar/> */}
            </header>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto py-32 lg:py-32">
                    <h1 className="text-6xl text-center font-headline text-[#0583d7e7]" >
                        Stake your NFT!
                    </h1>
                    <p className="mt-6 text-2xl text-center leading-8 text-white font-text">
                        In Baby Wolfies, you're able to play two characters
                    </p>
                    <div className="py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                                {content.map((item) => (
                                    <div key={item.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt className="text-2xl leading-7 text-white font-text">{item.name}</dt>
                                        <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                                            {item.id !== 1 && item.id !== 4 &&
                                                <div>
                                                    <Image
                                                        src={item.value}
                                                        className="max-w-full h-auto mx-auto border-2 border-gray-800 rounded-md"
                                                        width={150}
                                                        height={150}
                                                        alt="NFT"
                                                    />
                                                </div>
                                            }
                                        </dd>
                                        {item.stakeButton && <button
                                            className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                            onClick={() => showModal(item.id, 'stake')}
                                        >
                                            {item.stakeButton} <span aria-hidden="true">→</span>
                                        </button>}
                                        {item.unstake && <button
                                            className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                            onClick={() => showModal(item.id, 'unstake')}
                                        >
                                            {item.unstake} <span aria-hidden="true">→</span>
                                        </button>}
                                    </div>
                                ))}

                                <Transition.Root show={isModalVisible} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-50 overflow-y-auto"
                                        onClose={() => setIsModalVisible(false)}
                                    >
                                        <div className="min-h-screen px-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                                            </Transition.Child>

                                            <span
                                                className="inline-block h-screen align-middle"
                                                aria-hidden="true"
                                            >
                                                &#8203;
                                            </span>

                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md ">
                                                    <h3 className="text-lg font-medium font-text leading-6 text-gray-900">
                                                        {modalAction === 'stake' ? 'Enter amount of NFTs you want to stake' : 'Enter amount of NFTs you want to unstake'}
                                                    </h3>
                                                    <div className="mt-2 mb-2">
                                                        <Input
                                                            type="number"
                                                            value={amount}
                                                            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                                                        />
                                                    </div>
                                                    <div className="bg-gray-50 px-2 py-2 gap-3 flex flex-row-reverse">
                                                        <button
                                                            className="rounded-md bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                                            onClick={() => {
                                                                setIsModalVisible(false);
                                                                if (modalAction === 'stake') {
                                                                    stake_nft(selectedItemId);
                                                                } else if (modalAction === 'unstake') {
                                                                    unstake_nft(selectedItemId);
                                                                }
                                                            }}
                                                        >
                                                            {modalAction === 'stake' ? 'Stake' : 'Unstake'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex font-text w-full justify-center rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={handleCancel}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition.Root>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Stake;

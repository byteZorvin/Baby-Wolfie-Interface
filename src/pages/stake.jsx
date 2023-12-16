import Navbar from "@/components/Navbar";
import { useState } from "react";
import babyWolfImage from "../utils/wolf.png";
import rabbitImage from "../utils/Rabbit.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DAPP_ADDRESS, APTOS_FAUCET_URL, APTOS_NODE_URL, NETWORK } from "@/config/constants";

const content = [
    { id: 1, value: '', name: 'Baby Wolfies love $FUR and they are eager to steal them from rabbits. You should try staking your Baby Wolf.', stakeButton: '', claim: '' },
    { id: 2, value: babyWolfImage, name: 'Baby Wolf', stakeButton: 'Stake', claim: 'Claim FUR' },
    { id: 3, value: rabbitImage, name: 'Rabbit', stakeButton: 'Stake', claim: 'Claim FUR' },
    { id: 4, value: '', name: 'Rabbits generate $FUR tokens while being staked. They might become handy later on in the game', stakeButton: '' },
]


const Stake = () => {
    const [buttonText, setButtonText] = useState('Go Back to the forest');
    const { account, signAndSubmitTransaction, connected } = useWallet();
    const [stakeTxn, setStakeTxn] = useState('');
    const [amount, setAmount] = useState(1);
    const client = new AptosClient(APTOS_NODE_URL);

    const is_connected = () => {
        if (!connected) {
            alert("Please connect your wallet to play the game");
        }
    }

    async function getMetadata() {
        is_connected();
        try {
            const res = await client.view({
                function: `${DAPP_ADDRESS}::NFTCollection::get_metadata`,
                type_arguments: [],
                arguments: ["Baby Wolfie Token"]
            });
            return res;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    async function stake() {
        const metadata = await getMetadata();
        console.log("Metadata", metadata[0].inner);
        if (!metadata) {
            console.error("Failed to retrieve metadata. Cannot proceed with stake");
            return null;
        }
        const payload = {
            function: `${DAPP_ADDRESS}::NFTCollection::stake`,
            typeArguments: [],
            functionArguments: [
                // metadata[0].inner,
                "0xc6dfb2c9a338bc5adee257eed146554ff2ed964944ac79b018b26b65d16cb720",
                1,
            ]
        };
        console.log("Payload", payload);
        return payload;
    }

    async function stake_nft() {
        try {
            is_connected();
            console.log("Staking");
            const res = await signAndSubmitTransaction(
                {
                    sender: account.address,
                    data: stake(),
                },
                {
                    gas_unit_price: 100
                }
            )
            console.log(res);
            // if (res) {
            //     await client.waitForTransaction(res.hash);
            //     setStakeTxn(res.hash);
            //     console.log(res.hash);
            // }
        }
        catch (e) {
            console.error("Failed to stake", e);
        }
    }

    const handleButtonClick = () => {
        console.log("Forest clicked")
        setButtonText('Enter the Forest');
    };

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
                    <p className="mt-6 text-xl text-center leading-8 text-white font-text">
                        In Baby Wolfies, you're able to play two characters
                    </p>
                    <button className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={stake_nft}
                    >Stake</button>

                    <div className="py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                                {content.map((item) => (
                                    <div key={item.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                        <dt className="text-xl leading-7 text-white font-text">{item.name}</dt>
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
                                        >
                                            {item.stakeButton} <span aria-hidden="true">→</span>
                                        </button>}
                                        {item.claim && <button
                                            className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                        >
                                            {item.claim} <span aria-hidden="true">→</span>
                                        </button>}
                                    </div>
                                ))}
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

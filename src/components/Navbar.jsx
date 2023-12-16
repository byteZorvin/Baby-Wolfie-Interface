import Link from 'next/link'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Col } from "antd";
import { useRouter } from 'next/router';

export default function Navbar({ buttonText, handleButtonClick, buttonLink }) {
    const router = useRouter();

    const handleStakeButtonClick = () => {
        router.push("/stake");
    }
    
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href={buttonLink}>
                        <button
                            onClick={handleButtonClick}
                            className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            {buttonText}
                        </button>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
                    {/* <button
                        className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                       Connect Wallet
                    </button>  */}
                    {router.pathname === "/welcome" && (
                        <button
                            className="rounded-md bg-gray-800 px-4 py-2 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            onClick={handleStakeButtonClick}
                        >Stake your NFT</button>
                    )}
                    <Col>
                        <WalletSelector />
                    </Col>
                </div>
            </nav>
        </header>
    )
}

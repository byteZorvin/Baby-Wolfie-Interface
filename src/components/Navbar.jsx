import Link from 'next/link'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Col } from "antd";

export default function Navbar({ buttonText, handleButtonClick, buttonLink }) {
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
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {/* <button
                        className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                       Connect Wallet
                    </button>  */}
                    <Col>
                        <WalletSelector style={{ backgroundColor: "#black" }} />
                    </Col>
                </div>
            </nav>
        </header>
    )
}

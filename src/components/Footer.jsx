import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full py-5 text-center text-gray-800">
      <div className="flex flex-row items-center px-10 gap-6">
        {[
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
        ))}
      </div>
    </div>
  );
}

export default Footer;

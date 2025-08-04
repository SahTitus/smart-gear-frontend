import React from 'react';
import {
  ChevronRight,
  Mail,
  Phone,
  Apple,
  Store,
} from 'lucide-react';
import Logo from '../../assets/logo.png'; 
import { Link } from 'react-router-dom';


const ArrowIcon = () => <ChevronRight className="w-3 h-3 mr-2 text-green-600" />;

const FooterList = ({ title, items }) => {
  const listItemStyle =
    'flex items-center text-gray-700 hover:text-gray-900 mb-2 transition-colors duration-200';

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>
      <ul className="space-y-2">
        {items.map((text, index) => (
          <li key={index}>
            <a href="#" className={listItemStyle}>
              <ArrowIcon />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const getToKnowUs = ['Careers', 'Blog', 'About SmartGear', 'Investors Relations'];
  const makeMoneyWithUs = [
    'Sell Products On SmartGear',
    'Become An Affiliate',
    'Advertise Your Products',
    'Self-Publish With Us',
    'See More On Make Money With Us',
  ];

  return (
    <footer className="bg-white py-12 px-8 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        <FooterList title="Get To Know Us" items={getToKnowUs} />
        <FooterList title="Make Money With Us" items={makeMoneyWithUs} />

        {/* Contact Section */}
        <div className="flex flex-col items-start md:items-end">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Contact</h3>

          <div className="flex items-center text-gray-700 mb-2">
            <Mail className="w-5 h-5 mr-2 text-green-600" />
            smartgear@gmail.com
          </div>

          <div className="flex items-center text-gray-700 mb-4">
            <Phone className="w-5 h-5 mr-2 text-green-600" />
            +233 (54) 688 289
          </div>

          {/* Store Badges */}
          <div className="flex space-x-4 mb-8">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <div className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2">
                <Apple className="w-5 h-5" />
                <span className="text-xs">Download on the App Store</span>
              </div>
            </a>

            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <div className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2">
                <Store className="w-5 h-5" />
                <span className="text-xs">GET IT ON Google Play</span>
              </div>
            </a>
          </div>

          {/* Logo */}
          <div className="mt-auto md:self-end">
          <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="SmartGear Logo" className="h-8 mr-2" />
                <span className="font-bold text-xl text-gray-800">SMART<span className="text-green-500">GEAR</span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

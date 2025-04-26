import { Link } from "react-router-dom";
import logo from "/logo.svg"; // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-600">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="flex items-end mb-4 whitespace-nowrap">
            <img src={logo} alt="Green World" className="w-11 h-11" />
            <span className="text-2xl text-[#3bc944] font-bold">
              Green World
            </span>
          </Link>
          <p className="text-[#2e7d32]">
            Discover and identify the beautiful plants around you with our
            AI-powered technology.
          </p>
        </div>

        {/* Explore */}
        <div className="flex justify-center max-sm:block">
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-green-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#identification" className="hover:text-green-600">
                  Plant Identification
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-green-600">
                  Gardening Tips
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-green-600">
                  Community
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources */}
        <div className="lg:flex lg:justify-center">
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-green-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-green-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-green-600">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-green-600">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex justify-center max-sm:block">
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/license" className="hover:text-green-600">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Green World. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import { faFacebookF, faGithub, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BrandLogo = () => (
  <svg
    className="w-8 h-8 text-purple-700"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);

// Helper component for each column of links
const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-gray-700 hover:text-purple-900 transition-colors duration-200 text-sm"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerData = [
    {
      title: 'Services',
      links: [
        { label: 'Deposit', href: '/depositmoney' },
        { label: 'Withdraw', href: '/withdrawmoney' },
        { label: 'Loan', href: '/loan' },
        { label: 'Create Account', href: '/openaccount' },
        { label: 'Transfer money', href: 'transfer' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Card', href: '/card' },
        { label: 'Cheque book', href: '/applychequebook' },
      ],
    },
    {
      title: 'Docs',
      links: [
        { label: 'Github', href: '#' },
        { label: 'Youtube', href: '#' },
        { label: 'Portfolio', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of service', href: '/termsofservice' },
        { label: 'Privacy policy', href: '#' },
        { label: 'License', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-purple-200 text-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Top Section: Logo and Link Columns --- */}
        <div className="pb-16 grid grid-cols-1 md:grid-cols-6 gap-8">

          {/* Logo Column */}
          <div className="md:col-span-1">
            <BrandLogo />
          </div>

          {/* Link Columns - Responsive Grid (2 columns on mobile, 5 on medium, spanning 4 slots) */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerData.map((col, index) => (
              <FooterColumn key={index} title={col.title} links={col.links} />
            ))}
          </div>
        </div>

        {/* --- Newsletter Section (Separated by an implicit line break) --- */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Newsletter Text */}
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-gray-700">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-white text-gray-200 border border-purple-700 rounded-l-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                className="bg-purple-700 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-r-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Copyright and Social Icons --- */}
        <div className="border-t border-purple-800 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">

          {/* Copyright */}
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="order-1 md:order-2 flex space-x-6">
            <a href="#" aria-label="Facebook" className="hover:text-purple-700 transition-colors">
              <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-purple-700 transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-purple-700 transition-colors">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-purple-700 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-purple-700 transition-colors">
              <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
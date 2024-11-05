import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-black py-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around gap-8">
        {footerSections.map((section, index) => (
          <div key={index} className="w-40">
            <h3 className="text-sm font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-black text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 max-w-6xl mx-auto">
        <form className="flex flex-wrap justify-center items-center gap-2">
          <label htmlFor="email" className="text-sm">Subscribe for Minaty.com Emails</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className="px-4 py-2 rounded-md border border-gray-800 focus:outline-none focus:ring focus:ring-gray-800"
          />
          <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
        </form>

        <select className="px-4 py-2 rounded-md bg-gray-500 text-white">
          <option value="US">South Africa</option>
          <option value="CA">Botswana</option>
          <option value="FR">France</option>
        </select>

        <div className="flex space-x-4">
          {socialLinks.map((icon, idx) => (
            <a key={idx} href="#" className="text-black text-2xl">
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-800 text-sm mt-6">
        <p>© 2024 Minaty.com SA, Inc. All rights reserved. Terms of Use | Privacy Policy</p>
        <p>958 - 0860 Alungile SA (0769580860)</p>
      </div>
    </footer>
  );
};

// Footer section data
const footerSections = [
  {
    title: "About Minaty.com",
    links: [
      { label: "About Minaty.com", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Supply Chain Transparency", href: "#" },
      { label: "Affiliates", href: "#" },
      { label: "Minaty Global Sites", href: "#" }
    ]
  },
  {
    title: "Minaty.com",
    links: [
      { label: "My Account", href: "#" },
      { label: "Booking Status", href: "#" },
      { label: "Beauty Insider", href: "#" },
      { label: "Flash Subscription", href: "#" },
      { label: "Gift Cards", href: "#" }
    ]
  },
  {
    title: "Help & FAQs",
    links: [
      { label: "Online Booking", href: "#" },
      { label: "Cancellation", href: "#" },
      { label: "Refunds", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Reservations", href: "#" }
    ]
  },
  {
    title: "Ways to Book",
    links: [
      { label: "Just Booked", href: "#" },
      { label: "Best Rooms", href: "#" },
      { label: "Weekly Specials", href: "#" },
      { label: "Minaty Vouchers", href: "#" },
      { label: "Gift Cards", href: "#" }
    ]
  }
];

// Social media links
const socialLinks = ["facebook-f", "twitter", "instagram", "youtube"];

export default Footer;

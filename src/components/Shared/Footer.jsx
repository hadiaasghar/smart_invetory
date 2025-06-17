const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Smart Inventory System. All rights
          reserved.
        </p>
        <nav className="flex space-x-4">
          <a href="" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="" className="text-sm hover:underline">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

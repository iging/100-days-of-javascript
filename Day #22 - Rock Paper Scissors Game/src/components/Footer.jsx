const Footer = () => {
  return (
    <footer className="py-6 mt-auto bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/70 text-sm font-medium">
              © 2025 Rock Paper Scissors Pro
            </p>
            <p className="text-white/50 text-xs mt-1">
              The ultimate online gaming experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

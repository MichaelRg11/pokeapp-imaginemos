import React from "react";

const Header = () => {
  return (
    <>
      {/* header */}

      <header className="w-full flex justify-center h-20 bg-space-cadet text-anti-flash-white shadow-md">
        <div className="max-w-screen-xl w-full h-full flex justify-between items-center px-5">
          <div className="text-2xl font-bold">Logo</div>
          <nav>
            <ul className="flex">
              <a href="/">
                <li className="mx-2">Home</li>
              </a>
              <a href="/charts">
                <li className="mx-2">Charts</li>
              </a>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;


'use client';

import { Footer } from 'flowbite-react';

function FooterComponent() {
  return (
    <Footer container className="bottom-0 w-full py-4">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/home"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="SPL Addicts Logo"
            name="SPL Addicts"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="SPL Addicts" year={2024} />
      </div>
    </Footer>
  );
}

export default FooterComponent;
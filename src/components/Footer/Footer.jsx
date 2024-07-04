import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      {/* <footer className="bg-gray-100 py-11">
        <div className="container text-start px-5">
          <div className="container text-start px-5">
            <h2 className="text-2xl text-start py-3">
              Get the Fresh Market app
            </h2>
            <p className="py3">we will send you a link , open it on your  phone to download the app .</p>

          </div>
          <div className="flex container py-6 px-4  flex-wrap justify-between mx-auto">
            <input className="w-3/4  ms-4 my-3  rounded-md px-2 py-3" type="email" placeholder="Email . . ." />
            <button className="my-3  me-4 bg-green-500 hover:bg-green-700 text-white font-bold py-3">
              Share App Link
            </button>
          </div>
        </div>
      </footer> */}

<section className="footer">
  <div className="footer-row">
    <div className="footer-col">
      <h4>Info</h4>
      <ul className="links">
        <li>
          About Us</li>
        <li>Compressions</li>
        <li>Customers</li>
        <li>Service</li>
        <li>Collection</li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Explore</h4>
      <ul className="links">
        <li>Free Designs</li>
        <li>Latest Designs</li>
        <li>Themes</li>
        <li>Popular Designs</li>
        <li>Art Skills</li>
        <li>New Uploads</li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Legal</h4>
      <ul className="links">
        <li>Customer Agreement</li>
        <li>Privacy Policy</li>
        <li>GDPR</li>
        <li>Security</li>
        <li>Testimonials</li>
        <li>Media Kit</li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Fleshmarket</h4>
      <p>
        Subscribe to our newsletter for a weekly dose
        of news, updates, helpful tips, and
        exclusive offers.
      </p>

    </div>
  </div>
</section>

    </React.Fragment>
  );
}

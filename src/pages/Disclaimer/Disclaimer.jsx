import React from "react";
import "./Disclaimer.css";
import Logo from "../../components/topBar/component/Logo";

const Disclaimer = () => {
  return (
    <div className="disclaimer-page">
      <Logo />
      <header className="disclaimer-header">
        <h1>Disclaimer</h1>
        <p>Stay informed and make responsible decisions when using our services.</p>
      </header>

      <section className="disclaimer-section">
        <h2>General Information</h2>
        <p>
          The content provided on this platform is for informational purposes only. We do not guarantee the accuracy,
          completeness, or timeliness of the information.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2>Risk Acknowledgment</h2>
        <p>
          Usage of our services involves risks. You acknowledge that any financial or personal decisions you make are
          your sole responsibility.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2>No Liability</h2>
        <p>
          We are not liable for any losses or damages arising from the use of our services, including but not limited
          to financial losses or data breaches.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2>Third-Party Content</h2>
        <p>
          Our platform may contain links to third-party websites. We do not endorse or take responsibility for their
          content or privacy practices.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2>Contact Us</h2>
        <p>If you have any concerns or questions, feel free to contact us at artsionarymedia@gmail.com.</p>
      </section>
    </div>
  );
};

export default Disclaimer;

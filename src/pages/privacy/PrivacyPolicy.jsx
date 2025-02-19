

import Logo from "../../components/topBar/component/Logo";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <Logo />
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. Please read this policy carefully.</p>
      </header>

      <section className="policy-section">
        <h2>Information We Collect</h2>
        <p>
          We collect personal information that you provide directly, such as when you sign up for an account, post
          comments, or interact with our services.
        </p>
      </section>

      <section className="policy-section">
        <h2>How We Use Information</h2>
        <p>
          We use your information to improve our services, provide customer support, and maintain secure experiences
          for our users.
        </p>
      </section>

      <section className="policy-section">
        <h2>Sharing Information</h2>
        <p>
          We do not sell your personal information. However, we may share it with third-party services to enhance our
          offerings.
        </p>
      </section>

      <section className="policy-section">
        <h2>Your Choices</h2>
        <p>You can choose to delete your account or opt-out of marketing communications at any time.</p>
      </section>

      <section className="policy-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about this policy, feel free to contact us at belsinghf@gmail.com.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

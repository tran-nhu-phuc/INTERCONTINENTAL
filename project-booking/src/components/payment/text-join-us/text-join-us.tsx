import "./text-join-us.css";
const TexJoinUs = () => {
  return (
    <div className="box-join-us">
      <div className="box-ambassador">
        <h2>Join us as an InterContinental® Ambassador</h2>
        <p>
          InterContinental Ambassador membership costs USD 200 and provides a
          suite of indulgences to enrich your experience at InterContinental
          Hotels & Resorts with elevated member benefits. Enhance your next
          stays with guaranteed room upgrades, late check-outs and complimentary
          weekend night and enjoy Platinum Elite status at IHG.
        </p>
        <div className="input-become-an-ambassador">
          <input type="checkbox"></input>
          <strong>Become An Ambassador To day For 200 USD</strong>
        </div>
      </div>
      <h2>Terms and Conditions</h2>
      <p>
        By booking, I certify that I have read and accept the Terms of Use and
        Privacy Statement and I have read and understand the Rate Description
        and Rate Rules for my reservation.
      </p>
      <p>
        I am at least 18 years of age and at least one guest in my party will
        meet the minimum check-in age requirement for the hotel upon arrival.
      </p>
      <p>*Minimum Check-In Age: 18</p>
      <p>
        By joining IHG One Rewards, I certify that I have read and accept the.
        <span>IHG One Rewards Membership Terms</span> and
        <span> Conditions, Privacy Statement</span> and{" "}
        <span>California Notice of Financial Incentive</span>.
      </p>
    </div>
  );
};
export default TexJoinUs;

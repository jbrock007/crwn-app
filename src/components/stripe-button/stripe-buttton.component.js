import React from "react";
import StripeCheckout from "react-stripe-checkout";

const onToken = (token) => {
  console.log(token);
  alert("Payment successful");
};

const StripeCheckoutButton = function ({ price }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J4fFaSEkJOnciXVLxYqL4oGp8WOasJiRzpLxJTevsQwJFBItRieJzlOjpIKO5u5dEsdKluWsAXVzgg86h9smwFV0018mVQSOb";

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothings Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

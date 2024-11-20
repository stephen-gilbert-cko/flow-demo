/* global CheckoutWebComponents */
(async () => {
  // Insert your public key here
  const PUBLIC_KEY = "pk_sbox_xxx";

  const response = await fetch("/create-payment-sessions", { method: "POST" }); // Order
  const paymentSession = await response.json();

  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  const checkout = await CheckoutWebComponents({
    publicKey: PUBLIC_KEY,
    environment: "sandbox",
    locale: "en-GB",
    paymentSession,
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("Create Payment with PaymentId: ", paymentResponse.id);
    },
    onChange: (component) => {
      console.log(
        `onChange() -> isValid: "${component.isValid()}" for "${
          component.type
        }"`
      );
    },
    onError: (component, error) => {
      console.log("onError", error, "Component", component.type);
    },
  });

  async function createComponent(container, componentType) {
    const flowComponent = checkout.create(componentType);
    if (await flowComponent.isAvailable()) {
      flowComponent.mount(container);
    }
  }

  const applePayContainer = document.getElementById("applepay-container");
  createComponent(applePayContainer, "applepay");

  const googlePayContainer = document.getElementById("googlepay-container");
  createComponent(googlePayContainer, "googlepay");

  const cardContainer = document.getElementById("card-container");
  createComponent(cardContainer, "card");

})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

if (paymentStatus === "succeeded") {
  triggerToast("successToast");
}

if (paymentStatus === "failed") {
  triggerToast("failedToast");
}

if (paymentId) {
  console.log("Create Payment with PaymentId: ", paymentId);
}

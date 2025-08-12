const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Insert your secret key here
const SECRET_KEY = "sk_sbox_xxx";

app.post("/create-payment-sessions", async (_req, res) => {
  // Create a PaymentSession
  const request = await fetch(
    "https://api.sandbox.checkout.com/payment-sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 6540,
        currency: "GBP",
        reference: "ORD-123A",
        description: "Test Order",
        customer: {
          email: "john.smith@mail.com",
        },
        payment_type: "Regular",
        payment_method_configuration: {
          card: {
            store_payment_details: "enabled",
          },
        },
        shipping: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "London",
            zip: "SW1A 1AA",
            country: "GB",
          },
          phone: {
            number: "1234567890",
            country_code: "+44",
          },
        },
        billing: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "London",
            zip: "SW1A 1AA",
            country: "GB",
          },
          phone: {
            number: "1234567890",
            country_code: "+44",
          },
        },
        success_url: "http://localhost:3000/?status=succeeded",
        failure_url: "http://localhost:3000/?status=failed",
        metadata: {},
        items: [
          {
            name: "Guitar",
            quantity: 1,
            unit_price: 1635,
          },
          {
            name: "Amp",
            quantity: 3,
            unit_price: 1635,
          },
        ],
        // recipient: {
        //   first_name: "John",
        //   last_name: "Smith",
        //   account_number: "5555554444",
        //   address: {
        //     country: "GB"
        //   }
        // },
        // sender: {
        //   type: "individual",
        //   first_name: "John",
        //   last_name: "Smith",
        //   date_of_birth: "1990-01-01",
        //   address: {
        //     address_line1: "123 High St.",
        //     city: "London",
        //     country: "GB"
        //   }
        // },
        // processing: {
        //   aft: true
        // }
      }),
    }
  );

  const parsedPayload = await request.json();

  res.status(request.status).send(parsedPayload);
});

app.listen(3000, () =>
  console.log("Node server listening on port 3000: http://localhost:3000/")
);

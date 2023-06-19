import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;
const stripe = Stripe(SECRET_KEY);

const payment = async (req, res) => {
  const { price, cardNo, expMonth, expYear, cvc } = req.body;
  console.log(cardNo, expMonth, expYear, cvc);

  if (!price || !cardNo || !expMonth || !expYear || !cvc) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    // Create a payment method using the Stripe API
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNo,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: 'pkr',
      payment_method: paymentMethod.id,
      confirm: true,
    });

    console.log(paymentIntent);

    // Return a success response
    res.status(201).json({
      success: true,
      message: 'Payment succeeded',
      paymentURL: paymentIntent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default payment;

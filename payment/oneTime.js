import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;
const stripe = Stripe(SECRET_KEY);

const payment = async (req, res) => {
  try {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/cancel',
    });
    // Return a success response
    res.status(201).json({
      success: true,
      message: 'Payment succeeded',
      paymentURL: session.url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default payment;

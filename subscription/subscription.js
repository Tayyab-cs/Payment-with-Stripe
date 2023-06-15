import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;
const stripe = Stripe(SECRET_KEY);

const subscription = async (req, res) => {
  const { email, packageName } = req.body;

  try {
    let result;

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({ email });

    // Create a product in Stripe
    if (packageName === 'Basic') {
      const product = await stripe.products.create({
        name: 'Basic',
      });

      // Create a price in Stripe
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 250 * 100,
        currency: 'pkr',
        recurring: {
          interval: 'month',
        },
      });

      // Create a subscription in Stripe
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      result = subscription;
    } else if (packageName === 'Standard') {
      const product = await stripe.products.create({
        name: 'Standard',
      });

      // Create a price in Stripe
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 450,
        currency: 'pkr',
        recurring: {
          interval: 'month',
        },
      });
      // Create a subscription in Stripe
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      result = subscription;
    } else if (packageName === 'Premium') {
      const product = await stripe.products.create({
        name: 'Premium',
      });

      // Create a price in Stripe
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 850,
        currency: 'pkr',
        recurring: {
          interval: 'month',
        },
      });

      // Create a subscription in Stripe
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
      });

      result = subscription;
    }

    // Return the subscription object as a response
    res.status(201).json({
      success: true,
      message: 'you subscribed successfully.',
      invoiceUrl: result.latest_invoice.hosted_invoice_url,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the subscription' });
  }
};

export default subscription;

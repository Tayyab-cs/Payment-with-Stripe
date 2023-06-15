import express from 'express';
import payment from '../payment/oneTime.js';
import subscription from '../subscription/subscription.js';

const route = express.Router();

// One Time Payment...
route.post('/payment', payment);

// Subscription...
route.post('/subscription', subscription);

export default route;

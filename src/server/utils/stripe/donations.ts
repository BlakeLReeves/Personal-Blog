import * as stripeLoader from 'stripe';
import config from '../../config';

const stripe = new stripeLoader(config.stripe.sk_key);

const charge = (token: string, amt: number ) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Statement Description'
    });
};

export { charge };
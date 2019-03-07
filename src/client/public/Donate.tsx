import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from './Form';

export interface IDonateProps { }

export interface IDonateState { }

export default class Donate extends React.Component<IDonateProps, IDonateState> {
    render() {
        return (
            <>
                <StripeProvider apiKey="pk_test_cErHQ9pofSzrilfYTpxXOoYO">
                    <Elements>
                        <Form />
                    </Elements>
                </StripeProvider>
            </>
        );
    }
}
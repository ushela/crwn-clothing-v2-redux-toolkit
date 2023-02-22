import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import  {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsprocessingPayment] = useState(false);

    const PaymentHandler = async(e) => {
        e.preventDefault();
        
        if(!stripe || !elements){
            return;
        }
        
        setIsprocessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100}),
            
        }).then(res => res.json())

            // const clientSecret = response.paymentIntent.client_secret
            //or 
            const {paymentIntent: {client_secret}} = response;
            console.log(client_secret)
            //confirm card payment is the method specific for cards
            //second argument is configuration object
            const paymentResult = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser ? currentUser.displayName : 'Guest'
                    },
                },
            });
            setIsprocessingPayment(false)

           if(paymentResult.error) {
            alert(paymentResult.error)
           } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
               alert('payment successful') 
            }
           }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={PaymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                    <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                        Pay Now 
                    </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm
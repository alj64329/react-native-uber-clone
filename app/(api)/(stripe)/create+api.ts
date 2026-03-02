import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:Request) {
    const body = await req.json()
    const {name, email, amount}= body

    if(!name || !email || !amount){
        return new Response(JSON.stringify({error:"please enter email", status:400}))
    }

    let customer;
    const existingCustomer = await stripe.customers.list({email})

    if(existingCustomer.data.length > 0){
        customer= existingCustomer.data[0]
    }else{
        const newCustomer = await stripe.customers.create({
            name, email
        })

        customer=newCustomer
    }
      const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      mobile_payment_element: {
        enabled: true,
        features: {
          payment_method_save: 'enabled',
          payment_method_redisplay: 'enabled',
          payment_method_remove: 'enabled'
        }
      },
    },
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount)*100,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects:'never'
    },
  });

  return new Response(JSON.stringify({
    paymentIntent: paymentIntent.client_secret,
    customerSessionClientSecret: customerSession.client_secret,
    customer: customer.id,
  }));
}

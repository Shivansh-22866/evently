import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature')
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  // Early validation of required values
  if (!sig || !endpointSecret) {
    console.error('Missing stripe-signature or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json(
      { message: 'Missing required webhook parameters' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { message: 'Webhook signature verification failed', error: err },
      { status: 401 }
    )
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object as Stripe.Checkout.Session

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    }

    try {
      const newOrder = await createOrder(order)
      return NextResponse.json({ message: 'OK', order: newOrder })
    } catch (error) {
      console.error('Error creating order:', error)
      return NextResponse.json(
        { message: 'Error creating order', error },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ message: 'OK' }, { status: 200 })
}
import stripe
from fastapi import APIRouter, HTTPException, Request, Header
from backend.core.config import settings
from pydantic import BaseModel

stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()

class CheckoutRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str
    mode: str = "payment" # payment or subscription

@router.post("/create-checkout-session")
def create_checkout_session(req: CheckoutRequest):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': req.price_id,
                'quantity': 1,
            }],
            mode=req.mode,
            success_url=req.success_url,
            cancel_url=req.cancel_url,
        )
        return {"sessionId": session.id, "url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()
    endpoint_secret = "whsec_..." # Should be in settings

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, endpoint_secret
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Fulfill the purchase...
        print(f"Payment successful for session {session['id']}")

    return {"status": "success"}

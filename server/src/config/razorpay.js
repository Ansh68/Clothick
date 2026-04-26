import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config(); // load .env before reading process.env

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId) throw new Error('RAZORPAY_KEY_ID is not set');
if (!keySecret) throw new Error('RAZORPAY_KEY_SECRET is not set');

const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

export default razorpay;
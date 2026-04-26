import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const faqsData = [
  {
    question: 'How do I place an order on Clothick?',
    answer:
      'Browsing and buying is simple — find a product you love, click "Add to Cart", review your cart, and proceed to checkout. You\'ll need to sign in and have a saved delivery address to complete your purchase. Payment is processed securely so you can shop with confidence.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'For orders within Delhi NCR (Delhi, Gurgaon, Noida), we typically deliver within 2–4 business days. We process and dispatch every order within 24 hours of placement, and you\'ll receive tracking updates along the way so you always know where your package is.',
  },
  {
    question: 'What is your return and refund policy?',
    answer:
      'We want you to love what you buy. If something doesn\'t work out, you can initiate a return within 7 days of delivery — no questions asked. Once we receive the item back in its original condition, your refund will be processed within 5–7 business days. It\'s hassle-free, because shopping should be stress-free.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'We accept all major payment methods including credit cards, debit cards, UPI, net banking, and popular wallets. All transactions are encrypted and processed through secure payment gateways, so your financial information is always protected.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is dispatched, you\'ll receive a confirmation email with a tracking link. You can also check your order status anytime by visiting the "Orders" page in your account. We update tracking information in real-time so you\'re never left guessing.',
  },
  {
    question: 'Can I change or cancel my order after placing it?',
    answer:
      'We move fast to get your order to you, but if you need to make changes, reach out to us at support@clothick.com within 2 hours of placing your order. Once an order has been dispatched, we won\'t be able to modify it — but you can always initiate a return after delivery.',
  },
  {
    question: 'Is my personal and payment information secure?',
    answer:
      'Absolutely. Security is something we take very seriously. All data is encrypted using industry-standard SSL technology, and we never store your complete card details on our servers. Your privacy and safety are our top priority — always.',
  },
  {
    question: 'Do you offer discounts or promotional codes?',
    answer:
      'Yes! We regularly run seasonal sales and exclusive offers. The best way to stay in the loop is to follow us on social media and keep an eye on the "Offers" section on our site. We also send special discount codes to our loyal customers — so the more you shop, the more you save.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className={`border border-gray-200 rounded-xl transition-shadow duration-300 ${isOpen ? 'shadow-sm' : ''
        }`}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-4 w-full text-left p-5 md:p-6"
      >
        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
          {index + 1}
        </span>
        <span className="flex-1 font-semibold text-sm md:text-base text-gray-900">
          {faq.question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[72px]">
          <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <Container className="py-14 md:py-20 text-center">
          <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-7 h-7 text-gray-600" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Support
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            Can't find what you're looking for? Browse below or{' '}
            <Link
              to="/contact"
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-black"
            >
              reach our support team
            </Link>{' '}
            directly.
          </p>
        </Container>
      </div>

      {/* FAQ Items */}
      <div className="bg-gray-50">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqsData.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Still have questions? */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm">
                  Still have questions?
                </h3>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                  Our support team is available Monday–Friday, 9am–6pm. We typically
                  respond within 2 hours.
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-900 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

import {
  Eye,
  Database,
  Share2,
  Cookie,
  Lock,
  UserX,
  Bell,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content:
      'When you use Clothick, we collect information you provide directly — such as your name, email address, shipping address, and payment details during checkout. We also collect certain data automatically, including your IP address, browser type, device information, and browsing behaviour on our platform to improve your shopping experience.',
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content:
      'We use your personal information to process orders, manage your account, provide customer support, and send you order updates. We may also use it to personalise your shopping experience, recommend products, detect fraud, and improve the overall performance of our platform. We will never sell your data to third parties for marketing purposes.',
  },
  {
    icon: Share2,
    title: 'Information Sharing',
    content:
      'We share your information only with trusted partners who help us operate our business — including payment processors, shipping carriers, and cloud service providers. These partners are contractually obligated to protect your data. We may also disclose information if required by law or to protect the rights and safety of Clothick and its users.',
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    content:
      'Clothick uses cookies and similar technologies to remember your preferences, keep you logged in, analyse site traffic, and deliver a more personalised experience. You can manage your cookie preferences through your browser settings at any time. Disabling cookies may affect certain features of the platform.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content:
      'We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmission, secure payment processing, and regular security audits. While no system is entirely immune to breaches, we continuously work to safeguard your data against unauthorised access, alteration, or destruction.',
  },
  {
    icon: UserX,
    title: 'Your Rights',
    content:
      'You have the right to access, correct, or delete your personal information at any time by contacting us at support@clothick.com. You can also opt out of marketing communications, request a copy of the data we hold about you, or ask us to restrict how we process your information. We will respond to all valid requests within 30 days.',
  },
  {
    icon: Bell,
    title: 'Communication Preferences',
    content:
      'By creating an account, you may receive transactional emails related to your orders and account activity. You can opt in to receive promotional emails, sale alerts, and new arrival notifications. You may unsubscribe from marketing emails at any time using the link provided in each email — order-related emails cannot be opted out of.',
  },
  {
    icon: ShieldCheck,
    title: 'Policy Updates',
    content:
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you via email or a prominent notice on our website. Your continued use of Clothick after such changes constitutes your acceptance of the updated policy.',
  },
];

export default function Privacy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            Your privacy matters to us. This policy explains what data we collect, how we use it, and how we keep it safe.
          </p>
        </Container>
      </div>

      {/* Sections */}
      <div className="bg-gray-50">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto space-y-4">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        Section {String(i + 1).padStart(2, '0')}
                      </p>
                      <h2 className="text-lg font-bold text-gray-900 mb-3">
                        {section.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">
                Have questions about your privacy?{' '}
                <Link
                  to="/contact"
                  className="font-semibold text-gray-900 underline underline-offset-2 hover:text-black"
                >
                  Reach out to our team
                </Link>{' '}
                — we're transparent about everything.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

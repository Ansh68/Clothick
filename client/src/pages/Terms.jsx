import {
  FileText,
  AlertCircle,
  Scale,
  ShieldOff,
  RotateCcw,
  Globe,
  Truck,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content:
      'By accessing or using Clothick\'s website, mobile app, or any of our services, you agree to be bound by these Terms and Conditions in full. If you do not agree with any part, please discontinue use immediately. We may update these terms at any time — continued use after changes constitutes acceptance.',
  },
  {
    icon: AlertCircle,
    title: 'Use of Services',
    content:
      'You agree to use Clothick\'s services solely for lawful purposes. You must not use our platform to engage in any fraudulent activity, transmit harmful content, attempt unauthorised access, or violate any applicable law or regulation. Violations may result in immediate account termination.',
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content:
      'All content, branding, graphics, logos, text, and software on Clothick are the exclusive property of Clothick or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.',
  },
  {
    icon: ShieldOff,
    title: 'Limitation of Liability',
    content:
      'To the maximum extent permitted by law, Clothick shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from your use of, or inability to use, our services, even if we have been advised of the possibility of such damages.',
  },
  {
    icon: RotateCcw,
    title: 'Returns & Refunds',
    content:
      'Products may be returned within 7 days of delivery in their original condition. Refunds are processed within 5–7 business days after we receive and inspect the returned item. Items marked as non-returnable, undergarments, and personalised products are excluded from this policy.',
  },
  {
    icon: Globe,
    title: 'Governing Law',
    content:
      'These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.',
  },
  {
    icon: Truck,
    title: 'Shipping & Delivery',
    content:
      'We currently deliver across Delhi NCR including Delhi, Gurgaon, and Noida. Estimated delivery times are 2–4 business days from the date of dispatch. Clothick is not responsible for delays caused by courier partners, natural disasters, or circumstances beyond our control.',
  },
  {
    icon: UserCheck,
    title: 'Account Responsibility',
    content:
      'You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. If you suspect unauthorised access, please contact us immediately at support@clothick.com. We reserve the right to suspend accounts that violate these terms.',
  },
];

export default function Terms() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            Please read these terms carefully before using our services. By using Clothick, you agree to these terms.
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
                Questions about our terms?{' '}
                <Link
                  to="/contact"
                  className="font-semibold text-gray-900 underline underline-offset-2 hover:text-black"
                >
                  Contact our support team
                </Link>{' '}
                — we're happy to clarify anything.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import Container from '../components/Container';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's start a
              <br />
              <span className="italic">conversation</span>
            </h1>
            <p className="text-gray-500 mt-5 leading-relaxed max-w-md">
              Whether you have a question about features, orders, pricing, or
              anything else, our team is ready to answer all your questions.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Chat to us</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    ankit.b@clothick.io1.in
                  </p>
                </div>
              </div>

              {/* Office Card */}
              <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Office</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    Uttam Nagar, Delhi, DL
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Call us</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    Mon–Fri, 9am–6pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Your Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-60"
              >
                {sending ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

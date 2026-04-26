import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { background: '#151515', color: '#fff' } }}
      />
    </div>
  );
}

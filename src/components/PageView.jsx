import ServicesPage from '../pages/ServicesPage';
import AboutPage from '../pages/AboutPage';
import PortfolioPage from '../pages/PortfolioPage';
import ContactPage from '../pages/ContactPage';

export default function PageView({ name, onGo, onSend }) {
    switch (name) {
        case 'Services':
            return <ServicesPage />;
        case 'About Us':
            return <AboutPage />;
        case 'Portfolio':
            return <PortfolioPage onGo={onGo} />;
        case 'Contact Us':
            return <ContactPage onSend={onSend} />;
        default:
            return null;
    }
}

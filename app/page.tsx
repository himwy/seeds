import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  FaShieldAlt,
  FaGraduationCap,
  FaMoneyBillWave,
  FaMedkit,
  FaPlane,
  FaHeart,
} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/Lee_Garden 5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Secure Your Financial Future
            </h1>
            <p className="text-xl text-white mb-8">
              Professional financial advisory services to help you achieve your
              goals and secure your future needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/services" className="btn-primary text-center">
                Explore Our Services
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={300}
                height={300}
                className="mx-auto md:mx-0"
              />
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                About Seeds Financial Group
              </h2>
              <p className="text-dark-gray mb-6">
                Seeds Financial Group is in partnership with one of the
                world&apos;s largest financial groups provides advisory services
                using a wide range of risk management, strategy and asset
                allocation plans, enabling our clients to achieve their
                financial goals and future needs.
              </p>
              <p className="text-dark-gray mb-6">
                No matter what age a person is, as long as he/she has
                enthusiasm, we believe that he/she is a &apos;seed&apos; full of
                hope for growth. We will try our best to provide them
                opportunities and nurture them carefully to turn them into a
                strong tree.
              </p>
              <Link href="/about" className="btn-primary inline-block">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Our Financial Services
            </h2>
            <p className="text-dark-gray max-w-3xl mx-auto">
              We offer a comprehensive range of financial services to help you
              protect what matters most and plan for a secure future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Critical Illness Protection */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Critical Illness Protection
              </h3>
              <p className="text-dark-gray mb-4">
                Critical illness can strike when you least expect it, placing a
                heavy financial burden on the whole family. With life expectancy
                rising, there is now an even greater chance of suffering
                multiple critical illnesses in a lifetime.
              </p>
              <Link
                href="/services/critical-illness"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Education Plan */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaGraduationCap className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Education Plan
              </h3>
              <p className="text-dark-gray mb-4">
                Education Plan is designed with a specific goal in mind –
                financing your child&apos;s higher education. The plan offers
                short premium payment terms, opportunities for growth and
                guaranteed cash payments when your child reaches university age.
              </p>
              <Link
                href="/services/education"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Annuity Plan */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaMoneyBillWave className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Annuity Plan
              </h3>
              <p className="text-dark-gray mb-4">
                A stable guaranteed annuity income stream that you can rely on
                for your retirement is a must. Our annuity plans are designed to
                provide financial security during your retirement years.
              </p>
              <Link
                href="/services/annuity"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Medical Protection */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaMedkit className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Medical Protection
              </h3>
              <p className="text-dark-gray mb-4">
                In view of rising medical expenses, it is important for you and
                your family to have adequate hospitalisation protection. Your
                family responsibilities remain even as you progress with your
                career.
              </p>
              <Link
                href="/services/medical"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Travel Insurance */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaPlane className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Travel Insurance
              </h3>
              <p className="text-dark-gray mb-4">
                A world of adventure is out there, waiting to be explored. Take
                iTravel Protect with you for worldwide travel protection that
                covers all your essential needs, with optional benefits to suit
                your own itinerary.
              </p>
              <Link
                href="/services/travel"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Life Insurance */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Life Insurance
              </h3>
              <p className="text-dark-gray mb-4">
                Life is unpredictable. As a breadwinner, you will always worry
                about the wellbeing of your family when mishap unexpectedly
                happens. Our life insurance plans provide financial security for
                your loved ones.
              </p>
              <Link
                href="/services/life"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Offer Section */}
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold mb-4">IIQE Exam Discount</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Great news! You have the chance to register for the IIQE exam with a
            huge 50% discount. Don&apos;t let this opportunity slip away—save
            big and take your career to the next level.
          </p>
          <Link
            href="/iiqe"
            className="bg-accent hover:bg-opacity-90 transition-colors text-dark-gray font-bold py-3 px-8 rounded-md inline-block"
          >
            Register for IIQE Exam
          </Link>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Ready to Secure Your Financial Future?
              </h2>
              <p className="text-dark-gray mb-6">
                Our team of financial advisors is ready to help you achieve your
                financial goals. Contact us today to schedule a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary inline-block">
                  Contact Us
                </Link>
                <a
                  href="tel:85255304114"
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center"
                >
                  Call Us: (852) 5530-4114
                </a>
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  Service Hours
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>8:30 am to 5:30 pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>9:00 am to 12:00 pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Evenings:</span>
                    <span>By appointment</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-dark-gray">
                    <strong>Address:</strong> Caroline Centre, Lee Gardens Two,
                    28, Yun Ping Road, Causeway Bay, Hong Kong
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

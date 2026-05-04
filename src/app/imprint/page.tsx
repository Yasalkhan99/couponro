import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Imprint",
  description:
    "Legal disclosure and publisher information for SeemPromo: operator details, contact, and regulatory notices.",
};

export default function ImprintPage() {
  return (
    <div className="min-h-screen w-full min-w-0 bg-white flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-6 lg:py-8">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">
            SeemPromo
          </Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-700 font-medium">Imprint</span>
        </nav>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Imprint</h1>
          <p className="text-sm text-gray-500 mb-8">
            Legal disclosure (Angaben gemäß Informationspflichten / transparency information for this website).
          </p>

          <section className="mb-8 rounded-xl border border-gray-200 bg-gray-50/80 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Service provider</h2>
            <dl className="space-y-4 text-gray-700 text-sm sm:text-base">
              <div>
                <dt className="font-semibold text-gray-900">Website / brand</dt>
                <dd className="mt-1">SeemPromo</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Operator (publisher)</dt>
                <dd className="mt-1 leading-relaxed">
                  The website and editorial content are operated by the SeemPromo team. If you need a
                  registered company name, commercial register entry, or full postal address for legal
                  correspondence, please reach out via our{" "}
                  <Link href="/contact" className="text-[#34C759] hover:underline font-medium">
                    contact page
                  </Link>
                  — we will provide statutory details where required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Postal address</dt>
                <dd className="mt-1 leading-relaxed">
                  For formal notices and written correspondence, use the address confirmed in your
                  reply after contacting us through{" "}
                  <Link href="/contact" className="text-[#34C759] hover:underline font-medium">
                    Contact Us
                  </Link>
                  . (Publish your full business address here when operating as a registered entity.)
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Electronic contact</dt>
                <dd className="mt-1">
                  Please use the{" "}
                  <Link href="/contact" className="text-[#34C759] hover:underline font-medium">
                    contact form
                  </Link>{" "}
                  for inquiries, takedown requests, and partnership questions. We aim to respond within
                  a reasonable business timeframe.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Responsible for content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The party responsible for editorial content on this site within the meaning of applicable
              media and telemedia laws is the SeemPromo operator named above. For content-related
              objections, please contact us via the{" "}
              <Link href="/contact" className="text-[#34C759] hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Nature of the service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SeemPromo publishes information about coupons, promotional codes, and deals from third-party
              merchants. Offers are subject to change by the respective merchant. We do not process
              purchases on your behalf; contracts for goods or services are concluded solely between you
              and the merchant.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Liability for links</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our pages may contain links to external websites operated by third parties. We have no
              influence over their content. The respective provider is responsible for the content of
              linked pages. Unlawful content was not recognizable at the time of linking. Should we
              become aware of legal violations, we will remove such links promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Affiliate disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SeemPromo may earn a commission when you use certain links or codes and complete a
              qualifying purchase. This does not increase the price you pay. Further information is
              described on our{" "}
              <Link href="/about" className="text-[#34C759] hover:underline">
                About
              </Link>{" "}
              page and in our{" "}
              <Link href="/terms" className="text-[#34C759] hover:underline">
                Terms of Use
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Consumer information (EU)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#34C759] hover:underline break-all"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . We are not obliged to participate in dispute resolution before a consumer arbitration
              board, nor are we currently willing to do so unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Copyright</h2>
            <p className="text-gray-600 leading-relaxed">
              Text, layout, and graphics created by SeemPromo are protected by copyright. Logos and
              trademarks of third-party stores belong to their respective owners and are used for
              identification only.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

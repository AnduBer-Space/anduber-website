import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-plum-900">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.15) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 text-center px-6">
        <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">Page Not Found</p>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-cream-200 mb-6">404</h1>
        <p className="text-lg text-cream-300 max-w-md mx-auto mb-10">
          The page you are looking for does not exist or has been moved. Let us guide you back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-medium rounded-full px-8 py-4 text-lg bg-gold-400 text-plum-900 hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(212,170,106,0.25)] transition-all duration-300 active:scale-95"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center font-medium rounded-full px-8 py-4 text-lg border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-plum-900 transition-all duration-300 active:scale-95"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

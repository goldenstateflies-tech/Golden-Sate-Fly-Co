import Layout from "@/components/Layout";

export default function Shop() {
  return (
    <Layout>
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl">🛍️</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Shop Coming Soon
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Our shop is being stocked with premium pieces. Keep prompting to add more content to this page!
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

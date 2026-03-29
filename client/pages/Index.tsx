import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

export default function Index() {
  const featuredProducts = [
    {
      id: 1,
      name: "Golden State Hoodie",
      price: "$89.99",
      image: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      badge: "New",
    },
    {
      id: 2,
      name: "Premium Tee",
      price: "$49.99",
      image: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      badge: "Featured",
    },
    {
      id: 3,
      name: "Cargo Pants",
      price: "$129.99",
      image: "linear-gradient(135deg, #d4af37 0%, #b8960f 100%)",
      badge: "Sale",
    },
    {
      id: 4,
      name: "Fly Cap",
      price: "$39.99",
      image: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      badge: null,
    },
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      text: "The quality is insane. Golden State Fly Co. is my new go-to brand.",
      rating: 5,
    },
    {
      name: "Jordan Smith",
      text: "Perfect fit, amazing style. Every piece feels premium.",
      rating: 5,
    },
    {
      name: "Casey Chen",
      text: "Love the attention to detail. This is authentic streetwear.",
      rating: 5,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-medium text-primary">✨ New Collection Available</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Golden State
                <span className="block text-primary">Fly Co.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Premium streetwear crafted for those who dare to stand out. Inspired by California's vibrant culture, elevated by meticulous craftsmanship.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="animate-slide-up relative h-96 md:h-full">
              <div
                className="absolute inset-0 rounded-2xl shadow-2xl opacity-90"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                }}
              />
              <div className="absolute inset-4 bg-white/10 rounded-xl backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most sought-after pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className="relative h-64 rounded-xl mb-4 overflow-hidden"
                  style={{ background: product.image }}
                >
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">
            Why Choose Golden State Fly Co.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Premium Quality</h3>
              <p className="text-secondary-foreground/80">
                Crafted with the finest materials and attention to detail
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Sustainable</h3>
              <p className="text-secondary-foreground/80">
                Eco-conscious production methods and ethical sourcing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Fast Shipping</h3>
              <p className="text-secondary-foreground/80">
                Quick delivery to get you looking fresh faster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Loved by Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
              Join the Crew
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Get exclusive drops, early access to new collections, and insider updates
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-primary-foreground/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

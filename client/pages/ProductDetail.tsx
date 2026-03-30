import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/contexts/ProductsContext";
import Layout from "@/components/Layout";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const productImages = {
  "Parachute Adams": "linear-gradient(135deg, #8B7355 0%, #654321 100%)",
  "Elk Hair Caddis": "linear-gradient(135deg, #CD853F 0%, #A0522D 100%)",
  "Woolly Bugger Assortment": "linear-gradient(135deg, #2F4F4F 0%, #1C1C1C 100%)",
  "Royal Wulff Pack": "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const defaultImages: { [key: string]: string } = {
    ...productImages,
  };

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <section className="py-20 md:py-32 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">❌</span>
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Product Not Found
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                The product you're looking for doesn't exist.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Shop
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Combine main image with gallery
  const allImages = product.image
    ? [product.image, ...(product.gallery || [])]
    : product.gallery || [];

  const hasImages = allImages.length > 0;
  const currentImage = hasImages ? allImages[selectedImageIndex] : null;

  const nextImage = () => {
    if (hasImages) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                {hasImages ? (
                  <>
                    <div
                      className="relative w-full aspect-square rounded-xl overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage: currentImage
                          ? `url(${currentImage})`
                          : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100"/></svg>')`,
                        backgroundColor: defaultImages[product.name],
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6 text-foreground" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6 text-foreground" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/80 rounded-full text-sm font-semibold text-foreground">
                        {selectedImageIndex + 1} / {allImages.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center text-6xl"
                    style={{
                      backgroundColor: defaultImages[product.name],
                    }}
                  >
                    📷
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badge & Title */}
              <div>
                {product.badge && (
                  <div className="inline-block mb-3 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <span className="text-sm font-semibold text-primary">
                      {product.badge}
                    </span>
                  </div>
                )}
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
              </div>

              {/* Price & Stock */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    {product.price}
                  </span>
                  {product.stock !== undefined && (
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-border">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Description
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="pt-4">
                <button
                  disabled={product.stock === 0}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground">Fly Fishing</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SKU</p>
                  <p className="font-semibold text-foreground font-mono">
                    {product.id}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="pt-4 border-t border-border space-y-3">
                <h3 className="font-display font-semibold text-foreground">
                  Why Choose This Fly
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Hand-tied with premium materials</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Expert craftsmanship by experienced tier</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Proven effective on California waters</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Durable construction for repeated use</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 md:py-32 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold text-foreground mb-12">
            More Flies You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div
                    className="relative h-48 rounded-xl mb-3 overflow-hidden bg-cover bg-center"
                    style={{
                      backgroundImage: p.image
                        ? `url(${p.image})`
                        : "none",
                      backgroundColor: defaultImages[p.name],
                    }}
                  >
                    {p.badge && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                        {p.badge}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-primary font-semibold">{p.price}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

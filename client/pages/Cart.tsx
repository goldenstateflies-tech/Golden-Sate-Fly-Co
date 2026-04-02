import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/Layout";
import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-20 md:py-32 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Start adding some premium flies to your cart!
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div
                      className="w-24 h-24 rounded-lg flex-shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: item.product.image
                          ? `url(${item.product.image})`
                          : undefined,
                        backgroundColor: item.product.image
                          ? undefined
                          : "#e5e7eb",
                      }}
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-primary font-semibold mt-2">
                        {item.product.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-semibold text-foreground">
                        $
                        {(
                          parseFloat(item.product.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="font-display font-bold text-lg text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">
                      ${(totalPrice * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-display font-bold text-lg">Total</span>
                  <span className="font-display font-bold text-lg text-primary">
                    ${(totalPrice * 1.08).toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Clear Cart
                </button>

                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-foreground font-semibold hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

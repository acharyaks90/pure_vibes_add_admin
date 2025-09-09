import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useKavach } from '../../hooks/useKavach';
import { Checkout } from './Checkout';

interface CartProps {
  onBack: () => void;
}

export const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { 
    cartItems, 
    products, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    getCartTotal,
    calculateDeliveryCharge
  } = useKavach();
  
  const [showCheckout, setShowCheckout] = useState(false);

  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, cartQuantity: item.quantity } : null;
  }).filter(Boolean);

  const subtotal = getCartTotal();
  const deliveryCharge = calculateDeliveryCharge(subtotal);
  const total = subtotal + deliveryCharge;

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    await updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  if (showCheckout) {
    return (
      <Checkout
        onBack={() => setShowCheckout(false)}
        cartItems={cartProducts}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        total={total}
      />
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart to get started</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cartProducts.length} item{cartProducts.length > 1 ? 's' : ''} in your cart</p>
          </div>
          
          {cartProducts.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <motion.div
                key={product!.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product!.images[0]}
                    alt={product!.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{product!.name}</h3>
                    <p className="text-sm text-gray-600">{product!.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">₹{product!.price}</span>
                      {product!.originalPrice && product!.originalPrice > product!.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product!.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityUpdate(product!.id, (product as any).cartQuantity - 1)}
                        disabled={(product as any).cartQuantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{(product as any).cartQuantity}</span>
                      <button
                        onClick={() => handleQuantityUpdate(product!.id, (product as any).cartQuantity + 1)}
                        disabled={(product as any).cartQuantity >= product!.stockQuantity}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(product!.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Delivery</span>
                  </div>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                
                {deliveryCharge === 0 && subtotal < 500 && (
                  <p className="text-xs text-green-600">
                    Free delivery on orders above ₹500
                  </p>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={onBack}
                className="w-full mt-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
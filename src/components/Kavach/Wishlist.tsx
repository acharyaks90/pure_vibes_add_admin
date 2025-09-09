import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useKavach } from '../../hooks/useKavach';

interface WishlistProps {
  onBack: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onBack }) => {
  const { 
    wishlistItems, 
    products, 
    removeFromWishlist, 
    addToCart 
  } = useKavach();

  const wishlistProducts = wishlistItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, wishlistId: item.id } : null;
  }).filter(Boolean);

  const handleMoveToCart = async (productId: string) => {
    await addToCart(productId);
    await removeFromWishlist(productId);
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  if (wishlistProducts.length === 0) {
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
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love for later</p>
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
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{wishlistProducts.length} item{wishlistProducts.length > 1 ? 's' : ''} saved</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product!.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product!.images[0]}
                  alt={product!.name}
                  className="w-full h-48 object-cover"
                />
                {product!.originalPrice && product!.originalPrice > product!.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(((product!.originalPrice - product!.price) / product!.originalPrice) * 100)}% OFF
                  </div>
                )}
                <button
                  onClick={() => handleRemoveFromWishlist(product!.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{product!.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product!.category}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">₹{product!.price}</span>
                  {product!.originalPrice && product!.originalPrice > product!.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product!.originalPrice}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleMoveToCart(product!.id)}
                    disabled={!product!.inStock}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product!.inStock ? 'Move to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(product!.id)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Package, DollarSign, TrendingUp, AlertTriangle, Image as ImageIcon, Camera } from 'lucide-react';
import { Product, ProductCategory, ImageUpload } from '../../types/kavach';

export const KavachProductAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Mock data - in a real app, this would come from your backend
    setProducts([
      {
        id: '1',
        name: 'Sacred Ganesha Yantra',
        category: 'Yantras',
        price: 299,
        originalPrice: 499,
        description: 'Authentic brass Ganesha Yantra for removing obstacles and bringing prosperity. Handcrafted by skilled artisans with traditional methods.',
        images: [
          'https://images.pexels.com/photos/8107475/pexels-photo-8107475.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/6787345/pexels-photo-6787345.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 25,
        rating: 4.5,
        reviewCount: 124,
        tags: ['Ganesha', 'Yantra', 'Prosperity', 'Brass'],
        specifications: {
          'Material': 'Brass',
          'Size': '3x3 inches',
          'Weight': '150g',
          'Origin': 'India'
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
        vendor: 'Spiritual Store Delhi',
        weight: 150,
        dimensions: { length: 7.6, width: 7.6, height: 0.5 },
        sku: 'GY001',
        barcode: '1234567890123',
        seoTitle: 'Sacred Ganesha Yantra - Remove Obstacles & Bring Prosperity',
        seoDescription: 'Authentic brass Ganesha Yantra handcrafted by skilled artisans. Perfect for removing obstacles and attracting prosperity.',
        metaKeywords: ['ganesha yantra', 'brass yantra', 'spiritual items', 'prosperity'],
      },
      {
        id: '2',
        name: 'Rudraksha Mala 108 Beads',
        category: 'Malas',
        price: 899,
        originalPrice: 1199,
        description: 'Original 5 Mukhi Rudraksha mala for meditation and spiritual growth. Each bead is carefully selected and blessed.',
        images: [
          'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 15,
        rating: 4.8,
        reviewCount: 87,
        tags: ['Rudraksha', 'Meditation', 'Mala', '108 Beads'],
        specifications: {
          'Beads': '108',
          'Type': '5 Mukhi',
          'Size': '6-7mm',
          'Thread': 'Cotton'
        },
        isActive: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-16'),
        vendor: 'Sacred Items Mumbai',
        weight: 50,
        sku: 'RM108',
      },
    ]);

    setCategories([
      { id: '1', name: 'Yantras', description: 'Sacred geometric symbols', isActive: true, order: 1 },
      { id: '2', name: 'Malas', description: 'Prayer beads and rosaries', isActive: true, order: 2 },
      { id: '3', name: 'Idols', description: 'Divine statues and figurines', isActive: true, order: 3 },
      { id: '4', name: 'Books', description: 'Spiritual literature', isActive: true, order: 4 },
      { id: '5', name: 'Incense', description: 'Aromatic spiritual items', isActive: true, order: 5 },
      { id: '6', name: 'Crystals', description: 'Healing crystals and stones', isActive: true, order: 6 },
    ]);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && product.isActive) ||
      (statusFilter === 'inactive' && !product.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updatedAt: new Date() }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productData.name || '',
        category: productData.category || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        description: productData.description || '',
        images: productData.images || [],
        inStock: productData.inStock ?? true,
        stockQuantity: productData.stockQuantity || 0,
        rating: 0,
        reviewCount: 0,
        tags: productData.tags || [],
        specifications: productData.specifications || {},
        isActive: productData.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
        vendor: productData.vendor,
        weight: productData.weight,
        dimensions: productData.dimensions,
        sku: productData.sku,
        barcode: productData.barcode,
        seoTitle: productData.seoTitle,
        seoDescription: productData.seoDescription,
        metaKeywords: productData.metaKeywords,
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, isActive: !p.isActive, updatedAt: new Date() }
        : p
    ));
  };

  const ImageUploadComponent = ({ images, onImagesChange }: { images: string[], onImagesChange: (images: string[]) => void }) => {
    const [uploadingImages, setUploadingImages] = useState<ImageUpload[]>([]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const imageUpload: ImageUpload = {
            id: Date.now().toString() + Math.random(),
            file,
            url: URL.createObjectURL(file),
            isUploading: true,
            uploadProgress: 0,
          };
          
          setUploadingImages(prev => [...prev, imageUpload]);
          
          // Simulate upload progress
          const interval = setInterval(() => {
            setUploadingImages(prev => prev.map(img => 
              img.id === imageUpload.id 
                ? { ...img, uploadProgress: Math.min(img.uploadProgress + 10, 100) }
                : img
            ));
          }, 200);
          
          // Complete upload after 2 seconds
          setTimeout(() => {
            clearInterval(interval);
            setUploadingImages(prev => prev.filter(img => img.id !== imageUpload.id));
            onImagesChange([...images, imageUpload.url]);
          }, 2000);
        }
      });
    };

    const removeImage = (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
      const newImages = [...images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      onImagesChange(newImages);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            <Camera className="w-4 h-4 mr-2" />
            Add Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, index - 1)}
                    className="p-1 bg-white text-gray-700 rounded hover:bg-gray-100"
                    title="Move Left"
                  >
                    ←
                  </button>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, index + 1)}
                    className="p-1 bg-white text-gray-700 rounded hover:bg-gray-100"
                    title="Move Right"
                  >
                    →
                  </button>
                )}
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
          
          {uploadingImages.map((upload) => (
            <div key={upload.id} className="relative">
              <img
                src={upload.url}
                alt="Uploading"
                className="w-full h-32 object-cover rounded-lg border border-gray-200 opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-lg p-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${upload.uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center">{upload.uploadProgress}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {images.length === 0 && uploadingImages.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No images uploaded yet</p>
            <p className="text-sm text-gray-400">Click "Add Images" to upload product photos</p>
          </div>
        )}
      </div>
    );
  };

  const ProductForm = ({ product, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      category: '',
      price: 0,
      originalPrice: 0,
      description: '',
      images: [],
      stockQuantity: 0,
      tags: [],
      specifications: {},
      isActive: true,
      vendor: '',
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      sku: '',
      barcode: '',
      seoTitle: '',
      seoDescription: '',
      metaKeywords: [],
    });

    const [activeFormTab, setActiveFormTab] = useState<'basic' | 'images' | 'seo' | 'inventory'>('basic');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    const handleSpecificationChange = (key: string, value: string) => {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [key]: value
        }
      });
    };

    const addSpecification = () => {
      const key = prompt('Enter specification name:');
      if (key) {
        handleSpecificationChange(key, '');
      }
    };

    const removeSpecification = (key: string) => {
      const newSpecs = { ...formData.specifications };
      delete newSpecs[key];
      setFormData({ ...formData, specifications: newSpecs });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'images', label: 'Images' },
                { id: 'inventory', label: 'Inventory & Specs' },
                { id: 'seo', label: 'SEO & Marketing' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeFormTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeFormTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                      <input
                        type="number"
                        value={formData.originalPrice || ''}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                      <input
                        type="text"
                        value={formData.vendor || ''}
                        onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.isActive ? 'active' : 'inactive'}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Spiritual, Meditation, Sacred"
                    />
                  </div>
                </div>
              )}

              {/* Images Tab */}
              {activeFormTab === 'images' && (
                <div className="space-y-6">
                  <ImageUploadComponent
                    images={formData.images}
                    onImagesChange={(images) => setFormData({ ...formData, images })}
                  />
                </div>
              )}

              {/* Inventory & Specs Tab */}
              {activeFormTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                      <input
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                      <input
                        type="text"
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
                      <input
                        type="text"
                        value={formData.barcode || ''}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
                      <input
                        type="number"
                        value={formData.weight || ''}
                        onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) || undefined })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Length (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.dimensions?.length || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          dimensions: { 
                            ...formData.dimensions, 
                            length: Number(e.target.value) || 0 
                          } 
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.dimensions?.width || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          dimensions: { 
                            ...formData.dimensions, 
                            width: Number(e.target.value) || 0 
                          } 
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">Product Specifications</label>
                      <button
                        type="button"
                        onClick={addSpecification}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Add Specification
                      </button>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(formData.specifications || {}).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={key}
                            readOnly
                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleSpecificationChange(key, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => removeSpecification(key)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeFormTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle || ''}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Optimized title for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                    <textarea
                      value={formData.seoDescription || ''}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Meta description for search results"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.metaKeywords) ? formData.metaKeywords.join(', ') : ''}
                      onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value.split(',').map(keyword => keyword.trim()) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Keywords for SEO optimization"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                <Save className="w-5 h-5 mr-2 inline" />
                Save Product
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  const getStockStatus = (product: Product) => {
    if (!product.inStock || product.stockQuantity === 0) {
      return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    } else if (product.stockQuantity <= 5) {
      return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
    } else {
      return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your spiritual merchandise catalog</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{products.filter(p => p.isActive).length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter(p => p.stockQuantity <= 5 && p.stockQuantity > 0).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Export Products
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Products ({filteredProducts.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category & SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                const discountPercentage = product.originalPrice && product.originalPrice > product.price
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          {product.images.length > 1 && (
                            <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {product.images.length}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          {product.vendor && (
                            <div className="text-xs text-blue-600">Vendor: {product.vendor}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                          {product.category}
                        </span>
                        {product.sku && (
                          <div className="text-xs text-gray-500 mt-1">SKU: {product.sku}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-xs text-gray-500">
                            <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="ml-1 text-green-600">{discountPercentage}% off</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.stockQuantity}</div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } transition-colors`}
                      >
                        {product.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {(showAddForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
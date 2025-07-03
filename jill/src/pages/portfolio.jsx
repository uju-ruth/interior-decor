import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Check, Star, Heart } from "lucide-react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";


const products = {
  furniture: [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop", 
      title: "Modern Velvet Sofa", 
      desc: "Luxurious 3-seater sofa with plush velvet upholstery", 
      price: 1299.99,
      rating: 4.8,
      reviews: 124
    },
    {
  "id": 17,
  "img": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
  "title": "Mid-Century Armchair",
  "desc": "Sleek retro-inspired armchair with walnut legs",
  "price": 349.99,
  "rating": 4.8,
  "reviews": 215
},
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop", 
      title: "Scandinavian Dining Table", 
      desc: "Solid oak dining table with minimalist design", 
      price: 899.99,
      rating: 4.9,
      reviews: 89
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop", 
      title: "Executive Office Chair", 
      desc: "Ergonomic leather office chair with lumbar support", 
      price: 459.99,
      rating: 4.7,
      reviews: 203
    },
    {
      id: 10,
      img: "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop",
      title: "Modern Coffee Table",
      desc: "Glass-top coffee table with steel frame",
      price: 329.99,
      rating: 4.6,
      reviews: 67
    },
    {
      id: 11,
      img: "https://images.unsplash.com/photo-1571898670119-e6c3b8e0e5c7?w=500&h=400&fit=crop",
      title: "Luxury Bedroom Set",
      desc: "Complete bedroom furniture with premium finish",
      price: 1899.99,
      rating: 4.9,
      reviews: 45
    },
    {
  "id": 20,
  "img": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop",
  "title": "Industrial Coffee Table",
  "desc": "Metal-frame table with reclaimed wood top",
  "price": 289.99,
  "rating": 4.7,
  "reviews": 156
},
  ],
  curtains: [
    { 
      id: 4, 
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=400&fit=crop", 
      title: "Luxury Silk Drapes", 
      desc: "Premium silk curtains with blackout lining", 
      price: 189.99,
      rating: 4.6,
      reviews: 67
    },
    {
  "id": 19,
  "img": "https://images.unsplash.com/photo-1600444551489-5c9c3680a8e8?w=500&h=400&fit=crop",
  "title": "Blackout Velvet Curtains",
  "desc": "Luxury thermal curtains for complete darkness",
  "price": 119.99,
  "rating": 4.9,
  "reviews": 178
},
    { 
      id: 5, 
      img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop", 
      title: "Bohemian Sheer Panels", 
      desc: "Flowing sheer curtains with embroidered patterns", 
      price: 79.99,
      rating: 4.4,
      reviews: 156
    },
    { 
      id: 6, 
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=400&fit=crop", 
      title: "Modern Geometric Blinds", 
      desc: "Contemporary window treatment with smart integration", 
      price: 299.99,
      rating: 4.8,
      reviews: 92
    },
    {
      id: 12,
      img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&h=400&fit=crop",
      title: "Velvet Blackout Curtains",
      desc: "Rich velvet curtains for complete light blocking",
      price: 149.99,
      rating: 4.7,
      reviews: 89
    },
    {
  "id": 16,
  "img": "https://images.unsplash.com/photo-1551649001-7a2485550fa1?w=500&h=400&fit=crop",
  "title": "Sheer Linen Curtains",
  "desc": "Light-filtering curtains for an airy, elegant look",
  "price": 89.99,
  "rating": 4.7,
  "reviews": 134
},
    {
      id: 13,
      img: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=400&fit=crop",
      title: "Linen Natural Drapes",
      desc: "Organic linen curtains for a natural look",
      price: 119.99,
      rating: 4.5,
      reviews: 134
    }
  ],
  rugs: [
    { 
      id: 7, 
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop", 
      title: "Persian Vintage Rug", 
      desc: "Hand-woven vintage Persian rug with traditional patterns", 
      price: 549.99,
      rating: 4.9,
      reviews: 78
    },
    {
  "id": 18,
  "img": "https://images.unsplash.com/photo-1603486003622-209dd6a1ec1f?w=500&h=400&fit=crop",
  "title": "Minimalist Neutral Rug",
  "desc": "Soft, textured rug in calming beige tones",
  "price": 229.99,
  "rating": 4.5,
  "reviews": 93
},
{
  "id": 15,
  "img": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&h=400&fit=crop",
  "title": "Bohemian Pattern Rug",
  "desc": "Handwoven boho-style rug with intricate patterns",
  "price": 199.99,
  "rating": 4.4,
  "reviews": 87
},
{
  "id": 21,
  "img": "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=400&fit=crop",
  "title": "Geometric Moroccan Rug",
  "desc": "Authentic hand-knotted wool rug with bold diamond patterns",
  "price": 349.99,
  "rating": 4.8,
  "reviews": 124
},
{
  "id": 22,
  "img": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&h=400&fit=crop",
  "title": "Vintage Persian Rug",
  "desc": "Classic red-and-blue Persian design, 100% wool",
  "price": 499.99,
  "rating": 4.9,
  "reviews": 231
},
{
  "id": 23,
  "img": "https://images.unsplash.com/photo-1603486003622-209dd6a1ec1f?w=500&h=400&fit=crop",
  "title": "Scandinavian Jute Rug",
  "desc": "Eco-friendly natural jute weave for minimalist spaces",
  "price": 179.99,
  "rating": 4.3,
  "reviews": 68
},
    
    { 
      id: 9, 
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", 
      title: "Luxury Moroccan Rug", 
      desc: "Plush Moroccan-inspired rug with geometric patterns", 
      price: 399.99,
      rating: 4.7,
      reviews: 45
    },
    {
      id: 14,
      img: "https://images.unsplash.com/photo-1601824982166-6facd5c6ad64?w=500&h=400&fit=crop",
      title: "Modern Abstract Rug",
      desc: "Contemporary abstract design in vibrant colors",
      price: 279.99,
      rating: 4.6,
      reviews: 112
    },
    {
      id: 15,
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop",
      title: "Scandinavian Wool Rug",
      desc: "Pure wool rug with Nordic-inspired patterns",
      price: 459.99,
      rating: 4.8,
      reviews: 67
    }
  ]
};

export default function EcommercePortfolio() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState({
    furniture: false,
    curtains: false,
    rugs: false
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    const notification = {
      id: Date.now(),
      message: `${product.title} added to cart!`,
      type: 'success'
    };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const getDisplayedProducts = (category) => {
    const categoryProducts = products[category];
    return showMore[category] ? categoryProducts : categoryProducts.slice(0, 3);
  };

  return (
    <section className="w-full bg-white text-gray-900">
      <Navbar/>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform animate-bounce flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {notification.message}
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <div className="fixed top-20 right-4 z-40">
        <button 
          onClick={() => setShowCart(!showCart)}
          className="relative p-3 bg-[#054846] text-white rounded-full shadow-lg hover:bg-[#0b6e60] transition-all transform hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Hero - Using your original portfolio image style */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop)` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
            Shop Our Collection
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
            Transform your space with our curated selection of premium furniture, elegant curtains, and luxurious rugs.
          </p>
        </div>
      </div>

      {/* Portfolio Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-32">
        {[
          {
            id: "furniture",
            title: "Premium Furniture",
            intro: "Discover our collection of handcrafted furniture pieces designed to elevate your living spaces with comfort and style.",
          },
          {
            id: "curtains", 
            title: "Elegant Curtains",
            intro: "From luxurious drapes to modern blinds, find the perfect window treatments to complete your interior design.",
          },
          {
            id: "rugs",
            title: "Luxury Rugs",
            intro: "Explore our curated selection of premium rugs that add warmth, texture, and sophistication to any room.",
          },
        ].map(({ id, title, intro }) => (
          <section key={id}>
            <h2 className="text-3xl font-semibold mb-3 text-[#054846]">{title}</h2>
            <p className="mb-8 max-w-3xl text-gray-700">{intro}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getDisplayedProducts(id).map((product) => (
                <div key={product.id} className="group relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center px-4 text-center">
                    <h3 className="text-white text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-white text-sm mb-3">{product.desc}</p>
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white text-sm">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="text-white text-xl font-bold mb-4">${product.price}</div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-6 py-2 bg-[#054846] text-white rounded-md font-medium hover:bg-[#0b6e60] transition flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowMore(prev => ({ ...prev, [id]: !prev[id] }))}
                className="inline-block bg-[#054846] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0b6e60] transition"
              >
                {showMore[id] ? 'Show Less' : `View More ${title}`}
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200 bg-[#054846] text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <button onClick={() => setShowCart(false)} className="text-white hover:text-gray-300">
                    ✕
                  </button>
                </div>
                <p className="mt-1 opacity-90">{cartItemCount} items</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-[#054846] font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 bg-white rounded font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-[#054846]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-4 bg-[#054846] text-white font-bold rounded-md hover:bg-[#0b6e60] transition">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
}
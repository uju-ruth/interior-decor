import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Check, Star, Heart, ChevronRight } from "lucide-react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";

const products = {
  furniture: [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop", 
      title: "Modern Velvet Sofa", 
      desc: "Luxurious 3-seater sofa with plush velvet upholstery", 
      price: 1299.99,
      rating: 4.8,
      reviews: 124,
      category: "Living Room",
      inStock: true
    },
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop", 
      title: "Scandinavian Dining Table", 
      desc: "Solid oak dining table with minimalist design", 
      price: 899.99,
      rating: 4.9,
      reviews: 89,
      category: "Dining Room",
      inStock: true
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", 
      title: "Executive Office Chair", 
      desc: "Ergonomic leather office chair with lumbar support", 
      price: 459.99,
      rating: 4.7,
      reviews: 203,
      category: "Office",
      inStock: false
    },
    { 
      id: 4, 
      img: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&auto=format&fit=crop", 
      title: "Modern Coffee Table", 
      desc: "Glass-top coffee table with steel frame", 
      price: 329.99,
      rating: 4.6,
      reviews: 67,
      category: "Living Room",
      inStock: true
    },
    { 
      id: 5, 
      img: "https://images.unsplash.com/photo-1571898670119-e6c3b8e0e5c7?w=800&auto=format&fit=crop", 
      title: "Luxury Bedroom Set", 
      desc: "Complete bedroom furniture with premium finish", 
      price: 1899.99,
      rating: 4.9,
      reviews: 45,
      category: "Bedroom",
      inStock: true
    },
    { 
      id: 6, 
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop", 
      title: "Industrial Coffee Table", 
      desc: "Metal-frame table with reclaimed wood top", 
      price: 289.99,
      rating: 4.7,
      reviews: 156,
      category: "Living Room",
      inStock: false
    },
    { 
      id: 7, 
      img: "https://images.unsplash.com/photo-1583845112209-e6ac97b058d6?w=800&auto=format&fit=crop", 
      title: "Mid-Century Armchair", 
      desc: "Sleek retro-inspired armchair with walnut legs", 
      price: 349.99,
      rating: 4.8,
      reviews: 215,
      category: "Living Room",
      inStock: true
    },
    { 
      id: 8, 
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop", 
      title: "Sectional Sofa Set", 
      desc: "Modular sectional with premium fabric and chaise", 
      price: 2199.99,
      rating: 4.9,
      reviews: 132,
      category: "Living Room",
      inStock: true
    }
  ],
  curtains: [
    { 
      id: 9, 
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop", 
      title: "Luxury Silk Drapes", 
      desc: "Premium silk curtains with blackout lining", 
      price: 189.99,
      rating: 4.6,
      reviews: 67,
      type: "Blackout",
      inStock: true
    },
    { 
      id: 10, 
      img: "https://images.unsplash.com/photo-1600444551489-5c9c3680a8e8?w=800&auto=format&fit=crop", 
      title: "Blackout Velvet Curtains", 
      desc: "Luxury thermal curtains for complete darkness", 
      price: 119.99,
      rating: 4.9,
      reviews: 178,
      type: "Blackout",
      inStock: false
    },
    { 
      id: 11, 
      img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop", 
      title: "Bohemian Sheer Panels", 
      desc: "Flowing sheer curtains with embroidered patterns", 
      price: 79.99,
      rating: 4.4,
      reviews: 156,
      type: "Sheer",
      inStock: true
    },
    { 
      id: 12, 
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop", 
      title: "Modern Geometric Blinds", 
      desc: "Contemporary window treatment with smart integration", 
      price: 299.99,
      rating: 4.8,
      reviews: 92,
      type: "Blinds",
      inStock: true
    },
    { 
      id: 13, 
      img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop", 
      title: "Velvet Blackout Curtains", 
      desc: "Rich velvet curtains for complete light blocking", 
      price: 149.99,
      rating: 4.7,
      reviews: 89,
      type: "Blackout",
      inStock: true
    },
    { 
      id: 14, 
      img: "https://images.unsplash.com/photo-1551649001-7a2485550fa1?w=800&auto=format&fit=crop", 
      title: "Sheer Linen Curtains", 
      desc: "Light-filtering curtains for an airy, elegant look", 
      price: 89.99,
      rating: 4.7,
      reviews: 134,
      type: "Sheer",
      inStock: false
    },
    { 
      id: 15, 
      img: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop", 
      title: "Linen Natural Drapes", 
      desc: "Organic linen curtains for a natural look", 
      price: 119.99,
      rating: 4.5,
      reviews: 134,
      type: "Natural",
      inStock: true
    },
    { 
      id: 16, 
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", 
      title: "Luxury Tassel Drapes", 
      desc: "Elegant drapes with handcrafted tassel details", 
      price: 199.99,
      rating: 4.8,
      reviews: 87,
      type: "Decorative",
      inStock: true
    }
  ],
  rugs: [
    { 
      id: 17, 
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop", 
      title: "Persian Vintage Rug", 
      desc: "Hand-woven vintage Persian rug with traditional patterns", 
      price: 549.99,
      rating: 4.9,
      reviews: 78,
      material: "Wool",
      inStock: true
    },
    { 
      id: 18, 
      img: "https://images.unsplash.com/photo-1603486003622-209dd6a1ec1f?w=800&auto=format&fit=crop", 
      title: "Minimalist Neutral Rug", 
      desc: "Soft, textured rug in calming beige tones", 
      price: 229.99,
      rating: 4.5,
      reviews: 93,
      material: "Cotton",
      inStock: false
    },
    { 
      id: 19, 
      img: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&auto=format&fit=crop", 
      title: "Bohemian Pattern Rug", 
      desc: "Handwoven boho-style rug with intricate patterns", 
      price: 199.99,
      rating: 4.4,
      reviews: 87,
      material: "Wool",
      inStock: true
    },
    { 
      id: 20, 
      img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop", 
      title: "Geometric Moroccan Rug", 
      desc: "Authentic hand-knotted wool rug with bold diamond patterns", 
      price: 349.99,
      rating: 4.8,
      reviews: 124,
      material: "Wool",
      inStock: true
    },
    { 
      id: 21, 
      img: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&auto=format&fit=crop", 
      title: "Vintage Persian Rug", 
      desc: "Classic red-and-blue Persian design, 100% wool", 
      price: 499.99,
      rating: 4.9,
      reviews: 231,
      material: "Wool",
      inStock: false
    },
    { 
      id: 22, 
      img: "https://images.unsplash.com/photo-1603486003622-209dd6a1ec1f?w=800&auto=format&fit=crop", 
      title: "Scandinavian Jute Rug", 
      desc: "Eco-friendly natural jute weave for minimalist spaces", 
      price: 179.99,
      rating: 4.3,
      reviews: 68,
      material: "Jute",
      inStock: true
    },
    { 
      id: 23, 
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", 
      title: "Luxury Moroccan Rug", 
      desc: "Plush Moroccan-inspired rug with geometric patterns", 
      price: 399.99,
      rating: 4.7,
      reviews: 45,
      material: "Wool",
      inStock: true
    },
    { 
      id: 24, 
      img: "https://images.unsplash.com/photo-1601824982166-6facd5c6ad64?w=800&auto=format&fit=crop", 
      title: "Modern Abstract Rug", 
      desc: "Contemporary abstract design in vibrant colors", 
      price: 279.99,
      rating: 4.6,
      reviews: 112,
      material: "Synthetic",
      inStock: true
    }
  ],
  tables: [
    { 
      id: 25, 
      img: "https://images.unsplash.com/photo-1567538096631-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Extendable Dining Table", 
      desc: "Solid oak table with hidden extension leaves", 
      price: 899.99,
      rating: 4.7,
      reviews: 92,
      type: "Dining",
      inStock: true
    },
    { 
      id: 26, 
      img: "https://images.unsplash.com/photo-1567538096632-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Marble Coffee Table", 
      desc: "Italian marble top with brass legs", 
      price: 599.99,
      rating: 4.9,
      reviews: 143,
      type: "Coffee",
      inStock: false
    },
    { 
      id: 27, 
      img: "https://images.unsplash.com/photo-1567538096633-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Industrial Console Table", 
      desc: "Reclaimed wood and iron pipe construction", 
      price: 349.99,
      rating: 4.6,
      reviews: 78,
      type: "Console",
      inStock: true
    },
    { 
      id: 28, 
      img: "https://images.unsplash.com/photo-1567538096634-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Modern Nesting Tables", 
      desc: "Set of three space-saving tables", 
      price: 229.99,
      rating: 4.5,
      reviews: 67,
      type: "Side",
      inStock: true
    },
    { 
      id: 29, 
      img: "https://images.unsplash.com/photo-1567538096635-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Farmhouse Dining Table", 
      desc: "Rustic chic table with distressed finish", 
      price: 799.99,
      rating: 4.8,
      reviews: 112,
      type: "Dining",
      inStock: false
    },
    { 
      id: 30, 
      img: "https://images.unsplash.com/photo-1567538096636-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Glass Top Side Table", 
      desc: "Sleek tempered glass with metal frame", 
      price: 179.99,
      rating: 4.4,
      reviews: 89,
      type: "Side",
      inStock: true
    },
    { 
      id: 31, 
      img: "https://images.unsplash.com/photo-1567538096637-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Executive Desk", 
      desc: "Solid wood desk with built-in storage", 
      price: 699.99,
      rating: 4.7,
      reviews: 96,
      type: "Desk",
      inStock: true
    },
    { 
      id: 32, 
      img: "https://images.unsplash.com/photo-1567538096638-e720f9d5a84d?w=800&auto=format&fit=crop", 
      title: "Outdoor Dining Set", 
      desc: "Weather-resistant teak table with four chairs", 
      price: 1299.99,
      rating: 4.9,
      reviews: 134,
      type: "Outdoor",
      inStock: true
    }
  ],
  lighting: [
    { 
      id: 33, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop", 
      title: "Modern Chandelier", 
      desc: "Brass and glass statement lighting fixture", 
      price: 459.99,
      rating: 4.6,
      reviews: 78,
      type: "Ceiling",
      inStock: true
    },
    { 
      id: 34, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a39?w=800&auto=format&fit=crop", 
      title: "Industrial Floor Lamp", 
      desc: "Adjustable arm with Edison bulb", 
      price: 189.99,
      rating: 4.7,
      reviews: 112,
      type: "Floor",
      inStock: false
    },
    { 
      id: 35, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a40?w=800&auto=format&fit=crop", 
      title: "Crystal Table Lamp", 
      desc: "Hand-cut crystal with linen shade", 
      price: 249.99,
      rating: 4.8,
      reviews: 93,
      type: "Table",
      inStock: true
    },
    { 
      id: 36, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a41?w=800&auto=format&fit=crop", 
      title: "Minimalist Pendant", 
      desc: "Sleek single bulb pendant light", 
      price: 129.99,
      rating: 4.5,
      reviews: 67,
      type: "Ceiling",
      inStock: true
    },
    { 
      id: 37, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a42?w=800&auto=format&fit=crop", 
      title: "Arc Floor Lamp", 
      desc: "Modern arch design with dimmer", 
      price: 299.99,
      rating: 4.9,
      reviews: 145,
      type: "Floor",
      inStock: false
    },
    { 
      id: 38, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a43?w=800&auto=format&fit=crop", 
      title: "Wall Sconces (Set of 2)", 
      desc: "Brushed brass with frosted glass", 
      price: 179.99,
      rating: 4.7,
      reviews: 89,
      type: "Wall",
      inStock: true
    },
    { 
      id: 39, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a44?w=800&auto=format&fit=crop", 
      title: "LED Strip Lights", 
      desc: "Color-changing with remote control", 
      price: 49.99,
      rating: 4.4,
      reviews: 213,
      type: "Accent",
      inStock: true
    },
    { 
      id: 40, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a45?w=800&auto=format&fit=crop", 
      title: "Rustic Chandelier", 
      desc: "Wrought iron with candle-style bulbs", 
      price: 349.99,
      rating: 4.8,
      reviews: 76,
      type: "Ceiling",
      inStock: true
    }
  ],
  decor: [
    { 
      id: 41, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a46?w=800&auto=format&fit=crop", 
      title: "Decorative Throw Pillows", 
      desc: "Set of 4 premium velvet pillows", 
      price: 89.99,
      rating: 4.7,
      reviews: 156,
      type: "Pillows",
      inStock: true
    },
    { 
      id: 42, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a47?w=800&auto=format&fit=crop", 
      title: "Wall Art Triptych", 
      desc: "Three-piece canvas art set", 
      price: 199.99,
      rating: 4.8,
      reviews: 87,
      type: "Art",
      inStock: false
    },
    { 
      id: 43, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a48?w=800&auto=format&fit=crop", 
      title: "Ceramic Vase Collection", 
      desc: "Handcrafted set of 3 vases", 
      price: 129.99,
      rating: 4.6,
      reviews: 64,
      type: "Vases",
      inStock: true
    },
    { 
      id: 44, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a49?w=800&auto=format&fit=crop", 
      title: "Decorative Mirror", 
      desc: "Round beveled mirror with gold frame", 
      price: 179.99,
      rating: 4.9,
      reviews: 132,
      type: "Mirror",
      inStock: true
    },
    { 
      id: 45, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a50?w=800&auto=format&fit=crop", 
      title: "Artificial Potted Plant", 
      desc: "Realistic faux fiddle leaf fig tree", 
      price: 149.99,
      rating: 4.5,
      reviews: 98,
      type: "Plants",
      inStock: false
    },
    { 
      id: 46, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a51?w=800&auto=format&fit=crop", 
      title: "Candle Holder Set", 
      desc: "Geometric brass holders (set of 3)", 
      price: 79.99,
      rating: 4.7,
      reviews: 112,
      type: "Candles",
      inStock: true
    },
    { 
      id: 47, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a52?w=800&auto=format&fit=crop", 
      title: "Decorative Throw Blanket", 
      desc: "Chunky knit wool blanket", 
      price: 119.99,
      rating: 4.8,
      reviews: 143,
      type: "Blankets",
      inStock: true
    },
    { 
      id: 48, 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a53?w=800&auto=format&fit=crop", 
      title: "Wall Clock", 
      desc: "Minimalist oversized clock", 
      price: 89.99,
      rating: 4.6,
      reviews: 76,
      type: "Clock",
      inStock: true
    }
  ]
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    quote: "The velvet sofa transformed our living room! The quality exceeded our expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Interior Designer",
    quote: "My clients love the premium materials and craftsmanship of these products.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Business Owner",
    quote: "The blackout curtains were perfect for our boutique hotel renovation.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&auto=format&fit=crop"
  }
];

const services = [
  {
    id: 1,
    title: "Free Design Consultation",
    description: "Get expert advice from our interior design specialists",
    icon: "🎨"
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "On all orders over $999",
    icon: "🚚"
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "30-day return policy",
    icon: "🔄"
  },
  {
    id: 4,
    title: "Financing Options",
    description: "Flexible payment plans available",
    icon: "💳"
  }
];

export default function EcommercePortfolio() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState({
    furniture: false,
    curtains: false,
    rugs: false,
    tables: false,
    lighting: false,
    decor: false
  });
  const [activeCategory, setActiveCategory] = useState("all");

  const addToCart = (product) => {
    if (!product.inStock) return;
    
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

  const clearCart = () => {
    setCart([]);
    
    const notification = {
      id: Date.now(),
      message: 'Cart cleared successfully!',
      type: 'success'
    };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const getDisplayedProducts = (category) => {
    const categoryProducts = products[category];
    return showMore[category] ? categoryProducts : categoryProducts.slice(0, 4);
  };

  const filteredFurniture = activeCategory === "all" 
    ? products.furniture 
    : products.furniture.filter(item => item.category === activeCategory);

  return (
    <div className="w-full bg-white text-[#004643]">
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

      {/* Hero Section */}
      <div className="relative h-[80vh] bg-cover bg-center flex items-center justify-center text-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&h=900&auto=format&fit=crop)" }}>
        <div className="absolute inset-0 bg-[#054846]/80"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6">
            Complete Home Furnishings
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Discover everything you need to furnish your home from furniture to decor
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="#furniture" className="px-8 py-3 bg-white text-[#054846] rounded-full font-medium hover:bg-gray-100 transition">
              Shop Furniture
            </Link>
            <Link to="#collections" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition">
              View All Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-[#054846]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#054846]/10 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#054846] mb-2">{service.title}</h3>
                <p className="text-[#004643]/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Furniture Section */}
      <section id="furniture" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Premium Furniture Collection</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Handcrafted pieces designed to bring comfort and elegance to your home
            </p>
          </div>

          {/* Furniture Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full ${activeCategory === "all" ? 'bg-[#054846] text-white' : 'bg-white text-[#054846] border border-[#054846]/30'} transition`}
            >
              All Furniture
            </button>
            {[...new Set(products.furniture.map(item => item.category))].map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-[#054846] text-white' : 'bg-white text-[#054846] border border-[#054846]/30'} transition`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(showMore.furniture ? filteredFurniture : filteredFurniture.slice(0, 4)).map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.category}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, furniture: !prev.furniture }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.furniture ? 'Show Less Furniture' : 'View All Furniture'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Curtains Section */}
      <section id="curtains" className="py-16 bg-[#054846]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Window Treatments</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Transform your windows with our premium selection of curtains and blinds
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getDisplayedProducts("curtains").map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.type}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, curtains: !prev.curtains }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.curtains ? 'Show Less Curtains' : 'View All Window Treatments'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Rugs Section */}
      <section id="rugs" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Luxury Rugs Collection</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Add warmth and sophistication to your floors with our premium rug selection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getDisplayedProducts("rugs").map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.material}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, rugs: !prev.rugs }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.rugs ? 'Show Less Rugs' : 'View All Rugs'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section id="tables" className="py-16 bg-[#054846]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Table Collection</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Functional art pieces for dining, working, and living spaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getDisplayedProducts("tables").map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.type}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, tables: !prev.tables }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.tables ? 'Show Less Tables' : 'View All Tables'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Lighting Section */}
      <section id="lighting" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Lighting Collection</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Illuminate your space with our designer lighting solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getDisplayedProducts("lighting").map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.type}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, lighting: !prev.lighting }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.lighting ? 'Show Less Lighting' : 'View All Lighting'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Decor Section */}
      <section id="decor" className="py-16 bg-[#054846]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Home Decor Collection</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Complete your look with our selection of premium home accessories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getDisplayedProducts("decor").map((product) => (
              <div key={product.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-red-500 font-bold py-2 px-4 rounded-lg">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#054846]">{product.title}</h3>
                    <span className="bg-[#054846]/10 text-[#054846] px-2 py-1 rounded text-xs">{product.type}</span>
                  </div>
                  <p className="text-[#004643]/80 mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054846]">${product.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition ${product.inStock ? 'bg-[#054846] text-white hover:bg-[#0b6e60]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(prev => ({ ...prev, decor: !prev.decor }))}
              className="inline-flex items-center px-6 py-3 bg-[#054846] text-white rounded-full font-medium hover:bg-[#0b6e60] transition"
            >
              {showMore.decor ? 'Show Less Decor' : 'View All Decor'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#054846]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">What Our Customers Say</h2>
            <p className="text-[#004643]/80 max-w-3xl mx-auto">
              Hear from homeowners and designers who have transformed their spaces with our products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-[#054846]/10">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-[#054846]">{testimonial.name}</h4>
                    <p className="text-sm text-[#004643]/80">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#004643] mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#054846] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a free design consultation with our experts to create your dream interior
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-[#054846] rounded-full font-medium hover:bg-gray-100 transition">
              Book Consultation
            </Link>
            <Link to="/services" className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition">
              Learn About Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b border-[#054846]/10 bg-[#054846] text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-white hover:text-gray-300">
                  ✕
                </button>
              </div>
              <p className="mt-1 opacity-90">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="mt-4 px-6 py-2 bg-[#054846] text-white rounded-full hover:bg-[#0b6e60] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button 
                    onClick={clearCart}
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mb-4 flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Clear Cart
                  </button>
                  
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-[#054846]/5 rounded-lg">
                      <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-[#054846] font-bold">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded bg-[#054846]/10 hover:bg-[#054846]/20 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4 text-[#054846]" />
                          </button>
                          <span className="px-3 py-1 bg-white rounded font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-[#054846]/10 hover:bg-[#054846]/20 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4 text-[#054846]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#054846]/10 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Subtotal:</span>
                  <span className="text-xl font-bold text-[#054846]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Shipping:</span>
                  <span className="text-xl font-bold text-[#054846]">Free</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-[#054846]">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-[#054846] text-white font-bold rounded-lg hover:bg-[#0b6e60] transition mb-4">
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-full py-2 text-[#054846] font-medium hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
export let categories = [
  {
    id: "cat-1",
    name: "Cloud Solutions",
    slug: "cloud-solutions",
    description: "Enterprise cloud orchestration, hosting, and serverless compute infrastructure.",
    icon: "☁️",
    createdAt: "2026-01-10T08:00:00Z",
  },
  {
    id: "cat-2",
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Predictive neural networks, automated computer vision, and LLM orchestration.",
    icon: "🧠",
    createdAt: "2026-01-12T09:30:00Z",
  },
  {
    id: "cat-3",
    name: "Cyber Security",
    slug: "cyber-security",
    description: "Zero-trust network architecture, penetration testing, and real-time DLP shield.",
    icon: "🛡️",
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "cat-4",
    name: "Infrastructure & API",
    slug: "infrastructure-api",
    description: "Ultra low-latency gateways, telemetry proxies, and edge CDN networks.",
    icon: "⚡",
    createdAt: "2026-01-18T14:15:00Z",
  },
  {
    id: "cat-5",
    name: "Business Operations",
    slug: "business-operations",
    description: "Omnichannel customer communication, automated invoice pipelines, and CRM.",
    icon: "📊",
    createdAt: "2026-01-20T16:45:00Z",
  },
];

export let products = [
  {
    id: "prod-1",
    name: "Prestige 3.0L Multi Purpose Cooker - All-in-One Cooking Solution!",
    slug: "prestige-3l-multi-purpose-cooker",
    category: "Kitchen & Home",
    regularPrice: 1499,
    salePrice: 999,
    discountPercentage: 33,
    featuredImage: "/products/cooker-blue-main.png",
    galleryImages: [
      "/products/thumb-red.png",
      "/products/thumb-blue.png",
      "/products/thumb-yellow.png",
      "/products/thumb-green.png"
    ],
    description: "আপনার রান্নার কাজকে আরও সহজ এবং বৈচিত্র্যময় করতে নিয়ে এলো Prestige ৩.০ লিটার মাল্টি-পারপাস কুকার। এটি দিয়ে আপনি একই সাথে রান্না এবং ভাপে সেদ্ধ (Steaming) করার কাজ সেরে নিতে পারবেন।",
    benefits: [
      "মাল্টি-ফাংশনাল: নুডলস, ওটমিল, স্যুপ রান্না ছাড়াও স্টিমার দিয়ে মোমো, ডিম বা সবজি সেদ্ধ",
      "নন-স্টিক ইনার পট: খাবার পুড়ে লেগে যায় না এবং সহজে পরিষ্কার করা যায়",
      "১৫০০ ওয়াট পাওয়ার: শক্তিশালী মোটর দ্রুত রান্না নিশ্চিত করে",
      "কমপ্যাক্ট ডিজাইন: আধুনিক ও আকর্ষণীয় ডিজাইন যা রান্নাঘরের সৌন্দর্য বাড়াবে"
    ],
    facilities: [
      "১টি মেইন কুকিং ইউনিট (৩.০ লিটার)",
      "১টি স্টিমার পট (ভাপে রান্নার জন্য)",
      "১টি ট্রান্সপারেন্ট গ্লাস লিড (ঢাকনা)",
      "১টি প্লাস্টিক চামচ ও মেজারিং কাপ (ফ্রি)"
    ],
    seoTitle: "Prestige 3.0L Multi Purpose Cooker | Best Price in Bangladesh",
    seoDescription: "Buy Prestige 3.0L Multi Purpose Cooker at best price in BD with home delivery and warranty.",
    seoImage: "/products/cooker-blue-main.png",
    stock: 45,
    status: "Active",
    rating: 4.9,
    salesCount: 1420,
    icon: "🍲",
    createdAt: "2026-01-15T08:30:00Z",
  },
  {
    id: "prod-2",
    name: "Intelligent Power Saving Device - স্মার্ট বিদ্যুৎ সাশ্রয়ী ডিভাইস (৯০V-২৫০V)",
    slug: "intelligent-power-saving-device",
    category: "Electronics",
    regularPrice: 999,
    salePrice: 499,
    discountPercentage: 50,
    featuredImage: "/products/related-power-saver.png",
    galleryImages: [
      "/products/related-power-saver.png"
    ],
    description: "স্মার্ট বিদ্যুৎ সাশ্রয়ী ডিভাইস ৯০V-২৫০V যা আপনার বাসা ও অফিসের বিদ্যুতের অপচয় কমিয়ে আনবে।",
    benefits: [
      "বিদ্যুৎ বিল সাশ্রয় করে ২৫% থেকে ৪০% পর্যন্ত",
      "ভোল্টেজ স্ট্যাবিলাইজার ও প্রটেকশন ফিচার",
      "প্লাগ অ্যান্ড প্লে, কোনো জটিল ওয়্যারিং নেই"
    ],
    facilities: [
      "১ বছরের গ্যারান্টি",
      "ফ্রি ডেলিভারি সাপোর্ট"
    ],
    seoTitle: "Intelligent Power Saving Device - Smart Electricity Saver",
    seoDescription: "Reduce electricity bill with Intelligent Power Saving Device. High efficiency and surge protection.",
    seoImage: "/products/related-power-saver.png",
    stock: 28,
    status: "Active",
    rating: 5.0,
    salesCount: 890,
    icon: "⚡",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "prod-3",
    name: "Mini Electric Cooker 1.8L - বহনযোগ্য মাল্টি কুকার",
    slug: "mini-electric-cooker-1-8l",
    category: "Kitchen & Home",
    regularPrice: 999,
    salePrice: 750,
    discountPercentage: 25,
    featuredImage: "/products/thumb-yellow.png",
    galleryImages: [
      "/products/thumb-yellow.png",
      "/products/thumb-green.png"
    ],
    description: "সহজে বহনযোগ্য ১.৮ লিটার মিনি কুকার, দ্রুত নুডলস, ডিম বা ভাতের জন্য আদর্শ।",
    benefits: [
      "সহজেই যেকোনো জায়গায় বহনযোগ্য",
      "অল্প বিদ্যুৎ খরচ",
      "স্টুডেন্ট ও ব্যাচেলরদের জন্য আদর্শ"
    ],
    facilities: [
      "৬ মাসের ওয়ারেন্টি",
      "ক্যাশ অন ডেলিভারি সুবিধা"
    ],
    seoTitle: "Mini Electric Cooker 1.8L - Portable Cooker",
    seoDescription: "Mini Electric Cooker 1.8L for bachelor and travel use at best price.",
    seoImage: "/products/thumb-yellow.png",
    stock: 50,
    status: "Active",
    rating: 4.8,
    salesCount: 650,
    icon: "🍳",
    createdAt: "2026-02-05T12:00:00Z",
  },
  {
    id: "prod-4",
    name: "High-Throughput API Gateway",
    slug: "high-throughput-api-gateway",
    category: "Infrastructure & API",
    regularPrice: 199,
    salePrice: 149,
    discountPercentage: 25,
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sub-millisecond latency rate limiting, token validation, distributed caching, and automated request tracing.",
    benefits: [
      "প্রতি সেকেন্ডে ৫০,০০০+ কনকারেন্ট রিকুয়েস্ট হ্যান্ডলিং",
      "সাব-মিলিটার্নসি রেট লিমিটিং এবং স্পাইক প্রোটেকশন",
      "অটোমেটেড ওপেনএপিআই ও সোয়েগার ডকুমেন্টেশন জেনারেশন"
    ],
    facilities: [
      "আনলিমিটেড এপিআই কী ও সিকিউর টোকেন ম্যানেজমেন্ট",
      "গ্লোবাল এজ ক্যাশিং এবং লোড ব্যালেন্সার"
    ],
    seoTitle: "High-Throughput API Gateway - Enterprise Performance",
    seoDescription: "High-throughput, sub-millisecond API Gateway built for mission-critical microservices.",
    seoImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    stock: 35,
    status: "Active",
    rating: 4.7,
    salesCount: 1120,
    icon: "⚡",
    createdAt: "2026-03-05T09:15:00Z",
  },
  {
    id: "prod-5",
    name: "Omnichannel Customer Hub",
    slug: "omnichannel-customer-hub",
    category: "Business Operations",
    regularPrice: 320,
    salePrice: 249,
    discountPercentage: 22,
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Centralized communications across WhatsApp, Email, Live Chat, and CRM with automated triage bots.",
    benefits: [
      "সিঙ্গেল ইনবক্সে সকল সোশ্যাল ও মেসেজিং চ্যানেল ইন্টিগ্রেশন",
      "স্মার্ট বট দ্বারা ৬০% সাধারণ সাপোর্ট টিকিট অটোমেশন",
      "কাস্টমার জার্নি ও লাইফটাইম ভ্যালু অ্যানালিটিক্স"
    ],
    facilities: [
      "আনলিমিটেড এজেন্ট অ্যাকাউন্টস",
      "হোয়াটসঅ্যাপ বিজনেস এপিআই ভেরিফাইড কানেক্টিভিটি"
    ],
    seoTitle: "Omnichannel Customer Hub - All-in-one CRM & Chat",
    seoDescription: "Empower your support and sales team with unified messaging across all enterprise channels.",
    seoImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    stock: 62,
    status: "Active",
    rating: 4.9,
    salesCount: 760,
    icon: "📊",
    createdAt: "2026-03-12T11:45:00Z",
  },
  {
    id: "prod-6",
    name: "Global Edge Content Delivery",
    slug: "global-edge-content-delivery",
    category: "Infrastructure & API",
    regularPrice: 120,
    salePrice: 89,
    discountPercentage: 26,
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Ultra-fast global edge caching with automatic SSL, HTTP/3, image optimization, and DDoS mitigation.",
    benefits: [
      "বিশ্বব্যাপী ৩০০+ এজ লোকেশনে তাৎক্ষণিক কন্টেন্ট ডিস্ট্রিবিউশন",
      "স্বয়ংক্রিয় ওয়েবপি/এভিআইএফ ইমেজ কম্পপ্রেশন",
      "অটোমেটেড লেয়ার ৩/৪/৭ ডিডিওএস প্রটেকশন"
    ],
    facilities: [
      "ফ্রি ওয়াইল্ডকার্ড এসএসএল সার্টিফিকেট",
      "রিয়েল-টাইম ব্যান্ডউইথ ও ট্রাফিক মনিটরিং"
    ],
    seoTitle: "Global Edge CDN - Ultra-low Latency Worldwide",
    seoDescription: "Speed up your website with global edge caching and instant DDoS protection.",
    seoImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    stock: 120,
    status: "Active",
    rating: 4.6,
    salesCount: 3410,
    icon: "🌐",
    createdAt: "2026-04-01T16:00:00Z",
  },
];

export let orders = [
  {
    id: "ORD-9821",
    customer: "Nexus Digital Corp",
    email: "billing@nexuscorp.io",
    items: [{ productId: "prod-1", name: "Enterprise Cloud Suite Pro", quantity: 2, price: 299 }],
    totalAmount: 598,
    status: "Completed",
    date: "2026-10-27T10:14:00Z",
  },
  {
    id: "ORD-9822",
    customer: "Vanguard Systems",
    email: "procurement@vanguard.com",
    items: [{ productId: "prod-2", name: "AI Analytics Intelligence Platform", quantity: 1, price: 499 }],
    totalAmount: 499,
    status: "Processing",
    date: "2026-10-27T08:35:00Z",
  },
  {
    id: "ORD-9823",
    customer: "Apex Fintech Ltd",
    email: "devops@apexfin.com",
    items: [
      { productId: "prod-3", name: "Shield Cyber Security Mesh", quantity: 2, price: 199 },
      { productId: "prod-4", name: "High-Throughput API Gateway", quantity: 1, price: 149 },
    ],
    totalAmount: 547,
    status: "Completed",
    date: "2026-10-26T17:50:00Z",
  },
  {
    id: "ORD-9824",
    customer: "Horizon Media Labs",
    email: "admin@horizonmedia.net",
    items: [{ productId: "prod-6", name: "Global Edge Content Delivery", quantity: 3, price: 89 }],
    totalAmount: 267,
    status: "Pending",
    date: "2026-10-26T14:10:00Z",
  },
  {
    id: "ORD-9825",
    customer: "Starlight SaaS Inc",
    email: "accounts@starlight.co",
    items: [{ productId: "prod-5", name: "Omnichannel Customer Hub", quantity: 1, price: 249 }],
    totalAmount: 249,
    status: "Completed",
    date: "2026-10-25T11:22:00Z",
  },
];

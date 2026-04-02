// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  role: 'client' | 'tailleur' | 'livreur' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Client extends User {
  role: 'client';
  measurements?: Measurements;
  ordersCount: number;
  totalSpent: number;
}

export interface Tailleur extends User {
  role: 'tailleur';
  specialty: string;
  experience: number;
  portfolio: PortfolioItem[];
  rating: number;
  reviewsCount: number;
  followersCount: number;
  bio: string;
  location: string;
  isVerified: boolean;
}

export interface Livreur extends User {
  role: 'livreur';
  vehicleType: string;
  licenseNumber: string;
  isAvailable: boolean;
  currentLocation?: GeoLocation;
  deliveriesCount: number;
  rating: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Measurements Types
export interface Measurements {
  id: string;
  userId: string;
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
  armLength: number;
  inseam: number;
  neck: number;
  sleeveLength: number;
  thigh: number;
  calf: number;
  method: 'manual' | 'ai';
  aiConfidence?: number;
  createdAt: string;
  updatedAt: string;
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  tailleurId: string;
  title: string;
  description: string;
  images: string[];
  videoUrl?: string;
  category: string;
  price: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

// Product Types (Marketplace)
export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'tissu' | 'accessoire' | 'fourniture';
  subcategory: string;
  price: number;
  comparePrice?: number;
  images: string[];
  stock: number;
  sku: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  tailleurId: string;
  tailleurName: string;
  livreurId?: string;
  livreurName?: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  depositAmount: number;
  finalAmount: number;
  currency: string;
  measurements: Measurements;
  deliveryAddress: Address;
  deliveryDate?: string;
  estimatedDeliveryDate: string;
  notes?: string;
  negotiationHistory?: NegotiationItem[];
  dispute?: Dispute;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  type: 'custom' | 'product';
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  portfolioItemId?: string;
  productId?: string;
  images?: string[];
}

export type OrderStatus = 
  | 'pending'
  | 'negotiating'
  | 'confirmed'
  | 'in_progress'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type PaymentStatus = 
  | 'pending'
  | 'deposit_paid'
  | 'escrow_held'
  | 'released'
  | 'refunded'
  | 'failed';

// Negotiation Types
export interface NegotiationItem {
  id: string;
  orderId: string;
  proposedBy: string;
  proposedByRole: string;
  proposedAmount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Address Types
export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// Dispute Types
export interface Dispute {
  id: string;
  orderId: string;
  openedBy: string;
  openedByRole: string;
  reason: string;
  description: string;
  evidence: string[];
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  refundAmount?: number;
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

// Chat Types
export interface Chat {
  id: string;
  participants: ChatParticipant[];
  orderId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParticipant {
  userId: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

// Analytics Types
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  activeDisputes: number;
  newUsersThisMonth: number;
  revenueThisMonth: number;
  ordersThisMonth: number;
  growthRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface RevenueData {
  date: string;
  amount: number;
  orders: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order' | 'payment' | 'chat' | 'system' | 'promotion';
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

// GeoLocation Types
export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: string;
}

// Virtual Try-On Types
export interface VirtualTryOn {
  id: string;
  userId: string;
  originalImage: string;
  processedImage?: string;
  garmentImage: string;
  garmentType: string;
  status: 'processing' | 'completed' | 'failed';
  resultUrl?: string;
  createdAt: string;
  completedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

// Filter Types
export interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  clientId?: string;
  tailleurId?: string;
  dateFrom?: string;
  dateTo?: string;
}

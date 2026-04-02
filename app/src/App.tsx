import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  AlertTriangle,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Pages
import Dashboard from '@/pages/Dashboard';
import UsersManagement from '@/pages/UsersManagement';
import Orders from '@/pages/Orders';
import Products from '@/pages/Products';
import Chat from '@/pages/Chat';
import Disputes from '@/pages/Disputes';
import Analytics from '@/pages/Analytics';
import SettingsPage from '@/pages/Settings';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'users', label: 'Utilisateurs', icon: Users },
  { id: 'orders', label: 'Commandes', icon: ShoppingBag, badge: 23 },
  { id: 'products', label: 'Produits', icon: Package },
  { id: 'chat', label: 'Messages', icon: MessageSquare, badge: 5 },
  { id: 'disputes', label: 'Litiges', icon: AlertTriangle, badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(12);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersManagement />;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'chat':
        return <Chat />;
      case 'disputes':
        return <Disputes />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gold-100 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-dark-900 border-r border-gold-500/20 transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gold-500/20">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'lg:hidden')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Store className="w-5 h-5 text-dark-950" />
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-gradient-gold">
                MON TAILLEUR
              </h1>
              <p className="text-xs text-gold-400/60">Admin Dashboard</p>
            </div>
          </div>
          <div className={cn('hidden', !sidebarOpen && 'lg:flex lg:items-center lg:justify-center lg:w-full')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Store className="w-5 h-5 text-dark-950" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gold-400 hover:text-gold-300 hover:bg-gold-500/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto scrollbar-thin" style={{ height: 'calc(100vh - 80px)' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-gold-500/20 to-gold-500/5 text-gold-400 border border-gold-500/30'
                    : 'text-gold-100/70 hover:bg-gold-500/10 hover:text-gold-400',
                  !sidebarOpen && 'lg:justify-center lg:px-2'
                )}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'animate-pulse')} />
                <span className={cn('font-medium', !sidebarOpen && 'lg:hidden')}>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge
                    className={cn(
                      'ml-auto bg-gold-500 text-dark-950 text-xs',
                      !sidebarOpen && 'lg:hidden'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className={cn('ml-auto w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse', !sidebarOpen && 'lg:hidden')} />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-dark-900/80 backdrop-blur-xl border-b border-gold-500/20 sticky top-0 z-40">
          <div className="h-full px-6 flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-gold-400/50" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-80 pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-500 focus:ring-gold-500/20"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gold-400 hover:text-gold-300 hover:bg-gold-500/10"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-dark-900 border-gold-500/30">
                  <DropdownMenuLabel className="text-gold-400">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gold-500/20" />
                  <div className="max-h-64 overflow-y-auto">
                    <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Nouvelle commande</span>
                        <span className="text-sm text-gold-400/60">Commande #MT-2024-004 reçue</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Nouveau litige</span>
                        <span className="text-sm text-gold-400/60">Un client a ouvert un litige</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 hover:bg-gold-500/10">
                    <Avatar className="w-9 h-9 border-2 border-gold-500/50">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback className="bg-gold-500 text-dark-950">SA</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gold-100">Super Admin</p>
                      <p className="text-xs text-gold-400/60">admin@montailleur.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gold-400 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-dark-900 border-gold-500/30">
                  <DropdownMenuLabel className="text-gold-400">Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gold-500/20" />
                  <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gold-500/20" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto scrollbar-thin">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

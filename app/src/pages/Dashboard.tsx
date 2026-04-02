import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockDashboardStats, mockOrders, mockUsers, mockRevenueData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => (
  <Card className="bg-dark-900 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover-gold-glow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gold-400/60 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gold-100">{value}</h3>
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            <span className={cn('text-sm', trend === 'up' ? 'text-green-400' : 'text-red-400')}>
              {change}%
            </span>
            <span className="text-sm text-gold-400/40">vs mois dernier</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gold-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const stats = mockDashboardStats;

  const recentOrders = mockOrders.slice(0, 5);
  const recentUsers = mockUsers.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Tableau de bord</h1>
          <p className="text-gold-400/60 mt-1">Bienvenue sur votre espace d'administration</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('24h')}
            className={timeRange === '24h' 
              ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
              : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
            }
          >
            24h
          </Button>
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
            className={timeRange === '7d' 
              ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
              : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
            }
          >
            7 jours
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
            className={timeRange === '30d' 
              ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
              : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
            }
          >
            30 jours
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Utilisateurs totaux"
          value={stats.totalUsers.toLocaleString()}
          change={12.5}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Commandes"
          value={stats.totalOrders.toLocaleString()}
          change={8.2}
          icon={ShoppingBag}
          trend="up"
        />
        <StatCard
          title="Revenus totaux"
          value={`${(stats.totalRevenue / 1000000).toFixed(1)}M XOF`}
          change={23.5}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Produits"
          value={stats.totalProducts.toString()}
          change={5.1}
          icon={Package}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2 bg-dark-900 border-gold-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gold-100">Aperçu des revenus</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold-500" />
                <span className="text-sm text-gold-400/60">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold-700" />
                <span className="text-sm text-gold-400/60">Commandes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 78, 52, 89, 76, 92, 84, 71, 88, 95, 87, 72].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gold-400/40">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-dark-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-100">Statistiques rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pending Orders */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-gold-100">Commandes en attente</span>
                </div>
                <Badge className="bg-gold-500 text-dark-950">{stats.pendingOrders}</Badge>
              </div>
              <Progress value={65} className="h-2 bg-dark-800" />
            </div>

            {/* Active Disputes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gold-100">Litiges actifs</span>
                </div>
                <Badge className="bg-red-500 text-white">{stats.activeDisputes}</Badge>
              </div>
              <Progress value={25} className="h-2 bg-dark-800" />
            </div>

            {/* Monthly Revenue */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gold-100">Revenus ce mois</span>
                </div>
                <span className="text-sm font-medium text-gold-400">
                  {(stats.revenueThisMonth / 1000000).toFixed(2)}M XOF
                </span>
              </div>
              <Progress value={78} className="h-2 bg-dark-800" />
            </div>

            {/* Growth Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gold-100">Croissance</span>
                </div>
                <span className="text-sm font-medium text-green-400">+{stats.growthRate}%</span>
              </div>
              <Progress value={stats.growthRate} className="h-2 bg-dark-800" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="bg-dark-900 border-gold-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gold-100">Commandes récentes</CardTitle>
            <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10">
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-dark-950/50 border border-gold-500/10 hover:border-gold-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gold-100">{order.orderNumber}</p>
                      <p className="text-xs text-gold-400/60">{order.clientName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gold-400">
                      {order.totalAmount.toLocaleString()} XOF
                    </p>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        'text-xs',
                        order.status === 'completed' && 'border-green-500 text-green-400',
                        order.status === 'in_progress' && 'border-blue-500 text-blue-400',
                        order.status === 'pending' && 'border-yellow-500 text-yellow-400',
                        order.status === 'shipped' && 'border-purple-500 text-purple-400',
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="bg-dark-900 border-gold-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gold-100">Nouveaux utilisateurs</CardTitle>
            <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10">
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-dark-950/50 border border-gold-500/10 hover:border-gold-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-bold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gold-100">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gold-400/60">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        'text-xs capitalize',
                        user.role === 'tailleur' && 'border-gold-500 text-gold-400',
                        user.role === 'client' && 'border-blue-500 text-blue-400',
                        user.role === 'livreur' && 'border-green-500 text-green-400',
                        user.role === 'admin' && 'border-purple-500 text-purple-400',
                      )}
                    >
                      {user.role}
                    </Badge>
                    <p className="text-xs text-gold-400/40 mt-1">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Table */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardHeader>
          <CardTitle className="text-gold-100">Revenus des 7 derniers jours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gold-400/60">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gold-400/60">Commandes</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gold-400/60">Montant</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gold-400/60">Tendance</th>
                </tr>
              </thead>
              <tbody>
                {mockRevenueData.map((item, index) => (
                  <tr key={index} className="border-b border-gold-500/10 hover:bg-gold-500/5 transition-colors">
                    <td className="py-3 px-4 text-sm text-gold-100">
                      {new Date(item.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gold-100">{item.orders}</td>
                    <td className="py-3 px-4 text-sm text-gold-400 text-right">
                      {item.amount.toLocaleString()} XOF
                    </td>
                    <td className="py-3 px-4 text-right">
                      {index > 0 && item.amount > mockRevenueData[index - 1].amount ? (
                        <span className="flex items-center justify-end gap-1 text-green-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          +{((item.amount - mockRevenueData[index - 1].amount) / mockRevenueData[index - 1].amount * 100).toFixed(1)}%
                        </span>
                      ) : index > 0 ? (
                        <span className="flex items-center justify-end gap-1 text-red-400 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          {((item.amount - mockRevenueData[index - 1].amount) / mockRevenueData[index - 1].amount * 100).toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-gold-400/40 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

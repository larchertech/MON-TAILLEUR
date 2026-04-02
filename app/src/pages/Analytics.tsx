import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Analytics</h1>
          <p className="text-gold-400/60 mt-1">Analysez les performances de votre plateforme</p>
        </div>
        <div className="flex items-center gap-2">
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
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
            className={timeRange === '90d' 
              ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
              : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
            }
          >
            90 jours
          </Button>
          <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-400/60">Revenus totaux</p>
                <p className="text-2xl font-bold text-gold-100">45.2M XOF</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+23.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gold-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-400/60">Commandes</p>
                <p className="text-2xl font-bold text-gold-100">856</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+12.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-400/60">Nouveaux users</p>
                <p className="text-2xl font-bold text-gold-100">234</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+18.7%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gold-400/60">Panier moyen</p>
                <p className="text-2xl font-bold text-gold-100">52.8K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">-3.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="bg-dark-900 border border-gold-500/20">
          <TabsTrigger 
            value="revenue" 
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Revenus
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <Users className="w-4 h-4 mr-2" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <PieChart className="w-4 h-4 mr-2" />
            Commandes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-4">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Évolution des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between gap-2">
                {[45, 52, 48, 65, 58, 72, 68, 75, 82, 78, 89, 95].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-900 border border-gold-500/30 px-2 py-1 rounded text-xs text-gold-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {(height * 100000).toLocaleString()} XOF
                      </div>
                    </div>
                    <span className="text-xs text-gold-400/40">
                      {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Croissance des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                  <div className="space-y-4">
                    <h4 className="text-gold-100 font-medium">Répartition par rôle</h4>
                    {[
                      { label: 'Clients', value: 847, color: 'bg-blue-500', percent: 68 },
                      { label: 'Tailleurs', value: 312, color: 'bg-gold-500', percent: 25 },
                      { label: 'Livreurs', value: 62, color: 'bg-green-500', percent: 5 },
                      { label: 'Admins', value: 26, color: 'bg-purple-500', percent: 2 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gold-100">{item.label}</span>
                          <span className="text-gold-400">{item.value}</span>
                        </div>
                        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                          <div 
                            className={cn('h-full rounded-full', item.color)}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-gold-100 font-medium">Activité récente</h4>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 28 }).map((_, i) => {
                        const intensity = Math.random();
                        return (
                          <div
                            key={i}
                            className={cn(
                              'aspect-square rounded-sm',
                              intensity > 0.7 ? 'bg-gold-500' :
                              intensity > 0.4 ? 'bg-gold-500/60' :
                              intensity > 0.1 ? 'bg-gold-500/30' :
                              'bg-gold-500/10'
                            )}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-gold-400/60">
                      <span>Moins</span>
                      <span>Plus</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Statut des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Simple pie chart visualization */}
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#d4a72c"
                      strokeWidth="20"
                      strokeDasharray="125.6 251.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="75.36 251.2"
                      strokeDashoffset="-125.6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeDasharray="50.24 251.2"
                      strokeDashoffset="-200.96"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gold-100">856</p>
                      <p className="text-sm text-gold-400/60">Commandes</p>
                    </div>
                  </div>
                </div>
                <div className="ml-8 space-y-3">
                  {[
                    { label: 'Terminées', value: 420, color: 'bg-gold-500' },
                    { label: 'En cours', value: 180, color: 'bg-blue-500' },
                    { label: 'En attente', value: 120, color: 'bg-yellow-500' },
                    { label: 'Annulées', value: 45, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={cn('w-4 h-4 rounded', item.color)} />
                      <span className="text-gold-100">{item.label}</span>
                      <span className="text-gold-400 ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-100">Top Tailleurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Jean Kouassi', orders: 45, revenue: 12500000, rating: 4.9 },
                { name: 'Fatou Amani', orders: 38, revenue: 9800000, rating: 4.8 },
                { name: 'Amadou Diallo', orders: 32, revenue: 8200000, rating: 4.7 },
                { name: 'Marie Koné', orders: 28, revenue: 7100000, rating: 4.6 },
                { name: 'Koffi Yao', orders: 24, revenue: 5800000, rating: 4.5 },
              ].map((tailleur, index) => (
                <div key={tailleur.name} className="flex items-center gap-4">
                  <span className="w-6 text-center text-gold-400/60 font-medium">{index + 1}</span>
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <span className="text-gold-400 font-medium">
                      {tailleur.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-100 font-medium">{tailleur.name}</p>
                    <p className="text-xs text-gold-400/60">{tailleur.orders} commandes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 font-medium">{(tailleur.revenue / 1000000).toFixed(1)}M XOF</p>
                    <p className="text-xs text-gold-400/60">★ {tailleur.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-100">Produits populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Pagne Wax Vlisco', sales: 156, revenue: 5460000 },
                { name: 'Bazin Riche Premium', sales: 128, revenue: 7040000 },
                { name: 'Boutons Dorés', sales: 234, revenue: 1170000 },
                { name: 'Fil à coudre', sales: 189, revenue: 661500 },
                { name: 'Ruban satin', sales: 145, revenue: 725000 },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="w-6 text-center text-gold-400/60 font-medium">{index + 1}</span>
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                    <span className="text-gold-400 text-xs">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-100 font-medium">{product.name}</p>
                    <p className="text-xs text-gold-400/60">{product.sales} ventes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 font-medium">{(product.revenue / 1000000).toFixed(2)}M XOF</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

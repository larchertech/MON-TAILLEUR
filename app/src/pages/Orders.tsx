import { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOrders } from '@/data/mockData';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const statusConfig = {
  pending: { label: 'En attente', color: 'border-yellow-500 text-yellow-400', icon: Clock },
  negotiating: { label: 'En négociation', color: 'border-orange-500 text-orange-400', icon: MessageSquare },
  confirmed: { label: 'Confirmée', color: 'border-blue-500 text-blue-400', icon: CheckCircle },
  in_progress: { label: 'En cours', color: 'border-indigo-500 text-indigo-400', icon: Package },
  ready: { label: 'Prête', color: 'border-purple-500 text-purple-400', icon: Package },
  shipped: { label: 'Expédiée', color: 'border-cyan-500 text-cyan-400', icon: Truck },
  delivered: { label: 'Livrée', color: 'border-green-500 text-green-400', icon: CheckCircle },
  completed: { label: 'Terminée', color: 'border-green-600 text-green-500', icon: CheckCircle },
  cancelled: { label: 'Annulée', color: 'border-red-500 text-red-400', icon: XCircle },
  disputed: { label: 'En litige', color: 'border-red-600 text-red-500', icon: XCircle },
};

const paymentStatusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400' },
  deposit_paid: { label: 'Acompte payé', color: 'bg-blue-500/20 text-blue-400' },
  escrow_held: { label: 'En séquestre', color: 'bg-purple-500/20 text-purple-400' },
  released: { label: 'Libéré', color: 'bg-green-500/20 text-green-400' },
  refunded: { label: 'Remboursé', color: 'bg-red-500/20 text-red-400' },
  failed: { label: 'Échoué', color: 'bg-red-600/20 text-red-500' },
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tailleurName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    inProgress: mockOrders.filter(o => o.status === 'in_progress').length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    revenue: mockOrders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const getOrderProgress = (status: string) => {
    const progressMap: Record<string, number> = {
      pending: 10,
      negotiating: 20,
      confirmed: 30,
      in_progress: 50,
      ready: 70,
      shipped: 85,
      delivered: 95,
      completed: 100,
      cancelled: 0,
      disputed: 0,
    };
    return progressMap[status] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Gestion des commandes</h1>
          <p className="text-gold-400/60 mt-1">Suivez et gérez toutes les commandes</p>
        </div>
        <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Total commandes</p>
            <p className="text-2xl font-bold text-gold-100">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">En attente</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">En cours</p>
            <p className="text-2xl font-bold text-indigo-400">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Revenus</p>
            <p className="text-2xl font-bold text-green-400">{(stats.revenue / 1000000).toFixed(1)}M XOF</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
              <Input
                placeholder="Rechercher une commande..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
                className={selectedStatus === 'all' 
                  ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
                  : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
                }
              >
                Tous
              </Button>
              <Button
                variant={selectedStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('pending')}
                className={selectedStatus === 'pending' 
                  ? 'bg-yellow-500 text-dark-950 hover:bg-yellow-600' 
                  : 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10'
                }
              >
                En attente
              </Button>
              <Button
                variant={selectedStatus === 'in_progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('in_progress')}
                className={selectedStatus === 'in_progress' 
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                  : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'
                }
              >
                En cours
              </Button>
              <Button
                variant={selectedStatus === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('completed')}
                className={selectedStatus === 'completed' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }
              >
                Terminées
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Commande</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Client</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Tailleur</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Statut</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gold-400/60">Montant</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-gold-400/60">Progression</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gold-400/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <tr 
                      key={order.id} 
                      className="border-b border-gold-500/10 hover:bg-gold-500/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gold-100">{order.orderNumber}</p>
                          <p className="text-xs text-gold-400/60">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              {order.clientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gold-100">{order.clientName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gold-500 text-dark-950 text-xs">
                              {order.tailleurName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gold-100">{order.tailleurName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <Badge 
                            variant="outline" 
                            className={cn('text-xs', statusConfig[order.status].color)}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={cn('text-xs block w-fit', paymentStatusConfig[order.paymentStatus].color)}
                          >
                            {paymentStatusConfig[order.paymentStatus].label}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="font-medium text-gold-400">
                          {order.totalAmount.toLocaleString()} XOF
                        </p>
                        <p className="text-xs text-gold-400/60">
                          Acompte: {order.depositAmount.toLocaleString()} XOF
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={getOrderProgress(order.status)} 
                            className="h-2 flex-1 bg-dark-800"
                          />
                          <span className="text-xs text-gold-400/60 w-8">
                            {getOrderProgress(order.status)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gold-400 hover:bg-gold-500/10">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-dark-900 border-gold-500/30">
                            <DropdownMenuItem 
                              className="text-gold-100 hover:bg-gold-500/10 cursor-pointer"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contacter
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                              <Truck className="w-4 h-4 mr-2" />
                              Assigner livreur
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gold-100 flex items-center gap-2">
                Commande {selectedOrder.orderNumber}
                <Badge variant="outline" className={statusConfig[selectedOrder.status].color}>
                  {statusConfig[selectedOrder.status].label}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-dark-950 border border-gold-500/20">
                <TabsTrigger value="details" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950">
                  Détails
                </TabsTrigger>
                <TabsTrigger value="items" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950">
                  Articles
                </TabsTrigger>
                <TabsTrigger value="measurements" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950">
                  Mesures
                </TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950">
                  Chronologie
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                {/* Progress */}
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                  <p className="text-sm text-gold-400/60 mb-2">Progression</p>
                  <Progress value={getOrderProgress(selectedOrder.status)} className="h-3 bg-dark-800" />
                  <p className="text-right text-sm text-gold-400 mt-1">
                    {getOrderProgress(selectedOrder.status)}% complété
                  </p>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                    <p className="text-sm text-gold-400/60 mb-2">Client</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {selectedOrder.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gold-100">{selectedOrder.clientName}</p>
                        <p className="text-xs text-gold-400/60">ID: {selectedOrder.clientId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                    <p className="text-sm text-gold-400/60 mb-2">Tailleur</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gold-500 text-dark-950">
                          {selectedOrder.tailleurName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gold-100">{selectedOrder.tailleurName}</p>
                        <p className="text-xs text-gold-400/60">ID: {selectedOrder.tailleurId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                  <p className="text-sm text-gold-400/60 mb-3">Paiement</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gold-400/60">Total</p>
                      <p className="text-lg font-bold text-gold-400">
                        {selectedOrder.totalAmount.toLocaleString()} XOF
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gold-400/60">Acompte (50%)</p>
                      <p className="text-lg font-bold text-blue-400">
                        {selectedOrder.depositAmount.toLocaleString()} XOF
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gold-400/60">Solde</p>
                      <p className="text-lg font-bold text-green-400">
                        {selectedOrder.finalAmount.toLocaleString()} XOF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                  <p className="text-sm text-gold-400/60 mb-2">Livraison</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-400 mt-1" />
                    <div>
                      <p className="text-gold-100">{selectedOrder.deliveryAddress.street}</p>
                      <p className="text-sm text-gold-400/60">
                        {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span className="text-sm text-gold-100">
                      Livraison estimée: {new Date(selectedOrder.estimatedDeliveryDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="mt-4">
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 rounded-lg bg-dark-950 border border-gold-500/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gold-500/10 flex items-center justify-center">
                          <Package className="w-8 h-8 text-gold-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gold-100">{item.name}</p>
                          <p className="text-sm text-gold-400/60">{item.description}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.type === 'custom' ? 'Sur mesure' : 'Produit'}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gold-400">
                          {item.totalPrice.toLocaleString()} XOF
                        </p>
                        <p className="text-sm text-gold-400/60">
                          {item.quantity} x {item.unitPrice.toLocaleString()} XOF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="measurements" className="mt-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {Object.entries(selectedOrder.measurements).filter(([key]) => 
                    ['height', 'weight', 'chest', 'waist', 'hips', 'shoulders', 'armLength', 'inseam', 'neck', 'sleeveLength', 'thigh', 'calf'].includes(key)
                  ).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg bg-dark-950 border border-gold-500/20">
                      <p className="text-xs text-gold-400/60 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-lg font-medium text-gold-100">{value} cm</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-gold-500/10 border border-gold-500/30">
                  <p className="text-sm text-gold-400">
                    Méthode: {selectedOrder.measurements.method === 'ai' ? 'IA (Intelligence Artificielle)' : 'Manuelle'}
                  </p>
                  {selectedOrder.measurements.aiConfidence && (
                    <p className="text-sm text-gold-400/60">
                      Confiance IA: {selectedOrder.measurements.aiConfidence}%
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-4">
                  {[
                    { date: selectedOrder.createdAt, event: 'Commande créée', icon: Clock },
                    { date: selectedOrder.createdAt, event: 'Paiement acompte reçu', icon: DollarSign },
                    { date: selectedOrder.updatedAt, event: 'Commande en cours de traitement', icon: Package },
                    ...(selectedOrder.deliveryDate ? [{ date: selectedOrder.deliveryDate, event: 'Commande livrée', icon: CheckCircle }] : []),
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <event.icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gold-100">{event.event}</p>
                        <p className="text-sm text-gold-400/60">
                          {new Date(event.date).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

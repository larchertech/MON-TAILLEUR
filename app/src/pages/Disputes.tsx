import { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  User,
  Calendar,
  FileText,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDisputes, mockOrders } from '@/data/mockData';
import { cn } from '@/lib/utils';
import type { Dispute } from '@/types';

const statusConfig = {
  open: { label: 'Ouvert', color: 'border-red-500 text-red-400', bgColor: 'bg-red-500/10' },
  under_review: { label: 'En cours d\'examen', color: 'border-yellow-500 text-yellow-400', bgColor: 'bg-yellow-500/10' },
  resolved: { label: 'Résolu', color: 'border-green-500 text-green-400', bgColor: 'bg-green-500/10' },
  closed: { label: 'Fermé', color: 'border-gray-500 text-gray-400', bgColor: 'bg-gray-500/10' },
};

export default function Disputes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolution, setResolution] = useState('');

  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || dispute.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockDisputes.length,
    open: mockDisputes.filter(d => d.status === 'open').length,
    underReview: mockDisputes.filter(d => d.status === 'under_review').length,
    resolved: mockDisputes.filter(d => d.status === 'resolved').length,
  };

  const handleResolve = () => {
    setSelectedDispute(null);
    setResolution('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Gestion des litiges</h1>
          <p className="text-gold-400/60 mt-1">Gérez et résolvez les litiges entre utilisateurs</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Total litiges</p>
            <p className="text-2xl font-bold text-gold-100">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Ouverts</p>
            <p className="text-2xl font-bold text-red-400">{stats.open}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">En examen</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.underReview}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Résolus</p>
            <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
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
                placeholder="Rechercher un litige..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
              />
            </div>
            <div className="flex gap-2">
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
                variant={selectedStatus === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('open')}
                className={selectedStatus === 'open' 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                }
              >
                Ouverts
              </Button>
              <Button
                variant={selectedStatus === 'under_review' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('under_review')}
                className={selectedStatus === 'under_review' 
                  ? 'bg-yellow-500 text-dark-950 hover:bg-yellow-600' 
                  : 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10'
                }
              >
                En examen
              </Button>
              <Button
                variant={selectedStatus === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('resolved')}
                className={selectedStatus === 'resolved' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }
              >
                Résolus
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Litige</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Commande</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Ouvert par</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Raison</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Statut</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Date</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gold-400/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisputes.map((dispute) => (
                  <tr 
                    key={dispute.id} 
                    className="border-b border-gold-500/10 hover:bg-gold-500/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gold-100">#{dispute.id}</p>
                          <p className="text-xs text-gold-400/60">{dispute.evidence.length} pièces jointes</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gold-100">
                        {mockOrders.find(o => o.id === dispute.orderId)?.orderNumber}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gold-500 text-dark-950 text-xs">
                            U
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-gold-100">Utilisateur {dispute.openedBy}</p>
                          <Badge variant="outline" className="text-xs capitalize">
                            {dispute.openedByRole}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gold-100">{dispute.reason}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={cn('text-xs', statusConfig[dispute.status].color)}
                      >
                        {statusConfig[dispute.status].label}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gold-100">
                        <Calendar className="w-3 h-3 text-gold-400/60" />
                        {new Date(dispute.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gold-400 hover:bg-gold-500/10"
                        onClick={() => setSelectedDispute(dispute)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dispute Detail Dialog */}
      {selectedDispute && (
        <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gold-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Litige #{selectedDispute.id}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={cn(
                'p-4 rounded-lg border',
                statusConfig[selectedDispute.status].bgColor,
                statusConfig[selectedDispute.status].color
              )}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Statut: {statusConfig[selectedDispute.status].label}</p>
                    <p className="text-sm opacity-80">
                      Ouvert le {new Date(selectedDispute.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  {selectedDispute.assignedTo && (
                    <Badge variant="outline" className="text-xs">
                      Assigné à: Admin {selectedDispute.assignedTo}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                  <p className="text-sm text-gold-400/60 mb-2">Commande concernée</p>
                  <p className="font-medium text-gold-100">
                    {mockOrders.find(o => o.id === selectedDispute.orderId)?.orderNumber}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                  <p className="text-sm text-gold-400/60 mb-2">Ouvert par</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gold-400" />
                    <span className="text-gold-100 capitalize">{selectedDispute.openedByRole}</span>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                <p className="text-sm text-gold-400/60 mb-2">Raison du litige</p>
                <p className="font-medium text-gold-100">{selectedDispute.reason}</p>
                <p className="text-sm text-gold-400/60 mt-2">{selectedDispute.description}</p>
              </div>

              {/* Evidence */}
              <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                <p className="text-sm text-gold-400/60 mb-3">Pièces jointes</p>
                <div className="flex gap-2">
                  {selectedDispute.evidence.map((file, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {file}
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              {selectedDispute.status !== 'resolved' && selectedDispute.status !== 'closed' && (
                <div className="space-y-3">
                  <p className="text-sm text-gold-400/60">Résolution</p>
                  <Textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Décrivez la résolution du litige..."
                    className="bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50 min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="bg-green-500 text-white hover:bg-green-600"
                      onClick={handleResolve}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Résoudre en faveur du client
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                      onClick={handleResolve}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeter le litige
                    </Button>
                  </div>
                </div>
              )}

              {/* Resolution Display */}
              {selectedDispute.resolution && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-green-400/60 mb-2">Résolution</p>
                  <p className="text-gold-100">{selectedDispute.resolution}</p>
                  {selectedDispute.refundAmount && (
                    <p className="text-sm text-green-400 mt-2">
                      Remboursement: {selectedDispute.refundAmount.toLocaleString()} XOF
                    </p>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

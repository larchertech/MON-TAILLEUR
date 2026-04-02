import { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MapPin
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

const roleColors = {
  client: 'border-blue-500 text-blue-400',
  tailleur: 'border-gold-500 text-gold-400',
  livreur: 'border-green-500 text-green-400',
  admin: 'border-purple-500 text-purple-400',
};

const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/50',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  suspended: 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: mockUsers.length,
    clients: mockUsers.filter(u => u.role === 'client').length,
    tailleurs: mockUsers.filter(u => u.role === 'tailleur').length,
    livreurs: mockUsers.filter(u => u.role === 'livreur').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Gestion des utilisateurs</h1>
          <p className="text-gold-400/60 mt-1">Gérez tous les utilisateurs de la plateforme</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gold-100">Ajouter un nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Prénom</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="Prénom" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Nom</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="Nom" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Email</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="email@exemple.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Téléphone</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="+225 0123456789" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-gold-400/60">Rôle</label>
                <select className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100">
                  <option value="client">Client</option>
                  <option value="tailleur">Tailleur</option>
                  <option value="livreur">Livreur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                Annuler
              </Button>
              <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                Créer l'utilisateur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Total</p>
            <p className="text-2xl font-bold text-gold-100">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Clients</p>
            <p className="text-2xl font-bold text-blue-400">{stats.clients}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Tailleurs</p>
            <p className="text-2xl font-bold text-gold-400">{stats.tailleurs}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Livreurs</p>
            <p className="text-2xl font-bold text-green-400">{stats.livreurs}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20 hidden lg:block">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Admins</p>
            <p className="text-2xl font-bold text-purple-400">{stats.admins}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedRole === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('all')}
                className={selectedRole === 'all' 
                  ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
                  : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
                }
              >
                Tous
              </Button>
              <Button
                variant={selectedRole === 'client' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('client')}
                className={selectedRole === 'client' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
                }
              >
                Clients
              </Button>
              <Button
                variant={selectedRole === 'tailleur' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('tailleur')}
                className={selectedRole === 'tailleur' 
                  ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
                  : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
                }
              >
                Tailleurs
              </Button>
              <Button
                variant={selectedRole === 'livreur' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('livreur')}
                className={selectedRole === 'livreur' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }
              >
                Livreurs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-dark-900 border-gold-500/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Utilisateur</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Rôle</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Statut</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gold-400/60">Inscription</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gold-400/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-gold-500/10 hover:bg-gold-500/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-gold-500/30">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-gold-500 text-dark-950">
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gold-100">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gold-400/60">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gold-100">
                          <Mail className="w-3 h-3 text-gold-400/60" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gold-100">
                          <Phone className="w-3 h-3 text-gold-400/60" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={cn('capitalize', roleColors[user.role])}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={cn('capitalize', statusColors[user.status])}
                      >
                        {user.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {user.status === 'inactive' && <XCircle className="w-3 h-3 mr-1" />}
                        {user.status === 'suspended' && <Clock className="w-3 h-3 mr-1" />}
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gold-100">
                        <Calendar className="w-3 h-3 text-gold-400/60" />
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
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
                            onClick={() => setSelectedUser(user)}
                          >
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gold-100 hover:bg-gold-500/10 cursor-pointer">
                            Envoyer un message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                            Suspendre
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gold-100">Profil utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20 border-4 border-gold-500/30">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-gold-500 text-dark-950 text-2xl">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gold-100">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={cn('capitalize', roleColors[selectedUser.role])}>
                      {selectedUser.role}
                    </Badge>
                    <Badge variant="outline" className={cn('capitalize', statusColors[selectedUser.status])}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gold-400/60">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedUser.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedUser.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20 text-center">
                  <p className="text-2xl font-bold text-gold-400">12</p>
                  <p className="text-sm text-gold-400/60">Commandes</p>
                </div>
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20 text-center">
                  <p className="text-2xl font-bold text-gold-400">1.2M</p>
                  <p className="text-sm text-gold-400/60">XOF dépensés</p>
                </div>
                <div className="p-4 rounded-lg bg-dark-950 border border-gold-500/20 text-center">
                  <p className="text-2xl font-bold text-gold-400">4.8</p>
                  <p className="text-sm text-gold-400/60">Note moyenne</p>
                </div>
              </div>

              {/* Additional Info for Tailleurs */}
              {selectedUser.role === 'tailleur' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gold-100">Informations tailleur</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-dark-950 border border-gold-500/20">
                      <p className="text-sm text-gold-400/60">Spécialité</p>
                      <p className="text-gold-100">Haute Couture Africaine</p>
                    </div>
                    <div className="p-3 rounded-lg bg-dark-950 border border-gold-500/20">
                      <p className="text-sm text-gold-400/60">Expérience</p>
                      <p className="text-gold-100">15 ans</p>
                    </div>
                    <div className="p-3 rounded-lg bg-dark-950 border border-gold-500/20">
                      <p className="text-sm text-gold-400/60">Localisation</p>
                      <p className="text-gold-100 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Cocody, Abidjan
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-dark-950 border border-gold-500/20">
                      <p className="text-sm text-gold-400/60">Note</p>
                      <p className="text-gold-100 flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                        4.8 (127 avis)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                  Envoyer un message
                </Button>
                <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                  Modifier le profil
                </Button>
                {selectedUser.status === 'active' ? (
                  <Button variant="destructive">
                    Suspendre
                  </Button>
                ) : (
                  <Button className="bg-green-500 text-white hover:bg-green-600">
                    Réactiver
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockProducts } from '@/data/mockData';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

const categoryColors = {
  tissu: 'border-purple-500 text-purple-400',
  accessoire: 'border-blue-500 text-blue-400',
  fourniture: 'border-green-500 text-green-400',
};

const categoryLabels = {
  tissu: 'Tissu',
  accessoire: 'Accessoire',
  fourniture: 'Fourniture',
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockProducts.length,
    tissu: mockProducts.filter(p => p.category === 'tissu').length,
    accessoire: mockProducts.filter(p => p.category === 'accessoire').length,
    fourniture: mockProducts.filter(p => p.category === 'fourniture').length,
    totalValue: mockProducts.reduce((sum, p) => sum + p.price * p.stock, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Gestion des produits</h1>
          <p className="text-gold-400/60 mt-1">Gérez le catalogue du marketplace</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gold-100">Ajouter un nouveau produit</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-gold-400/60">Nom du produit</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="Nom du produit" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Catégorie</label>
                <select className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100">
                  <option value="tissu">Tissu</option>
                  <option value="accessoire">Accessoire</option>
                  <option value="fourniture">Fourniture</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Sous-catégorie</label>
                <Input className="bg-dark-950 border-gold-500/30 text-gold-100" placeholder="Ex: Wax, Bazin..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Prix</label>
                <Input 
                  type="number" 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Stock</label>
                <Input 
                  type="number" 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-gold-400/60">Description</label>
                <textarea 
                  className="w-full h-20 px-3 py-2 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100 resize-none"
                  placeholder="Description du produit..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                Annuler
              </Button>
              <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                Créer le produit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Total produits</p>
            <p className="text-2xl font-bold text-gold-100">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Tissus</p>
            <p className="text-2xl font-bold text-purple-400">{stats.tissu}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Accessoires</p>
            <p className="text-2xl font-bold text-blue-400">{stats.accessoire}</p>
          </CardContent>
        </Card>
        <Card className="bg-dark-900 border-gold-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-gold-400/60">Valeur stock</p>
            <p className="text-2xl font-bold text-green-400">{(stats.totalValue / 1000000).toFixed(1)}M XOF</p>
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
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-dark-950 border-gold-500/30 text-gold-100 placeholder:text-gold-400/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' 
                  ? 'bg-gold-500 text-dark-950 hover:bg-gold-600' 
                  : 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
                }
              >
                Tous
              </Button>
              <Button
                variant={selectedCategory === 'tissu' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('tissu')}
                className={selectedCategory === 'tissu' 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                }
              >
                Tissus
              </Button>
              <Button
                variant={selectedCategory === 'accessoire' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('accessoire')}
                className={selectedCategory === 'accessoire' 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
                }
              >
                Accessoires
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="bg-dark-900 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 group"
          >
            <CardContent className="p-4">
              {/* Image */}
              <div className="relative aspect-square rounded-lg bg-dark-950 overflow-hidden mb-4">
                {product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gold-400/30" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className={cn('text-xs', categoryColors[product.category])}>
                    {categoryLabels[product.category]}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-gold-100 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gold-400/60">{product.vendorName}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  <span className="text-sm text-gold-100">{product.rating}</span>
                  <span className="text-xs text-gold-400/60">({product.reviewsCount})</span>
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gold-400">
                      {product.price.toLocaleString()} XOF
                    </p>
                    {product.comparePrice && (
                      <p className="text-xs text-gold-400/40 line-through">
                        {product.comparePrice.toLocaleString()} XOF
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-sm',
                      product.stock < 10 ? 'text-red-400' : 'text-green-400'
                    )}>
                      {product.stock} en stock
                    </p>
                  </div>
                </div>

                {/* Stock Bar */}
                <Progress 
                  value={Math.min((product.stock / 100) * 100, 100)} 
                  className="h-1.5 bg-dark-800"
                />

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gold-400/40">SKU: {product.sku}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gold-400 hover:bg-gold-500/10">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-dark-900 border-gold-500/30">
                      <DropdownMenuItem 
                        className="text-gold-100 hover:bg-gold-500/10 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="bg-dark-900 border-gold-500/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gold-100">Modifier le produit</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-gold-400/60">Nom du produit</label>
                <Input 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  defaultValue={selectedProduct.name}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Catégorie</label>
                <select 
                  className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100"
                  defaultValue={selectedProduct.category}
                >
                  <option value="tissu">Tissu</option>
                  <option value="accessoire">Accessoire</option>
                  <option value="fourniture">Fourniture</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Sous-catégorie</label>
                <Input 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  defaultValue={selectedProduct.subcategory}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Prix</label>
                <Input 
                  type="number" 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  defaultValue={selectedProduct.price}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gold-400/60">Stock</label>
                <Input 
                  type="number" 
                  className="bg-dark-950 border-gold-500/30 text-gold-100" 
                  defaultValue={selectedProduct.stock}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-gold-400/60">Description</label>
                <textarea 
                  className="w-full h-20 px-3 py-2 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100 resize-none"
                  defaultValue={selectedProduct.description}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                onClick={() => setSelectedProduct(null)}
              >
                Annuler
              </Button>
              <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                Enregistrer les modifications
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

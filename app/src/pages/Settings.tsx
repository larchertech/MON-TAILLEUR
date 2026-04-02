import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail,
  Globe,
  Palette,
  Save,
  Key
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    disputes: true,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient-gold">Paramètres</h1>
        <p className="text-gold-400/60 mt-1">Configurez votre espace d'administration</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-dark-900 border border-gold-500/20 flex-wrap h-auto">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <Shield className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger 
            value="payment"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Paiement
          </TabsTrigger>
          <TabsTrigger 
            value="general"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-950"
          >
            <Settings className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 text-2xl font-bold">
                  SA
                </div>
                <div>
                  <Button variant="outline" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                    Changer la photo
                  </Button>
                  <p className="text-sm text-gold-400/60 mt-2">JPG, PNG ou GIF. Max 2MB.</p>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Prénom</label>
                  <Input 
                    defaultValue="Super" 
                    className="bg-dark-950 border-gold-500/30 text-gold-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Nom</label>
                  <Input 
                    defaultValue="Admin" 
                    className="bg-dark-950 border-gold-500/30 text-gold-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Email</label>
                  <Input 
                    defaultValue="admin@montailleur.com" 
                    className="bg-dark-950 border-gold-500/30 text-gold-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Téléphone</label>
                  <Input 
                    defaultValue="+225 0123456789" 
                    className="bg-dark-950 border-gold-500/30 text-gold-100"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Notifications email</p>
                    <p className="text-sm text-gold-400/60">Recevoir les notifications par email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Notifications push</p>
                    <p className="text-sm text-gold-400/60">Recevoir les notifications push</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Nouvelles commandes</p>
                    <p className="text-sm text-gold-400/60">Être notifié des nouvelles commandes</p>
                  </div>
                  <Switch 
                    checked={notifications.orders}
                    onCheckedChange={(checked) => setNotifications({...notifications, orders: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Nouveaux litiges</p>
                    <p className="text-sm text-gold-400/60">Être notifié des nouveaux litiges</p>
                  </div>
                  <Switch 
                    checked={notifications.disputes}
                    onCheckedChange={(checked) => setNotifications({...notifications, disputes: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Marketing</p>
                    <p className="text-sm text-gold-400/60">Recevoir les emails marketing</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Sécurité du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-gold-400/60">Sécurisez votre compte avec 2FA</p>
                  </div>
                  <Switch 
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 font-medium">Alertes de connexion</p>
                    <p className="text-sm text-gold-400/60">Être notifié des nouvelles connexions</p>
                  </div>
                  <Switch 
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({...security, loginAlerts: checked})}
                  />
                </div>
                <Separator className="bg-gold-500/20" />
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Délai d'expiration de session (minutes)</label>
                  <Input 
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    className="bg-dark-950 border-gold-500/30 text-gold-100 w-32"
                  />
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h4 className="text-gold-100 font-medium mb-4">Changer le mot de passe</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Mot de passe actuel</label>
                    <Input 
                      type="password"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Nouveau mot de passe</label>
                    <Input 
                      type="password"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Confirmer le mot de passe</label>
                    <Input 
                      type="password"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                  <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                    <Key className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Configuration des paiements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-gold-100 font-medium">CinetPay</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">API Key</label>
                    <Input 
                      type="password"
                      defaultValue="cp_test_xxxxxxxxxxxx"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Site ID</label>
                    <Input 
                      defaultValue="123456"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <span className="text-gold-100">Activer CinetPay</span>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div className="space-y-4">
                <h4 className="text-gold-100 font-medium">Stripe</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Clé publique</label>
                    <Input 
                      defaultValue="pk_test_xxxxxxxxxxxx"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Clé secrète</label>
                    <Input 
                      type="password"
                      defaultValue="sk_test_xxxxxxxxxxxx"
                      className="bg-dark-950 border-gold-500/30 text-gold-100"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <span className="text-gold-100">Activer Stripe</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="bg-dark-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-gold-100">Paramètres généraux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Nom de l'application</label>
                  <Input 
                    defaultValue="MON TAILLEUR" 
                    className="bg-dark-950 border-gold-500/30 text-gold-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Description</label>
                  <textarea 
                    defaultValue="La plateforme de référence pour la couture africaine"
                    className="w-full h-20 px-3 py-2 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Langue par défaut</label>
                    <select className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100">
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gold-400/60">Devise</label>
                    <select className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100">
                      <option value="XOF">XOF (FCFA)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gold-400/60">Fuseau horaire</label>
                  <select className="w-full h-10 px-3 rounded-md bg-dark-950 border border-gold-500/30 text-gold-100">
                    <option value="Africa/Abidjan">Africa/Abidjan (GMT+0)</option>
                    <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  </select>
                </div>
              </div>

              <Separator className="bg-gold-500/20" />

              <div>
                <h4 className="text-gold-100 font-medium mb-4">Intégrations</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gold-100 font-medium">Google Maps</p>
                        <p className="text-sm text-gold-400/60">Clé API configurée</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-gold-100 font-medium">Firebase</p>
                        <p className="text-sm text-gold-400/60">Notifications push activées</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-dark-950 border border-gold-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Palette className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gold-100 font-medium">Cloudinary</p>
                        <p className="text-sm text-gold-400/60">Stockage média configuré</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-dark-950 hover:bg-gold-600">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

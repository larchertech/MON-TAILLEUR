<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'role',
        'status',
        'avatar',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // JWT Methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,
            'email' => $this->email,
        ];
    }

    // Relationships
    public function measurements(): HasOne
    {
        return $this->hasOne(Measurement::class);
    }

    public function portfolioItems(): HasMany
    {
        return $this->hasMany(PortfolioItem::class, 'tailleur_id');
    }

    public function ordersAsClient(): HasMany
    {
        return $this->hasMany(Order::class, 'client_id');
    }

    public function ordersAsTailleur(): HasMany
    {
        return $this->hasMany(Order::class, 'tailleur_id');
    }

    public function ordersAsLivreur(): HasMany
    {
        return $this->hasMany(Order::class, 'livreur_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'vendor_id');
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_participants');
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    // Scopes
    public function scopeClients($query)
    {
        return $query->where('role', 'client');
    }

    public function scopeTailleurs($query)
    {
        return $query->where('role', 'tailleur');
    }

    public function scopeLivreurs($query)
    {
        return $query->where('role', 'livreur');
    }

    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Accessors
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    // Helper methods
    public function isClient(): bool
    {
        return $this->role === 'client';
    }

    public function isTailleur(): bool
    {
        return $this->role === 'tailleur';
    }

    public function isLivreur(): bool
    {
        return $this->role === 'livreur';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}

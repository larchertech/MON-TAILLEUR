<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'client_id',
        'tailleur_id',
        'livreur_id',
        'status',
        'payment_status',
        'total_amount',
        'deposit_amount',
        'final_amount',
        'currency',
        'measurement_id',
        'delivery_address',
        'delivery_date',
        'estimated_delivery_date',
        'notes',
    ];

    protected $casts = [
        'delivery_address' => 'json',
        'total_amount' => 'decimal:2',
        'deposit_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'delivery_date' => 'datetime',
        'estimated_delivery_date' => 'datetime',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_NEGOTIATING = 'negotiating';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_READY = 'ready';
    const STATUS_SHIPPED = 'shipped';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_DISPUTED = 'disputed';

    // Payment status constants
    const PAYMENT_PENDING = 'pending';
    const PAYMENT_DEPOSIT_PAID = 'deposit_paid';
    const PAYMENT_ESCROW_HELD = 'escrow_held';
    const PAYMENT_RELEASED = 'released';
    const PAYMENT_REFUNDED = 'refunded';
    const PAYMENT_FAILED = 'failed';

    // Relationships
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function tailleur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tailleur_id');
    }

    public function livreur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'livreur_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function measurement(): BelongsTo
    {
        return $this->belongsTo(Measurement::class);
    }

    public function negotiations(): HasMany
    {
        return $this->hasMany(Negotiation::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function dispute(): HasOne
    {
        return $this->hasOne(Dispute::class);
    }

    public function chat(): HasOne
    {
        return $this->hasOne(Chat::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', self::STATUS_IN_PROGRESS);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    // Helper methods
    public function canNegotiate(): bool
    {
        return in_array($this->status, [self::STATUS_PENDING, self::STATUS_NEGOTIATING]);
    }

    public function canCancel(): bool
    {
        return in_array($this->status, [self::STATUS_PENDING, self::STATUS_NEGOTIATING, self::STATUS_CONFIRMED]);
    }

    public function getProgressPercentage(): int
    {
        $progressMap = [
            self::STATUS_PENDING => 10,
            self::STATUS_NEGOTIATING => 20,
            self::STATUS_CONFIRMED => 30,
            self::STATUS_IN_PROGRESS => 50,
            self::STATUS_READY => 70,
            self::STATUS_SHIPPED => 85,
            self::STATUS_DELIVERED => 95,
            self::STATUS_COMPLETED => 100,
            self::STATUS_CANCELLED => 0,
            self::STATUS_DISPUTED => 0,
        ];

        return $progressMap[$this->status] ?? 0;
    }
}

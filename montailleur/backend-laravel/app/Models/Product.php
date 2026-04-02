<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'name',
        'description',
        'category',
        'type', // 'tissu', 'accessoire', 'fourniture'
        'price',
        'stock_quantity',
        'images',
        'colors',
        'sizes',
        'status', // 'active', 'inactive'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
        'colors' => 'array',
        'sizes' => 'array',
    ];

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
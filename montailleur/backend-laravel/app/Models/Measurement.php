<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Measurement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'height',
        'chest',
        'waist',
        'hips',
        'shoulders',
        'arm_length',
        'inseam',
        'neck',
        'sleeve_length',
        'thigh',
        'calf',
        'method', // 'manual', 'ai'
        'ai_confidence_score',
    ];

    protected $casts = [
        'height' => 'decimal:2',
        'chest' => 'decimal:2',
        'waist' => 'decimal:2',
        'hips' => 'decimal:2',
        'shoulders' => 'decimal:2',
        'arm_length' => 'decimal:2',
        'inseam' => 'decimal:2',
        'neck' => 'decimal:2',
        'sleeve_length' => 'decimal:2',
        'thigh' => 'decimal:2',
        'calf' => 'decimal:2',
        'ai_confidence_score' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
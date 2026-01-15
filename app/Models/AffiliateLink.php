<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AffiliateLink extends Model
{
    protected $fillable = [
        'product_id',
        'vendor_name',
        'url',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function clicks()
    {
        return $this->hasMany(Click::class);
    }
}

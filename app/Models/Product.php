<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_url',
        'category',
    ];

    public function affiliateLinks()
    {
        return $this->hasMany(AffiliateLink::class);
    }
}

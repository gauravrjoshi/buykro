<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    protected $fillable = [
        'affiliate_link_id',
        'ip_address',
        'user_agent',
    ];

    public function affiliateLink()
    {
        return $this->belongsTo(AffiliateLink::class);
    }
}

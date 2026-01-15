<?php

namespace App\Http\Controllers;

use App\Models\AffiliateLink;
use App\Models\Click;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $link = AffiliateLink::findOrFail($id);

        Click::create([
            'affiliate_link_id' => $link->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->away($link->url);
    }
}

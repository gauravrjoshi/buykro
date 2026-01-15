<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AffiliateLink;
use App\Models\Product;
use Illuminate\Http\Request;

class AffiliateLinkController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'vendor_name' => 'required|string|max:255',
            'url' => 'required|url',
        ]);

        $product->affiliateLinks()->create($validated);

        return back()->with('success', 'Affiliate link added successfully.');
    }

    public function update(Request $request, AffiliateLink $affiliateLink)
    {
        $validated = $request->validate([
            'vendor_name' => 'required|string|max:255',
            'url' => 'required|url',
        ]);

        $affiliateLink->update($validated);

        return back()->with('success', 'Affiliate link updated successfully.');
    }

    public function destroy(AffiliateLink $affiliateLink)
    {
        $affiliateLink->delete();
        return back()->with('success', 'Affiliate link removed successfully.');
    }
}

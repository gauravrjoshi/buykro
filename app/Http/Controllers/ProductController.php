<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'products' => Product::with('affiliateLinks')->latest()->get(),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('affiliateLinks')->where('slug', $slug)->firstOrFail();

        // Prepare meta for social sharing (SSR)
        $meta = [
            'title' => $product->title . ' | SW BuyKro',
            'description' => \Illuminate\Support\Str::limit(strip_tags($product->description), 160),
            'image' => \Illuminate\Support\Str::startsWith($product->image_url, ['http://', 'https://']) ? $product->image_url : asset($product->image_url),
            'url' => route('products.show', $product->slug),
            'type' => 'product',
        ];

        // Use withViewData to explicitly pass data to the root template
        return Inertia::render('ProductDetail', [
            'product' => $product,
        ])->withViewData(['meta' => $meta]);
    }
}

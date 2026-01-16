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
            'image' => $product->image_url,
            'url' => route('products.show', $product->slug),
            'type' => 'product',
        ];

        \Illuminate\Support\Facades\View::share('meta', $meta);

        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }
}

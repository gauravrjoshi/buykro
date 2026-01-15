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

        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }
}

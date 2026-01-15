<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\AffiliateLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'title' => 'iPhone 15 Pro',
                'description' => 'Experience the future of mobile technology with the iPhone 15 Pro, featuring a titanium design and advanced camera system.',
                'category' => 'Smartphones',
                'image_url' => '/images/products/iphone.png',
                'links' => [
                    ['vendor' => 'Apple Store', 'url' => 'https://www.apple.com/iphone-15-pro/'],
                    ['vendor' => 'Amazon', 'url' => 'https://www.amazon.com/iphone-15-pro/'],
                ]
            ],
            [
                'title' => 'MacBook Air M2',
                'description' => 'The redesigned MacBook Air is more portable than ever and features the blazing-fast M2 chip for exceptional performance.',
                'category' => 'Laptops',
                'image_url' => '/images/products/macbook.png',
                'links' => [
                    ['vendor' => 'Apple Store', 'url' => 'https://www.apple.com/macbook-air-m2/'],
                    ['vendor' => 'Amazon', 'url' => 'https://www.amazon.com/macbook-air-m2/'],
                    ['vendor' => 'Best Buy', 'url' => 'https://www.bestbuy.com/macbook-air-m2/'],
                ]
            ],
            [
                'title' => 'Sony WH-1000XM5',
                'description' => 'Enjoy industry-leading noise cancellation and exceptional sound quality with the Sony WH-1000XM5 wireless headphones.',
                'category' => 'Audio',
                'image_url' => '/images/products/sony.png',
                'links' => [
                    ['vendor' => 'Sony Store', 'url' => 'https://www.sony.com/electronics/headband-headphones/wh-1000xm5'],
                    ['vendor' => 'Amazon', 'url' => 'https://www.amazon.com/sony-wh-1000xm5/'],
                ]
            ],
            [
                'title' => 'Nintendo Switch OLED',
                'description' => 'Play your favorite games on a vibrant 7-inch OLED screen with the Nintendo Switch OLED model.',
                'category' => 'Gaming',
                'image_url' => '/images/products/switch.png',
                'links' => [
                    ['vendor' => 'Nintendo Store', 'url' => 'https://www.nintendo.com/switch/system/oled-model/'],
                    ['vendor' => 'Amazon', 'url' => 'https://www.amazon.com/nintendo-switch-oled/'],
                ]
            ],
        ];

        foreach ($products as $pData) {
            $product = Product::create([
                'title' => $pData['title'],
                'slug' => Str::slug($pData['title']),
                'description' => $pData['description'],
                'category' => $pData['category'],
                'image_url' => $pData['image_url'],
            ]);

            foreach ($pData['links'] as $lData) {
                AffiliateLink::create([
                    'product_id' => $product->id,
                    'vendor_name' => $lData['vendor'],
                    'url' => $lData['url'],
                ]);
            }
        }
    }
}

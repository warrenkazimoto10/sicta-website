<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $this->call([
            AdminUserSeeder::class,
            StationSeeder::class,
            SlideSeeder::class,
            PageSectionSeeder::class,
            ArticleSeeder::class,
            ServiceSeeder::class,
            AboutSeeder::class,
            MapPointSeeder::class,
        ]);
    }
}

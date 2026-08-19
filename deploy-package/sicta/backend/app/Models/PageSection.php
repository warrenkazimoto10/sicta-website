<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PageSection extends Model {
    protected $fillable = ['page', 'section_key', 'value', 'type'];

    public static function get(string $page, string $key, string $default = ''): string {
        return static::where('page', $page)->where('section_key', $key)->value('value') ?? $default;
    }
}

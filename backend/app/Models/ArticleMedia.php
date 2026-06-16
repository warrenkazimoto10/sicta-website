<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ArticleMedia extends Model {
    protected $table = 'article_media';
    protected $fillable = ['article_id', 'path', 'filename', 'type', 'order'];

    public function article() {
        return $this->belongsTo(Article::class);
    }

    public function getUrlAttribute(): string {
        return asset('storage/' . $this->path);
    }
}

<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\JsonResponse;

class PageSectionController extends Controller
{
    public function index(string $page): JsonResponse
    {
        $sections = PageSection::where('page', $page)
            ->get()
            ->mapWithKeys(function ($s) {
                // Les images sont renvoyées en URL absolue
                $value = $s->type === 'image' && $s->value
                    ? asset('storage/' . $s->value)
                    : $s->value;
                return [$s->section_key => $value];
            });

        return response()->json(['success' => true, 'data' => $sections]);
    }
}

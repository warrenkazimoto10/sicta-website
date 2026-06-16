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
            ->pluck('value', 'section_key');

        return response()->json(['success' => true, 'data' => $sections]);
    }
}

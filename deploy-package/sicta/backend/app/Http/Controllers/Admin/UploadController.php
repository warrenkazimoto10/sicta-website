<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function image(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:20480',
        ]);

        $path = ImageUploadService::store($request->file('image'), 'uploads');

        return response()->json([
            'data' => [
                'filePath' => asset('storage/' . $path)
            ]
        ]);
    }
}

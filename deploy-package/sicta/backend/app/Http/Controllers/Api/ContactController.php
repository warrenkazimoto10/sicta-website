<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MessageContact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nom_complet' => 'required|string|max:150',
            'telephone'   => 'required|string|max:25',
            'email'       => 'required|email|max:150',
            'sujet'       => 'required|string|max:255',
            'message'     => 'required|string|max:5000',
        ]);

        MessageContact::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Message envoyé. Nous vous répondrons sous 24h.',
            'data' => $data
        ], 201);
    }
}

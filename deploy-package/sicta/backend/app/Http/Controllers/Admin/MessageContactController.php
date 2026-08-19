<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\MessageContact;
use Illuminate\Http\Request;

class MessageContactController extends Controller {
    public function index(Request $request) {
        $query = MessageContact::latest();
        if ($request->filled('lu')) $query->where('lu', $request->lu === '1');
        if ($request->filled('search')) {
            $s = '%'.$request->search.'%';
            $query->where(function($q) use ($s) {
                $q->where('nom_complet', 'like', $s)->orWhere('email', 'like', $s)->orWhere('sujet', 'like', $s);
            });
        }
        $messages = $query->paginate($request->input('per_page', 20))->withQueryString();
        $non_lus = MessageContact::where('lu', false)->count();
        return view('admin.messages.index', compact('messages', 'non_lus'));
    }

    public function show(MessageContact $message) {
        if (!$message->lu) $message->update(['lu' => true]);
        return view('admin.messages.show', compact('message'));
    }

    public function toggleLu(MessageContact $message) {
        $message->update(['lu' => !$message->lu]);
        return back()->with('success', 'Statut mis à jour.');
    }

    public function destroy(MessageContact $message) {
        $message->delete();
        return back()->with('success', 'Message supprimé.');
    }
}

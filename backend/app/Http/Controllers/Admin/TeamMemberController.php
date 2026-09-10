<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::orderBy('ordre')->get();
        return view('admin.team.index', compact('members'));
    }

    public function create() { return view('admin.team.form', ['member' => new TeamMember(['actif' => true])]); }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('photo')) {
            $data['photo'] = ImageUploadService::store($request->file('photo'), 'team');
        }
        TeamMember::create($data);
        return redirect()->route('admin.team.index')->with('success', 'Membre ajouté.');
    }

    public function edit(TeamMember $team) { return view('admin.team.form', ['member' => $team]); }

    public function update(Request $request, TeamMember $team)
    {
        $data = $this->validateData($request);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('photo')) {
            if ($team->photo) Storage::disk('public')->delete($team->photo);
            $data['photo'] = ImageUploadService::store($request->file('photo'), 'team');
        }
        $team->update($data);
        return redirect()->route('admin.team.index')->with('success', 'Membre mis à jour.');
    }

    public function destroy(TeamMember $team)
    {
        if ($team->photo) Storage::disk('public')->delete($team->photo);
        $team->delete();
        return back()->with('success', 'Membre supprimé.');
    }

    public function toggle(TeamMember $team)
    {
        $team->update(['actif' => !$team->actif]);
        return back()->with('success', 'Statut mis à jour.');
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'nom'         => 'required|string|max:255',
            'role'        => 'nullable|string|max:255',
            'email'       => 'nullable|email|max:255',
            'linkedin'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'ordre'       => 'integer|min:0',
            'photo'       => 'nullable|image|max:20480',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    public function index()
    {
        return Nivel::all();
    }

    public function show($id)
    {
        return Nivel::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nivel' => 'required|string|max:255',
        ]);

        return Nivel::create($data);
    }

    public function update(Request $request, $id)
    {
        $nivel = Nivel::findOrFail($id);

        $data = $request->validate([
            'nivel' => 'sometimes|string|max:255',
        ]);

        $nivel->update($data);

        return $nivel;
    }

    public function destroy($id)
    {
        $nivel = Nivel::findOrFail($id);
        $nivel->delete();

        return response()->noContent();
    }

    public function desenvolvedores($id)
    {
        $nivel = Nivel::with('desenvolvedores')->findOrFail($id);
        return $nivel->desenvolvedores;
    }
}

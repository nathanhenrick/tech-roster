<?php

namespace App\Http\Controllers;

use App\Models\Desenvolvedor;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{
    public function index()
    {
        return Desenvolvedor::with('nivel')->get();
    }

    public function show($id)
    {
        return Desenvolvedor::with('nivel')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string|max:255',
            'nivel_id' => 'required|exists:niveis,id'
        ]);

        return Desenvolvedor::create($data);
    }

    public function update(Request $request, $id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);

        $data = $request->validate([
            'nome' => 'sometimes|string|max:255',
            'sexo' => 'sometimes|in:M,F',
            'data_nascimento' => 'sometimes|date',
            'hobby' => 'sometimes|string|max:255',
            'nivel_id' => 'sometimes|exists:niveis,id'
        ]);

        $desenvolvedor->update($data);

        return $desenvolvedor;
    }

    public function destroy($id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        $desenvolvedor->delete();
        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Desenvolvedor;
use Illuminate\Http\Request;

class DesenvolvedorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 2);

        $paginated = Desenvolvedor::with('nivel')
            ->orderBy('id')
            ->paginate($perPage);

        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
                'next_page_url' => $paginated->nextPageUrl(),
                'prev_page_url' => $paginated->previousPageUrl(),
            ]
        ]);
    }



    public function show($id)
    {
        return Desenvolvedor::with('nivel')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F,O',
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
            'sexo' => 'sometimes|in:M,F,O',
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

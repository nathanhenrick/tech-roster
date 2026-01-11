<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'hobby',
        'nivel_id'
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{
    protected $table = 'desenvolvedores';
    use HasFactory;

    protected $fillable = [
        'nivel_id',
        'nome',
        'sexo',
        'hobby',
        'data_nascimento'
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }
}

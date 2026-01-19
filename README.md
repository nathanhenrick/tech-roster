# Tech Roster

Sistema de gerenciamento de desenvolvedores e seus níveis de habilidade, com autenticação de usuários, registro e login. Frontend em Vue/TypeScript e backend em Laravel/Blade.

## Tecnologias

* **Frontend:** React + TypeScript + SCSS
* **Backend:** Laravel
* **Banco de dados:** PostgreSQL (via Docker)
* **Orquestração de containers:** Docker / Docker Compose

## Estrutura do Projeto
```bash
tech-roster/
├── backend/ # Laravel API
├── frontend/ # SPA em React/TypeScript
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

* Docker e Docker Compose
* Node.js e npm
* PHP >= 8.1
* Composer

## Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/nathanhenrick/tech-roster.git
cd tech-roster
```

Criar o .env do backend:
```bash
cd backend
copy .env.example .env  # Windows
# ou
cp .env.example .env    # Linux/Mac
```

Ajuste os campos do banco de dados para usar o container do PostgreSQL:
```bash
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=techrosterdb
DB_USERNAME=admin
DB_PASSWORD=rz6nVN541@&O
```

Os demais campos podem permanecer como estão no .env.example.

Rodar migrations e seeders dentro do container backend:
```bash
docker-compose exec backend php artisan migrate
```

Instalar dependências do frontend (se necessário):
```bash
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev
```

Suba os containers do Docker:
```bash
docker-compose up -d --build
```
Isso vai construir e iniciar os containers do backend, frontend e PostgreSQL.

## Acesso
Backend: http://localhost:8000

Frontend: http://localhost:3000 (ou porta configurada no Vite)

Todos os serviços estão rodando dentro de containers Docker, não é necessário instalar PHP, Node ou PostgreSQL localmente.

## Funcionalidades
Autenticação de usuários (login, registro e logout)

CRUD de desenvolvedores

CRUD de níveis

Validação de cadastro (não permite criar dev sem nível)

## Observações
Sempre use docker-compose exec para rodar comandos dentro dos containers.

Se recriar o container do PostgreSQL, as tabelas precisarão ser migradas novamente.

## Licença
MIT License. Veja LICENSE para mais detalhes.

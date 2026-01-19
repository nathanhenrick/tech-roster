# Tech Roster

Sistema de gerenciamento de desenvolvedores e seus níveis de habilidade, com autenticação de usuários, registro e login. Frontend em Vue/TypeScript e backend em Laravel/Blade.

## Tecnologias

* **Frontend:** React + TypeScript + SCSS
* **Backend:** Laravel
* **Banco de dados:** PostgreSQL (via Docker)
* **Orquestração de containers:** Docker / Docker Compose

## Estrutura do Projeto

```
tech-roster/
├── backend/    # Laravel API
├── frontend/   # SPA em React/TypeScript
├── docker-compose.yml
├── .env.example
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

2. Siga os passos abaixo:

### Backend

```bash
cd backend
copy .env.example .env       # Copiar o .env antes de instalar
composer install              # Instalar dependências
php artisan serve             # Rodar backend
```

Após clonar o repositório, copie o arquivo .env.example para .env dentro da pasta backend:

cp backend/.env.example backend/.env

Depois de criar o .env, ajuste os campos do banco de dados para que correspondam ao seu container Docker ou ambiente local. Por exemplo:

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=techrosterdb
DB_USERNAME=admin
DB_PASSWORD=rz6nVN541@&O


Os demais campos podem permanecer como estão no .env.example. Não é necessário criar um .env no frontend.

### Frontend

```bash
cd ../frontend
npm install                   # Instalar dependências
npm run dev                    # Rodar frontend
```

3. Acesse:

* Backend: `http://localhost:8000`
* Frontend: `http://localhost:3000` (ou porta indicada pelo Vite)

## Funcionalidades

* Autenticação de usuários (login, registro e logout)
* CRUD de desenvolvedores
* CRUD de níveis
* Validação de cadastro (não permite criar dev sem nível)

## Observações

* Certifique-se de que as portas do Docker não estão sendo usadas por outros serviços.

## Licença

MIT License. Veja [LICENSE](LICENSE) para mais detalhes.

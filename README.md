# Tech Roster

Sistema de gerenciamento de desenvolvedores e seus níveis de habilidade, com autenticação de usuários, registro e login. Frontend em React/TypeScript e backend em Laravel.

## Tecnologias

* **Frontend:** React + TypeScript + SCSS
* **Backend:** Laravel
* **Banco de dados:** PostgreSQL (via Docker)
* **Orquestração de containers:** Docker / Docker Compose

## Estrutura do Projeto

```bash
tech-roster/
├── backend/    # Laravel API
├── frontend/   # SPA em React/TypeScript
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

* Docker e Docker Compose
* Node.js e npm
* PHP >= 8.1
* Composer

## Instalação e execução do zero

1. Clone o repositório:

```bash
git clone https://github.com/nathanhenrick/tech-roster.git
cd tech-roster
```

2. Criar o .env do backend:

```bash
cd backend
copy .env.example .env  # Windows
# ou
cp .env.example .env       # Linux/Mac

code .
```

3. Ajuste os campos do banco de dados para usar o container do PostgreSQL:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=techrosterdb
DB_USERNAME=admin
DB_PASSWORD=rz6nVN541@&O
```

Os demais campos podem permanecer como estão no `.env.example`.

4. Voltar para a pasta root
```bash
code ..
```

5. Instalar dependências do backend e gerar key dentro do container:

```bash
docker-compose run --rm backend bash
composer install
php artisan key:generate
php artisan migrate
exit
```

6. Suba os containers do Docker:

```bash
docker-compose up -d
```

Isso vai construir e iniciar os containers do backend, frontend e PostgreSQL.

## Acesso

* Backend: [http://localhost:8000](http://localhost:8000)
* Frontend: [http://localhost:3000](http://localhost:3000) (ou porta configurada no Vite)

Todos os serviços estão rodando dentro de containers Docker, não é necessário instalar PHP, Node ou PostgreSQL localmente.

## Funcionalidades

* Autenticação de usuários (login, registro e logout)
* CRUD de desenvolvedores
* CRUD de níveis
* Validação de cadastro (não permite criar dev sem nível)

## Observações

* Atente-se se não há outros projetos rodando nas mesmas portas.

## Licença

MIT License. Veja [LICENSE](LICENSE) para mais detalhes.

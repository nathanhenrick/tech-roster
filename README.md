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

4. Suba os containers do Docker:

```bash
cd ..  # voltar para a raiz
docker-compose up -d --build
```

Isso vai construir e iniciar os containers do backend, frontend e PostgreSQL.

5. Instalar dependências do backend dentro do container e gerar a key:

```bash
docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
```

6. Rodar migrations dentro do container backend:

```bash
docker-compose exec backend php artisan migrate
```

7. Instalar dependências e rodar frontend dentro do container:

```bash
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev
```

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

* Sempre use `docker-compose exec` para rodar comandos dentro dos containers.
* Se recriar o container do PostgreSQL, as tabelas precisarão ser migradas novamente.

## Licença

MIT License. Veja [LICENSE](LICENSE) para mais detalhes.

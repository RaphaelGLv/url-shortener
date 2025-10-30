# URL Shortener - monorepo

## Decision making
- You can read the explanation of my decision making in the [DECISIONS.md document](./DECISIONS.md)

## Stacks
- **Monorepo / Package management**: pnpm workspaces
- **Frontend:** Next.js, React, TypeScript
- **Backend:** NestJS, TypeScript
- **Database:** MongoDB
- **Caching:** Redis
- **DevOps:** Docker, Docker Compose
- **Testing:** Jest

## How to run it locally
### Pre-requisites
* [Node.js](https://nodejs.org/en/)
* [pnpm](https://pnpm.io/installation)
* [Docker](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repository
```bash
git clone [https://github.com/RaphaelGLv/url-shortener.git](https://github.com/RaphaelGLv/url-shortener.git)

cd url-shortener
```
### 2. Install dependencies
```bash
pnpm install
```
### 3. Run the containers
```bash
docker compose up --build
```
### 4. That's it! The frontend, backend and database will be running locally!
- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/v0.0.1

## Testing API endpoints (Insomnia)
1. Install [Insomnia](https://insomnia.rest/download)
2. Open Insomnia and go to "Dashboard"
3. Click "Import" (or just drag and drop the following file)
4. Select the file `docs/insomnia_export.yaml` from this repository
5. All setted up! Just open the collection and you are good to go!

## Running Tests (Jest)
- Both Frontend and Backend
``` bash
pnpm test
```

- Backend
``` bash
pnpm --filter @url-shortener/api test
```

- Frontend
``` bash
pnpm --filter @url-shortener/web test
```

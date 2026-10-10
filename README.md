# API de Tarefas — Node.js puro

CRUD de tarefas sem framework (módulo `http` nativo) + importação em massa via CSV com `csv-parse`.

## Como rodar

```bash
npm install
npm run dev
```

## Importar tarefas do CSV

Com o servidor rodando, em outro terminal:

```bash
npm run import
```

## Rotas

| Método | Rota | O que faz |
|---|---|---|
| POST | /tasks | Cria (title e description obrigatórios) |
| GET | /tasks?search=texto | Lista, com filtro opcional por título e descrição |
| PUT | /tasks/:id | Atualiza title e/ou description |
| DELETE | /tasks/:id | Remove |
| PATCH | /tasks/:id/complete | Marca/desmarca como concluída |

## Testes

Exemplos de requisições no arquivo `requests.http` (extensão REST Client do VS Code).

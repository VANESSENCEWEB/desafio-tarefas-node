import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

function notFound(res) {
  return res.writeHead(404).end(JSON.stringify({ message: 'Tarefa não encontrada' }))
}

export const routes = [
  {
    // LISTAR (com filtro opcional: /tasks?search=texto)
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select('tasks', search ? { title: search, description: search } : null)
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    // CRIAR
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body ?? {}

      if (!title || !description) {
        return res.writeHead(400).end(JSON.stringify({ message: 'title e description são obrigatórios' }))
      }
      const now = new Date()
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: now,
        updated_at: now
      }

      database.insert('tasks', task)
      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    // ATUALIZAR (title e/ou description)
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body ?? {}

      if (!title && !description) {
        return res.writeHead(400).end(JSON.stringify({ message: 'Envie title ou description' }))
      }

      if (!database.findById('tasks', id)) return notFound(res)

      database.update('tasks', id, {
        ...(title && { title }),
        ...(description && { description }),
        updated_at: new Date()
      })

      return res.writeHead(204).end()
    }
  },
  {
    // REMOVER
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      if (!database.findById('tasks', id)) return notFound(res)

      database.delete('tasks', id)
      return res.writeHead(204).end()
    }
  },
]

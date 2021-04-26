import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async find(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
    return tasks
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }
}

export const tasksService = new TasksService()

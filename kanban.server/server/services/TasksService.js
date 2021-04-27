import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAll(query = {}) {
    const data = await dbContext.Tasks.find(query)// .populate('Task')
    return data
  }

  async findById(id) {
    const data = await dbContext.Tasks.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createTask(body) {
    return await dbContext.Tasks.create(body)
  }

  async editTask(body) {
    const data = await dbContext.Tasks.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteTask(id) {
    const data = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Task'
  }
}

export const tasksService = new TasksService()

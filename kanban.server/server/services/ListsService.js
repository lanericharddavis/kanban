import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAll(query = {}) {
    const data = await dbContext.Lists.find(query)
    return data
  }

  async getAllListsByBoardId(id) {
    const data = await dbContext.Lists.find({ boardId: id }).populate('Board')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findById(id) {
    const data = await dbContext.Lists.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createList(body) {
    return await dbContext.Lists.create(body)
  }

  async deleteList(id) {
    const data = await dbContext.Lists.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted List'
  }
}

export const listsService = new ListsService()

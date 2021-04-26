import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async find(query = {}) {
    const lists = await dbContext.Lists.find(query)
    return lists
  }

  async findById(id) {
    const list = await dbContext.Lists.findById(id)
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }
}

export const listsService = new ListsService()

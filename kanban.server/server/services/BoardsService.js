import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(query = {}) {
    const data = await dbContext.Boards.find(query)// .populate('Board')
    return data
  }

  async findById(id) {
    const data = await dbContext.Boards.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBoard(body) {
    return await dbContext.Boards.create(body)
  }

  async deleteBoard(id) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Board'
  }
}

export const boardsService = new BoardsService()

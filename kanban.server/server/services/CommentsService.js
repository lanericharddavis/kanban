import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAll(query = {}) {
    const data = await dbContext.Comments.find(query)// .populate('Comment')
    return data
  }

  async getAllCommentsByTaskId(id) {
    const data = await dbContext.Comments.find({ taskId: id }).populate('Task')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findById(id) {
    const data = await dbContext.Comments.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createComment(body) {
    return await dbContext.Comments.create(body)
  }

  async editComment(body) {
    const data = await dbContext.Comments.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteComment(id) {
    const data = await dbContext.Comments.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted Comment'
  }
}

export const commentsService = new CommentsService()

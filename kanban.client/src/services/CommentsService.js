import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
import { logger } from '../utils/Logger'
// import { logger } from '../utils/Logger'

class CommentsService {
  // async getAllComments() {
  //   const res = await api.get('api/Comments')
  //   AppState.Comments = res.data
  //   logger.log(AppState.Comments)
  // }

  async getAllCommentsByTaskId(taskId) {
    try {
      const res = await api.get(`api/tasks/${taskId}/comments`)
      AppState.comments[taskId] = res.data
      logger.log(AppState.comments)
    } catch (error) {
      logger.log(error)
    }
  }

  async getComment(id) {
    try {
      const res = await api.get('api/comments/' + id)
      AppState.activeComment = res.data
    } catch (error) {

    }
  }

  async createComment(newComment) {
    try {
      console.log(newComment)
      await api.post('api/comments', newComment)
      // AppState.comments[newComment.taskId] = res.data
      this.getAllCommentsByTaskId(newComment.taskId)
      Notification.toast('Comment Created', 'success')
    } catch (error) {
      Notification.toast('Error', error, 'error')
    }
  }

  async deleteComment(commentProp) {
    try {
      await api.delete('api/comments/' + commentProp.id)
      AppState.comments[commentProp.taskId] = AppState.comments[commentProp.taskId].filter(comment => comment.id !== commentProp.id)
      // this.getAllCommentsBytaskId(commentProp.taskId)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const commentsService = new CommentsService()

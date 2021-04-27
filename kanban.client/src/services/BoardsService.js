import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class BoardsService {
  async getAllBoards() {
    try {
      const res = await api.get('api/boards')
      AppState.Boards = res.data
    } catch (error) {
      console.error('Can Not getAllBoards from BoardsService')
    }
  }

  async getBoard(id) {
    try {
      const res = await api.get('api/boards/' + id)
      AppState.activeBoard = res.data
    } catch (error) {

    }
  }

  async createBoard(newBoard) {
    try {
      const res = await api.post('api/boards/', newBoard)
      AppState.Boards.push(res.data)
      Notification.toast('Board Created')
    } catch (error) {
      Notification.toast('Error', error, 'error')
    }
  }

  async deleteBoard(id) {
    try {
      await api.delete('api/boards/' + id)
      AppState.Boards = AppState.Boards.filter(board => board.id !== id)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const boardsService = new BoardsService()

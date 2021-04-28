import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
import { logger } from '../utils/Logger'

class ListsService {
  async getAllLists() {
    const res = await api.get('api/lists')
    AppState.lists = res.data
    logger.log(AppState.lists)
  }

  async getAllListsByBoardId(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
    logger.log(AppState.lists)
  }

  async createList(newList) {
    try {
      await api.post('api/lists/', newList)
      this.getAllListsByBoardId(newList.boardId)
      Notification.toast('List Created', 'success')
    } catch (error) {
      Notification.toast('Error', 'warning')
    }
  }

  async deleteList(id) {
    try {
      await api.delete('api/lists/' + id)
      AppState.lists = AppState.lists.filter(list => list.id !== id)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const listsService = new ListsService()

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

  // async getList(id) {
  //   try {
  //     const res = await api.get('api/lists/' + id)
  //     AppState.activeList = res.data
  //   } catch (error) {

  //   }
  // }

  async createList(newList) {
    try {
      const res = await api.post('api/lists/', newList)
      AppState.lists.push(res.data)
      Notification.toast('List Created', 'success')
    } catch (error) {
      Notification.toast('Error', error, 'error')
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

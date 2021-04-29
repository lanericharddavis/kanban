import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
import { logger } from '../utils/Logger'
// import { logger } from '../utils/Logger'

class TasksService {
  // async getAllTasks() {
  //   const res = await api.get('api/tasks')
  //   AppState.tasks = res.data
  //   logger.log(AppState.Tasks)
  // }

  async getAllTasksByListId(listId) {
    try {
      const res = await api.get(`api/lists/${listId}/tasks`)
      AppState.tasks[listId] = res.data
      logger.log(AppState.tasks)
    } catch (error) {
      logger.log(error)
    }
  }

  async getTask(id) {
    try {
      const res = await api.get('api/tasks/' + id)
      AppState.activeTask = res.data
    } catch (error) {

    }
  }

  async createTask(newTask) {
    try {
      const res = await api.post('api/tasks/', newTask)
      AppState.tasks.push(res.data)
      Notification.toast('Task Created', 'success')
    } catch (error) {
      Notification.toast('Error', error, 'error')
    }
  }

  async deleteTask(id) {
    try {
      await api.delete('api/tasks/' + id)
      AppState.tasks = AppState.tasks.filter(task => task.id !== id)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const tasksService = new TasksService()

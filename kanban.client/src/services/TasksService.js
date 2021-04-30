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
      console.log('createtask from the taskService', newTask)
      await api.post('api/tasks', newTask)
      // AppState.tasks[newTask.listId] = res.data
      this.getAllTasksByListId(newTask.listId)
      Notification.toast('Task Created from listServer', 'success')
    } catch (error) {
      Notification.toast('Cannot Create Task', newTask, newTask.listId, 'error')
    }
  }

  async deleteTask(taskProp) {
    try {
      await api.delete('api/tasks/' + taskProp.id)
      AppState.tasks[taskProp.listId] = AppState.tasks[taskProp.listId].filter(task => task.id !== taskProp.id)
      // this.getAllTasksByListId(taskProp.listId)
    } catch (error) {
      Notification.toast('Error:' + error, 'error')
    }
  }
}

export const tasksService = new TasksService()

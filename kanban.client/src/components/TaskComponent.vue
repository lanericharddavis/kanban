<template>
  <div class="task card shadow col-md-11 d-flex flex-direction-column m-2">
    <div class="row align-items-center justify-content-between">
      <div class="col-3 card-body">
        <p class="card-text">
          <u>{{ taskProp.title }}</u>
        </p>
      </div>
      <div class="col-2">
        <i class="fas fa-times text-danger" @click="deleteTask"></i>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-outline-danger m-4" @click="createComment">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
// TODO
// import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
// import Notification from '../utils/Notification'

export default {
  name: 'TaskComponent',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists),
      task: computed(() => AppState.tasks)
    })

    onMounted(async() => {
      try {
        await tasksService.getAllTasksByListId(props.taskProp.id)
      } catch (error) {
        Notification.toast('connot get all tasks by ListId', 'error')
      }
    })
    return {
      state,

      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp)
          Notification.toast('Task Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

      // async createTask() {
      //   try {
      //     await TasksService.createTask(props.Task.id)
      //     Notification.toast('Task Created!')
      //   } catch (error) {
      //     Notification.toast('Task not created')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

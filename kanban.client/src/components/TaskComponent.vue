<template>
  <div class="task card shadow col-4 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row">
      <div class="col-6 card-body">
        <p class="card-text">
          {{ state.list.title }}
        </p>
      </div>
      <div class="col-6">
        <button class="btn btn-outline-danger m-4" @click="deleteTask">
          <i class="fas fa-cross"></i>
        </button>
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
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
// TODO
// import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
// import Notification from '../utils/Notification'

export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists)
    })
    return {
      state,

      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp.id)
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

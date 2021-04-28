<template>
  <div class="list card shadow col-4 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row">
      <div class="col-6 card-body">
        <p class="card-text">
          {{ listProp.title }}
        </p>
      </div>
      <div class="col-6">
        <button class="btn btn-outline-danger m-4" @click="deleteBoard">
          Delete
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-outline-danger m-4" @click="createTask">
          Create Task
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
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

// import Notification from '../utils/Notification'

export default {
  name: 'List',
  props: {
    listProp: {
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

      async deleteList() {
        try {
          await listsService.deleteList(props.listProp.id)
          Notification.toast('List Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },

      async createTask() {
        try {
          await tasksService.createTask(props.list.id)
          Notification.toast('Task Created!', 'success')
        } catch (error) {
          Notification.toast('Task not created', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

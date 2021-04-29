<template>
  <div class="list card shadow col-11 col-md-3 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row list-header">
      <div class="col-12 card-body d-flex align-items-center justify-content-between p-0 mx-3">
        <h3 class="card-text">
          <u>{{ listProp.title }}</u>
        </h3>
        <i class="fas fa-times text-danger" @click="deleteList"></i>
      </div>
    </div>
    <div class="row">
      <div>
        <form class="form-inline" @submit.prevent="createTask">
          <div class="form-group m-2">
            <label for="taskInput" class="col-12 col-md-12 m-2"><strong>Create Task</strong></label>
            <input type="text"
                   class="form-control col-12 col-md-12"
                   id="taskInput"
                   aria-describedby="taskInput"
                   placeholder="Task Name..."
                   v-model="state.newTask.title"
            >
          </div>
          <button type="submit" class="btn btn-primary col-1 col-md-1">
            <strong>+</strong>
          </button>
        </form>

        <!-- <button class="btn btn-outline-danger m-4" @click="createTask">
          Create Task
        </button> -->
      </div>
    </div>
    <div class="row">
      <div class="col">
        TASKS GO HERE
        <Tasks v-for="Task in state.tasks" :key="Task.id" :task-prop="Task" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export default {
  name: 'List',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newTask: {
        listId: route.params.id
      },
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists)
      // task: computed(() => AppState.tasks[listId])
    })
    return {
      state,
      route,
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
.list-header{
  background-color: green;
  height:8vh;
}
</style>

<template>
  <div class="list card shadow col-11 col-md-5 d-flex flex-direction-column m-2">
    <div class="row list-header">
      <div class="col-12 card-body d-flex align-items-center justify-content-between p-0 mx-3">
        <h3 class="card-text text-light">
          <u>{{ listProp.title }}</u>
        </h3>
        <i v-if="state.user.id==state.list.creatorId" class="fas fa-times text-danger hvr-raise" @click="deleteList" title="delete list"></i>
      </div>
    </div>
    <div class="row">
      <div>
        <form class="form-inline" @submit.prevent="createTask">
          <div class="form-group m-2">
            <label for="taskInput" class="col-12 col-md-12 m-2"><strong>Create Task</strong></label>
            <input type="text"
                   class="form-control col-12 col-md-12"
                   aria-describedby="taskInput"
                   placeholder="Task Name..."
                   v-model="state.newTask.title"
            >
          </div>
          <button type="submit" class="btn btn-primary mt-4" title="create task">
            <strong>+</strong>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <task-component v-for="Task in state.tasks" :key="Task.id" :task-prop="Task" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import TaskComponent from './TaskComponent.vue'

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
        listId: props.listProp.id
      },
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks[props.listProp.id])
    })

    onMounted(async() => {
      try {
        await tasksService.getAllTasksByListId(props.listProp.id)
      } catch (error) {
        Notification.toast('connot get all tasks by ListId', 'error')
      }
      try {
        await listsService.getAllListsByBoardId(route.params.id)
      } catch (error) {
        Notification.toast('connot get all lists by boardId', 'error')
      }
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
          state.newTask.listId = props.listProp.id
          await tasksService.createTask(state.newTask)
          Notification.toast('Task Created!', 'success')
          state.newTask = {}
        } catch (error) {
          Notification.toast('Task not created', 'error')
        }
      }
    }
  },
  components: { TaskComponent }
}
</script>

<style lang="scss" scoped>
.list-header{
  background-color: #003800;
  height:8vh;
}

.bg-green{
  background-color: #003800;
}
</style>

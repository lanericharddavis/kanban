<template>
  <div class="task card shadow bg-ltGreen col-md-11 d-flex flex-direction-column m-2">
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
      <div>
        <form class="form-inline" @submit.prevent="createComment">
          <div class="form-group m-2">
            <label for="taskInput" class="col-12 col-md-12 m-2"><strong>Create Comment</strong></label>
            <input type="text"
                   class="form-control col-12 col-md-12"
                   aria-describedby="taskInput"
                   placeholder="Comment Here..."
                   v-model="state.newComment.body"
            >
          </div>
          <button type="submit" class="btn btn-primary mt-4">
            <strong>+</strong>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <CommentComponent v-for="Comment in state.comment" :key="Comment.id" :comment-prop="Comment" />
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
import { commentsService } from '../services/CommentsService'

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
      newComment: {
        taskId: props.taskProp.id
      },
      board: computed(() => AppState.boards),
      list: computed(() => AppState.lists),
      task: computed(() => AppState.tasks),
      comment: computed(() => AppState.comments[props.taskProp.id])
    })

    onMounted(async() => {
      try {
        await tasksService.getAllTasksByListId(props.taskProp.id)
        await commentsService.getAllCommentsByTaskId(props.taskProp.id)
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
      },

      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
          Notification.toast('Comment Created!', 'success')
          state.newComment = {}
        } catch (error) {
          Notification.toast('Comment not created', 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.bg-ltGreen{
background-color: lightgreen;
}
</style>

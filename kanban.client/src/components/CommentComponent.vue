<template>
  <div class="comment-component card shadow col-md-11 d-flex flex-direction-column m-2">
    <div class="row align-items-center justify-content-between">
      <div class="col-3">
        <p>{{ state.user.name }}</p>
      </div>
      <div class="col-3 card-body">
        <p class="card-text">
          <u>{{ commentProp.body }}</u>
        </p>
      </div>
      <div class="col-2">
        <i class="fas fa-times text-danger hvr-raise" @click="deleteComment"></i>
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
// import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
// import Notification from '../utils/Notification'

export default {
  name: 'CommentComponent',
  props: {

    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      // board: computed(() => AppState.boards),
      // list: computed(() => AppState.lists),
      task: computed(() => AppState.tasks),
      comment: computed(() => AppState.comments)
    })

    onMounted(async() => {
      // try {
      //   await tasksService.getAllTasksByListId(props.taskProp.id)
      // } catch (error) {
      //   Notification.toast('connot get all tasks by ListId', 'error')
      // }
      // try {
      //   await commentsService.getAllCommentsByTaskId(props.taskProp.id)
      // } catch (error) {
      //   Notification.toast('connot get all comments by taskId', 'error')
      // }
    })
    return {
      state,

      async deleteComment() {
        try {
          await commentsService.deleteComment(props.commentProp)
          Notification.toast('Comment Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

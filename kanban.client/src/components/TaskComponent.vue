<template>
  <div class="task card shadow bg-ltGreen col-md-11 d-flex flex-direction-column my-4 ml-1">
    <div class="row align-items-center justify-content-between">
      <div class="col-7 col-md-9 card-body">
        <h5 class="card-text">
          {{ taskProp.title }}
        </h5>
      </div>
      <!-- <div class="col-1 col-md-2">
        Button trigger modal
        <i class="far fa-comment-dots hvr-raise text-info" type="button" data-toggle="modal" data-target="#commentModal" title="create comment"></i>
      </div> -->
      <div class="col-1 col-md-1">
        <i v-if="state.user.id==state.task.creatorId" class="fas fa-times text-danger hvr-raise" @click="deleteTask" title="delete task"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <CommentComponent v-for="Comment in state.comment" :key="Comment.id" :comment-prop="Comment" />
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
                   placeholder="Task Name..."
                   v-model="state.newComment.body"
            >
          </div>
          <button type="submit" class="btn btn-primary mt-4" title="create Comment">
            <strong>+</strong>
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <!-- <div
    class="modal fade"
    id="commentModal"
    tabindex="-1"
    aria-labelledby="commentModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="commentModalLabel">
            Create Comment
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form-inline" @submit.prevent="createComment">
            <div class="form-group m-2">
              <input type="text"
                     class="form-control col-12 col-md-12"
                     aria-describedby="taskInput"
                     placeholder="Comment Here..."
                     v-model="state.newComment.body"
              >
            </div>
            <button type="submit" class="btn btn-primary">
              Post
            </button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div> -->
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
    },
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {
        taskId: props.taskProp.id
      },
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
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
          state.newComment.taskId = props.taskProp.id
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
background-color: rgb(85, 138, 85);
}
</style>

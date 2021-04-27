<template>
  <div class="boards card shadow col-4 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row">
      <div class="col-6 card-body">
        <router-link :to="{name: 'BoardDetailPage', params: {id: boardProp.id}}">
          <p class="card-text">
            {{ boardProp.title }}
          </p>
        </router-link>
      </div>
      <div class="col-6">
        <button class="btn btn-outline-danger m-4" @click="deleteBoard">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
// TODO
// import {listsService} from '../services/ListsService'
// import Notification from '../utils/Notification'

export default {
  name: 'Boards',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.boards)
    })
    return {
      state,
      async deleteBoard() {
        try {
          await boardsService.deleteBoard(props.boardProp.id)
          Notification.toast('Board Deleted')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

      // async createList() {
      //   try {
      //     await listsService.createList(props.list.id)
      //     Notification.toast('List Created!')
      //   } catch (error) {
      //     Notification.toast('List not created')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

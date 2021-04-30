<template>
  <div class="boards card shadow col-11 col-md-3 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row">
      <div class="col-12 card-body d-flex justify-content-between">
        <router-link :to="{name: 'BoardDetailPage', params: {id: boardProp.id}}">
          <h3 class="card-text text-green">
            <u>{{ boardProp.title }}</u>
          </h3>
        </router-link>
        <i class="fas fa-times text-danger hvr-raise" @click="deleteBoard"></i>
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
.text-green{
   color: #003800;
}
.hvr-raise:hover{
  position: relative;
  bottom: 2px;
  cursor: pointer;
}

</style>

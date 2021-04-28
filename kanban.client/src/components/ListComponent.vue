<template>
  <div class="lists card shadow col-4 d-flex flex-direction-column m-2" style="width: 18rem;">
    <div class="row">
      <div class="col-6 card-body">
        <p class="card-text">
          LIST
        </p>
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
// import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
// TODO
import { listsService } from '../services/ListsService'
// import Notification from '../utils/Notification'

export default {
  name: 'Lists',
  props: {
    listProp: {
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

      async deleteList() {
        try {
          await listsService.deleteList(props.listProp.id)
          Notification.toast('List Deleted')
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

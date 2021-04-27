<template>
  <div class="board-detail-page container-fluid">
    <div class="row">
      <div v-if="state.boards" class="col boards-page">
        <h1>
          Welcome to the {{ state.boards.title }} Board!
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form class="form-inline" @submit="createList">
          <div class="form-group">
            <label for="listInput">List Title</label>
            <input type="text"
                   class="form-control"
                   id="listInput"
                   aria-describedby="listInput"
                   placeholder="Title..."
            >
          </div>
          <button type="submit" class="btn btn-primary">
            Create List
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <h1>Lists populated here</h1>
      <!-- <List /> -->
    </div>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
// import Notification from '../utils/Notification'
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'BoardDetailPage',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.activeBoard)
    })

    onMounted(async() => {
      try {
        await boardsService.getBoard(route.params.id)
      } catch (error) {
        console.error('Can Not getAllBoards')
      }
    })
    return {
      state
      // async createList() {
      //   try {
      //     await boardsService.createList.state.newBoard)
      //   } catch (error) {
      //     Notification.toast('not passing on the Page', +error, 'error')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

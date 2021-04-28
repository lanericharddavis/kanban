<template>
  <div class="board-detail-page container-fluid">
    <div class="row">
      <div v-if="state.boards" class="col boards-page">
        <h1>
          Welcome to {{ state.boards.title }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form class="form-inline" @submit.prevent="createList">
          <div class="form-group">
            <label for="listInput">List Title</label>
            <input type="text"
                   class="form-control"
                   id="listInput"
                   aria-describedby="listInput"
                   placeholder="Title..."
                   v-model="state.newList.title"
            >
          </div>
          <button type="submit" class="btn btn-primary">
            Create List
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <List v-for="Lists in state.lists" :key="Lists.id" :list-prop="Lists" />
    </div>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
// import Notification from '../utils/Notification'
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'

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
      newList: {
        boardId: route.params.id
      },
      boards: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists)
    })

    onMounted(async() => {
      try {
        await boardsService.getBoard(route.params.id)
      } catch (error) {
        console.error('Can Not getAllBoards')
      }
      try {
        await listsService.getAllListsByBoardId(route.params.id)
      } catch (error) {
        console.error('connot get all lists by BoardId')
      }
    })
    return {
      state,
      route,
      async createList() {
        try {
          await listsService.createList(state.newList)
        } catch (error) {
          Notification.toast('not passing on the Page', 'warning')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

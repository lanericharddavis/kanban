<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col boards-page">
        <h1>Welcome to your Board Collection!</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form class="form-inline" @submit.prevent="createBoard">
          <div class="form-group">
            <label for="boardInput">Board Title</label>
            <input type="text"
                   class="form-control"
                   id="boardInput"
                   aria-describedby="boardInput"
                   placeholder="Title..."
                   v-model="state.newBoard.title"
                   required
            >
          </div>
          <button type="submit" class="btn btn-primary">
            Create Board
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <Boards v-for="board in state.boards" :key="board.id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'

import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'BoardsPage',

  setup() {
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.Boards)
    })

    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        console.error('Can Not getAllBoards')
      }
    })
    return {
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
          state.newBoard = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

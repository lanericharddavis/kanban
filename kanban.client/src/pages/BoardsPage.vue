<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-between">
      <div class="col-12 col-md-4 boards-page">
        <h1>Welcome to your Board Collection!</h1>
      </div>
      <div class="col-12 col-md-4 mt-3">
        <form class="form-inline" @submit.prevent="createBoard">
          <div class="form-group">
            <label for="boardInput" class="mr-2">Create Board</label>
            <input type="text"
                   class="form-control mr-2"
                   id="boardInput"
                   aria-describedby="boardInput"
                   placeholder="Board Name..."
                   v-model="state.newBoard.title"
                   required
            >
          </div>
          <button type="submit" class="btn btn-primary" title="create new board">
            <strong>+</strong>
          </button>
        </form>
      </div>
    </div>
    <div class="row pt-3">
      <Boards class="bg-grey" v-for="board in state.boards" :key="board.id" :board-prop="board" />
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
        // console.error('Can Not getAllBoards')
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
.bg-grey{
  background-color: #3838385e;
}
</style>

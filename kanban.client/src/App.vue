<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-green text-light text-center p-4">
      Created By Cory and Lane | Apr2021
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg-green{
  background-color: #003800;
}

.hvr-raise:hover{
  position: relative;
  bottom: 2px;
  cursor: pointer;
}

</style>

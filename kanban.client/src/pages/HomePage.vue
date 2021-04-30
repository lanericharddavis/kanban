<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <p>Please Login To Access Your Boards</p>
    <h1 class="my-5 bg-green text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white bg-green">Kanban</span>
    </h1>
    <p class="p-0">
      Organize Your Life
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.bg-green{
  background-color: #003800;
}
</style>

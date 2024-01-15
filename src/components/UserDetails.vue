<template>
  <div class="details">
    <img src="" alt="">
    <ul>
      <li>{{user?.name}}</li>
      <li>{{user?.email}}</li>
      <li>{{user?.phone}}</li>
      <li>{{user?.address?.street}}</li>
      <li>{{user?.email}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserDetails",
  props: ['user'],
}
</script>

<style scoped lang="scss">
</style>
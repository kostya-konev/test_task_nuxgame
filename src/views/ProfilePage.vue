<template>
  <div class="user">
    <div class="user__details">
      <h1 class="user__title">Personal account</h1>
      <UserDetails :user="user"/>
    </div>
    <div class="user__actions">
      <BettingActions />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserDetails from "@/components/UserDetails.vue";
import BettingActions from "@/components/BettingActions.vue";

export default {
  components: {BettingActions, UserDetails},
  data() {
    return {
      user: null,
    };
  },
  created() {
    axios.get(`https://jsonplaceholder.typicode.com/users/${this.$route.query.user}`).then((response) => {
      this.user = response.data;
    });
  },
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  flex-direction: row;
  background-color: #15172b;
  color: white;
  min-height: 100vh;

  &__title {
    font-size: 40px;
  }

  &__details {
    border-right: 5px solid black;
    padding: 60px;
  }

}
</style>

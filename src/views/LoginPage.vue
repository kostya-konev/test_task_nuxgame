<template>
  <div class="modal">
    <form @submit.prevent="login" class="form">
      <div class="form__title">Welcome</div>
      <div class="form__input-container">
        <label for="username" class="form__label">Username:</label>
        <input v-model="username" type="text" id="username" required @input="validateUsername" class="form__input"/>
        <p v-if="usernameError" class="form__error">{{ usernameError }}</p>
      </div>
      <div class="form__input-container">
        <label for="phone" class="form__label">Phone number:</label>
        <input v-model="phoneNumber" type="text" id="phone" required @input="validatePhoneNumber" class="form__input"/>
        <p v-if="phoneNumberError" class="form__error">{{ phoneNumberError }}</p>
      </div>

      <button type="submit" class="form__button">Login</button>
      <p v-if="loginError" class="form__authorization-error">{{ 'Username or password are incorrect' }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      username: "",
      phoneNumber: "",
      usernameError: "",
      phoneNumberError: "",
      loginError: false
    };
  },
  methods: {
    validateUsername() {
      this.loginError = false;

      if (!/^[a-zA-Z\s]+$/.test(this.username.trim()) && this.username !== "") {
        this.usernameError = "Username should contain only letters.";
      } else {
        this.usernameError = "";
      }
    },
    validatePhoneNumber() {
      this.loginError = false;

      if (!/^[^a-zA-Z]*x?[0-9]*[^a-zA-Z]*$/.test(this.phoneNumber) && this.phoneNumber !== "") {
        this.phoneNumberError = "Invalid phone number.";
      } else {
        this.phoneNumberError = "";
      }
    },
    login() {
      if (this.usernameError || this.phoneNumberError) {
        return;
      }

      axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
        const userExists = response.data.some(
            (user) => user.username === this.username && user.phone === this.phoneNumber
        );

        if (!userExists) {
          this.loginError = true;
        } else {
          const currentUser = response.data.find(
              (user) => user.username === this.username && user.phone === this.phoneNumber
          );
          Cookies.set('authorizationToken', Math.random(), { expires: 7 });
          this.$router.push({ path: '/profile', query: { user: currentUser.id } });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  .form {
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    height: 400px;
    padding: 20px;
    width: 320px;

    &__title {
      color: #eee;
      font-family: sans-serif;
      font-size: 36px;
      font-weight: 600;
      margin: 30px 0 20px;
      text-align: center;
    }

    &__input-container {
      height: 50px;
      width: 100%;
      margin-bottom: 38px;
    }

    &__input {
      background-color: #303245;
      border-radius: 12px;
      border: 0;
      box-sizing: border-box;
      color: #eee;
      font-size: 18px;
      /*height: 100%;*/
      height: 80%;
      outline: 0;
      padding: 4px 20px 0;
      width: 100%;
    }

    &__label {
      display: block;
      color: #65657b;
      font-family: sans-serif;
      margin-bottom: 6px;
    }

    &__button {
      background-color: #08d;
      border-radius: 12px;
      border: 0;
      box-sizing: border-box;
      color: #eee;
      cursor: pointer;
      font-size: 18px;
      height: 50px;
      outline: 0;
      text-align: center;
      width: 100%;
      margin-top: 13px;

      &:active {
        background-color: #06b;
      }
    }

    &__error {
      margin-top: 2px;
      font-size: 12px;
      display: block;
      color: red;
      text-align: left;
    }

    &__authorization-error {
      font-size: 14px;
      display: block;
      color: red;
      text-align: center;
      margin-top: 12px;
    }
  }
}
</style>

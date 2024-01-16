<template>
  <div class="page">
    <div class="description-container">
      <h1 class="animate__animated animate__pulse animate__infinite">Welcome to the platform</h1>
      <p>As an experienced gaming and betting software provider, we offer the most suitable solutions for your business purposes. Get what you need - a turnkey suite, sport engine, fast API integration, or a retail solution.</p>
      <RouterLink to="login" class="login">Login</RouterLink>
    </div>
  </div>
</template>
<script>
import 'animate.css'
export default {

}
</script>

<style scoped lang="scss">
.page {
  background-color: #15172b;
  width: 100vw;
  height: 100vh;

  .description-container {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    h1 {
      text-transform: uppercase;
      color: #ffffff;
      font-weight: 700;
      font-size: 100px;
      margin-bottom: 30px;
    }

    p {
      color: #414141;
      font-weight: 400;
      margin-bottom: 50px;
      line-height: normal;
      font-size: 20px;
    }

    .login {
      display: inline-block;
      color: #ffffff;
      font-weight: 400;
      background: #4444FF;
      font-size: 20px;
      padding: 20px 80px;
      border-radius: 20px;
      margin-top: 5px;
    }
  }

  @media (max-width: 768px) {
    .description-container {
      h1 {
        font-size: 60px;
      }

      p {
        font-size: 16px;
      }

      .login {
        font-size: 16px;
        padding: 15px 40px;
      }
    }
  }

  @media (max-width: 480px) {
    .description-container {
      h1 {
        font-size: 40px;
      }

      p {
        font-size: 14px;
        margin-bottom: 30px;
      }

      .login {
        font-size: 14px;
        padding: 10px 30px;
      }
    }
  }
}
</style>

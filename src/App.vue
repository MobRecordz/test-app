<template>
  <div id="app">
    <div class="main">
      <div class="main__sidebar-left">
        <button class="button button--small main__sidebar-left-logout-btn" @click="signOut">
          <div class="button__icon"></div>

          <span>Выйти</span>
        </button>
      </div>

      <div class="main__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "app",

  methods: {
    ...mapActions({
      actionSignOut: 'signOut'
    }),

    signOut() {
      this.actionSignOut();

      this.$router.push({ name: 'auth' })
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap");

#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(177.59deg, #6a8639 -6.24%, #beb732 119.12%), #7ea613;
  height: 100vh;
}

.main {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  height: 100%;
}

.main__sidebar-left {
  display: none;
}

.main__content {
  background-color: white;
  padding: 24px;
}

.main__sidebar-left-logout-btn {
  color: rgba(255, 255, 255, 0.7);
  margin-top: auto;

  span {
    font-weight: 400;
  }

  .button__icon {

    background-color: currentColor;
    mask: url('./assets/logout.svg') no-repeat center;
    mask-size: 12px;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.4);
  }
}

@media screen and (min-width: 764px) {
  .main {
    grid-template-columns: max-content minmax(0, 1fr);
  }

  .main__sidebar-left {
    display: flex;
    min-width: 158px;
    padding: 45px 23px;
  }

  .main__content {
    border-radius: 48px 0 0 48px;
    padding: 60px;
  }
}
</style>

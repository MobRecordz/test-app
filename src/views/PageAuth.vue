<template>
  <div class="auth">
    <h1>Авторизация</h1>

    <pre>
      Телефон: +79299318768
      Пароль: KP3gfU
    </pre>

    <form class="auth__form" @submit.prevent="submitAuth">
      <div class="auth__form-field">
        <div class="auth__form-field-label">Логин</div>
        <ui-input v-model="form.phone" placeholder="Введите номер телефона" />
      </div>

      <div class="auth__form-field">
        <div class="auth__form-field-label">Пароль</div>
        <ui-input v-model="form.password" placeholder="Введите пароль" />
      </div>

      <button class="button button--small button--main button--border" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import UiInput from "@/components/ui/UiInput.vue";
import { mapActions } from "vuex";

export default {
  name: "auth",
  components: {
    UiInput,
  },

  data: () => ({
    form: {
      phone: "",
      password: "",
    },
  }),

  methods: {
    ...mapActions(["signIn"]),

    async submitAuth() {
      console.log(this.form);
      if (!this.form.phone || !this.form.password) {
        alert("Заполните все поля");
        return;
      }

      try {
        await this.signIn(this.form);

        this.$router.push({ name: 'main' })
      } catch (error) {
        alert(`${error}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  height: 100%;
}
.auth__form {
  display: grid;
  grid-gap: 16px;
  max-width: 15rem;
  width: 100%;
  margin: 0 auto;
}
.auth__form-field-label {
  text-align: left;
  font-size: 12px;
  margin-bottom: 4px;
}

@media screen and (min-width: 764px) {
  .auth__form {
    max-width: 30rem;
  }
}
</style>

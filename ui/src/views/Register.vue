<template>
  <v-col xs="12" md="6" lg="5" xl="4">
    <v-card class="px-6 pb-8 pt-4 ma-6">
      <v-card-title>Регистрация</v-card-title>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Логин"
            rules="required|max:10"
          >
            <v-text-field
              v-model="login"
              :counter="10"
              :error-messages="errors"
              label="Логин"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Пароль"
            rules="required|max:10"
          >
            <v-text-field
              v-model="password"
              :counter="10"
              :error-messages="errors"
              label="Пароль"
              type="password"
              required
            ></v-text-field>
          </validation-provider>

          <v-btn
            class="mr-4 mt-6 green white--text font-weight-light"
            type="submit"
            :disabled="invalid"
          >
            Отправить
          </v-btn>
          <v-btn
            class="mt-6 red lighten-2 white--text font-weight-light"
            @click="clear"
          >
            Очистить
          </v-btn>
        </form>
      </validation-observer>
      <p class="auth-question font-weight-light caption">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </v-card>
  </v-col>
</template>

<script>
import { required, max, regex } from "vee-validate/dist/rules";
import { mapActions } from "vuex";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: 'Заполните, пожалуйста, поле "{_field_}"',
});
extend("max", {
  ...max,
  message: 'Поле "{_field_}" не должно содержать более {length} символов',
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    login: "",
    password: "",
  }),
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        const userData = {
          login: this.login,
          password: this.password,
        };
        await this.register(userData);
      }
    },
    clear() {
      this.login = "";
      this.password = "";
    },
    ...mapActions("auth", ["register"]),
  },
};
</script>

<style lang="scss">
.auth-question {
  margin: 20px 0 0 !important;
  a:hover {
    text-decoration: none;
  }
}
</style>
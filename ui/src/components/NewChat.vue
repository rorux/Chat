<template>
  <v-row justify="space-around" class="mb-5">
    <v-dialog max-width="400" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile color="success" v-bind="attrs" v-on="on">
          <v-icon left> mdi-plus-thick </v-icon>
          Новый чат
        </v-btn>
      </template>
      <template>
        <v-card>
          <v-toolbar color="teal darken-4" dark
            ><h3>Создание чата</h3></v-toolbar
          >
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-text-field
                class="pt-6 pb-2"
                v-model="nameChat"
                label="Название"
                prepend-icon="mdi-message-plus"
                :rules="inputRules"
                :counter="20"
              ></v-text-field>
              <v-btn
                text
                class="success mx-0 mt-3"
                :loading="loading"
                type="submit"
                >Создать</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      nameChat: "",
      inputRules: [
        (v) => !!v || "Введите название чата!",
        (v) => v.length >= 3 || "Минимум 3 символа!",
        (v) => v.length <= 20 || "Максимум 20 символов!",
      ],
      loading: false,
      dialog: false,
    };
  },
  computed: {
    ...mapState("user", ["id"]),
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const res = await this.newChat({
          req: {
            name: this.nameChat,
            owner: this.id,
          },
          type: "post",
        });
        if (res) {
          this.dialog = false;
        }
        this.loading = false;
        this.nameChat = "";
      }
    },
    ...mapActions("user", ["newChat"]),
  },
};
</script>

<style>
</style>
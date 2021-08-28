<template>
  <v-row justify="space-around" class="mb-2">
    <v-dialog max-width="400" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile color="info" v-bind="attrs" v-on="on">
          <v-icon left> mdi-magnify </v-icon>
          Найти чат
        </v-btn>
      </template>
      <template>
        <v-card>
          <v-toolbar color="info darken-4" dark><h3>Поиск чата</h3></v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-text-field
                class="pt-6 pb-2"
                v-model="nameChat"
                label="Название"
                prepend-icon="mdi-message-question"
                :rules="inputRules"
                :counter="20"
              ></v-text-field>
              <v-btn
                text
                class="info mx-0 mt-3"
                :loading="loading"
                type="submit"
                >Подключиться</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
    ...mapState("user", ["login", "chats", "id"]),
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const res = await this.newChat({
          req: { name: this.nameChat },
          type: "put",
        });
        if (res) {
          await this.setActiveChat(res);
          await this.getMembers(res._id);
          await this.getMessages(res._id);
          const userJoin = {
            chat: res._id,
            login: this.login,
            user: this.id,
          };
          await this.$socket.emit("newMemberConnected", userJoin, (data) => {
            if (typeof data === "string") {
              console.error(data);
            }
          });

          await this.$socket.emit("userJoined", userJoin, (data) => {
            if (typeof data === "string") {
              console.error(data);
            } else {
              this.setUserSocketId(data.userSocketId);
            }
          });

          this.dialog = false;
        }
        this.loading = false;
        this.nameChat = "";
      }
    },
    ...mapActions("user", ["newChat"]),
    ...mapActions("chat", ["setActiveChat", "getMembers"]),
    ...mapActions("message", ["getMessages"]),
    ...mapMutations("socket", ["setUserSocketId"]),
  },
};
</script>

<style>
</style>
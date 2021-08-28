<template>
  <v-container class="grey lighten-4 d-flex fill-height px-4 py-0" fluid>
    <v-dialog v-model="dialogLogout" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h6"> Покинуть чат? </v-card-title>
        <v-card-text>Вы всегда сможете подключиться к чату снова.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="
              updatedChat = null;
              dialogLogout = false;
            "
          >
            Отмена
          </v-btn>
          <v-btn color="green darken-1" text @click="logoutChat">
            Покинуть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h6"> Удалить чат? </v-card-title>
        <v-card-text
          >Чат и все его сообщения будут полностью удалены.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="
              updatedChat = null;
              dialogDelete = false;
            "
          >
            Отмена
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteChat">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Loader v-if="loading" />
    <v-row class="align-self-start mt-3" v-else>
      <v-col>
        <div class="text-h5 mb-5 text-center">Список чатов</div>
        <v-card class="pa-4 mb-4 mx-auto" style="max-width: 700px">
          <p v-if="!created.length && !chats.length" class="text-center ma-0">
            Пока пуст...
          </p>
          <v-list subheader>
            <v-subheader v-if="created.length">Созданные</v-subheader>
            <v-list-item v-for="chat in created" :key="`${chat._id}_created`">
              <v-list-item-avatar>
                <v-icon class="success" dark> mdi-chat-alert </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="chat.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click="
                    updatedChat = chat._id;
                    dialogDelete = true;
                  "
                >
                  <v-icon color="red lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider inset v-if="chats.length && created.length"></v-divider>

            <v-subheader v-if="chats.length">Подключены</v-subheader>
            <v-list-item v-for="chat in chats" :key="`${chat._id}_connected`">
              <v-list-item-avatar>
                <v-icon class="info" dark> mdi-chat-plus </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="chat.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click="
                    updatedChat = chat._id;
                    dialogLogout = true;
                  "
                >
                  <v-icon color="orange lighten-1">mdi-logout-variant</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Settings",
  data: () => ({
    created: [],
    loading: false,
    dialogLogout: false,
    dialogDelete: false,
    updatedChat: null,
  }),
  computed: {
    ...mapState("user", ["chats", "login", "id"]),
  },
  methods: {
    async logoutChat() {
      this.loading = true;
      await this.removeChat(this.updatedChat);
      this.dialogLogout = false;

      const userDisconnected = {
        chat: this.updatedChat,
        user: this.id,
        login: this.login,
      };
      await this.$socket.emit(
        "userDisconnectChat",
        userDisconnected,
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          }
        }
      );

      this.updatedChat = null;
      this.loading = false;
    },
    async deleteChat() {
      this.loading = true;
      await this.fullDeleteChat(this.updatedChat);
      this.dialogDelete = false;
      await this.getUserInfo();
      this.created = await this.getChatsOwner();

      const deletedChat = {
        chat: this.updatedChat,
      };
      await this.$socket.emit("deleteChat", deletedChat, (data) => {
        if (typeof data === "string") {
          console.error(data);
        }
      });

      this.updatedChat = null;
      this.loading = false;
    },
    ...mapActions("user", ["getUserInfo", "removeChat", "getChatsOwner"]),
    ...mapActions("chat", ["fullDeleteChat"]),
  },
  async mounted() {
    this.loading = true;
    await this.getUserInfo();
    this.created = await this.getChatsOwner();
    this.loading = false;
  },
};
</script>

<style>
</style>

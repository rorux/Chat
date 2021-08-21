<template>
  <v-navigation-drawer
    v-model="isOpen"
    app
    mobile-breakpoint="650"
    color="#052052"
    class="pa-6"
  >
    <v-row class="mb-2">
      <v-col class="text-center">
        <v-avatar size="120"><img src="/avatar-1.jpg" /></v-avatar>
        <h3 class="text-capitalize mt-1 blue--text text--lighten-4">
          {{ login }}
        </h3>
      </v-col>
    </v-row>
    <NewChat />
    <ConnectChat />
    <v-row justify="space-around"
      ><v-col>
        <v-select
          @input="onInputActiveChat"
          v-model="getActiveChat"
          v-if="chats.length"
          :items="chats"
          item-text="name"
          item-value="_id"
          return-object
          label="Доступные чаты"
          outlined
          dense
          class="pa-0"
          item-color="primary"
          dark
        ></v-select>
        <p class="body-2 text-center blue-grey--text text--darken-0" v-else>
          Нет доступных чатов
        </p></v-col
      ></v-row
    >
    <Loader v-if="loading" />
    <Members v-else />
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import NewChat from "@/components/NewChat";
import ConnectChat from "@/components/ConnectChat";
import Members from "@/components/Members";
export default {
  props: ["drawer"],
  data: () => ({
    isOpen: null,
    loading: false,
  }),
  computed: {
    ...mapState("user", ["login", "chats", "id"]),
    ...mapState("chat", ["activeChat"]),
    ...mapState("socket", ["userSocketId"]),
    getActiveChat: {
      get() {
        return this.activeChat;
      },
      set(newName) {
        return newName;
      },
    },
  },
  methods: {
    ...mapMutations("chat", ["setActiveChat", "clearActiveChat"]),
    ...mapMutations("socket", ["setUserSocketId"]),
    ...mapActions("chat", ["getMembers"]),
    ...mapActions("message", ["getMessages"]),
    async onInputActiveChat(selected) {
      this.loading = true;

      this.$socket.emit("userLeft", this.userSocketId, async () => {
        await this.setActiveChat(selected);
        await this.getMembers(selected._id);
        await this.getMessages(selected._id);

        const userJoin = {
          chat: selected._id,
          login: this.login,
          user: this.id,
        };
        await this.$socket.emit("userJoined", userJoin, (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.setUserSocketId(data.userSocketId);
          }
        });
      });

      this.loading = false;
    },
  },
  components: {
    NewChat,
    ConnectChat,
    Members,
  },
  watch: {
    isOpen: function () {
      this.$emit("update:drawer", this.isOpen);
    },
    drawer: function (drawer) {
      this.isOpen = drawer;
    },
  },
  mounted() {
    this.isOpen = this.drawer;
  },
};
</script>
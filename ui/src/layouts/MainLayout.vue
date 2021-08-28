<template>
  <v-app id="inspire">
    <Drawer :drawer.sync="drawer" />
    <Navbar @toggleMenu="drawer = !drawer" />
    <Loader v-if="loading" />
    <v-main v-else>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Drawer from "@/components/app/Drawer";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      drawer: null,
    };
  },
  computed: {
    ...mapState("user", ["chats", "login", "id"]),
    ...mapState("socket", ["userSocketId"]),
  },
  methods: {
    ...mapMutations(["setError"]),
    ...mapMutations("chat", ["clearActiveChat", "clearMembers"]),
    ...mapMutations("message", ["setMessages", "clearMessages"]),
    ...mapMutations("socket", ["setUserSocketId"]),
    ...mapMutations("user", ["removeChat"]),
    ...mapActions("user", ["getUserInfo"]),
    ...mapActions("chat", ["getMembers", "setActiveChat", "getChat"]),
    ...mapActions("message", ["getMessages"]),
  },
  components: {
    Navbar,
    Drawer,
  },
  async mounted() {
    await this.getUserInfo();
    if (this.chats.length) {
      const activeChat =
        JSON.parse(localStorage.getItem("activeChat")) || this.chats[0];

      const checkChat = await this.getChat(activeChat._id);
      if (checkChat) {
        if (checkChat._id && checkChat._id === activeChat._id) {
          await this.setActiveChat(activeChat);
          await this.getMembers(activeChat._id);
          await this.getMessages(activeChat._id);
          const userJoin = {
            chat: activeChat._id,
            login: this.login,
            user: this.id,
          };
          this.$socket.emit("userJoined", userJoin, (data) => {
            if (typeof data === "string") {
              console.error(data);
            } else {
              this.setUserSocketId(data.userSocketId);
            }
          });
        } else {
          this.clearActiveChat();
          localStorage.removeItem("activeChat");
          this.clearMembers();
          this.clearMessages();
          this.removeChat(activeChat._id);
          this.setError("Чат не существует!");
        }
      } else {
        this.clearActiveChat();
        localStorage.removeItem("activeChat");
        this.clearMembers();
        this.clearMessages();
        this.removeChat(activeChat._id);
        this.setError("Чат не существует!");
      }
    } else {
      this.clearActiveChat();
      this.clearMembers();
      this.clearMessages();
    }
    this.loading = false;
  },
};
</script>
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
    ...mapActions("user", ["getUserInfo"]),
    ...mapActions("chat", ["getMembers"]),
    ...mapActions("message", ["getMessages"]),
    ...mapMutations("chat", [
      "setActiveChat",
      "clearActiveChat",
      "clearMembers",
    ]),
    ...mapMutations("message", ["setMessages", "clearMessages"]),
    ...mapMutations("socket", ["setUserSocketId"]),
  },
  components: {
    Navbar,
    Drawer,
  },
  async mounted() {
    await this.getUserInfo();
    if (this.chats.length) {
      await this.setActiveChat(this.chats[0]);
      await this.getMembers(this.chats[0]._id);
      await this.getMessages(this.chats[0]._id);
      const userJoin = {
        chat: this.chats[0]._id,
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
      this.clearMembers();
      this.clearMessages();
    }
    this.loading = false;
  },
};
</script>
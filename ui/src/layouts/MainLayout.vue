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
    ...mapState("user", ["chats"]),
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
  },
  components: {
    Navbar,
    Drawer,
  },
  async mounted() {
    await this.getUserInfo();
    if (this.chats.length) {
      this.setActiveChat(this.chats[0]);
      this.getMembers(this.chats[0]._id);
      this.getMessages(this.chats[0]._id);
    } else {
      this.clearActiveChat();
      this.clearMembers();
      this.clearMessages();
    }
    this.loading = false;
  },
};
</script>
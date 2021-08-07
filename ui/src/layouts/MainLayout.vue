<template>
  <v-app id="inspire">
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("user", ["chats"]),
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
    ...mapMutations("chat", ["setActiveChat"]),
  },
  components: {
    Navbar,
  },
  async created() {
    await this.getUserInfo();
    if (this.chats.length) this.setActiveChat(this.chats[0]);
  },
};
</script>
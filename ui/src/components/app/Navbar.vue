<template>
  <v-app-bar app color="#1D4899">
    <v-app-bar-nav-icon
      @click="$emit('toggleMenu')"
      color="white"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text pl-1"
      >Chats
      <span class="ml-2 blue-grey--text text--lighten-3">{{
        activeChat ? activeChat.name : ""
      }}</span></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          v-bind="attrs"
          v-on="on"
          color="transparent"
          @click="logoutUser"
        >
          <v-icon color="white">exit_to_app</v-icon>
        </v-btn>
      </template>
      <span>Выйти</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("chat", ["activeChat"]),
    ...mapState("socket", ["userSocketId"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutUser() {
      this.$socket.emit("userLeft", this.userSocketId, () => {
        this.logout();
      });
    },
  },
};
</script>
<template>
  <v-app-bar app color="#1D4899">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed v-bind="attrs" v-on="on" color="transparent" fab small
          ><v-icon color="white" class="mr-3 ml-2" @click="$router.push('/')"
            >mdi-arrow-left</v-icon
          ></v-btn
        >
      </template>
      <span>Чаты</span>
    </v-tooltip>
    <v-toolbar-title class="white--text pl-1" style="cursor: pointer"
      >Chats</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          v-bind="attrs"
          v-on="on"
          color="transparent"
          @click="logoutUser"
          small
          fab
        >
          <v-icon color="white">exit_to_app</v-icon>
        </v-btn>
      </template>
      <span>Выйти</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {},
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutUser() {
      this.$socket.emit("userLeft", this.userSocketId, () => {
        this.logout();
      });
    },
  },
};
</script>
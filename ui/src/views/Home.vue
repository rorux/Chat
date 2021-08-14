<template>
  <v-container class="grey lighten-4 d-flex fill-height px-4 py-0" fluid>
    <Loader v-if="loading" />
    <Messages v-if="activeChat" />
    <v-row class="align-self-start mt-2" v-else>
      <v-col>
        <div class="subtitle-1 blue-grey--text text--lighten-1">
          Нет активных чатов..
        </div>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Messages from "@/components/Messages";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("chat", ["activeChat"]),
    ...mapState("user", ["chats"]),
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
  },
  components: {
    Messages,
  },
};
</script>

<style lang="scss">
.mes-wrap {
  max-width: 70%;
  text-align: left;
}
</style>

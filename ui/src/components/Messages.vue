<template>
  <div style="width: 100%" class="align-self-start pt-4">
    <v-row v-if="!messages.length">
      <v-col>
        <div class="subtitle-1 blue-grey--text text--lighten-1">
          Сообщений нет..
        </div>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row class="fill-height" v-else>
      <v-col px-4 py-0>
        <v-sheet class="fill-height px-4 pt-6 pb-10" rounded>
          <Message
            v-for="message in messages"
            :key="message._id"
            :message="message"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <v-footer app color="#94ADDC" height="72" inset>
      <v-text-field
        background-color="white"
        dense
        flat
        hide-details
        solo
        v-model.trim="text"
        @keyup.enter.prevent="newMessage"
        autocomplete="false"
      ></v-text-field>
      <v-btn class="ml-3" fab dark small color="primary" @click="newMessage">
        <v-icon>send</v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Message from "@/components/Message";
export default {
  data() {
    return {
      text: "",
    };
  },
  computed: {
    ...mapState("chat", ["activeChat"]),
    ...mapState("user", ["id"]),
    ...mapState("message", ["messages"]),
    ...mapState("socket", ["userSocketId"]),
  },
  methods: {
    async newMessage() {
      if (this.text) {
        const req = {
          user: this.id,
          chat: this.activeChat._id,
          text: this.text,
        };
        const sendMessage = await this.addMessage(req);
        const reqMes = {
          userId: this.userSocketId,
          message: sendMessage,
        };
        this.$socket.emit("createMessage", reqMes, (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        });
      }
    },
    ...mapActions("message", ["addMessage"]),
  },
  components: {
    Message,
  },
  watch: {
    messages() {
      setTimeout(() => {
        document.querySelector("html").scrollTop =
          document.querySelector("html").scrollHeight;
      });
    },
  },
  mounted() {
    setTimeout(() => {
      document.querySelector("html").scrollTop =
        document.querySelector("html").scrollHeight;
    });
  },
};
</script>

<style>
</style>
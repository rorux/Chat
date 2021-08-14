<template>
  <div style="width: 100%">
    <v-row class="fill-height">
      <v-col px-4 py-0>
        <v-sheet class="fill-height px-4 pt-6 pb-10" rounded>
          <!-- Сообщение админа
          <v-row>
            <v-col class="text-center"
              ><p
                class="
                  ma-0
                  font-weight-light
                  grey--text
                  text--lighten-0
                  font-italic
                  body-2
                "
              >
                <strong>Николай</strong> вышел из чата..
              </p></v-col
            >
          </v-row> -->
          <!-- Собственное сообщение
          <v-row>
            <v-col class="text-right pt-3 pb-0"
              ><v-sheet
                rounded
                class="
                  pa-3
                  pl-4
                  mes-wrap
                  d-inline-block
                  rounded-l-xl
                  font-weight-light
                  white--text
                "
                color="#04ba16"
                >Здорово! Норм, у тебя?</v-sheet
              ></v-col
            >
          </v-row> -->
          <!-- Сообщение собеседника
          <v-row>
            <v-col class="py-0">
              <div class="subtitle-2">Иван</div>
              <v-sheet
                rounded
                class="
                  pa-3
                  pr-4
                  mes-wrap
                  d-inline-block
                  rounded-r-xl
                  font-weight-light
                "
                color="#ECECEC"
                >Привет, как дела?</v-sheet
              ></v-col
            >
          </v-row> -->
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
        v-model="text"
      ></v-text-field>
      <v-btn class="ml-3" fab dark small color="primary" @click="newMessage">
        <v-icon>send</v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
  },
  methods: {
    async newMessage() {
      if (this.text) {
        const req = {
          user: this.id,
          chat: this.activeChat._id,
          text: this.text,
        };
        await this.addMessage(req);
        this.text = "";
      }
    },
    ...mapActions("message", ["addMessage"]),
  },
};
</script>

<style>
</style>
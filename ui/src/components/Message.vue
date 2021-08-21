<template>
  <div style="width: 100%">
    <v-row v-if="author === 'me'">
      <v-col class="text-right pt-3 pb-0 my-3"
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
          >{{ message.text }}</v-sheet
        ></v-col
      >
    </v-row>
    <v-row v-else-if="author === 'friend'">
      <v-col class="py-0 my-3">
        <div class="subtitle-2">{{ message.username[0].login }}</div>
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
          >{{ message.text }}</v-sheet
        ></v-col
      >
    </v-row>
    <v-row v-else>
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
          {{ message.text }}
        </p></v-col
      >
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    message: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["id"]),
    author() {
      if (this.message.username[0].login === "admin") {
        return "admin";
      } else if (this.message.user === this.id) {
        return "me";
      } else return "friend";
    },
  },
  mounted() {},
};
</script>

<style>
</style>
<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" top :color="color">
    <p class="text-center ma-0">{{ text }}</p>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    timeout: 2500,
    text: "",
    color: "primary",
  }),
  computed: {
    getError() {
      return this.$store.state.error;
    },
    getSuccess() {
      return this.$store.state.success;
    },
    getPrimary() {
      return this.$store.state.primary;
    },
  },
  watch: {
    getError(value) {
      if (value) {
        this.text = value;
        this.color = "error";
        this.snackbar = true;
        this.clearError();
      }
    },
    getSuccess(value) {
      if (value) {
        this.text = value;
        this.color = "success";
        this.snackbar = true;
        this.clearSuccess();
      }
    },
    getPrimary(value) {
      if (value) {
        this.text = value;
        this.color = "primary";
        this.snackbar = true;
        this.clearPrimary();
      }
    },
  },
  methods: {
    ...mapMutations(["clearError", "clearSuccess", "clearPrimary"]),
  },
};
</script>

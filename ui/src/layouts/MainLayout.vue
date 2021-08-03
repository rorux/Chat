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
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["getUserInfo"]),
  },
  components: {
    Navbar,
  },
  async created() {
    await this.getUserInfo();
  },
};
</script>
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
export default {
  components: {
    Navbar,
  },
};
</script>
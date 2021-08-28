<template>
  <v-app id="inspire">
    <NavbarPage />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavbarPage from "@/components/app/NavbarPage";
export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {},
  methods: {},
  components: {
    NavbarPage,
  },
};
</script>
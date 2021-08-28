<template>
  <v-app>
    <Alert />
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import PageLayout from "@/layouts/PageLayout";
import Alert from "@/components/app/Alert";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
    PageLayout,
    Alert,
  },
};
</script>
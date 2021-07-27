<template>
  <v-app class="grey lighten-4">
    <Alert />
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import Alert from '@/components/app/Alert';
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
    Alert
  },
};
</script>
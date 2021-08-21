<template>
  <v-row class="mt-n8">
    <v-col
      ><v-card color="transparent" dark flat
        ><v-list subheader v-if="members.length">
          <v-subheader>Участники онлайн - {{ usersOnline.length }}</v-subheader>
          <div style="max-height: 130px" class="overflow-y-auto">
            <v-list-item v-for="member in members" :key="member.id" dense>
              <v-list-item-content>
                <v-list-item-title
                  v-text="member.id === id ? 'Вы' : member.login"
                ></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon
                  :color="member.active ? 'deep-purple accent-4' : 'grey'"
                >
                  mdi-message-outline
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list>
        <p
          class="body-2 text-center blue-grey--text text--darken-0"
          v-else-if="activeChat"
        >
          Список участников пуст
        </p></v-card
      ></v-col
    >
  </v-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("chat", ["activeChat", "members"]),
    ...mapState("socket", ["userSocketId", "usersOnline"]),
    ...mapState("user", ["id"]),
  },
  methods: {
    ...mapMutations("chat", ["sortMembers"]),
  },
  watch: {
    usersOnline: function (users) {
      this.sortMembers(users);
    },
  },
};
</script>

<style>
</style>
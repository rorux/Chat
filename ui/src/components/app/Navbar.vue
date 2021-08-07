<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-breakpoint="650"
      color="#052052"
      class="pa-6"
    >
      <v-row class="mb-2">
        <v-col class="text-center">
          <v-avatar size="120"><img src="/avatar-1.jpg" /></v-avatar>
          <h3 class="text-capitalize mt-1 blue--text text--lighten-4">
            {{ login }}
          </h3>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="mb-5">
        <NewChat />
      </v-row>
      <v-row justify="space-around" class="mb-2">
        <ConnectChat />
      </v-row>
      <v-row justify="space-around"
        ><v-col>
          <v-select
            v-model="activeChat"
            v-if="chats.length"
            :items="chats"
            item-text="name"
            item-value="_id"
            return-object
            label="Доступные чаты"
            outlined
            dense
            class="pa-0"
            item-color="primary"
            dark
          ></v-select>
          <p class="body-2 text-center blue-grey--text text--darken-0" v-else>
            Нет доступных чатов
          </p></v-col
        ></v-row
      >
      <v-row class="mt-n8">
        <v-col
          ><v-card color="transparent" dark flat
            ><v-list subheader v-if="usersOnline.length">
              <v-subheader>Сейчас онлайн:</v-subheader>
              <div style="max-height: 130px" class="overflow-y-auto">
                <v-list-item v-for="chat in usersOnline" :key="chat.name" dense>
                  <v-list-item-content>
                    <v-list-item-title v-text="chat.name"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon
                      :color="chat.active ? 'deep-purple accent-4' : 'grey'"
                    >
                      mdi-message-outline
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </div>
            </v-list>
            <p class="body-2 text-center blue-grey--text text--darken-0" v-else>
              Нет пользователей онлайн
            </p></v-card
          ></v-col
        >
      </v-row>
    </v-navigation-drawer>

    <v-app-bar app color="#1D4899">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text pl-1"
        >Chats
        <span class="ml-2 blue-grey--text text--lighten-3"
          >Чат с коллегами</span
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            v-bind="attrs"
            v-on="on"
            color="transparent"
            @click="logout"
          >
            <v-icon color="white">exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>Выйти</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NewChat from "@/components/NewChat";
import ConnectChat from "@/components/ConnectChat";
export default {
  data: () => ({
    drawer: null,
    /* usersOnline: [], */
    usersOnline: [
      {
        name: "Jason Oner",
        active: true,
      },
      {
        name: "Mike Carlson",
      },
      {
        name: "Cindy Baker",
      },
      {
        name: "Ali Connors",
      },
    ],
  }),
  computed: {
    ...mapState("user", ["login", "chats"]),
    ...mapState("chat", ["activeChat"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
  components: {
    NewChat,
    ConnectChat,
  },
};
</script>
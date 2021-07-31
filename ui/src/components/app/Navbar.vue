<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-break-point="650"
      color="#052052"
      class="pa-6"
    >
      <v-row class="mb-2">
        <v-col class="text-center">
          <v-avatar size="120"><img src="/avatar-1.jpg" /></v-avatar>
        </v-col>
      </v-row>
      <v-row justify="space-around" class="mb-5">
        <v-btn tile color="success">
          <v-icon left> mdi-plus-thick </v-icon>
          Новый чат
        </v-btn>
      </v-row>
      <v-row justify="space-around" class="mb-2">
        <v-btn tile color="info">
          <v-icon left> mdi-magnify </v-icon>
          Найти чат
        </v-btn>
      </v-row>
      <v-row justify="space-around"
        ><v-col>
          <v-select
            v-if="chats.length"
            :items="chats"
            label="Доступные чаты"
            outlined
            dense
            class="pa-0"
            item-color="primary"
            filled="true"
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
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    /* chats: [], */
    chats: ["Коллеги", "Семья", "Волейбол", "Шахматы"],
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
      {
        name: "Cindy Baker",
      },
      {
        name: "Ali Connors",
      },
    ],
  }),
};
</script>
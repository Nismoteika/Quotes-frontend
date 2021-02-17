<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

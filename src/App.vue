<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Цитатник</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn color="primary" class="mr-2" to="/">Все цитаты</v-btn> -->
      <v-btn color="primary" v-on:click="AddQuoteModalActive = true">
        Создать цитату
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <AddQuoteModal v-if="AddQuoteModalActive" @close="AddQuoteModalActive = false" />
  </v-app>
</template>

<script>
import AddQuoteModal from '@/components/AddQuoteModal.vue';

export default {
  name: 'App',
  components: {
    AddQuoteModal,
  },
  data: () => ({
    AddQuoteModalActive: false,
  }),
};
</script>

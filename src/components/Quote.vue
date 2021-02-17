<template>
  <v-card class="quote mb-2">
    <v-card-title>{{ author }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-text>{{ date }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    author: String,
    text: String,
    date: String,
  },
};
</script>

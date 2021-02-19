<template>
  <v-col cols="12">
    <v-card class="quote mb-2">
      <v-card-title>{{ quote.author }}</v-card-title>
      <v-card-text>{{ quote.text }}</v-card-text>
      <v-card-text class="d-flex align-center justify-space-between">
        <v-chip-group>
          <v-chip
            v-for="tag of quote.tags"
            v-bind:key="tag.id">
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
        <span>{{ quote.created_at }}</span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    quote: Object,
  },
};
</script>

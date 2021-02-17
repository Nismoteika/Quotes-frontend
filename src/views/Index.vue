<template>
  <div class="index mt-2">
    <v-container>
      <Quote
        v-for="quote of quotes"
        v-bind:key="quote.id"
        :author="quote.author"
        :text="quote.text"
        :date="quote.created_at"
      />
    </v-container>
  </div>
</template>

<script>
import Quote from '@/components/Quote.vue';
import apiBase from '@/api';

export default {
  name: 'App',
  components: {
    Quote,
  },
  data: () => ({
    quotes: [],
    total_quotes: null,
  }),
  mounted() {
    fetch(`${apiBase.url}/quotes`)
      .then((response) => response.json())
      .then((data) => {
        this.quotes = data.data;
        this.total_quotes = data.total;
      });
  },
};
</script>

<template>
  <div class="index mt-2">
    <v-container>
       <v-row>
        <Quote
          v-for="quote of quotes"
          v-bind:key="quote.id"
          :quote="quote"
        />
      </v-row>
      <v-row justify="center">
        <v-pagination
          v-model="currentPage"
          :length="totalQuotes"
        ></v-pagination>
      </v-row>
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
    currentPage: 1,
    totalQuotes: 1,
  }),
  mounted() {
    this.getQuotes();
  },
  methods: {
    getQuotes: function (page = 1) {
      fetch(`${apiBase.url}/quotes?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          this.quotes = data.data;
          this.currentPage = data.current_page; 
          this.totalQuotes = data.last_page;
        });
    },
  },
  watch: {
    currentPage: function () {
      this.getQuotes(this.currentPage);
    },
  },
};
</script>

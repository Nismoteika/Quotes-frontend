<template>
  <div class="index mt-2">
    <v-container>
       <v-row>
        <Quote
          v-for="quote of quotes"
          v-bind:key="quote.id"
          :author="quote.author"
          :text="quote.text"
          :date="quote.created_at"
        />
      </v-row>
      <v-row>
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
    fetch(`${apiBase.url}/quotes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.quotes = data.data;
        this.currentPage = data.current_page; 
        this.totalQuotes = data.last_page;
      });
  },
};
</script>

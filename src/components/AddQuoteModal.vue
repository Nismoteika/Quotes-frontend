<template>
  <v-dialog
      v-model="activeModal"
      transition="dialog-bottom-transition"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Новая цитата
        </v-card-title>

        <v-card-text>
          <v-text-field
              v-model="author"
              :rules="authorRules"
              :counter="100"
              label="Автор"
              required
          ></v-text-field>
          <v-textarea
            solo
            name="text"
            v-model="text"
            label="Текст цитаты"
            required
          ></v-textarea>

          <v-combobox
          v-model="tagsSelected"
          :items="tagsAvailable"
          label="Тэги"
          multiple
          chips
          ></v-combobox>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="sendForm"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import apiBase from '@/api';

export default {
  name: 'AddQuoteModal',
  props: [
    'ActiveModal',
  ],
  data() {
    return ({
      activeModal: true,
      author: '',
      authorRules: [
        (v) => !!v || 'Поле "автор" обязательно',
        (v) => (v && v.length >= 2) || 'Имя автора должно быть больше чем (или равно) 2 символа',
      ],
      text: '',
      tagsSelected: [],
      tagsAvailable: [
        '1. Песни',
        '2. Фильмы',
        '3. Сериалы',
        '4. Книги',
        '5. Великие люди',
        '6. Аниме',
        '7. Компьютерные игры',
        '8. Персонажи',
        '9. Жизнь',
        '10. Мемы',
      ],
    });
  },
  methods: {
    sendForm: function sendForm() {
      const arrIdsTag = [];
      this.tagsSelected.forEach((item) => {
        const id = item.split('.');
        arrIdsTag.push(id[0]);
      });
      const quotePayload = {
        'author': this.author,
        'text': this.text,
        'tags': arrIdsTag,
      };
      console.log(arrIdsTag);
      fetch(`${apiBase.url}/quotes`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(quotePayload),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      this.$emit('close');
    },
  },
};
</script>

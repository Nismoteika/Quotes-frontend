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
          <v-alert
            v-if="alertError"
            type="error">
            Ошибка добавления цитаты
          </v-alert>
          <v-alert
            v-if="alertSuccess"
            type="success">
            Цитата успешно добавлена
          </v-alert>
        </v-card-text>

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
            :rules="textRules"
            label="Текст цитаты"
            required
          ></v-textarea>

          <v-combobox
          v-model="tagsSelected"
          :items="tagsAvailable"
          :rules="tagsRules"
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
      alertSuccess: false,
      alertError: false,
      author: '',
      authorRules: [
        (v) => !!v || 'Поле "автор" обязательно',
        (v) => (v && v.length >= 2) || 'Имя автора должно быть больше чем (или равно) 2 символа',
      ],
      textRules: [
        (v) => !!v || 'Поле "текст" обязательно',
        (v) => (v && v.length >= 5) || 'Текст должнен быть больше чем (или равно) 5 символа',
      ],
      tagsRules: [
        (v) => (v && v.length >= 1) || 'Минимум 1 тэг нужно указать',
        (v) => (v && v.length <= 3) || 'Максимум 3 тэг можно указать',
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
    viewAlertError: function (time = 1000) {
      this.alertError = true;
      setTimeout(() => {
        this.alertError = false;
      }, time);
    },
    viewAlertSuccess: function (time = 1000) {
      this.alertSuccess = true;
      setTimeout(() => {
        this.alertSuccess = false;
      }, time);
    },
    sendForm: function () {
      const arrIdsTag = [];
      this.tagsSelected.forEach((item) => {
        const id = item.split('.');
        arrIdsTag.push(id[0]);
      });

      if (arrIdsTag >= 3 && arrIdsTag <= 1) {
        this.viewAlertError(3000);
        return;
      }

      if (this.author.length < 2) {
        this.viewAlertError(3000);
        return;
      }

      if (this.text.length < 5) {
        this.viewAlertError(3000);
        return;
      }

      const quotePayload = {
        'author': this.author,
        'text': this.text,
        'tags': arrIdsTag,
      };
      
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
          if (data.status === 'success') {
            this.alertSuccess = true;
            setTimeout(() => {
              this.$emit('close');
              this.$router.go();
            }, 1000);
          } else {
            this.viewAlertByTime();
          }
        });
    },
  },
};
</script>

<template>
  <div id="app">
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8>
        <v-card min-width="680" min-height="600" class="cardt">
          <v-card-title>
            <h1>Опрос</h1>
          </v-card-title>
          <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
            :color="color"
          >
            {{ text }}
            <v-btn color="white" @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitHandler">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  class="select"
                  v-model="select"
                  :items="items_1"
                  label="Стоит ли взрослой женщине одеться полностью в романтичном стиле?"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-select
                  class="select"
                  v-model="select_2"
                  :items="items_2"
                  label="Стоит ли взрослой женщине одеться полностью в романтичном стиле?"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-select
                  class="select"
                  v-model="select_3"
                  :items="items_3"
                  label="Как включать тренды в свой гардероб?"
                ></v-select>
              </v-col>
              <br />
              <v-text-field
                class="input"
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Ваше имя"
                required
              ></v-text-field>
              <v-text-field
                class="input"
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-btn
                type="submit"
                @click="snackbar = true"
                :disabled="!valid"
                color="primary"
              >Отправить</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../main";
export default {
  name: "Home",
  data: () => ({
    select_2: "",
    valid: false,
    x: "",
    snackbar: false,
    y: "top",
    mode: "",
    timeout: 6000,
    text: "",
    select_3: "",
    color: "",
    answer: [],
    name: "",
    email: "",
    nameRules: [
      v => !!v || "Имя не может быть пустым",
      v => (v && v.length <= 10) || "Ия не должно привышать 20 символов"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mailне может быть пустым",
      v => /.+@.+\..+/.test(v) || "E-mail некорректный"
    ],
    select: null,
    items_1: [
      { text: "Чистый классический стиль", value: "1" },
      { text: "Чистый спортивный стиль", value: "2" },
      { text: "Смесь классики и спорта", value: "3" }
    ],
    items_2: [
      { text: " Да, особенно когда идешь на свидание", value: "1" },
      {
        text:
          "Нет, это будет выглядеть глупо. Надо добавлять долю романтики к другим стилям",
        value: "2"
      },
      { text: "Можно, если такой образ был на манекене", value: "3" }
    ],
    items_3: [
      {
        text:
          " Разобраться с долгими и короткими трендами. Долгих трендов брать чуть побольше. Коротких - на один сезон, чтобы сделать образы острыми и интересными",
        value: "1"
      },
      {
        text:
          "Не трогать тренды - в них тяжело разобраться, подходит только молодежи, зачем позориться",
        value: "2"
      },
      {
        text:
          "Смотреть модные показы и полностью копировать понравившиеся образы с подиумов",
        value: "3"
      }
    ]
  }),
  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        name: this.name,
        items_1: this.select,
        items_2: this.select_2,
        items_3: this.select_3
      };

      const formData_true = {
        email: this.email,
        name: this.name,
        items_1: "1",
        items_2: "2",
        items_3: "1"
      };

      console.log(formData);
      console.log(formData_true);

      if (
        formData.items_1 == formData_true.items_1 &&
        formData.items_2 == formData_true.items_2 &&
        formData.items_3 == formData_true.items_3
      ) {
        this.text = "успех";
        this.color = "success";
      } else {
        this.text = "ошибка";
        this.color = "error";
      }
      try {
        await this.$store.dispatch("data", formData);
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
.select {
  width: 100px;
}

.cardt {
  margin-top: 50px;
}

.input {
  width: 400px;
}
</style>
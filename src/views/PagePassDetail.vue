<template>
  <div class="pass-detail">
      <div class="pass-detail__header">
        <h1 class="pass-detail__header-title">
          Пропуски
        </h1>

        <img src="../assets/info.svg" alt="" class="pass-detail__header-icon">
      </div>

      <div class="pass-detail__form">
        <div class="pass-detail__form-field">
          <div class="pass-detail__form-field-label">Тип проезжающего</div>
          <ui-select v-model="form.travelerType" :items="fakeData.TravelerTypes"></ui-select>
        </div>

        <div class="pass-detail__form-field">
          <div class="pass-detail__form-field-label">Срочность</div>
          <ui-select v-model="form.urgency" :items="fakeData.UrgencyList"></ui-select>
        </div>

        <div class="pass-detail__form-field">
          <div class="pass-detail__form-field-label pass-detail__form-field--access-type">Тип пропуска</div>
          <ui-select v-model="form.accessType" :items="fakeData.AccessType" ></ui-select>
        </div>

        <div
          v-if="form.accessType === fakeData.AccessType[0]"
          class="pass-detail__form-field pass-detail__form-field--rfid">
          <div class="pass-detail__form-field-label">Идентификатор RFID</div>
          <ui-input v-model="form.RFID" class="pass-detail__form-field-input"></ui-input>
        </div>

        <div class="pass-detail__form-field pass-detail__form-field--work-term" v-if="form.urgency === fakeData.UrgencyList[1]">
          <div class="pass-detail__form-field-label pass-detail__form-field-label--date">Срок работы</div>

          <div class="pass-detail__form-field-body">
            <span>с</span>
            <ui-input v-model="form.workTerm[0]" type="date" class="pass-detail__form-field-input"></ui-input>
            <span>по</span>
            <ui-input v-model="form.workTerm[1]" type="date" class="pass-detail__form-field-input"></ui-input>
          </div>
        </div>
      </div>

      <div class="pass-detail__form-footer">
        <button
          class="button button--main button--small button--border"
          @click="$router.push({ name: 'main' })">
          Отменить
        </button>
        <button
          class="button button--main button--small button--border"
          :class="{ 'button--disabled': !form.id }"
          @click="submit">
          Сохранить
        </button>
      </div>

      <div class="pass-detail__right-sidebar">
        <div class="pass-detail__right-sidebar-content">
          <div class="sidebar__title">
            Ваш пропуск
          </div>

          <div class="sidebar__field">
            <div class="sidebar__field-label text--bold">КПП</div>
            <div class="sidebar__field-value">{{ form.kpp }}</div>
          </div>

          <div class="sidebar__field">
            <div class="sidebar__field-label text--bold">Поселок и участок</div>
            <div class="sidebar__field-value">-</div>
          </div>

          <div class="sidebar__field">
            <div class="sidebar__field-label text--bold">Лицо</div>
            <div class="sidebar__field-value">{{ form.fio }}</div>
          </div>

          <div class="sidebar__field">
            <div class="sidebar__field-label text--bold">Автомобиль</div>
            <div class="sidebar__field-value">{{ form.vehicle }}</div>
          </div>

          <div class="sidebar__field">
            <div class="sidebar__field-label text--bold">Пропуск</div>
            <div class="sidebar__field-value">
              <div>
                <span class="text--grey">Тип проезжающего: </span>
                <span>{{ form.travelerType }}</span>
              </div>

              <div>
                <span class="text--grey">Тип пропуска: </span>
                <span>{{ form.accessType }}</span>
              </div>

              <div>
                <span class="text--grey">Срочность: </span>
                <span>{{ form.urgency }}</span>
              </div>

              <div>
                <span class="text--grey">Продукт, по которому предоставляется пропуск: </span>
                <span>Обслуживание участков</span>
              </div>

              <div>
                <span class="text--grey">Идетификатор: </span>
                <span>{{ form.urgency }}</span>
              </div>
            </div>
          </div>

          <div v-if="form.accessType === fakeData.AccessType[2]" class="sidebar__field sidebar__field--qr-code">
            <img src="../assets/qr-code.png" alt="">

            <transition name="fade" mode="out-in" appear>
              <div v-if="!form.id" class="sidebar__field-overlay">
                <div class="button__icon"></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UiInput from "@/components/ui/UiInput.vue";
import UiSelect from '../components/ui/UiSelect.vue';
import fakeData from '../fake-data.json';
import { mapState, mapActions } from 'vuex';
import StatusModel from '../models/StatusModel';

export default {
  name: "pass-detail",
  components: {
    UiInput,
    UiSelect,
  },

  data: () => ({
    fakeData,

    form: {
      travelerType: fakeData.TravelerTypes[0],
      urgency: fakeData.UrgencyList[0],
      accessType: fakeData.AccessType[0],
      RFID: fakeData.IdentificationRFID,
      workTerm: ['', ''],
      vehicle: fakeData.Vehicle,
      fio: fakeData.FIO,
      kpp: fakeData.KPP,
      status: StatusModel.ACTIVATED.id,
      id: '' // 745AFC16,
      
    },
  }),

  computed: {
    ...mapState(['user']),

    formErrors() {
      if (!this.form.id) {
        return 'Ожидание идентификатора пропуска';
      }

      return '';
    }
  },

  created() {
    this.generateId();
  },

  methods: {
    ...mapActions(['createPass']),
    
    async submit() {
      if (this.formErrors) {
        alert(this.formErrors);

        return;
      }

      await this.createPass(this.form);

      this.$router.push({ name: 'main' });
    },

    generateId() {

      function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }
      
      let result           = '';
      result += randomInteger(100, 999);
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for ( var i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
      }

      result += randomInteger(10, 100)

      setTimeout(() => this.form.id = result.toUpperCase(), 10 * 1000)
    },
  },
};
</script>

<style lang="scss">
  .pass-detail {
    display: grid;
    grid-template-columns: 1fr 340px;
    grid-template-rows: max-content 1fr;
    height: 100%;
    // grid-auto-flow: column;
    // grid-template-columns: 1fr minmax(340px, 500px);
    // position: relative;
  }

  .pass-detail__form {
    grid-column: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 38px 8px;
    height: max-content;
  }

  .pass-detail__form-field-label {
    margin-bottom: 4px;
  }

  .pass-detail__form-field-body {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: flex-end;
    grid-gap: 15px;

  }

  .pass-detail__right-sidebar {
    grid-row: 1 / -1;
    grid-column: 2;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 340px;
    // margin: -60px -60px 0 0;
    padding: 10px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }

  .pass-detail__right-sidebar-content {
    display: flex;
    flex-direction: column;
    border: 1px dashed #78B62C;
    border-radius: 0px 25px 25px 0px;
    padding: 35px 32px;
    height: 100%;
  }

  .pass-detail__header {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-auto-columns: max-content;
    grid-gap: 9px;
    margin-bottom: 45px;
  }

  .pass-detail__header-title {
    font-weight: 900;
    font-size: 30px;
    line-height: 35px;
  }

  .pass-detail__header-icon {
    width: 24px;
    height: 24px;
  }

  .sidebar__title {
    font-weight: 900;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 13px;
  }

  .sidebar__field-label {
    margin-top: 13px;
    margin-bottom: 10px;
  }

  .pass-detail__form-field-input {
    height: 35px;
  }

  .sidebar__field--qr-code {
    position: relative;
    margin-top: auto;

    .sidebar__field-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.61);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button__icon {
      width: 100px;
      height: 100px;
      mask: url('../assets/loader.svg') no-repeat center;
      background-color: rgb(75, 75, 75);
      transition: background-color 0.12s ease-in-out;
    }
  }

  .pass-detail__form-field--access-type,
  .pass-detail__form-field--rfid,
  .pass-detail__form-field--work-term {
    grid-column: 1 / 2;
  }

  .pass-detail__form-footer {
    grid-column: 1 / -1;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: 38px;
  }
</style>

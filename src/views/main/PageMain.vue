<template>
  <div class="page-main">
    <div class="page-main__header">
      <h1 class="page-main__header-title">
        Пропуски
      </h1>

      <img src="../../assets/info.svg" alt="">

      <div class="page-main__header-controls">
        <button
          class="button button--main button--small"
          @click="$router.push({ name: 'pass-detail', params: { id: 'create' } })">
          <span class="button__icon"></span>
          Создать пропуск
        </button>

        <div>
          <ui-input
            v-model="search"
            placeholder="Поиск"
            class="header-controls__input">
            <span class="header-controls__input-icon"></span>
          </ui-input>
        </div>
      </div>
    </div>

    <pass-table class="page-main__table" :fields="tableFields">
      <template v-for="item in passList">
        <div
          :key="`${item.id}-id`"
          class="table-row-item table-row-item--start">
          {{ item.id }}
        </div>

        <div
          :key="`${item.id}-fio`"
          class="table-row-item">
          {{ item.fio }}
        </div>

        <div
          :key="`${item.id}-vehicle`"
          class="table-row-item">
          {{ item.vehicle }}
        </div>

        <div
          :key="`${item.id}-accessType`"
          class="table-row-item table-row-item--id-type">
          {{ item.accessType }}
        </div>

        <div
          :key="`${item.id}-kpp`"
          class="table-row-item">
          {{ item.kpp }}
        </div>

        <div
          :key="`${item.id}-status`"
          class="table__row-item table-row-item">
          <ui-select
            v-model="item.status"
            class="table__row-item-select"
            :items="StatusModel.LIST"
            value-field="id" />
        </div>

        <div
          :key="`${item.id}-controls`"
          class="table__row-item-actions table-row-item table-row-item--end">
          <button class="table__row-item-action table__row-item-action--copy button button--small button--main">
            <span class="button__icon"></span>
          </button>

          <button class="table__row-item-action table__row-item-action--edit button button--small button--main">
            <span class="button__icon"></span>
          </button>
        </div>
      </template>
    </pass-table>

  </div>
</template>

<script>
import UiInput from '../../components/ui/UiInput.vue';
import UiSelect from '../../components/ui/UiSelect.vue';
import PassTable from './components/PassTable.vue';
import StatusModel from '../../models/StatusModel';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'page-main',

  components: {
    UiInput,
    PassTable,
    UiSelect,
  },

  data() {
    return {
      StatusModel,

      search: '',

      tableFields: [
        { title: 'Идентификатор' },
        { title: 'Лицо' },
        { title: 'Автомобиль' },
        { title: 'Идентификация' },
        { title: 'КПП' },
        { title: 'Статус' },
        { title: '', max: 'max-content' },
      ],

      tableData: [
        {
          id: "23470",
          vehicle: '',
          kpp: 'awdawd',
          fio: "\u0421\u0435\u0440\u0435\u0431\u0440\u0435\u043d\u043d\u0438\u043a\u043e\u0432 \u041a\u043b\u0438\u043c \u041c\u0430\u043a\u0441\u0438\u043c\u043e\u0432\u0438\u0447",
          status: StatusModel.ACTIVATED.id,
        }
      ],
    }
  },

  computed: {
    ...mapState(['passList'])
  },

  created() {
    this.fetchUser();
  },

  methods: {
    ...mapActions(['fetchUser'])
  },
}
</script>

<style lang="scss" scoped>
  .page-main__header {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content max-content auto;
    align-items: center;
    grid-gap: 9px;
    margin-bottom: 56px;
  }

  .page-main__header-title {
    text-align: left;
    font-weight: 900;
    font-size: 40px;
    line-height: 47px;
  }

  .page-main__header-controls {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
  }

  .button__icon {
    mask: url('../../assets/add.svg') no-repeat center;
  }

  .table__row-item-action {
    padding: 8px 10px;
  }

  .table__row-item-action--copy .button__icon {
    mask: url('../../assets/copy.svg') no-repeat center;
    width: 16px;
    height: 16px;
    mask-size: 16px;
  }

  .table__row-item-action--edit .button__icon {
    mask: url('../../assets/edit.svg') no-repeat center;
    width: 14px;
    height: 14px;
    mask-size: 14px;
  }

  .header-controls__input-icon {
    width: 14px;
    height: 14px;
    mask: url('../../assets/search.svg') no-repeat center;
    background-color: var(--c-grey);
    transition: background-color 0.12s ease-in-out;
  }

  .header-controls__input {
    &:hover .header-controls__input-icon {
      background-color: var(--c-grey--active);
    }
  }

  .table-row-item--id-type {
    color: black;
    font-weight: 400;
  }

  .table__row-item-select {
    --bg-color: rgba(120, 182, 44, 0.05);
    --border-color: transparent;
    --border-color--active: transparent;
  }

  .table__row-item-actions {
    display: grid;
    grid-auto-flow: column;
    align-items: flex-start;
  }
</style>

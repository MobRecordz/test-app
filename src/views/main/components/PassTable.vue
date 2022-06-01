<template>
  <div
    class="table"
    :style="style">

    <div
      v-for="(field, index) in fieldsData"
      :key="`head-${index}`"
      :style="field.column ? { cursor: 'pointer' } : {}"
      class="table__header"
      :class="{
        'table__sorted': tableSort.field && tableSort.field === field.column,
        'table__sorted--align-right' : field.isMoney
      }"
      data-odd="true"
      @click="click(field)">

      <span v-html="field.title" />

      <arrowhead-icon
        v-if="field.column"
        class="table__arrow"
        :is-reverse="tableSort.asc && tableSort.field === field.column" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'pass-table',

  props: {
    fields: {
      type: Array,
      required: true,
    },

    tableSort: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    fieldsData() {
      return this.fields.map((field) => ({
        title: 'Title',
        min: 'auto',
        max: field.columnWidth || '1fr',
        ...field,
      }));
    },

    additionalColumns() {
      return this.hasActions ? [{ min: 'auto', max: '1fr' }] : [];
    },

    style() {
      return {
        '--col-template': [...this.fieldsData, ...this.additionalColumns]
          .reduce((res, curr) => `${res} minmax(${curr.min}, ${curr.max})`, '')
          .trim(),
      };
    },
  },

  methods: {
    click(field) {
      if (field.column) {
        this.$emit('update-sort', field.column);
      }
    },
  },

};
</script>

<style lang="scss" scoped>
  .table {
    display: grid;
    grid-row-gap: 5px;
    grid-template-columns: var(--col-template);

    & > * {
      line-height: 1.5;

      // &:not([data-odd]) {
      //   background-color: var(--c-grey);
      // }
    }
  }

  .table__header {
    font-weight: 700;
    display: flex;
    align-items: center;

    font-size: 16px;
    line-height: 19px;
    padding: 6px 6px;

    &.table__sorted--align-right {
      justify-content: flex-end;
      text-align: right;
    }
  }

  .table__arrow {
    --shape-color: #{var(--c-grey)};

    width: 20px;
    margin-left: 8px;
  }

  .table__sorted {
    position: relative;
    color: white;

    .table__arrow {
      --shape-color: white;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: lightgrey;
      opacity: 0.1;
      pointer-events: none;
    }

    &.table__header:before {
      border-radius: 15px 15px 0 0;
    }
  }
</style>

<style lang='scss'>
.table-row-item {
  --text-color: var(--c-main);

  font-weight: 800;
  font-size: 18px;
  line-height: 21px;
  color: var(--text-color);
  border-top: 1px solid var(--c-grey--dark);
  border-bottom: 1px solid var(--c-grey--dark);
  padding: 22px 5px;

  &--start {
    border-radius: 6px 0 0 6px;
    border-left: 1px solid var(--c-grey--dark);
    padding-left: 25px;
  }

  &--end {
    border-radius: 0 6px 6px 0;
    border-right: 1px solid var(--c-grey--dark);
    padding-right: 25px;
  }
}
</style>

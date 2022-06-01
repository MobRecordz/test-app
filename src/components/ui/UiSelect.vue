<template>
  <label class="ui-select__wrapper">
    <slot />
    <select
      v-bind="$attrs"
      v-bind:value="value"
      class="ui-select__input"
      type="select"
      v-on="inputListeners">
      <option
        v-for="item in items"
        :key="item.label || item"
        :value="valueField ? item[valueField] : item">
        {{ item.label || item }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "ui-select",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },

    value: {
      type: [String, Number],
      required: true,
    },

    valueField: {
      type: String,
      default: '',
    },

    items: {
      type: Array,
      required: true,
    }
  },

  computed: {
    inputListeners: function () {
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.ui-select__wrapper {
  --bg-color: transparent;
  --border-color: var(--c-grey);
  --border-color--active: var(--c-grey--active);
}

.ui-select__input {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 12px;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  background-color: var(--bg-color);
  transition: border 0.12s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--border-color--active);
  }

  &:focus {
    border: 1px solid var(--border-color--active);
  }
}

.ui-select__input {
  // border: none;
  // background-color: transparent;

  // &::placeholder {
  //   color: var(--c-grey--active);
  // }
}
</style>

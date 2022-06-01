<template>
  <label class="ui-input__wrapper">
    <slot />
    <input
      v-bind="$attrs"
      v-bind:value="value"
      class="ui-input__input"
      v-on="inputListeners"
    >
  </label>
</template>

<script>
export default {
  name: 'ui-input',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },

  computed: {
    inputListeners: function () {
      return Object.assign({},
        this.$listeners,
        {
          input: (event) => {
            this.$emit('input', event.target.value)
          }
        }
      )
    }
  },
}
</script>

<style lang="scss">
.ui-input__wrapper {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 12px;
  padding: 8px 10px;
  border: 1px solid var(--c-grey);
  border-radius: 4px;
  transition: border 0.12s ease-in-out;
  cursor: text;

  &:hover {
    border: 1px solid var(--c-grey--active);
  }

  &:focus {
    border: 1px solid var(--c-grey--active);
  }
}

.ui-input__input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: var(--c-grey--active);
  }
}
</style>

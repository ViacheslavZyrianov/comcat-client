<template>
  <div class="select">
    <div
      v-if="selectedValue"
      class="fake-select fake-select__value"
    >
      {{ selectedValue }}
    </div>
    <div
      v-else
      class="fake-select fake-select__placeholder"
    >
      {{ placeholder }}
    </div>
    <select
      v-model="value"
      @change="onChange"
    >
      <option
        v-for="item in list"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    defaultValue: {
      type: String || null,
      default: null
    },
    list: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select option'
    }
  },
  data () {
    return {
      value: this.defaultValue
    }
  },
  watch: {
    defaultValue () {
      this.value = this.defaultValue
    }
  },
  computed: {
    selectedValue () {
      return this.list.find(selectItem => selectItem.value === this.value)?.label
    }
  },
  methods: {
    onChange () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
select {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  padding: 7px;
}

.select {
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 12px;
    width: 2px;
    height: 8px;
    background-color: #fff;
    border-radius: 2px;
  }

  &:before {
    transform: rotate(-45deg);
    right: 20px;
  }

  &:after {
    transform: rotate(45deg);
    right: 15px;
  }
}

.fake-select {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  padding: 8px;
  border: none;
  font-size: 14px;
  background-color: #282642;

  &__placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &__value {
    color: #fff;
  }
}
</style>

<template>
  <div :class="filterPanelClassList">
    <div class="filter-panel__title">Filter comix list by</div>
    <div class="filter-panel__row">
      <div class="row__title">Title</div>
      <div class="row__action">
        <input
          v-model="searchText"
          placeholder="Type to search..."
          type="text"
          name="search"
          class="input input_search"
          @input="onFilterBySearch"
        >
      </div>
    </div>
    <div class="filter-panel__row">
      <div class="row__title">Universe</div>
      <div class="row__action">
        <custom-select
          :list="universe.list"
          :default-value="universe.value"
          @change="onFilterByUniverse"
        />
      </div>
    </div>
    <footer class="filter-panel__footer">
      <button
        class="button button_ghost"
        @click="onCloseFilterPanel"
      >
        Close
      </button>
    </footer>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CustomSelect from './CustomSelect'

export default {
  name: 'FilterPanel',
  components: {
    CustomSelect
  },
  data () {
    return {
      searchText: '',
      universe: {
        value: 'all',
        list: [
          {
            value: 'all',
            label: 'All'
          },
          {
            value: 'dc',
            label: 'DC'
          },
          {
            value: 'marvel',
            label: 'Marvel'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('comix', [
      'isFilterPanelVisible'
    ]),
    filterPanelClassList () {
      return [
        'filter-panel',
        { 'filter-panel_visible': this.isFilterPanelVisible }
      ]
    }
  },
  methods: {
    ...mapMutations('comix', [
      'SET_IS_FILTER_PANEL_VISIBLE',
      'SET_FILTER_SEARCH',
      'SET_FILTER_UNIVERSE'
    ]),
    onCloseFilterPanel () {
      this.SET_IS_FILTER_PANEL_VISIBLE(false)
    },
    onFilterBySearch () {
      this.SET_FILTER_SEARCH(this.searchText)
    },
    onFilterByUniverse (universe) {
      this.SET_FILTER_UNIVERSE(universe)
    }
  }
}
</script>

<style scoped lang="scss">
.filter-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  transform: translateY(100%);
  transition: transform .3s;
  background-color: #1c1a31;

  &_visible {
    transform: translateY(0);
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 16px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .row {
      &__title {
        color: #fff;
        padding-right: 8px;
      }

      &__action {
        flex: 1;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>

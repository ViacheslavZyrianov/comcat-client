<template>
  <div
    v-if="isComixListLoaded"
    class="comix-list"
  >
    <div
      v-if="isComixListExists"
      :class="bodyClassList"
    >
      <div
        v-for="comix in comixListFiltered"
        :key="comix.id"
        class="comix-list__comix"
      >
        <img
          :src="comix.cover.url"
          width="100%"
          class="comix__cover"
        >
        <div class="comix__info">
          <div class="comix__title">{{ comix.title }}</div>
          <div class="comix__universe">{{ comix.universe }}</div>
          <hr class="divider">
          <div class="comix__buttons">
            <button
              class="button button_round button_yellow button_edit"
              @click="onEditComixClick(comix.id)"
            ></button>
            <button
              class="button button_round button_red button_delete"
              @click="onDeleteComixClick(comix.id, comix.title)"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isComixListNotFound"
      class="comix-list_not-found"
    >
      There is no such comix 😢
    </div>
    <div
      v-if="isComixListEmpty"
      class="comix-list_empty"
    >
      You still don't have any comix in your collection 😢
      <br><br>
      <button
        class="button button_big button_green"
        @click="onAddComix"
      >
        Add first comix
      </button>
    </div>
    <footer class="comix-list__footer">
      <div
        :class="layoutClassList"
        @click="onLayoutClick"
      >
      </div>
      <input
        v-model="searchText"
        placeholder="Search by title"
        type="text"
        name="search"
        class="input input_search"
        @input="onSearchInput"
      >
      <button
        class="button button_round button_add button_green comix-list__button-add"
        @click="onAddComix"
      ></button>
    </footer>
  </div>
  <div
    v-else
    class="comix-list_not-loaded"
  >
    Waiting for comix list to load...
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ComixList',
  data () {
    return {
      isComixListLoaded: false,
      layout: 'grid',
      searchText: '',
      comixListFiltered: []
    }
  },
  watch: {
    comixList: {
      handler () {
        this.comixListFiltered = [...this.comixList]
      },
      deep: true
    }
  },
  computed: {
    ...mapState('comix', [
      'comixList'
    ]),
    ...mapGetters({
      getComixById: 'comix/getComixById'
    }),
    isLayoutGrid () {
      return this.currentLayout === 'grid'
    },
    isLayoutList () {
      return this.currentLayout === 'list'
    },
    layoutClassList () {
      return [
        'comix-list__layout',
        `comix-list__layout_${this.layout}`
      ]
    },
    bodyClassList () {
      return [
        'comix-list__body',
        `comix-list__body_${this.layout}`
      ]
    },
    isComixListExists () {
      return this.comixListFiltered.length
    },
    isComixListNotFound () {
      return this.searchText.length && this.comixListFiltered.length === 0
    },
    isComixListEmpty () {
      return this.searchText.length === 0 && this.comixListFiltered.length === 0
    }
  },
  methods: {
    ...mapActions({
      fetchComixList: 'comix/fetchList',
      deleteComixItem: 'comix/deleteItem'
    }),
    ...mapMutations('comix', [
      'SET_IS_ADD_EDIT_COMIX_VISIBLE',
      'SET_COMIX_DATA'
    ]),
    ...mapMutations({
      SET_NOTIFICATION: 'notification/SET_NOTIFICATION'
    }),
    onLayoutClick () {
      if (this.layout === 'grid') this.layout = 'list'
      else if (this.layout === 'list') this.layout = 'grid'
    },
    onSearchInput () {
      if (this.searchText) this.comixListFiltered = this.comixList.filter(({ title }) => title.toLowerCase().includes(this.searchText.toLowerCase()))
      else this.comixListFiltered = [...this.comixList]
    },
    onAddComix () {
      this.SET_IS_ADD_EDIT_COMIX_VISIBLE(true)
      this.SET_COMIX_DATA({
        id: null,
        title: null,
        universe: null,
        cover: null
      })
    },
    onEditComixClick (id) {
      this.SET_IS_ADD_EDIT_COMIX_VISIBLE(true)
      this.SET_COMIX_DATA(this.getComixById(id))
    },
    async onDeleteComixClick (id, title) {
      const isDeleteComix = window.confirm(`Delete comix ${title}?`)
      this.isDeleteComixLoading = true
      try {
        if (isDeleteComix) await this.deleteComixItem(id)
      } catch (err) {
        this.SET_NOTIFICATION(err)
      } finally {
        this.isDeleteComixLoading = false
      }
    }
  },
  async created () {
    await this.fetchComixList()
    this.isComixListLoaded = true
  }
}
</script>

<style scoped lang="scss">
.comix-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);

  &__body {
    display: grid;
    gap: 16px;
    grid-auto-rows: min-content;
    border-radius: 8px;
    margin-bottom: auto;
    transition: .5s;
    overflow: auto;

    &_grid {
      grid-template-columns: 1fr 1fr;
    }

    &_list {
      grid-template-columns: 1fr;

      .comix-list__comix {
        img {
          display: none;
        }
      }
    }
  }

  &__comix {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #282642;
    overflow: hidden;
  }

  &__footer {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  &__layout {
    position: relative;
    margin-left: auto;
    width: 24px;
    height: 24px;
    transition: transform .3s;

    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 4px;
      background-color: #fff;
      left: 0;
      right: 0;
      border-radius: 2px;
    }

    &:before {
      top: 6px;
    }

    &:after {
      bottom: 6px;
    }

    &_list {
      transform: rotate(90deg) scaleX(.6);
    }
  }

  &_empty,
  &_not-loaded,
  &_not-found {
    width: 100%;
    color: #fff;
    text-align: center;
    margin: auto;
  }

  &_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 32px;
    margin-bottom: auto;
    margin-top: auto;
  }

  &_not-found {
    font-size: 32px;
  }
}

.comix {
  &__cover {
    flex: 1;
    max-height: 35vh;
    object-fit: cover;
    object-position: center center;
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }

  &__info {
    color: #fff;
    padding: 16px 16px 8px 16px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .button {
      margin-left: 8px;
    }
  }
}
</style>

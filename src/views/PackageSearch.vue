<template>
  <div 
    id="search-page" 
    class="data-search-page"
  >
    <v-data-table 
      item-key="name" 
      no-data-text="No items to show." 
      class="row-pointer"
      :page="page"
      :items-per-page="itemsPerPage"
      :items="packages"
      :headers="headers"
      :server-items-length="totalItems"
      :loading="isLoading"
      :disable-sort="true"
      :footer-props="{
        'disable-items-per-page': true,
        'disable-pagination': isLoading,
      }"
      @click:row="clickRow" 
      @update:page="updatePage"
    >
      <template slot="top">
        <v-toolbar 
          height="80px" 
          :elevation="1" 
        >
          <v-container class="toolbar">
            <v-form @submit.prevent="searchSubmitted">
              <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
                filled clearable v-model="query"
                :hide-details="true"
                :full-width="true"
              >
              </v-text-field>
            </v-form>
          </v-container>
        </v-toolbar>
      </template>
    </v-data-table>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      query: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Author", value: "author" },
        { text: "Version", value: "version" },
      ],
      isLoading: false,
      page: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    ...mapGetters([
      "packages", 
      "totalItems",
      ]),
  },
  methods: {
    updatePage(page) {
      this.page = page;
      this.loadingPage(page);
    },
    searchSubmitted() {
      const page = (this.page = 1);
      this.loadingPage(page);
    },
    loadingPage(page) {
      this.isLoading = true;
      this.page = page;
      this.$store.dispatch("fetchPackages", {
        page,
        query: 
        this.query
      });
      this.isLoading = false;
    },
    clickRow(item) {
      this.$router.push({
        name: "PackageInfo",
        params: { 
          name: 
          item.name 
      }});
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  max-width: 100%;
}

.data-search-page {
  .row-pointer::v-deep {
    .v-data-table__wrapper {
      tbody {
        tr:not(.v-data-table__empty-wrapper) {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

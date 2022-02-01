<template>
  <v-row justify="center">
    <v-dialog v-model="name" persistent max-width="720" 
      @click:outside="$router.push({ name: 'PackageSearch' })">
      <v-card shaped>
        <v-skeleton-loader type="article"
          :loading="loading"
          :boilerplate="true">
          <v-card-title class="text-h4">{{ name }}</v-card-title>
          <v-card-subtitle class="text-subtitle-2">
            <span v-if="getEmail">{{ getEmail }}</span>
          </v-card-subtitle>
        </v-skeleton-loader>
        <v-skeleton-loader type="image"
          :loading="loading" 
          :boilerplate="true">
          <v-card-text>
            <v-row id="row_0" class="text-body-1 package-description">
                <v-col v-if="getAuthor">{{ getAuthor }}</v-col>
                <v-col v-if="getVersion">{{ getVersion }}</v-col>
                <v-col v-if="getPublished">{{ getPublished }}</v-col>
            </v-row>
            <v-row class="text-body-1 package-description">
              <v-col>{{ getDescription }}</v-col>
            </v-row>
            <v-row v-if="usage.values.length">
              <v-col>
                <span class="text-subtitle-1 text-overline">Downloads per year: {{getTotal}}</span>
                <v-sparkline color="blue-grey"
                :labels="usage.labels" 
                :value="usage.values"  
                :smooth="4" 
                :label-size="8">
                </v-sparkline>
              </v-col>
            </v-row>
          </v-card-text>
        </v-skeleton-loader>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: this.$route.params.name,
      loading: true,
      usageData: null,
      packageData: null,
    };
  },
  methods: {
    async loadUsage() {
      let response;
      try {
        response = await axios.get(
          `https://data.jsdelivr.com/v1/package/npm/${this.name}/stats/date/year`
        );
      } catch (e) {
        console.error(e);
        return;
      }
      return response.data;
    },
    async loadPackage() {
      let response;
      try {
        response = await axios.get("https://registry.npmjs.org/-/v1/search", {
          params: {
            text: this.name,
            size: 1,
          },
        });
      } catch (e) {
        console.error(e);
        return;
      }

      return response.data?.objects?.[0]?.package;
    },
  },
  computed: {
    usage() {
      let values = [];
      let labels = [];

      if (this.usageData) {
        const reducedData = {};
        
        for (let dateString in this.usageData.dates) {
          const shortDate = dateString.slice(0, -3);
          reducedData[shortDate] = reducedData[shortDate] 
          ? 
          reducedData[shortDate] += this.usageData.dates[dateString].total
          :
          reducedData[shortDate] = this.usageData.dates[dateString].total;
        }
        labels = Object.keys(reducedData).map((shortDate) => {
          return new Date(shortDate).toLocaleString('en-US', { month: "short", });
        });
        values = Object.values(reducedData);
      }
      return { values, labels };
    },
    getAuthor() {
        console.log(this.packageData);
        return "by " + this.packageData?.author?.name || "";
    },
    getEmail() {
        return "Publisher email: " + this.packageData?.publisher?.email || "";
    },
    getPublished() {
      const numeric = "numeric";
      return "publication " + (
        new Date(this.packageData?.date).toLocaleString(undefined, {
          day: numeric,
          month: numeric,
          year: numeric,
        }) || ""
      );
    },
    getVersion() {
      return "v " + this.packageData?.version || "";
    },
    getDescription() {
      return this.packageData?.description || "";
    },
    getTotal() {
      return this.usageData?.total || "0";
    }
  },
  async created() {
    this.loading = true;
    [this.usageData, this.packageData] = await Promise.all([
      this.loadUsage(),
      this.loadPackage(),
    ]);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
$dotted1px: 1px dotted #ccc;

.package-description {
  border-top: $dotted1px;
  border-bottom: $dotted1px;
}

.v-data-footer {
  justify-content: end;
}
</style>
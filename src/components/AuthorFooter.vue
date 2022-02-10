<template>
    <v-footer>
      <v-col class="text-center">
        <p 
          id="author" 
          class="text-overline" 
          v-text="'© ' + currentYear + ' '  + author"
        />
        <v-btn :href="github" icon small fab>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  props : {
    author: String,
    github: String,
  },
  computed : {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
$margin: -10px;

#author {
  margin-top: $margin;
  margin-bottom: $margin
}
</style>
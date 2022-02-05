<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <AuthorFooter author="Roman Tsvid" github="https://github.com/RomanMatricaria"/>
  </v-app>
</template>

<script>
import AuthorFooter from '@/components/AuthorFooter'

export default {
  name: "App",
  components: {
    AuthorFooter
  }
};
</script>
<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <AuthorFooter/>
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
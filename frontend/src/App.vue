<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>EXPRESS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Table />
    </v-content>
  </v-app>
</template>

<script>
import Table from "./components/Table";

export default {
  name: "App",
  components: {
    Table
  },
  data: () => ({
    //
  })
};
</script>
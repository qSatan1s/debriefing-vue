<template>
  <div id="app">
    <v-app>
      <Home />
    </v-app>
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: "App",

  components: { Home },

  data: () => ({
    //
  })
};
</script>


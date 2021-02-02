<template>
  <h1>Weather Card</h1>
</template>

<script>
export default {
  name: "WeatherCard",
  mounted() {
    console.log('je sui monted')
    this.test();
  },
  methods: {
    test() {
      console.log('ENV',process.env.VUE_APP_API_KEY);
    },
  },
};
</script>

<style></style>

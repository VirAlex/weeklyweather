<template>
  <div
    class="main-container"
    :style="'background-image:url(' + backAfternon + ')'"
  >
    <div class="container-weather">
      <div class="city">PARIS</div>
      <div class="prevision">
        <div class="text">
          It's
          <br />
          raining
          <br />
          now
        </div>
        <div class="img"><img :src="suny" alt="" /></div>
      </div>
      <div class="temp">10°</div>
    </div>
  </div>
</template>

<script>
import backAfternon from "@/assets/after_noon.png";
import backNight from "@/assets/night.jpg";
import suny from "@/assets/icons/suny.png";
import axios from "axios";

export default {
  data() {
    return {
      backAfternon,
      backNight,
      suny,
      temp: '',

    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=Paris&&units=metric&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then((response) => console.log(response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;800&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}
.main-container {
  width: 350px;
  height: 650px;
  margin: 0 auto;
  background-position: center;
  background: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 255, 0.8) !important;
  border-radius: 35px;
  .container-weather {
    padding: 45px 0;
    background-color: $blue;
    width: 100%;
    height: 25%;
    border-radius: 35px;
    margin: auto auto;
    .city {
      text-align: center;
      color: $white;
      font-weight: 800;
      font-size: 30px;
    }
    .prevision {
      display: flex;
      justify-content: space-around;
      .img {
        img {
          width: 50px;
        }
      }
      .text {
        color: $white;
        font-size: 25px;
      }
    }
    .temp {
      text-align: center;
      color: $white;
      font-weight: 700;
      font-size: 35px;
    }
  }
}
</style>

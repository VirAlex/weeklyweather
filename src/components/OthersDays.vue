<template>
  <div>
    <div class="prevision">
      <font-awesome-icon
        class="fa fa-search fa-2x active"
        :style="{ color: 'white' }"
        icon="arrow-circle-left"
        @click="previousDayMethod()"
      />
      <div class="text">
        It's
        <br />
        {{ prevision[0][whatDay].weather[0].description }}
        <br />
        <span v-if="whatDay == 0">tommorow</span>
        <span v-else>{{ showTheDate }}</span>
      </div>
      <font-awesome-icon
        class="fa fa-search fa-2x active"
        :style="{ color: 'white' }"
        icon="arrow-circle-right"
        @click="otherDay()"
      />
    </div>
    <div class="img">
      <img :src="iconWeatherShow" alt="" :style="styleImg" />
    </div>
    <div class="temp">{{ Math.round(prevision[0][whatDay].temp.day) }}°</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import suny from "@/assets/icons/suny.png";
import cloud from "@/assets/icons/cloud.png";
import cloudSuny from "@/assets/icons/cloud_suny.png";
import showerRain from "@/assets/icons/shower_rain.png";
import lotCloud from "@/assets/icons/lot_cloud.png";
import rain from "@/assets/icons/rain.png";
import thunderstorm from "@/assets/icons/thunderstorm.png";
import mist from "@/assets/icons/mist.png";
import snow from "@/assets/icons/snow.png";
export default {
  props: ["prevision", "day"],
  name: "otherdays",
  data() {
    return {
      suny,
      cloud,
      cloudSuny,
      lotCloud,
      showerRain,
      rain,
      thunderstorm,
      snow,
      mist,
    };
  },
  methods: {
    ...mapActions(["changeDay", "changeIcones", "giveTheDate", "previousDay"]),
    otherDay() {
      this.changeDay();
      this.changeIcones(this.prevision[0][this.whatDay].weather[0].icon);
      this.giveTheDate(this.whatDay);
    },
    previousDayMethod() {
      console.log("Previous Method");
      this.previousDay();
      if (this.whatDay === -1) {
        console.log("what day -1");
        this.$emit("otherdaysShow", false);
      }
      this.changeIcones(this.prevision[0][this.whatDay].weather[0].icon);
      this.giveTheDate(this.whatDay);
    },
  },
  created() {
    {
      switch (this.prevision[0][this.whatDay].weather[0].icon) {
        case "01d":
          this.iconWeather = this.suny;
          break;
        case "02d":
          this.iconWeather = this.cloudSuny;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "03d":
          this.iconWeather = this.cloud;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "04d":
          this.iconWeather = this.lotCloud;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "09d":
          this.iconWeather = this.showerRain;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "10d":
          this.iconWeather = this.rain;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "11d":
          this.iconWeather = this.thunderstorm;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "13d":
          this.iconWeather = this.snow;
          this.styleImg = "width: 80px; height: 90px";
          break;
        case "50d":
          this.iconWeather = this.mist;
          this.styleImg = "width: 80px; height: 90px";
          break;
      }
    }
  },
  computed: {
    ...mapGetters([
      "whatDay",
      "iconWeatherShow",
      "styleImgStore",
      "showTheDate",
    ]),
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
  height: 610px;
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
      margin-bottom: 25px;
    }
    .img {
      display: flex;
      justify-content: center;
      img {
        margin: 0 auto;
        width: 50px;
      }
    }
    .prevision {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 90px;
      .text {
        color: $white;
        font-size: 20px;
      }
    }
    .temp {
      text-align: center;
      color: $white;
      margin-top: 15px;
      font-weight: 700;
      font-size: 70px;
    }
  }
}
</style>

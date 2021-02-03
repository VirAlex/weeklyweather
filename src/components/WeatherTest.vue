<template>
  <div
    class="main-container"
    :style="'background-image:url(' + backAfternon + ')'"
  >
    <div class="container-weather">
      <div class="city">{{ city }}</div>
      <button @click="getMyInfo()">MA METEO</button>
      <button @click="showPrevision()">+</button>
      <div v-if="!otherdaysShow" class="prevision">
        <div class="text">
          It's
          <br />
          {{ weather }}
          <br />
          now
        </div>
        <div class="img">
          <img :src="iconWeatherShow" alt="" :style="styleImgStore" />
        </div>
      </div>
      <div v-if="!otherdaysShow" class="temp">{{ temperature }}°</div>
      <otherdays v-if="otherdaysShow" :prevision="prevision" :day="day" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import otherdays from "@/components/OthersDays.vue";
import backAfternon from "@/assets/after_noon.png";
import backNight from "@/assets/night.jpg";
import suny from "@/assets/icons/suny.png";
import cloud from "@/assets/icons/cloud.png";
import cloudSuny from "@/assets/icons/cloud_suny.png";
import showerRain from "@/assets/icons/shower_rain.png";
import lotCloud from "@/assets/icons/lot_cloud.png";
import rain from "@/assets/icons/rain.png";
import thunderstorm from "@/assets/icons/thunderstorm.png";
import mist from "@/assets/icons/mist.png";
import snow from "@/assets/icons/snow.png";
import axios from "axios";

export default {
  data() {
    return {
      backAfternon,
      backNight,
      suny,
      cloud,
      cloudSuny,
      lotCloud,
      showerRain,
      rain,
      thunderstorm,
      snow,
      mist,
      temp: "",
      location: null,
      gettingLocation: false,
      errorStr: null,
      city: "",
      temperature: "",
      weather: "",
      otherdaysShow: false,
      prevision: [],
      day: 0,
    };
  },
  components: {
    otherdays,
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.location = pos;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
  mounted() {
    this.getInfo();
    // this.getPrevision();
  },
  computed: {
    ...mapGetters(["whatDay", "iconWeatherShow", "styleImgStore"]),
  },
  methods: {
    ...mapActions(["changeDay", "changeIcones", "giveTheDate"]),
    getInfo() {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=Paris&&units=metric&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then((response) => {
          this.city = response.data.name;
          this.temperature = Math.round(response.data.main.temp);
          this.weather = response.data.weather[0].main;
          this.changeIcones(response.data.weather[0].icon);
          this.getPrevision();
        });
    },
    getMyInfo() {
      if (this.location) {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            this.city = response.data.name;
            this.temperature = Math.round(response.data.main.temp);
            this.weather = response.data.weather[0].main;
            this.changeIcones(response.data.weather[0].icon);
            this.getPrevision();
          });
      } else {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=Paris&&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            this.city = response.data.name;
            this.temperature = Math.round(response.data.main.temp);
            this.weather = response.data.weather[0].main;
            this.changeIcones(response.data.weather[0].icon);
          });
      }
    },
    getPrevision() {
      if (this.location) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&exclude=hourly,minutely&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            this.prevision.push(response.data.daily);
          });
      } else {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=48.8566969&lon=2.3514616&exclude=hourly,minutely&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            this.prevision.push(response.data.daily);
          });
      }
    },
    showPrevision() {
      this.otherdaysShow = true;
      this.changeDay();
      this.changeIcones(this.prevision[0][this.whatDay].weather[0].icon);
      this.giveTheDate(this.whatDay);
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

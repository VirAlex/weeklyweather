<template>
  <div
    class="main-container"
    :style="'background-image:url(' + backAfternon + ')'"
  >
    <div class="container-weather">
      <div class="city">{{ city }}</div>
      <button @click="getMyInfo()">MA METEO</button>
      <div class="prevision">
        <div class="text">
          It's
          <br />
          {{ weather }}
          <br />
          now
        </div>
        <div class="img">
          <img :src="iconWeather" alt="">
        </div>
      </div>
      <div class="temp">{{ temperature }}°</div>
    </div>
  </div>
</template>

<script>
import backAfternon from "@/assets/after_noon.png";
import backNight from "@/assets/night.jpg";
import suny from "@/assets/icons/suny.png";
import cloud from "@/assets/icons/cloud_force.png";
import axios from "axios";

export default {
  data() {
    return {
      backAfternon,
      backNight,
      suny,
      cloud,
      temp: "",
      location: null,
      gettingLocation: false,
      errorStr: null,
      city: "",
      temperature: "",
      weather: "",
      iconWeather: "",
    };
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
        console.log("LOCATION", pos);
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
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
        .then((response) => {
          console.log("NO COORD", response.data);
          this.city = response.data.name;
          this.temperature = Math.round(response.data.main.temp);
          this.weather = response.data.weather[0].main;
          console.log("WEATHER", response.data.weather[0].icon);
          switch (response.data.weather[0].icon) {
            case "01d":
              this.iconWeather = this.suny;
              break;
            case "02d":
              this.iconWeather = '<i class="fas fa-cloud-sun"></i>';
              break;
            case "03d":
              this.iconWeather = this.suny;
              break;
            case "04d":
               this.iconWeather = this.cloud;
              break;
          }
        });
    },
    getMyInfo() {
      if (this.location) {
        console.log("IF", this.location);
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${this.location.coords.latitude}&lon=${this.location.coords.longitude}&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            console.log("COORD", response.data);
            this.city = response.data.name;
            this.temperature = Math.round(response.data.main.temp);
            this.weather = response.data.weather[0].main;
          });
      } else {
        console.log("ELSE", this.location);
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=Paris&&units=metric&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            console.log("NO COORD", response.data);
            this.city = response.data.name;
            this.temperature = Math.round(response.data.main.temp);
            this.weather = response.data.weather[0].main;
          });
      }
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

<template>
  <div>
    <div
      class="main-container"
      v-if="!changeBackground"
      :style="'background-image:url(' + backAfternon + ')'"
    >
      <div class="container-weather">
        <div class="city">{{ city }}</div>
        <otherdays
          v-if="otherdaysShow && whatDay !== -1 && !showPrevisionData"
          :prevision="prevision"
          :day="day"
          @otherdaysShow="otherDay"
        />
        <div v-if="whatDay === -1 && showPrevisionData">
          <div class="prevision">
            <div class="text">
              It's
              <br />
              {{ weather }}
              <br />
              now
            </div>
            <font-awesome-icon
              class="fa fa-search fa-2x active"
              @click="showPrevision()"
              :style="{
                color: 'white',
                position: 'absolute',
                marginLeft: '280px',
                marginTop: '250px',
              }"
              icon="arrow-circle-right"
            />
          </div>
          <div class="img">
            <img :src="iconWeatherShow" alt="" :style="styleImgStore" />
          </div>
          <div class="temp">{{ temperature }}°</div>
        </div>
      </div>
      <div class="input-mark">
        <div v-if="search" class="input-wrapper">
          <input
            v-model="input"
            type="text"
            id="user"
            role="textbox"
            placeholder="City"
            contenteditable
            @keyup.enter="searchMethod()"
            required
          />
        </div>
      </div>
      <font-awesome-icon
        v-if="!search"
        class="fa fa-search fa-2x active"
        @click="searchInput"
        icon="search"
        :style="{
          color: 'white',
          position: 'absolute',
          marginLeft: '15px',
          marginTop: '100px',
        }"
      />
      <font-awesome-icon
        class="fa fa-search fa-2x active"
        icon="map-marker"
        :style="{
          color: 'white',
          position: 'absolute',
          marginLeft: '300px',
          marginTop: '100px',
        }"
        @click="getMyInfo()"
      />
    </div>
    <div
      class="main-container"
      v-else
      :style="'background-image:url(' + backNight + ')'"
    >
      <div class="container-weather">
        <div class="city">{{ city }}</div>
        <otherdays
          v-if="otherdaysShow && whatDay !== -1 && !showPrevisionData"
          :prevision="prevision"
          :day="day"
          @otherdaysShow="otherDay"
        />
        <div v-if="whatDay === -1 && showPrevisionData">
          <div class="prevision">
            <div class="text">
              It's
              <br />
              {{ weather }}
              <br />
              now
            </div>
            <font-awesome-icon
              class="fa fa-search fa-2x active"
              @click="showPrevision()"
              :style="{
                color: 'white',
                position: 'absolute',
                marginLeft: '280px',
                marginTop: '250px',
              }"
              icon="arrow-circle-right"
            />
          </div>
          <div class="img">
            <img :src="iconWeatherShow" alt="" :style="styleImgStore" />
          </div>
          <div class="temp">{{ temperature }}°</div>
        </div>
      </div>
      <div class="input-mark">
        <div v-if="search" class="input-wrapper">
          <input
            v-model="input"
            type="text"
            id="user"
            role="textbox"
            placeholder="City"
            contenteditable
            @keyup.enter="searchMethod()"
            required
          />
        </div>
      </div>
      <font-awesome-icon
        v-if="!search"
        class="fa fa-search fa-2x active"
        @click="searchInput"
        icon="search"
        :style="{
          color: 'white',
          position: 'absolute',
          marginLeft: '15px',
          marginTop: '100px',
        }"
      />
      <font-awesome-icon
        class="fa fa-search fa-2x active"
        icon="map-marker"
        :style="{
          color: 'white',
          position: 'absolute',
          marginLeft: '300px',
          marginTop: '100px',
        }"
        @click="getMyInfo()"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
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
      search: false,
      temp: "",
      location: null,
      gettingLocation: false,
      input: "",
      errorStr: null,
      city: "",
      temperature: "",
      weather: "",
      otherdaysShow: false,
      prevision: [],
      changeBackground: "",
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
    this.hourTime();
    this.getInfo();
    // this.getPrevision();
  },
  computed: {
    ...mapGetters([
      "whatDay",
      "iconWeatherShow",
      "styleImgStore",
      "showPrevisionData",
    ]),
  },
  methods: {
    ...mapActions(["changeDay", "changeIcones", "giveTheDate", "reset"]),
    otherDay(value) {
      this.otherdaysShow = value;
    },
    hourTime() {
      var format = "hh:mm:ss";
      // var time = moment() gives you current time. no format required.
      let currentTime = moment();
      let time = moment(currentTime, "HH:mm:ss"),
        beforeTime = moment("18:00:00", format),
        afterTime = moment("07:00:00", format);

      if (time.isBetween(beforeTime, afterTime)) {
        this.changeBackground = true;
      } else {
        this.changeBackground = false;
      }

      // prints 'is between'
    },
    searchInput() {
      this.search = !this.search;
    },

    searchMethod() {
      console.log("SEARCH");
      this.prevision = [];
      this.otherdaysShow = false;
      this.reset();
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.input}&&units=metric&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then((response) => {
          this.city = response.data.name.replace("Arrondissement de", "");
          this.temperature = Math.round(response.data.main.temp);
          this.weather = response.data.weather[0].main;
          this.changeIcones(response.data.weather[0].icon);
          console.log("THIS INPUT", this.input);
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${this.input}&key=${process.env.VUE_APP_GEOCOD_KEY}`
            )
            .then((response) => {
              console.log(
                "RESPONSE",
                response.data.results[0].bounds.northeast.lat
              );
              axios
                .get(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.results[0].bounds.northeast.lat}&lon=${response.data.results[0].bounds.northeast.lng}&exclude=hourly,minutely&units=metric&appid=${process.env.VUE_APP_API_KEY}`
                )
                .then((response) => {
                  console.log("response.data.daily", response.data.daily);
                  this.prevision.push(response.data.daily);
                });
            });
        });
    },
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
      this.prevision = [];
      if (this.location) {
        this.search = false;
        this.otherdaysShow = false;
        this.reset();
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
        this.otherdaysShow = false;
        this.reset();
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
    background: rgb(226 206 206 / 40%);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(5.5px);
    -webkit-backdrop-filter: blur(5.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 25px 0 35px 0;
    width: 100%;
    height: 55%;
    border-radius: 35px;
    /* margin: auto auto; */
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
  body {
    padding: 40px;
    font-family: "Helvetica Neue";
  }
  .input-mark {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    i {
      color: white;
    }
  }
  .input-wrapper {
    display: flex;
    justify-content: center;
    position: absolute;
    line-height: 14px;
    margin: 0 10px;
    display: inline-block;
    margin-right: 180px;
  }

  input {
    font-size: 13px;
    outline: none;
    border: 1px solid #bbb;
    padding: 10px 20px;
    border-radius: 20px;
    background: rgb(226 206 206 / 40%);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: white;
    position: absolute;
  }
  input::placeholder {
    color: white;
  }
}
</style>

import Vue from "vue";
import Vuex from "vuex";
import suny from "@/assets/icons/suny.png";
import cloud from "@/assets/icons/cloud.png";
import cloudSuny from "@/assets/icons/cloud_suny.png";
import showerRain from "@/assets/icons/shower_rain.png";
import lotCloud from "@/assets/icons/lot_cloud.png";
import rain from "@/assets/icons/rain.png";
import thunderstorm from "@/assets/icons/thunderstorm.png";
import mist from "@/assets/icons/mist.png";
import snow from "@/assets/icons/snow.png";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    day: -1,
    icone: "",
    styleImg: "",
    date: "",
    prevision: true,
    suny,
    cloud,
    cloudSuny,
    showerRain,
    lotCloud,
    rain,
    thunderstorm,
    mist,
    snow,
  },
  getters: {
    whatDay(state) {
      return state.day;
    },
    iconWeatherShow(state) {
      return state.icone;
    },
    styleImgStore(state) {
      return state.styleImg;
    },
    showTheDate(state) {
      return state.date;
    },
    showPrevisionData(state) {
      return state.prevision;
    },
  },
  mutations: {
    CHANGE_DAY(state) {
      if (state.day <= 6) {
        console.log("IF");
        state.prevision = false;
        state.day++;
      } else {
        console.log("ELSE");
        state.day = -1;
        state.prevision = true;
      }
    },
    PREVIOUS_DAY(state) {
      console.log("PREVIOUS DAY");
      console.log("STATE DAY", state.day);
      state.day--;
      if (state.day === -1) {
        console.log("IF");
        state.prevision = true;
      } else {
        state.day
      }
    },
    CHANGE_ICONES(state, data) {
      {
        switch (data) {
          case "01d":
            state.icone = state.suny;
            break;
          case "02d":
            state.icone = state.cloudSuny;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "03d":
            state.icone = state.cloud;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "04d":
            state.icone = state.lotCloud;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "09d":
            state.icone = state.showerRain;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "10d":
            state.icone = state.rain;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "11d":
            state.icone = state.thunderstorm;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "13d":
            state.icone = state.snow;
            state.styleImg = "width: 70px; height: 80px";
            break;
          case "50d":
            state.icone = state.mist;
            state.styleImg = "width: 70px; height: 80px";
            break;
        }
      }
    },
    GIVE_THE_DATE(state, data) {
      let today = moment();
      let otherDate = moment(today).add(data + 1, "days");
      let date = moment(otherDate).format("dddd");
      state.date = date;
    },
    RESET(state) {
      state.day = -1;
      state.date = "";
      state.icone = "";
      state.styleImg = "";
      state.prevision = true;
    },
  },
  actions: {
    changeDay({ commit }) {
      commit("CHANGE_DAY");
    },
    changeIcones({ commit }, payload) {
      commit("CHANGE_ICONES", payload);
    },
    giveTheDate({ commit }, payload) {
      commit("GIVE_THE_DATE", payload);
    },
    reset({ commit }) {
      commit("RESET");
    },
    previousDay({ commit }) {
      commit("PREVIOUS_DAY");
    },
  },
  modules: {},
});

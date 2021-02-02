<template>
  <body>
    <div class="wrapper">
      <div class="menu">
        <font-awesome-icon class="fa fa-search fa-2x active" icon="search" />
        <font-awesome-icon class="fa fa-bars fa-2x" icon="bars" />
        <font-awesome-icon class="fa fa-bars fa-2x" icon="sticky-note" />
        <font-awesome-icon class="fa fa-bars fa-2x" icon="calendar" />
        <font-awesome-icon class="fa fa-bars fa-2x" icon="cog" />
      </div>
      <div class="display">
        <div class="city">
          <h2 class="city-name">Los Angeles, CA</h2>
          <font-awesome-icon class="fa fa-plus-square-o fa-3x" icon="plus-square" />
        </div>
        <div class="weather">
          <div class="temp">
            <i class="fa fa-cloud fa-5x"></i>
            <h1 class="temp-number">64&deg;F</h1>
            <h4 class="celcius">
              C
            </h4>
          </div>
          <div class="temp-items">
            <i class="fa fa-leaf fa-2x"></i>
            <h3 class="temp-item-header">4 mph</h3>
            <i class="fa fa-tint fa-2x"></i>
            <h3 class="temp-item-header">65 %</h3>
            <i class="fa fa-bolt fa-2x"></i>
            <h3 class="temp-item-header">10 %</h3>
          </div>

          <i class="fa fa-ellipsis-h fa-2x"></i>
        </div>
        <div class="footer">
          <button type="button" class="button-wiki">
            <h3 class="wiki">View on Wiki</h3>
            <i class="fa fa-arrow-right"></i>
          </button>

          <button type="button" class="button-return">
            <i class="fa fa-share-square-o fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "WeatherCard",
  mounted() {
    console.log("je sui monted");
    this.test();
  },
  methods: {
    test() {
      console.log("ENV", process.env.VUE_APP_API_KEY);
    },
  },
};
</script>

<style lang="scss" scoped>
$display-c: #1f222a;
$menu-c: #373b46;
$white: #e0e1e3;
$grey: #5d6068;
$button-c: #d23a51;
$ff: "Raleway", sans-serif;

body {
  background: #333;
  font-family: $ff;
}

.wrapper {
  width: 500px;
  height: 400px;
  background-color: $display-c;
  margin-top: 40px;
  margin-left: 35%;
  border-radius: 10px;
  position: absolute;
  z-index: 0;
}

/** MENU SET UP **/
.menu {
  width: 90px;
  height: 100%;
  background-color: $menu-c;
  border-radius: 5px 0 0px 5px;
  text-align: center;
  .fa-search,
  .fa-sticky-note-o,
  .fa-calendar,
  .fa-cog,
  .fa-bars {
    color: $white;
    display: block;
    width: 100%;
    height: 39px;
    background-color: transparent;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

.fa-bars {
  height: 43px;
}

.fa-search:hover,
.fa-sticky-note-o:hover,
.fa-calendar:hover,
.fa-cog:hover,
.fa-bars:hover {
  background-color: $grey;
  padding-left: 5px;
}

/** DISPLAY **/

.city {
  margin-left: 90px;
  height: 80px;
  width: 410px;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
}

h2.city-name {
  width: 340px;
  height: 50px;
  margin: 0 auto;
  padding-top: 20px;
  border-bottom: 2px solid $grey;
  color: $white;
}

.fa-plus-square-o {
  display: block;
  margin-left: 335px;
  margin-top: -60px;
  width: 40px;
  height: 40px;
  color: $grey;
}

.fa-plus-square-o:hover {
  color: $white;
}
/** WEATHER SET UP **/
.weather {
  position: absolute;
  top: 0;
  right: 0;
  margin-left: 90px;
  margin-top: 72px;
  width: 410px;
  height: 250px;
}

.fa-cloud {
  margin-top: 30px;
  margin-left: 80px;
  color: $grey;
}

h1.temp-number {
  display: block;
  margin-left: 200px;
  font-size: 62px;
  margin-top: -80px;
  color: $white;
}

.celcius {
  display: block;
  margin-left: 340px;
  margin-top: -105px;
  font-size: 22px;
  width: 20px;
  height: 23px;
  padding-left: 10px;
  border-left: 1px solid $grey;
  color: $grey;
}

.temp-items {
  width: 100%;
  height: 50px;
  margin-top: 70px;
}

.fa-leaf,
.fa-tint,
.fa-bolt,
.wind,
.rain,
.shower,
h3 {
  display: inline;
}

.fa-leaf {
  padding-left: 30px;
  padding-right: 5px;
  color: $grey;
}
.fa-tint {
  padding-left: 50px;
  padding-right: 10px;
  color: $grey;
}

.fa-bolt {
  padding-left: 60px;
  padding-right: 10px;
  color: $grey;
}
.temp-item-header {
  color: $white;
}

.fa-ellipsis-h {
  color: $white;
  display: block;
  margin-left: 190px;
}

/** FOOTER **/
.footer {
  position: absolute;
  margin-left: 90px;
  margin-top: 300px;
  top: 0;
  left: 0;
}
.button-wiki {
  margin-left: 30px;
  background: transparent;
  border: none;
  margin-top: 30px;
}
h3.wiki {
  font-weight: normal;
  font-size: 16px;
  color: $grey;
}
.fa-arrow-right {
  padding-left: 5px;
  color: $grey;
}
button.button-wiki:hover > h3.wiki,
button.button-wiki:hover > .fa-arrow-right {
  color: $button-c;
}

.button-return {
  position: absolute;
  padding: 20px;
  right: -270px;
  bottom: -15px;
  background-color: $button-c;
  border: none;
}
i.fa-share-square-o {
  color: $white;
  position: relative;
}

button.button-return:hover {
  background-color: $grey;
}
</style>

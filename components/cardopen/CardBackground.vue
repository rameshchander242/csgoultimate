<template>
    <div class="bg">
      <transition appear appear-class="fade-enter" appear-to-class="fade-enter-active" appear-active-class="fade-enter-active" :duration="1500" v-on:after-enter="afterEnter">
          <div class="bg-image">
            <slot name="legend"></slot>
            <slot name="bottom"></slot>
          </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: "CardBackground",
  methods: {
    afterEnter: function (el) {
      this.$emit('done')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  height: 100%;
  background: #000;
}
.bg-image {
  background-image: url("../../assets/card-open-img/bg.png");
  background-position: center center;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #000;
  width: 100%;
  height: 100%;
  padding: 60px 0;
}
/* @import "../assets/csgo.css";
@import "../assets/styles.css"; */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
		<span>{{ days | two_digits }} days, {{ hours | two_digits }} hours, {{ minutes | two_digits }} minutes, {{ seconds | two_digits }} seconds</span>
</template>
<script>
export default {
  created () {
    console.log('test')
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  props: {
    date: Number
  },
  data () {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    seconds () {
      return (this.date - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.date - this.now) / 60) % 60
    },
    hours () {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.date - this.now) / 60 / 60 / 24)
    }
  }
}
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
.block {
		display: flex;
		flex-direction: column;
		margin: 20px;
}
.text {
		color: #1abc9c;
		font-size: 40px;
		font-family: 'Roboto Condensed', serif;
		font-weight: 400;
		margin-top:10px;
		margin-bottom: 10px;
		text-align: center;
}
.digit {
		color: #ecf0f1;
		font-size: 150px;
		font-weight: 100;
		font-family: 'Roboto', serif;
		margin: 10px;
		text-align: center;
}
</style>
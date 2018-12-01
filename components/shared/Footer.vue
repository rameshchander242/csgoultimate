<template>
  <footer id="footer" class="text-center">
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#">&copy; 2018 CSGOUltimate.gg</a></li>
      <li class="list-inline-item">
        <a href="mailto:support@csgoultimate.gg">
          <i class="fa fa-envelope-o"></i>
          support@csgoultimate.gg
        </a>
      </li>
      <li class="list-inline-item"><router-link :to="{ name: 'term-of-service' }">Terms of Service</router-link></li>
      <li class="list-inline-item"><a href="#">Support</a></li>
      <li class="list-inline-item"><router-link :to="{ name: 'faq' }">FAQ</router-link></li>
      <li class="list-inline-item"><router-link :to="{ name: 'partners' }">Partners</router-link></li>
      <!--
      <li class="list-inline-item"><a href="#">Contact</a></li>
    -->
      <li class="list-inline-item">
        <router-link :to="{ name: 'about' }">
          About & Rules
        </router-link>
      </li>
      <li class="list-inline-item"><a href="#"><i class="fa fa-facebook-official"></i></a></li>
      <li class="list-inline-item">
        <a href="http://steamcommunity.com/groups/csgoultimategg">
          <i class="fa fa-steam-square"></i>
        </a>
      </li>
      <li class="list-inline-item">
        <a href="https://twitter.com/csgo_ultimate"><i class="fa fa-twitter"></i></a>
      </li>
    </ul>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {

      }
    },
    created () {

    },
    computed: {

    },
    methods: {

    }
  }
</script>

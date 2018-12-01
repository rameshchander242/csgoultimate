<template>
  <div>
    <div v-if="activeResponse">
        <v-app dark>
            <div id="wrapper">
                <top id="app-top" :class="{headerfix: scrollPosition, sideHide: this.$store.state.sideHide}" ></top>
                <div id="lower-middle-contain">
                    <side-menu id="app-sidebar" :class="{sideHide: this.$store.state.sideHide}"></side-menu>
                    <div id="app-content" :class="{sideHide: this.$store.state.sideHide}">
                        <v-container fluid grid-list-md>
                            <nuxt />
                        </v-container>
                    </div>
                    <Dialog />
                </div>
                <footer-bar  :class="{headerfix: scrollPosition, sideHide: this.$store.state.sideHide}" />
            </div>
            <TOS class="tos_dialog" />
            <audio id="sound" class="d-none" controls preload="auto"><source src="/soundHover.wav" controls></source></audio>
            <audio id="clicksound" class="d-none" controls preload="auto"><source src="/soundClick.wav" controls></source></audio>
        </v-app>
    </div>
    <div v-else>
        <div class="all_lightloader full_screen"></div>
    </div>
  </div>
</template>

<script>
    import Top from '~/components/shared/Top'
    import Footer from '~/components/shared/Footer'
    import SideMenu from '~/components/shared/SideMenu'
    import Dialog from '~/components/Dialog'
    import TOS from '~/components/shared/TOS'

    export default {
        name: 'App',
        components: {
            Top,
            'footer-bar': Footer,
            SideMenu,
            Dialog,
            TOS,
        },
        mounted() {
            if(this.$store.getters.token){
                if(this.$store.state.authUser.message){
                    vuetifyToast.success(this.$store.state.authUser.message)    
                }
                localStorage.setItem("authToken", this.$store.getters.token)
                this.updateUser()
            } else {
                localStorage.removeItem("authToken")
            }
            this.checkMaintenance();
            window.addEventListener('scroll', this.updateScroll);
        },
        data() {
            return {
                scrollPosition: false,
                balance_loading: false,
                activeResponse: false
            }
        },
        methods: {
            checkMaintenance(){
                this.$store.dispatch('checkMaintenance').then((response) => {
                    if(response.data && response.data.active == false){
                        if(!(this.$store.state.authUser && this.$store.state.authUser.userTypeId == 3 &&
                         !this.$store.state.authUser.banned)){
                            this.$router.push('maintenance');
                            return;
                        }
                    }
                    this.activeResponse = true;
                })
            },
            updateUser(){
                this.balance_loading = true
                this.$store.dispatch('userUpdate')
                    .then((response) => {
                        if(!response.status){
                            this.$router.push({ path: '/' })
                            localStorage.removeItem("authToken")
                        }
                        this.balance_loading = false
                    })
                    .catch((error) => {
                        // vuetifyToast.error(error.response.data.data)
                    })
                this.$store.dispatch('packs/getMyPacks').then((response) => {})
            },
            updateScroll() {
                // console.log(window.scrollY)
                // if(window.scrollY > 100){
                //     this.scrollPosition = true
                // }else{
                //     this.scrollPosition = false
                // }
            }
        }
    }

</script>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i,700');
    @import url('https://fonts.googleapis.com/css?family=Fjalla+One&subset=latin-ext');
    @import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700&subset=cyrillic,cyrillic-ext,latin-ext');
       
    @import "./assets/css/main.scss";
    @import "./assets/css/style.scss";
    @import "./assets/sass/three-dots/three-dots.scss";
    
    /*Card related*/
    @import "./assets/css/source/csgo.scss";
    @import "./assets/css/source/style.scss";
    /* My Custom Style*/
    @import "./assets/css/custom-style.scss";
    /* For Responsive */
    @import "./assets/css/responsive-style.scss";

</style>

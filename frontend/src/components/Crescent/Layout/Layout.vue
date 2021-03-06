<template>
    <div :class="[{root: true, sidebarClose, sidebarStatic}, 'crescent-dashboard']">
        <header-for-j-m-i />
        <Sidebar/>
        <div class="wrap">
            <Header/>
            <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">
                <breadcrumb-history />
                <transition name="router-animation">
                    <router-view class="px-4 py-2"/>
                </transition>
                <footer class="contentFooter mx-5">
                </footer>
            </v-touch>
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex';

    const {mapState, mapActions} = createNamespacedHelpers('layout');

    import Sidebar from '@/components/Crescent/Sidebar/Sidebar';
    import Header from '@/components/Crescent/Header/Header';
    import BreadcrumbHistory from '@/components/Crescent/BreadcrumbHistory/BreadcrumbHistory';
    import HeaderForJMI from '../HeaderForJMI/HeaderForJMI';

    import './Layout.scss';

    export default {
        name: 'Layout',
        components: {Sidebar, Header, BreadcrumbHistory, HeaderForJMI},
        methods: {
            ...mapActions(['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar'],
            ),
            handleWindowResize() {
                const width = window.innerWidth;

                if (width <= 768 && this.sidebarStatic) {
                    this.toggleSidebar();
                    this.changeSidebarActive(null);
                }
            },
        },
        computed: {
            ...mapState(["sidebarClose", "sidebarStatic"]),
        },
        created() {
            const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

            if (staticSidebar) {
                this.$store.state.layout.sidebarStatic = true;
            } else if (!this.sidebarClose) {
                setTimeout(() => {
                    this.switchSidebar(true);
                    this.changeSidebarActive(null);
                }, 2500);
            }

            this.handleWindowResize();
            window.addEventListener('resize', this.handleWindowResize);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleWindowResize);
        }
    };
</script>

<style src="./Layout.scss" lang="scss"/>

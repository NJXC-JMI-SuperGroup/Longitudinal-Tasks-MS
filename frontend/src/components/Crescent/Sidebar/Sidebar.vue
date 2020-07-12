<template>
    <div class="sidebar-wrapper">
        <nav
                :class="{sidebar: true, sidebarStatic, sidebarOpened}"
                @mouseenter="sidebarMouseEnter"
                @mouseleave="sidebarMouseLeave"
        >
            <header class="logo">
                <router-link to="/Crescent"><span class="primary-word">Crescent</span> App</router-link>
            </header>
            <ul class="nav">
                <NavLink
                        :activeItem="activeItem"
                        header="Hello (调试用页)"
                        link="/Crescent/hello"
                        iconName="flaticon-network"
                        index="hello"
                        isHeader
                />
                <NavLink
                        :activeItem="activeItem"
                        header="课题通知"
                        link="/Crescent/bulletin"
                        iconName="flaticon-network"
                        index="bulletin"
                        :childrenLinks="[
                            { header: '课题一览', link: '/Crescent/bulletin/dash' },
                            { header: '发布课题', link: '/Crescent/bulletin/publish' }
                        ]"
                />
                <NavLink
                        :activeItem="activeItem"
                        header="项目申报"
                        link="/Crescent/declare"
                        iconName="flaticon-network"
                        index="declare"
                        :childrenLinks="[
                            { header: '新建项目申报', link: '/Crescent/declare/create' },
                            { header: '项目申报进度', link: '/Crescent/declare/progress' }
                        ]"
                />
                <NavLink
                        :activeItem="activeItem"
                        header="项目评审"
                        link="/Crescent/audit"
                        iconName="flaticon-network"
                        index="audit"
                        :childrenLinks="[
                            { header: '部门评审', link: '/Crescent/audit/depart' },
                            { header: '专家评审', link: '/Crescent/audit/expert' }
                        ]"
                />
                <NavLink
                        :activeItem="activeItem"
                        header="系统管理"
                        link="/Crescent/system"
                        iconName="flaticon-network"
                        index="system"
                        :childrenLinks="[
                            { header: '用户管理', link: '/Crescent/system/userManage' },
                            { header: '系统日志', link: '/Crescent/system/log' }
                        ]"
                />
            </ul>
        </nav>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import isScreen from '@/core/screenHelper';
    import NavLink from './NavLink/NavLink';

    export default {
        name: 'Sidebar',
        components: {NavLink},
        data() {
            return {
                alerts: [
                    {
                        id: 0,
                        title: 'Sales Report',
                        value: 15,
                        footer: 'Calculating x-axis bias... 65%',
                        color: 'danger',
                    },
                    {
                        id: 1,
                        title: 'Personal Responsibility',
                        value: 20,
                        footer: 'Provide required notes',
                        color: 'primary',
                    },
                ],
            };
        },
        methods: {
            ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
            setActiveByRoute() {
                const paths = this.$route.fullPath.split('/');
                paths.pop();
                this.changeSidebarActive(paths.join('/'));
            },
            sidebarMouseEnter() {
                if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
                    this.switchSidebar(false);
                    this.setActiveByRoute();
                }
            },
            sidebarMouseLeave() {
                if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
                    this.switchSidebar(true);
                    this.changeSidebarActive(null);
                }
            },
        },
        created() {
            this.setActiveByRoute();
        },
        computed: {
            ...mapState('layout', {
                sidebarStatic: state => state.sidebarStatic,
                sidebarOpened: state => !state.sidebarClose,
                activeItem: state => state.sidebarActiveElement,
            }),
        },
    };
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>

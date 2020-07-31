<template>
    <div class="sidebar-wrapper">
        <nav
                :class="{sidebar: true, sidebarStatic, sidebarOpened}"
                @mouseenter="sidebarMouseEnter"
                @mouseleave="sidebarMouseLeave"
        >
            <header class="logo">
                <router-link to="/Crescent/hello"><span class="primary-word">Crescent</span> App</router-link>
            </header>
            <div class="leseNav">导航栏</div>
            <div class="text-center small">
                <span>欢迎您, <span class="highName">{{accountState.realname}}</span> !</span><br>
                <span>{{today()}}</span>
            </div>
            <ul class="nav p-0">
                <NavLink
                        v-if="[0, 1, 14].indexOf(accountState.level) !== -1"
                        :activeItem="activeItem"
                        header="课题通知"
                        link="/Crescent/bulletin"
                        iconName="flaticon-home"
                        index="bulletin"
                        class="jmiNavLink overflow-hidden"
                        :childrenLinks="accountState.level === 0 ? [
                            { header: '课题一览', link: '/Crescent/bulletin/dash' }
                        ] : [
                            { header: '课题一览', link: '/Crescent/bulletin/dash' },
                            { header: '发布课题', link: '/Crescent/bulletin/publish' }
                        ]"
                />
                <NavLink
                        v-if="accountState.level === 0"
                        :activeItem="activeItem"
                        header="项目申报"
                        link="/Crescent/declare"
                        iconName="flaticon-network"
                        index="declare"
                        class="jmiNavLink overflow-hidden"
                        :childrenLinks="[
                            { header: '项目申报进度', link: '/Crescent/declare/dash' },
                            { header: '新建项目申报', link: '/Crescent/declare/create' }
                        ]"
                />
                <NavLink
                        v-if="[1, 13, 14].indexOf(accountState.level) !== -1"
                        :activeItem="activeItem"
                        header="项目评审"
                        link="/Crescent/audit"
                        iconName="flaticon-menu"
                        index="audit"
                        class="jmiNavLink overflow-hidden"
                        :children-links="{
                            1: [{ header: '部门评审', link: '/Crescent/audit/departDash' }],
                            13: [{ header: '专家评审', link: '/Crescent/audit/expertDash' }],
                            14: [{ header: '立项管理', link: '/Crescent/audit/projectManage'}]
                        }[accountState.level]"
                />
                <NavLink
                        :activeItem="activeItem"
                        header="网站帮助"
                        link="/Crescent/help"
                        iconName="flaticon-notepad"
                        index="help"
                        class="jmiNavLink overflow-hidden"
                        :children-links="{
                            0: [{ header: '教师手册', link: '/Crescent/help/teacherHelp' }],
                            1: [{ header: '二级学院手册', link: '/Crescent/help/departHelp' }],
                            13: [{ header: '外审专家手册', link: '/Crescent/help/expertHelp' }],
                            14: [{ header: '科技处手册', link: '/Crescent/help/bossHelp' }]
                        }[accountState.level]"
                />
            </ul>
        </nav>
    </div>
</template>

<script src="./SideBarScript.js" />

<style src="./Sidebar.scss" lang="scss" scoped/>

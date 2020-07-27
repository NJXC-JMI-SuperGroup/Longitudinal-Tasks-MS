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
            <div class="mt-4 mx-3 p-3 border">
                欢迎:
                <span>{{accountState.type}} {{accountState.realname}}</span>
                <br>
                <a @click="logout">退出登录</a>
            </div>
            <ul class="nav">
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
                            { header: '项目申报进度', link: '/Crescent/declare/dash' },
                            { header: '新建项目申报', link: '/Crescent/declare/create' }
                        ]"
                />
                <NavLink
                        :activeItem="activeItem"
                        header="项目评审"
                        link="/Crescent/audit"
                        iconName="flaticon-network"
                        index="audit"
                        :childrenLinks="[
                            { header: '部门评审', link: '/Crescent/audit/departDash' },
                            { header: '专家评审', link: '/Crescent/audit/expertDash' }
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

<script src="./SideBarScript.js" />

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>

import Vue from 'vue';
import Router from 'vue-router';

// SingAll components begin
import Layout from '@/components/SingApp/Layout/Layout';
import Login from '@/pages/SingApp/Login/Login';
import ErrorPage from '@/pages/SingApp/Error/Error';
// Core
import TypographyPage from '@/pages/SingApp/Typography/Typography';
// Tables
import TablesBasicPage from '@/pages/SingApp/Tables/Basic';
// Maps
import GoogleMapPage from '@/pages/SingApp/Maps/Google';
// Main
import AnalyticsPage from '@/pages/SingApp/Dashboard/Dashboard';
// Charts
import ChartsPage from '@/pages/SingApp/Charts/Charts';
// Ui
import IconsPage from '@/pages/SingApp/Icons/Icons';
import NotificationsPage from '@/pages/SingApp/Notifications/Notifications';
// SingAll components end

// Crescent components begin
import crescent_layout from '@/components/Crescent/Layout/Layout';
import Hello from "@/pages/Crescent/Hello";
import BulletinDash from "./pages/Crescent/Bulletin/BulletinDash/BulletinDash";
import BulletinList from "./pages/Crescent/Bulletin/BulletinList/BulletinList";
import BulletinPublish from "./pages/Crescent/Bulletin/BulletinPublish/BulletinPublish";
import DeclareCreate from "./pages/Crescent/Declare/DeclareCreate/DeclareCreate";
import DeclareList from "./pages/Crescent/Declare/DeclareList/DeclareList";
import DeclareProgress from "./pages/Crescent/Declare/DeclareProgress/DeclareProgress";
import DepartAudit from "./pages/Crescent/Audit/DepartAudit/DepartAudit";
import ExpertAudit from "./pages/Crescent/Audit/ExpertAudit/ExpertAudit";
import Log from "./pages/Crescent/System/Log/Log";
import UserManage from "./pages/Crescent/System/UserManage/UserManage";
// Crescent components end

// NotBad components begin

// NotBad components end

// Third components begin

// Third components end


Vue.use(Router);

export default new Router({
    routes: [
        // SingApp router begin
        {
            path: '/SingApp/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/SingApp/error',
            name: 'Error',
            component: ErrorPage,
        },
        {
            path: '/SingApp',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    path: 'dashboard',
                    name: 'AnalyticsPage',
                    component: AnalyticsPage,
                },
                {
                    path: 'typography',
                    name: 'TypographyPage',
                    component: TypographyPage,
                },
                {
                    path: 'components/icons',
                    name: 'IconsPage',
                    component: IconsPage,
                },
                {
                    path: 'notifications',
                    name: 'NotificationsPage',
                    component: NotificationsPage,
                },
                {
                    path: 'components/charts',
                    name: 'ChartsPage',
                    component: ChartsPage,
                },
                {
                    path: 'tables',
                    name: 'TablesBasicPage',
                    component: TablesBasicPage,
                },
                {
                    path: 'components/maps',
                    name: 'GoogleMapPage',
                    component: GoogleMapPage,
                },
            ],
        },
        // SingApp router end

        // Crescent router begin
        {
            path: '/Crescent',
            name: 'Layout',
            component: crescent_layout,
            children: [
                {
                    path: 'hello',
                    name: 'hello',
                    component: Hello
                }, {
                    path: 'bulletin/dash',
                    name: '公告管理',
                    component: BulletinDash
                }, {
                    path: 'bulletin/list',
                    name: '公告一览',
                    component: BulletinList
                }, {
                    path: 'bulletin/publish',
                    name: '发布公告',
                    component: BulletinPublish
                }, {
                    path: 'declare/create',
                    name: '新建项目申报',
                    component: DeclareCreate
                }, {
                    path: 'declare/list',
                    name: '项目申报记录',
                    component: DeclareList
                }, {
                    path: 'declare/progress',
                    name: '项目申报进度',
                    component: DeclareProgress
                }, {
                    path: 'audit/expert',
                    name: '专家评审',
                    component: ExpertAudit
                }, {
                    path: 'audit/depart',
                    name: '部门评审',
                    component: DepartAudit
                }, {
                    path: 'system/userManage',
                    name: '用户管理',
                    component: UserManage
                }, {
                    path: 'system/log',
                    name: '系统日志',
                    component: Log
                }
            ]
        }
        // Crescent router end

        // NotBad router begin

        // NotBad router end
    ],
});

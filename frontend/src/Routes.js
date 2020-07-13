import Vue from 'vue';
import Router from 'vue-router';

// Crescent components begin
import crescent_layout from './components/Crescent/Layout/Layout';
import NotRole from "./pages/Crescent/Rule/NotRole";
import Login from "./pages/Crescent/Login/Login";
import BulletinDash from "./pages/Crescent/Bulletin/BulletinDash/BulletinDash";
import BulletinPublish from "./pages/Crescent/Bulletin/BulletinPublish/BulletinPublish";
import BulletinModify from "./pages/Crescent/Bulletin/BulletinModify/BulletinModify";
import DeclareCreate from "./pages/Crescent/Declare/DeclareCreate/DeclareCreate";
import DeclareProgress from "./pages/Crescent/Declare/DeclareProgress/DeclareProgress";
import DeclareModify from "./pages/Crescent/Declare/DeclareModify/DeclareModify";
import DepartDash from "./pages/Crescent/Audit/DepartDash/DepartDash";
import ExpertDash from "./pages/Crescent/Audit/ExpertDash/ExpertDash";
import DepartAudit from "./pages/Crescent/Audit/DepartAudit/DepartAudit";
import ExpertAudit from "./pages/Crescent/Audit/ExpertAudit/ExpertAudit";
import Log from "./pages/Crescent/System/Log/Log";
import UserManage from "./pages/Crescent/System/UserManage/UserManage";
// Crescent components end

Vue.use(Router);

export default new Router({
    routes: [
        // Crescent router begin
        {
            path: '/Crescent/login',
            name: 'CrescentLogin',
            component: Login
        }, {
            path: '/Crescent',
            name: 'CrescentLayout',
            component: crescent_layout,
            children: [
                {
                    path: 'notRole',
                    name: 'notRole',
                    component: NotRole
                }, {
                    path: 'bulletin/dash',
                    name: '课题一览',
                    component: BulletinDash
                }, {
                    path: 'bulletin/publish',
                    name: '发布课题',
                    component: BulletinPublish
                }, {
                    path: 'bulletin/dash/modify',
                    name: '更新课题',
                    component: BulletinModify
                }, {
                    path: 'declare/create',
                    name: '新建项目申报',
                    component: DeclareCreate
                }, {
                    path: 'declare/progress',
                    name: '项目申报进度',
                    component: DeclareProgress
                }, {
                    path: 'declare/progress/modify',
                    name: '修改项目申报',
                    component: DeclareModify
                }, {
                    path: 'audit/expertDash',
                    name: '专家评审面板',
                    component: ExpertDash
                }, {
                    path: 'audit/departDash',
                    name: '部门评审面板',
                    component: DepartDash
                }, {
                    path: 'audit/expertDash/expertAudit',
                    name: '专家评审',
                    component: ExpertAudit
                }, {
                    path: 'audit/departDash/departAudit',
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
    ],
});

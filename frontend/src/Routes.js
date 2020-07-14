import Vue from 'vue';
import Router from 'vue-router';

import crescent_layout from './components/Crescent/Layout/Layout';
import EmptyLayout from './components/Crescent/Layout/EmptyLayout';
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

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'root',
        redirect: { name: 'CrescentLayout' }
    },{
        path: '/Crescent/login',
        name: 'CrescentLogin',
        component: Login
    }, {
        path: '/Crescent',
        name: 'CrescentLayout',
        redirect: { name:'bulletin' },
        component: crescent_layout,
        children: [{
            path: 'notRole',
            name: 'notRole',
            component: NotRole
        }, {
            path: 'bulletin',
            name: 'bulletin',
            component: EmptyLayout,
            redirect: { name: 'bulletinDash' },
            children: [{
                path: 'dash',
                name: 'bulletinDash',
                component: BulletinDash,
                meta: { role: [1, 2, 4] }
            }, {
                path: 'publish',
                name: 'bulletinPublish',
                component: BulletinPublish,
                meta: { role: [2, 4] }
            }, {
                path: 'dash/modify',
                name: 'bulletinModify',
                component: BulletinModify,
                meta: { role: [2, 4] }
            }]
        }, {
            path: 'declare',
            name: 'declare',
            component: EmptyLayout,
            redirect: { name: 'declareProgress' },
            children: [{
                path: 'create',
                name: 'declareCreate',
                component: DeclareCreate,
                meta: { role: [1] }
            }, {
                path: 'progress',
                name: 'declareProgress',
                component: DeclareProgress,
                meta: { role: [1] }
            }, {
                path: 'progress/modify',
                name: 'declareModify',
                component: DeclareModify,
                meta: { role: [1] }
            }]
        }, {
            path: 'audit',
            name: 'audit',
            component: EmptyLayout,
            redirect: { name: 'auditDepartDash' },
            children: [{
                path: 'expertDash',
                name: 'auditExpertDash',
                component: ExpertDash,
                meta: { role: [2, 3, 4] }
            }, {
                path: 'departDash',
                name: 'auditDepartDash',
                component: DepartDash,
                meta: { role: [2, 4] }
            }, {
                path: 'expertDash/expertAudit',
                name: 'expertAudit',
                component: ExpertAudit,
                meta: { role: [3] }
            }, {
                path: 'departDash/departAudit',
                name: 'departAudit',
                component: DepartAudit,
                meta: { role: [2, 4] }
            }]
        }, {
            path: 'system',
            name: 'system',
            component: EmptyLayout,
            redirect: 'systemUserManage',
            children: [{
                path: 'userManage',
                name: 'systemUserManage',
                component: UserManage,
                meta: { role: [4] }
            }, {
                path: 'log',
                name: 'systemLog',
                component: Log,
                meta: { role: [4] }
            }]
        }]
    }]
});

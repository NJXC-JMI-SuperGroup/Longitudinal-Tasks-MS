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
import DeclareDash from "./pages/Crescent/Declare/DeclareDash/DeclareDash";
import DeclareModify from "./pages/Crescent/Declare/DeclareModify/DeclareModify";
import DepartDash from "./pages/Crescent/Audit/DepartDash/DepartDash";
import ExpertDash from "./pages/Crescent/Audit/ExpertDash/ExpertDash";
import DepartAudit from "./pages/Crescent/Audit/DepartAudit/DepartAudit";
import ProjectManage from "./pages/Crescent/Audit/ProjectManage/ProjectManage";
import projectAudit from "./pages/Crescent/Audit/ProjectManage/ProjectAudit";
import DepartHelp from "./pages/Crescent/Help/DepartHelp/DepartHelp";
import BossHelp from "./pages/Crescent/Help/BossHelp/BossHelp";
import TeacherHelp from "./pages/Crescent/Help/TeacherHelp/TeacherHelp";
import ExpertHelp from "./pages/Crescent/Help/ExpertHelp/ExpertHelp";

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
            component: NotRole,
            meta: { chShow: '无权访问' }
        }, {
            path: 'bulletin',
            name: 'bulletin',
            component: EmptyLayout,
            redirect: { name: 'bulletinDash' },
            children: [{
                path: 'dash',
                name: 'bulletinDash',
                component: BulletinDash,
                meta: { role: [0, 1, 14], chShow: '课题通知 > 列表' }
            }, {
                path: 'publish',
                name: 'bulletinPublish',
                component: BulletinPublish,
                meta: { role: [14], chShow: '课题通知 > 发布课题' }
            }, {
                path: 'dash/modify',
                name: 'bulletinModify',
                component: BulletinModify,
                meta: { role: [14], chShow: '课题通知 > 列表 > 修改' }
            }]
        }, {
            path: 'declare',
            name: 'declare',
            component: EmptyLayout,
            redirect: { name: 'declareDash' },
            children: [{
                path: 'dash',
                name: 'declareDash',
                component: DeclareDash,
                meta: { role: [0], chShow: '项目申报 > 列表' }
            }, {
                path: 'create',
                name: 'declareCreate',
                component: DeclareCreate,
                meta: { role: [0], chShow: '项目申报 > 新建申报' }
            }, {
                path: 'dash/modify',
                name: 'declareModify',
                component: DeclareModify,
                meta: { role: [0], chShow: '项目申报 > 列表 > 修改' }
            }]
        }, {
            path: 'audit',
            name: 'audit',
            component: EmptyLayout,
            children: [{
                path: 'expertDash',
                name: 'auditExpertDash',
                component: ExpertDash,
                meta: { role: [13], chShow: '项目评审 > 列表' }
            }, {
                path: 'departDash',
                name: 'auditDepartDash',
                component: DepartDash,
                meta: { role: [1], chShow: '项目评审 > 列表' }
            }, {
                path: 'departDash/departAudit',
                name: 'departAudit',
                component: DepartAudit,
                meta: { role: [1], chShow: '项目评审 > 列表 > 部门审核' }
            }, {
                path: 'projectManage',
                name: 'projectManage',
                component: ProjectManage,
                meta: { role: [14], chShow: '项目评审 > 立项管理' }
            }, {
                path: 'projectManage/projectAudit',
                name: 'projectAudit',
                component: projectAudit,
                meta: { role: [14], chShow: '项目评审 > 立项管理 > 科技处审核' }
            }]
        }, {
            path: 'help',
            name: 'name',
            component: EmptyLayout,
            children: [{
                path: 'teacherHelp',
                name: 'teacherHelp',
                component: TeacherHelp,
                meta: { chShow: '帮助 > 教师手册' }
            }, {
                path: 'departHelp',
                name: 'departHelp',
                component: DepartHelp,
                meta: { chShow: '帮助 > 二级学院手册' }
            }, {
                path: 'expertHelp',
                name: 'expertHelp',
                component: ExpertHelp,
                meta: { chShow: '帮助 > 专家手册' }
            }, {
                path: 'bossHelp',
                name: 'bossHelp',
                component: BossHelp,
                meta: { chShow: '帮助 > 科技处手册' }
            }]
        }]
    }]
});

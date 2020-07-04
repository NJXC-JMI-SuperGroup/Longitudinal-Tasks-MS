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
import Hello from "@/pages/Crescent/Hello";
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
            path: '/Crescent/hello',
            name: 'hello',
            component: Hello
        }
        // Crescent router end

        // NotBad router begin

        // NotBad router end
    ],
});

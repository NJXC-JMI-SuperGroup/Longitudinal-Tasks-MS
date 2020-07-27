import {mapState, mapActions} from 'vuex';
import isScreen from '../../../core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
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
        ...mapActions('global', ['resetAccountState']),
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
        logout() {
            this.$axios.get(this.apiHost + 'basic/logout').then(res => {
                // eslint-disable-next-line no-console
                console.info(res.data);
            }).finally(() => {
                this.resetAccountState();
                this.$router.push('/Crescent/login');
            })
        }
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
        ...mapState('global', ['accountState'])
    },
};
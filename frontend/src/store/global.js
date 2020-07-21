export default {
    namespaced: true,
    state: {
        userLevel: 0,
        isAudit: true,
        host: 'http://localhost:8216/crescent/',
        accountState: {
            isLogin: false,
            type: '游客',
            level: -1,
            realname: ''
        }
    },
    mutations: {
        updateUserLevel(state, value) {
            state.userLevel = value;
        },
        updateIsAudit(state, value) {
            state.isAudit = value;
        },
        updateAccountState(state, value) {
            state.accountState = value;
        }
    },
    actions: {
        updateUserLevel({commit}, value) {
            commit('updateUserLevel', value);
        },
        updateIsAudit({commit}, value) {
            commit('updateIsAudit', value);
        },
        updateAccountState({commit}, value) {
            commit('updateAccountState', value);
        }
    },
};
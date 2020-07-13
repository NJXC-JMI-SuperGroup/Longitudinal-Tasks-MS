export default {
    namespaced: true,
    state: {
        userLevel: 0,
        isAudit: true
    },
    mutations: {
        updateUserLevel(state, value) {
            state.userLevel = value;
        },
        updateIsAudit(state, value) {
            state.isAudit = value;
        }
    },
    actions: {
        updateUserLevel({commit}, value) {
            commit('updateUserLevel', value);
        },
        updateIsAudit({commit}, value) {
            commit('updateIsAudit', value);
        }
    },
};
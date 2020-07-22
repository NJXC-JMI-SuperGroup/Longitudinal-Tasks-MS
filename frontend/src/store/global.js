export default {
    namespaced: true,
    state: {
        userLevel: 0,
        isAudit: true,
        host: 'http://localhost:8216/crescent/',
        accountState: {
            loginState: false,
            type: '游客',
            level: -1,
            realname: ''
        },
        model: {
            bulletin: {
                title: null,
                index: null,
                publishDept: null,
                bulletinType: null,
                bulletinLevel: null,
                limit: false,
                limitNumber: null,
                expertAudit: false,
                deadline: null,
                content: null,
                link: null,
                addition: false,
                additionUrl: null
            }
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
        },
        updateBulletinModel(state, value) {
            state.model.bulletin = value;
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
        },
        resetAccountState({commit}) {
            commit('updateAccountState', {
                loginState: false,
                type: '游客',
                level: -1,
                realname: ''
            })
        },
        updateBulletinModel({commit}, value) {
            commit('updateBulletinModel', value);
        }
    },
};
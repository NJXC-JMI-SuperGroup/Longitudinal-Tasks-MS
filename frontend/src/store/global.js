export default {
    namespaced: true,
    state: {
        userLevel: 0,
        isAudit: true,
        host: 'http://10.64.216.18:8216/crescent/',
        accountState: {
            loginState: false,
            type: '游客',
            level: -1,
            realname: ''
        },
        model: {
            bulletin: {
                bulletinId: null,
                title: null,
                index: null,
                publishDept: null,
                publishDeptId: null,
                bulletinType: null,
                typeId: null,
                bulletinLevel: null,
                levelId: null,
                limit: false,
                limitNumber: 1,
                expertAudit: false,
                deadline: null,
                content: null,
                link: null,
                addition: false,
                additionUrl: null
            },
            declare: {
                declareId: null,
                projectName: null,
                index: null,
                leaderId: null,
                leaderJobTitle: null,
                bulletinId: null,
                declareDeptId: null,
                exceptDeadline: null,
                exceptAchievement: null,
                stateId: null,
                state: null,
                rejectionReason: null,
                expertScore: null,
                expertSuggestion: null,
                addition: false,
                additionUrl: null
            }
        },
        selectionList: {
            bulletinLevelSelection: [],
            bulletinTypeSelection: [],
            deptSelection: [],
            validBulletinSelection: []
        },
        quillExample: `<h1 class="ql-align-center">关于____课题的通知</h1><p><br></p><p class="ql-indent-1">关于此课题的详细信息。</p><p class="ql-align-right"><br></p><p class="ql-align-right">日期：____年___月___日</p>`
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
        },
        updateDeclareModel(state, value) {
            state.model.declare = value;
        },
        updateSelectionList(state, value) {
            state.selectionList = value;
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
            });
        },
        updateBulletinModel({commit}, value) {
            commit('updateBulletinModel', value);
        },
        resetBulletinModel({commit}) {
            commit('updateBulletinModel', {
                bulletinId: null,
                title: null,
                index: null,
                publishDept: null,
                publishDeptId: null,
                bulletinType: null,
                typeId: null,
                bulletinLevel: null,
                levelId: null,
                limit: false,
                limitNumber: 1,
                expertAudit: false,
                deadline: null,
                content: null,
                link: null,
                addition: false,
                additionUrl: null
            });
        },
        updateDeclareModel({commit}, value) {
            commit('updateDeclareModel', value);
        },
        resetDeclareModel({commit}) {
            commit('updateDeclareModel', {
                declareId: null,
                projectName: null,
                index: null,
                leaderId: null,
                leaderJobTitle: null,
                bulletinId: null,
                declareDeptId: null,
                exceptDeadline: null,
                exceptAchievement: null,
                stateId: null,
                state: null,
                rejectionReason: null,
                expertScore: null,
                expertSuggestion: null,
                addition: false,
                additionUrl: null
            });
        },
        updateSelectionList({commit}, value) {
            commit('updateSelectionList', value);
        }
    }
};
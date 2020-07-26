export default {
    namespaced: true,
    state: {
        userLevel: 0,
        isAudit: true,
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
                limit: true,
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
                addition: false,
                additionUrl: null
            }
        },
        schema: {
            bulletin: {
                groups: [{
                    legend: '课题信息',
                    fields: [{
                        type: 'input',
                        inputType: 'text',
                        label: '课题标题',
                        id: 'showTitle',
                        model: 'title',
                        readonly: true
                    }, {
                        type: 'input',
                        inputType: 'text',
                        label: '课题编号',
                        id: 'showId',
                        model: 'index',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: 'text',
                        id: "showDept",
                        label: "课题发布单位",
                        model: 'publishDept',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: 'text',
                        label: "课题类型",
                        id: "showCategory",
                        model: 'bulletinType',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: 'text',
                        id: "showLimit",
                        label: "课题是否限项",
                        model: "limit",
                        readonly: true
                    }, {
                        type: "input",
                        inputType: "number",
                        id: "showLimitNumber",
                        label: "课题限项数目(视上个条目决定是否显示)",
                        visible: function (model) {
                            return model.limit;
                        },
                        model: 'limitNumber',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: 'text',
                        id: "showIsExpert",
                        label: "课题是否需要专家评审",
                        model: "expertAudit",
                        readonly: true
                    }, {
                        type: "input",
                        id: "showLevel",
                        inputType: "text",
                        label: "课题级别",
                        model: 'bulletinLevel',
                        readonly: true
                    }, {
                        type: "input",
                        id: "showDeadline",
                        inputType: "text",
                        label: "课题申报截止时间",
                        model: "deadline",
                        readonly: true
                    }]
                }, {
                    legend: '课题通知内容'
                }]
            },
            declare: {
                groups: [{
                    legend: '项目申报信息',
                    fields: [{
                        type: 'input',
                        inputType: 'text',
                        id: 'projectName',
                        label: '项目名称',
                        model: 'projectName',
                        readonly: true
                    }, {
                        type: 'input',
                        inputType: 'text',
                        id: 'projectIndex',
                        label: '项目编号',
                        model: 'index',
                        readonly: true
                    }, {
                        type: 'input',
                        inputType: 'text',
                        id: 'declareLeader',
                        label: '负责人',
                        model: 'leader',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: "text",
                        id: "leaderJobTitle",
                        label: '负责人职称',
                        model: 'leaderJobTitle',
                        readonly: true
                    }, {
                        type: 'input',
                        inputType: 'text',
                        id: "declareBulletin",
                        label: '申报课题',
                        model: 'bulletin',
                        readonly: true
                    }, {
                        type: 'input',
                        inputType: 'text',
                        label: '申报部门',
                        id: "declareDept",
                        model: 'declareDept',
                        readonly: true
                    }, {
                        type: "input",
                        inputType: "text",
                        label: "预期完成时间",
                        model: "expectDeadline",
                        id: "expectDeadline",
                        readonly: true
                    }, {
                        type: "textArea",
                        label: "预期成果",
                        model: 'expectAchievement',
                        readonly: true
                    }]
                }]
            }
        },
        selectionList: {
            bulletinLevelSelection: [],
            bulletinTypeSelection: [],
            deptSelection: [],
            validBulletinSelection: []
        },
        quillExample: `<h1 class="ql-align-center">关于____课题的通知</h1><p><br></p><p class="ql-indent-1">关于此课题的详细信息。</p><p class="ql-align-right"><br></p><p class="ql-align-right">日期：____年___月___日</p>`,
        uploader: {
            hint: null,
            target: null
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
        },
        updateDeclareModel(state, value) {
            state.model.declare = value;
        },
        updateSelectionList(state, value) {
            state.selectionList = value;
        },
        updateModel(state, value) {
            state.model = value;
        },
        updateUploader(state, value) {
            state.uploader = value;
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
                realname: '',
                bulletinId: null
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
                limit: true,
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
                expectDeadline: null,
                expectAchievement: null,
                stateId: null,
                state: null,
                rejectionReason: null,
                addition: false,
                additionUrl: null
            });
        },
        updateSelectionList({commit}, value) {
            commit('updateSelectionList', value);
        },
        updateModel({commit}, value) {
            commit('updateModel', value);
        },
        updateUploader({commit}, value) {
            commit('updateUploader', value);
        }
    }
};
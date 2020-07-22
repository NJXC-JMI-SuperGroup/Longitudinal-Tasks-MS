import validators from "vue-form-generator/src/utils/validators";
import {mapState} from "vuex";

export default {
    props: {
        text: String
    },
    data() {
        return {
            form: {
                schemaLeft: {
                    groups: [{
                        legend: '发布课题信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '课题标题',
                            id: 'bulletinTitle',
                            model: 'title',
                            validator: validators.string.locale({
                                fieldIsRequired: "The title is required!"
                            })
                        }, {
                            type: 'input',
                            inputType: 'text',
                            model: 'index',
                            label: '课题编号',
                            id: "bulletinId"
                        }, {
                            type: "select",
                            label: "课题发布单位",
                            values: [
                                "部门一",
                                "部门二",
                                "部门三",
                                "部门四",
                                "部门五",
                                "部门六"
                            ]
                        }, {
                            type: "switch",
                            label: "课题是否需要专家评审",
                            textOn: "需要",
                            textOff: "不需要",
                            valueOn: true,
                            valueOff: false,
                            model: "expertAudit"
                        }, {
                            type: "switch",
                            label: "课题是否限项",
                            textOn: "限项",
                            textOff: "不限项",
                            valueOn: true,
                            valueOff: false,
                            model: "limit"
                        }, {
                            type: "input",
                            inputType: "number",
                            label: "课题限项数目",
                            model: 'limitNumber',
                            visible: function (model) {
                                return model.limit;
                            },
                            validator: validators.integer
                        }]
                    }, {
                        legend: '编辑课题内容'
                    }]
                },
                schemaRight: {
                    groups: [{
                        legend: " ",
                        fields: [{
                            type: "select",
                            label: "课题类型",
                            values: [
                                "类型一", "类型二"
                            ]
                        }, {
                            type: "select",
                            label: "课题级别",
                            values: [
                                "级别一", "级别二","级别三","级别四","级别五","级别六"
                            ]
                        }, {
                            type: "input",
                            id: 'bulletinLink',
                            label: "课题通知链接",
                            inputType: "text",
                            model: 'link'
                        }, {
                            type: "pikaday",
                            label: "课题申报截止时间",
                            model: "deadline",
                            pikadayOptions: {
                                position: "top left"
                            },
                            validator: validators.string.locale({
                                fieldIsRequired: "The deadline is required!"
                            })
                        }]
                    }]
                }
            },
            model: {
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
    methods: {
    },
    computed: {
        ...mapState('global', {
            quillExample: state => state.quillExample,
            bulletinModel: state => state.model.bulletin
        })
    },
    mounted() {
        this.model = this.bulletinModel;
        this.model.content = this.quillExample;
    }
}

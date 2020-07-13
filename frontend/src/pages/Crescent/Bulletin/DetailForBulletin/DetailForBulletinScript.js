import validators from "vue-form-generator/src/utils/validators";

export default {
    props: {
        text: String
    },
    data() {
        return {
            form: {
                schemaLeft: {
                    groups: [{
                        legend: '发布公告信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '课题标题',
                            placeholder: '这里填写课题标题',
                            id: 'bulletinTitle',
                            required: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            label: '课题编号',
                            placeholder: '课题编号',
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
                            model: "isExpert"
                        }, {
                            type: "switch",
                            label: "课题是否限项",
                            textOn: "限项",
                            textOff: "不限项",
                            valueOn: true,
                            valueOff: false,
                            model: "isLimit"
                        }, {
                            type: "input",
                            inputType: "number",
                            label: "课题限项数目",
                            visible: function (model) {
                                return model.isLimit;
                            },
                            validator: "integer"
                        }]
                    }, {
                        legend: '编辑公告内容'
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
                            label: "课题通知链接",
                            inputType: "text"
                        }, {
                            type: "pikaday",
                            label: "课题申报截止时间",
                            model: "deadline",
                            validator: validators.date,
                            pikadayOptions: {
                                position: "top left"
                            }
                        }]
                    }]
                },
                model: {
                    isLimit: false,
                    isExpert: false,
                    limitNumber: 0,
                    deadline: new Date()
                },
                options: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            quill: {
                content: '<h2>this is content.</h2><br/><br/><br/><br/><br/>'
            }
        }
    }
}
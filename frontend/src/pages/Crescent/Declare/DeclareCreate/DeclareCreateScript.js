import validators from "vue-form-generator/src/utils/validators";

export default {
    data() {
        return {
            form: {
                schemaLeft: {
                    groups: [
                        {
                            legend: '新建项目申报',
                            fields: [{
                                type: 'input',
                                inputType: 'text',
                                id: 'manager',
                                label: '负责人',
                                required: true
                            }, {
                                type: "input",
                                inputType: "text",
                                id: "managerTitle",
                                label: '负责人职称'
                            }, {
                                type: "textArea",
                                label: "预期成果",
                                hint: "Max 500 characters",
                                max: 500,
                                placeholder: "User's biography",
                                rows: 7
                            }]
                        }
                    ]
                },
                schemaRight: {
                    groups: [{
                        legend: ' ',
                        fields: [{
                            type: 'select',
                            label: '申报课题',
                            values: [
                                "课题一",
                                "课题二",
                                "课题三",
                                "课题四",
                                "课题五",
                                "课题六"
                            ]
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
                    deadline: new Date()
                },
                options: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        }
    }
}
import validators from "vue-form-generator/src/utils/validators";

export default {
    data() {
        return {
            form: {
                schemaLeft: {
                    groups: [
                        {
                            legend: '课题信息',
                            fields: [{
                                type: 'input',
                                inputType: 'text',
                                label: '课题标题',
                                placeholder: '课题标题',
                                id: 'showTitle',
                                readonly: true
                            }, {
                                type: 'input',
                                inputType: 'text',
                                label: '课题编号',
                                placeholder: '课题编号',
                                id: 'showId',
                                readonly: true
                            }, {
                                type: "input",
                                inputType: 'text',
                                id: "showDept",
                                label: "课题发布单位",
                                placeholder: '单位',
                                readonly: true
                            }, {
                                type: "input",
                                inputType: 'text',
                                label: "课题类型",
                                id: "showCategory",
                                placeholder: "类型",
                                readonly: true
                            }, {
                                type: "input",
                                inputType: 'text',
                                id: "showLimit",
                                label: "课题是否限项",
                                model: "isLimit",
                                readonly: true
                            }, {
                                type: "input",
                                inputType: "number",
                                id: "showLimitNumber",
                                label: "课题限项数目(视上个条目决定是否显示)",
                                visible: function (model) {
                                    return model.isLimit;
                                },
                                validator: validators.integer,
                                readonly: true
                            }, {
                                type: "input",
                                inputType: 'text',
                                id: "showIsExpert",
                                label: "课题是否需要专家评审",
                                model: "isExpert",
                                readonly: true
                            }, {
                                type: "input",
                                id: "showLevel",
                                inputType: "text",
                                label: "课题级别",
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
                        }
                    ]
                },
                schemaRight: {
                    groups: [{
                        legend: '申报信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            id: 'projectTitle',
                            label: '项目名称',
                            readonly: true
                        },{
                            type: 'input',
                            inputType: 'text',
                            id: 'manager',
                            label: '负责人',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            id: "managerTitle",
                            label: '负责人职称',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            label: "项目编号",
                            id: "projectId",
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: "text",
                            label: '申报课题',
                            id: "showApplicationTitle",
                            readonly: true
                        },{
                            type: 'input',
                            inputType: "text",
                            label: '申报部门',
                            id: "showApplicationDept",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            label: "预期完成时间",
                            model: "deadline",
                            id: "showCompleteDeadline",
                            readonly: true
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            placeholder: "User's biography",
                            rows: 9,
                            readonly: true
                        }]
                    }]
                },
                model: {
                    isLimit: true,
                    deadline: new Date()
                },
                options: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            showContent: `<div class="bd-example">
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
</div>`
        }
    }
}
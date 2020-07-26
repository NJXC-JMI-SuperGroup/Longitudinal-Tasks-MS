import validators from "vue-form-generator/src/utils/validators";
import {mapState} from "vuex";

let thisVue = null;

export default {
    data() {
        return {
            form: {
                schema: {
                    groups: [{
                        legend: '新建项目申报',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            id: 'projectTitle',
                            label: '项目名称',
                            required: true,
                            styleClasses: "col-md-6",
                            validator: validators.required,
                            model: 'projectName'
                        }, {
                            type: 'select',
                            label: '申报课题',
                            values: this.$store.state.global.selectionList.validBulletinSelection.map(item => {
                                return { id: item.bulletinId, name: item.bulletin };
                            }),
                            styleClasses: "col-md-6",
                            required: true,
                            validator: validators.required,
                            model: 'bulletinId'
                        }, {
                            type: "input",
                            inputType: "text",
                            id: "managerTitle",
                            label: '负责人职称',
                            styleClasses: "col-md-6",
                            model: 'leaderJobTitle'
                        }, {
                            type: 'select',
                            label: '申报部门',
                            values: this.$store.state.global.selectionList.deptSelection.map(item => {
                                return { id: item.depid, name: item.depname };
                            }),
                            required: true,
                            styleClasses: "col-md-6",
                            validator: validators.required,
                            model: 'declareDeptId'
                        }, {
                            type: "pikaday",
                            label: "预期完成时间",
                            model: "expectDeadline",
                            validator: validators.date,
                            required: true,
                            pikadayOptions: {
                                onSelect: function(date) {
                                    thisVue.form.model.expectDeadline = date;
                                    thisVue.$refs.vfg.validate().then();
                                }
                            },
                            styleClasses: "col-md-6"
                        }, {
                            type: 'upload',
                            label: '申报书及其他附件材料',
                            multiple: true,
                            onChanged: function (model, schema, event, instance) {
                                thisVue.files = event.srcElement.files;
                            },
                            styleClasses: "col-md-6"
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            hint: "Max 1000 characters",
                            max: 1000,
                            model: 'expectAchievement',
                            rows: 7,
                            styleClasses: "px-4"
                        }]
                    }]
                },
                model: {
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
                },
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            },
            files: []
        }
    },
    methods: {
        uploadFiles(declareId) {
            // eslint-disable-next-line no-console
            console.info(this.files, declareId);
            this.$router.push('/Crescent/declare/dash');
        },
        submit(url) {
            this.$refs.vfg.validate().then(res => {
                if (res.length === 0) {
                    this.$axios.post(this.apiHost + url, this.form.model).then(res => {
                        if (res.data !== -1) {
                            this.uploadFiles(res.data);
                        } else {
                            // eslint-disable-next-line no-console
                            console.info(res);
                        }
                    })
                }
            })
        }
    },
    computed: {
        ...mapState('global', ['host']),
        ...mapState('global', {
            declareModel: state => state.model.declare
        })
    },
    mounted() {
        this.form.model = this.declareModel;
    },
    created() {
        thisVue = this;
    }
}
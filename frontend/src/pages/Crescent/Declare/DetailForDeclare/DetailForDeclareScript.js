import {mapActions, mapState} from "vuex";
import FileUploader from '../../../../components/Crescent/FileUploader/FileUploader';
import validators from "../../../../validators";

let thisVue = null;

export default {
    components: {
        FileUploader
    },
    data() {
        return {
            form: {
                schemaLeft: {
                    groups: [{
                        legend: '新建项目申报',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            id: 'projectTitle',
                            label: '项目名称',
                            required: true,
                            // eslint-disable-next-line no-console
                            validator: validators.required,
                            model: 'projectName'
                        }, {
                            type: "input",
                            inputType: "text",
                            id: "managerTitle",
                            label: '负责人职称',
                            model: 'leaderJobTitle'
                        }, {
                            type: "pikaday",
                            label: "预期完成时间",
                            model: "expectDeadline",
                            validator: validators.date,
                            required: true,
                            pikadayOptions: {
                                format: 'YYYY-MM-DD',
                                onSelect: function(date) {
                                    thisVue.form.model.expectDeadline = date;
                                }
                            }
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            hint: "Max 1000 characters",
                            max: 1000,
                            model: 'expectAchievement',
                            rows: 7
                        }]
                    }]
                },
                schemaRight: {
                    groups: [{
                        legend: " ",
                        fields: [{
                            type: 'select',
                            label: '申报课题',
                            values: this.$store.state.global.selectionList.validBulletinSelection.map(item => {
                                return { id: item.bulletinId, name: item.bulletin };
                            }),
                            selectOptions: {
                                hideNoneSelectedText: true
                            },
                            required: true,
                            validator: validators.required,
                            model: 'bulletinId'
                        }, {
                            type: 'select',
                            label: '申报部门',
                            values: this.$store.state.global.selectionList.deptSelection.map(item => {
                                return { id: item.depid, name: item.depname };
                            }),
                            selectOptions: {
                                hideNoneSelectedText: true
                            },
                            required: true,
                            validator: validators.required,
                            model: 'declareDeptId'
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
        ...mapActions('global', ['updateSelectionList']),
        submit(url, urlForCommit) {
            this.$refs.vfgLeft.validate().then(resLeft => {
                this.$refs.vfgRight.validate().then(resRight => {
                    if (resLeft.length === 0 && resRight.length === 0) {
                        // eslint-disable-next-line no-console
                        console.info(this.$refs.fu.$refs.uploader.uploader.isComplete());
                        if (this.$refs.fu.$refs.uploader.uploader.isComplete()) {
                            this.$axios.post(this.apiHost + url, this.form.model).then(res => {
                                if (res.data !== -1) {
                                    this.$axios.post(this.apiHost + urlForCommit, {
                                        declareId: res.data,
                                        filenames: this.$refs.fu.$refs.uploader.uploader.fileList.map(item => item.name)
                                    }).then(res => {
                                        // eslint-disable-next-line no-console
                                        console.info(res.data);
                                        this.$router.push('/Crescent/declare/dash').then();
                                    })
                                }
                            })
                        } else {
                            this.$bvToast.show('submit-declare-wait-files');
                        }
                    }
                })
            })
        }
    },
    computed: {
        ...mapState('global', {
            declareModel: state => state.model.declare
        })
    },
    mounted() {
        this.form.model = this.declareModel;
        if (this.form.model.leaderJobTitle === null || this.form.model.leaderJobTitle.length === 0) {
            this.$axios.get(this.apiHost + 'basic/getJobTitle').then(res => {
                this.form.model.leaderJobTitle = res.data;
            })
        }
        this.$axios.get(this.apiHost + 'basic/getSelectionList').then(res => {
            this.updateSelectionList(res.data).then()
        });
    },
    created() {
        thisVue = this;
    }
}
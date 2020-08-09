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
                        fields: [{
                            type: 'input',
                            maxlength: 50,
                            inputType: 'text',
                            id: 'projectTitle',
                            label: '项目名称',
                            required: true,
                            validator: validators.required,
                            model: 'projectName'
                        }, {
                            type: 'input',
                            inputType: "text",
                            id: "leader",
                            label: '负责人',
                            model: 'leader',
                            readonly: true
                        }, {
                            type: 'input',
                            maxlength: 50,
                            inputType: "text",
                            id: "leaderJobTitle",
                            label: '负责人职称',
                            model: 'leaderJobTitle'
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            model: 'expectAchievement',
                            rows: 7
                        }]
                    }]
                },
                schemaRight: {
                    groups: [{
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
                                },
                                i18n: {
                                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                                    nextMonth: "下月",
                                    previousMonth: "上月",
                                    weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                                    weekdaysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
                                },
                                defaultDate: function() {
                                    return thisVue.form.model.deadline;
                                }
                            }
                        }]
                    }]
                },
                model: {
                    declareId: null,
                    projectName: null,
                    index: null,
                    leader: null,
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
            let files = this.$refs.fu.$refs.uploader.uploader.fileList.map(item => item.name);
            this.$refs.vfgLeft.validate().then(resLeft => {
                this.$refs.vfgRight.validate().then(resRight => {
                    if (resLeft.length === 0 && resRight.length === 0) {
                        if (this.$refs.fu.$refs.uploader.uploader.isComplete() && files.length > 0) {
                            this.$axios.post(this.apiHost + url, this.form.model).then(res => {
                                if (res.data !== -1) {
                                    this.$axios.post(this.apiHost + urlForCommit, {
                                        declareId: res.data,
                                        filenames: files
                                    }).then(res => {
                                        // eslint-disable-next-line no-console
                                        console.info(res.data);
                                        this.$router.push('/Crescent/declare/dash').then();
                                    })
                                }
                            })
                        } else {
                            this.$bvToast.show('submit-declare-' + (files.length > 0 ? 'wait' : 'without') + '-files');
                        }
                    }
                })
            })
        }
    },
    computed: {
        ...mapState('global', ['accountState']),
        ...mapState('global', {
            declareModel: state => state.model.declare
        })
    },
    mounted() {
        this.form.model = this.declareModel;
        this.form.model.leader = this.accountState.realname;
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
import {mapState} from "vuex";
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
                        legend: '发布课题信息',
                        fields: [{
                            type: 'input',
                            maxlength: 50,
                            inputType: 'text',
                            label: '课题标题',
                            id: 'bulletinTitle',
                            model: 'title',
                            required: true,
                            validator: validators.required
                        }, {
                            type: 'input',
                            maxlength: 50,
                            id: 'bulletinLink',
                            label: "课题通知链接",
                            inputType: "text",
                            model: 'link'
                        }, {
                            type: 'input',
                            maxlength: 50,
                            inputType: 'text',
                            id: 'bulletinPublishDept',
                            label: "课题发布单位",
                            required: true,
                            model: 'publishDept',
                            selectOptions: {
                                hideNoneSelectedText: true
                            },
                            validator: validators.required
                        }, {
                            type: "select",
                            label: "课题类型",
                            values: this.$store.state.global.selectionList.bulletinTypeSelection.map(item => {
                                return { id: item.typeId, name: item.type };
                            }),
                            selectOptions: {
                                hideNoneSelectedText: true
                            },
                            model: 'typeId',
                            required: true,
                            validator: validators.required
                        }, {
                            type: "select",
                            label: "课题级别",
                            values: this.$store.state.global.selectionList.bulletinLevelSelection.map(item => {
                                return { id: item.levelId, name: item.level };
                            }),
                            selectOptions: {
                                hideNoneSelectedText: true
                            },
                            model: 'levelId',
                            required: true,
                            validator: validators.required
                        }]
                    }]
                },
                schemaRight: {
                    groups: [{
                        legend: " ",
                        fields: [{
                            type: "pikaday",
                            label: "课题申报截止时间",
                            model: "deadline",
                            required: true,
                            validator: validators.date,
                            pikadayOptions: {
                                format: 'YYYY-MM-DD',
                                onSelect: function(date) {
                                    thisVue.form.model.deadline = date;
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
                        }, {
                            type: "switch",
                            label: "课题是否需要专家评审",
                            textOn: "需要",
                            textOff: "不需要",
                            valueOn: true,
                            valueOff: false,
                            styleClasses: 'col-md-6',
                            model: "expertAudit"
                        }, {
                            type: "switch",
                            label: "课题是否限项",
                            textOn: "限项",
                            textOff: "不限项",
                            valueOn: true,
                            valueOff: false,
                            styleClasses: 'col-md-6',
                            model: "limit"
                        }, {
                            type: 'input',
                            maxlength: 50,
                            inputType: "Number",
                            min: 1,
                            label: "课题限项数目",
                            model: 'limitNumber',
                            visible: function (model) {
                                return model.limit;
                            },
                            validator: validators.integer
                        }]
                    }]
                },
                model: {
                    bulletinId: null,
                    title: null,
                    index: null,
                    publishDept: null,
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
                options: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        }
    },
    methods: {
        submit(url, urlForCommit) {
            this.$refs.vfgLeft.validate().then(leftRes => {
                this.$refs.vfgRight.validate().then(rightRes => {
                    if (leftRes.length === 0 && rightRes.length === 0) {
                        if (this.$refs.fu.$refs.uploader.uploader.isComplete()) {
                            this.form.model.content = this.$refs.quillEditor._content;
                            this.$axios.post(this.apiHost + url, this.form.model).then(res => {
                                if (res.data!==-1) {
                                    this.$axios.post(this.apiHost + urlForCommit, {
                                        bulletinId: res.data,
                                        filenames: this.$refs.fu.$refs.uploader.uploader.fileList.map(item => item.name)
                                    }).then(res => {
                                        // eslint-disable-next-line no-console
                                        console.info(res.data);
                                        this.$router.push('/Crescent/bulletin/dash').then();
                                    })
                                }
                            })
                        } else {
                            this.$bvToast.show('submit-bulletin-wait-files');
                        }
                    }
                })
            })
        }
    },
    computed: {
        ...mapState('global', ['quillExample']),
        ...mapState('global', {
            bulletinModel: state => state.model.bulletin
        })
    },
    mounted() {
        let tmpModel = this.bulletinModel;
        if (!tmpModel.limit) {
            tmpModel.limitNumber = 1;
        }
        this.form.model = tmpModel;
        if (!this.form.model.content || this.form.model.content.length===0) {
            this.form.model.content = this.quillExample;
        }
    },
    created() {
        thisVue = this;
    }
}

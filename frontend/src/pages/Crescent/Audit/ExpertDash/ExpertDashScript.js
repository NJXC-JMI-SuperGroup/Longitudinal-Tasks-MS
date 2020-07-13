import Vue from 'vue'

import {mapActions, mapState} from "vuex";
import validators from "vue-form-generator/src/utils/validators";

export default {
    data() {
        return {
            easytable: {
                tableData: [
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"待评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"待评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"待评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"待评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"待评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已评审","manager":"xx老师"}
                ],
                columns: [
                    {field: 'title', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'manager', title: '负责人', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-audit-expert',isResize:true}
                ]
            },
            expertReason: `Fast facts on dreams
We may not remember dreaming, but everyone is thought to dream between 3 and 6 times per night
It is thought that each dream lasts between 5 to 20 minutes.
Around 95 percent of dreams are forgotten by the time a person gets out of bed.
Dreaming can help you learn and develop long-term memories.
Blind people dream more with other sensory components compared with sighted people.`,
            expertScore: 99,
            form: {
                schema: {
                    groups: [{
                        legend: '发布公告信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '当前账号数目',
                            placeholder: '12',
                            id: 'currentAccountNumber',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "number",
                            label: "继续生成账号数目",
                            validator: "integer"
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
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        }
    }
}
Vue.component('table-operation-audit-expert',{
    template:`
        <span v-if="userLevel===3">
            <a @click.stop.prevent="audit(rowData,index)">{{ rowData.state==='待评审' ? '评审' : '查看' }}</a>
        </span>
        <span v-else-if="userLevel===2">
            <a v-if="rowData.state==='待评审'" @click.stop.prevent="expertAccount(rowData,index)">外审账号</a>
            <a v-else @click.stop.prevent="showDetail(rowData,index)">查看外审结果</a>
        </span>
    `,
    props:{
        rowData:{
            type:Object
        },
        field:{
            type:String
        },
        index:{
            type:Number
        }
    },
    methods:{
        ...mapActions('global', ['updateIsAudit']),
        audit(rowData, index) {
            this.updateIsAudit(rowData.state === '待评审');
            this.$router.push('/Crescent/audit/expertDash/expertAudit');
        },
        showDetail() {
            this.$bvModal.show('show-expert-result');
        },
        expertAccount() {
            this.$bvModal.show('show-expert-account');
        }
    },
    computed: {
        ...mapState('global', {
            userLevel: state => state.userLevel
        })
    }
})
import Vue from 'vue';

export default {
    name: "DeclareProgress",
    data() {
        return {
            easytable: {
                tableData: [
                    {"title":"HGGSDKJ项目","state":"申报中","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"申报中","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"申报中","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"驳回","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"驳回","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"拒绝","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"专家评审中","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"专家评审中","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"已立项","bulletin":"xxxx课题","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","state":"已立项","bulletin":"xxxx课题","manager":"xx老师"}
                ],
                columns: [
                    {field: 'title', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '当前状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'manager', title: '负责人', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-declare',isResize:true}
                ]
            },
            form: {
                schema: {
                    groups: [{
                        legend: '项目申报信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            id: 'showProjectTitle',
                            label: '项目名称',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: 'showProjectId',
                            label: '项目编号',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: 'showManager',
                            label: '负责人',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            id: "managerTitle",
                            label: '负责人职称',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            id: "showBulletinTitle",
                            label: '申报课题',
                            placeholder: 'xxxxx',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            label: '申报部门',
                            id: "showDept",
                            placeholder: 'xxxxx',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "text",
                            label: "预期完成时间",
                            model: "deadline",
                            id: "showDeadline",
                            readonly: true
                        }, {
                            type: "textArea",
                            label: "预期成果",
                            max: 500,
                            placeholder: "User's biography",
                            rows: 7,
                            readonly: true
                        }]
                    }]
                },
                model: {
                    deadline: new Date()
                }
            },
            rejectReason: `Fast facts on dreams
We may not remember dreaming, but everyone is thought to dream between 3 and 6 times per night
It is thought that each dream lasts between 5 to 20 minutes.
Around 95 percent of dreams are forgotten by the time a person gets out of bed.
Dreaming can help you learn and develop long-term memories.
Blind people dream more with other sensory components compared with sighted people.`,
            expertReason: `Fast facts on dreams
We may not remember dreaming, but everyone is thought to dream between 3 and 6 times per night
It is thought that each dream lasts between 5 to 20 minutes.
Around 95 percent of dreams are forgotten by the time a person gets out of bed.
Dreaming can help you learn and develop long-term memories.
Blind people dream more with other sensory components compared with sighted people.`,
            expertScore: 99
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        }
    }
}
Vue.component('table-operation-declare',{
    template:`
        <span>
            <a @click.stop.prevent="showModel(rowData,index,'modal-scrollable-declare')">查看 </a>
            <a @click.stop.prevent="showModel(rowData,index,'modal-reason')" v-if="rowData.state==='驳回'">驳回理由 </a>
            <a @click.stop.prevent="showModel(rowData,index,'modal-expert')" v-if="rowData.state==='已立项' && index%2===0">专审结果 </a>
            <a @click.stop.prevent="modify(rowData,index)" v-if="rowData.state==='驳回'">修改</a>
        </span>`,
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
        showModel(rowData, index, modalId){
            // 参数根据业务场景随意构造
            // let params = {type:'edit',index:this.index,rowData:this.rowData};
            // this.$emit('on-custom-comp',params);
            this.$bvModal.show(modalId)
        },
        modify() {
            this.$router.push('/Crescent/declare/progress/modify');
        }
    }
})
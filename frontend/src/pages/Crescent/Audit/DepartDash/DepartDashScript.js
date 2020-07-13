import Vue from 'vue'

import {mapActions} from "vuex";

export default {
    data() {
        return {
            easytable: {
                tableData: [
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"未评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"未评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"未评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"未评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"未评审","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已驳回","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已驳回","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已拒绝","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"专家评审中","manager":"xx老师"},
                    {"title":"HGGSDKJ项目","bulletin":"xxxx课题","state":"已立项","manager":"xx老师"}
                ],
                columns: [
                    {field: 'title', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'manager', title: '负责人', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-audit-depart',isResize:true}
                ]
            }
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        }
    }
}
Vue.component('table-operation-audit-depart',{
    template:`
        <span>
            <a @click.stop.prevent="audit(rowData,index)">{{ rowData.state==='未评审' ? '评审' : '查看' }}</a>
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
        ...mapActions('global', ['updateIsAudit']),
        audit(rowData, index) {
            this.updateIsAudit(rowData.state === '未评审');
            this.$router.push('/Crescent/audit/departDash/departAudit');
        }
    }
})
import Vue from 'vue'
import {mapActions, mapState} from "vuex";

export default {
    data() {
        return {
            easytable: {
                fullData: [],
                tableData: [],
                columns: [
                    {
                        field: '', title: '', width: 30, titleAlign: 'center', columnAlign: 'center',
                        formatter: function(rowData, index, pagingIndex) {
                            return  index + pagingIndex + 1;
                        }, isFrozen: true
                    },
                    {field: 'title', title: '课题', width: 140, titleAlign: 'center', columnAlign: 'left'},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center'},
                    {field: 'bulletinLevel', title: '课题级别', width: 100, titleAlign: 'center', columnAlign: 'center'},
                    {field: 'publishDept', title: '发布单位', width: 140, titleAlign: 'center', columnAlign: 'center',isResize: true},
                    {
                        field: 'deadline', title: '截止时间', width: 120, titleAlign: 'center', columnAlign: 'center',
                        formatter: function(rowData) {
                            return rowData.deadline.slice(0, 10);
                        }
                    },
                    {field: 'custom-adv', title: '操作',width: 50, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-bulletin',isResize:true}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            },
            form: {
                schema: {
                    groups: [{
                        legend: '课题信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '课题标题',
                            id: 'showTitle',
                            model: 'title',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            label: '课题编号',
                            id: 'showId',
                            model: 'index',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showDept",
                            label: "课题发布单位",
                            model: 'publishDept',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            label: "课题类型",
                            id: "showCategory",
                            model: 'bulletinType',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showLimit",
                            label: "课题是否限项",
                            model: "limit",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "number",
                            id: "showLimitNumber",
                            label: "课题限项数目(视上个条目决定是否显示)",
                            visible: function (model) {
                                return model.isLimit;
                            },
                            model: 'limitNumber',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showIsExpert",
                            label: "课题是否需要专家评审",
                            model: "expertAudit",
                            readonly: true
                        }, {
                            type: "input",
                            id: "showLevel",
                            inputType: "text",
                            label: "课题级别",
                            model: 'bulletinLevel',
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
                    }]
                }
            }
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        },
        pageChange(index) {
            this.easytable.pageIndex = index;
            this.setTableData(index, this.easytable.pageSize, this.easytable.fullData);
        },
        setTableData(index, size, fullData) {
            let ex = index * size;
            this.easytable.tableData = fullData.slice(ex - size, ex);
        }
    },
    mounted() {
        this.$axios.get(this.host + '/bulletin/getBulletinList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    },
    computed: {
        ...mapState('global', {
            host: state => state.host,
            bulletinModel: state => state.model.bulletin
        })
    }
}

Vue.component('table-operation-bulletin',{
    template:`
        <span>
            <a @click.stop.prevent="showModel(rowData,index)">查看 </a>
            <template v-if="rowData.state==='进行中'">
                <a @click.stop.prevent="update(rowData,index)" v-if="accountState.level===1 || accountState.level===14">更新 </a>
                <a @click.stop.prevent="declare(rowData,index)" v-if="accountState.level===0">申报</a>
            </template>
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
        ...mapActions('global', ['updateBulletinModel']),
        update(){
            // 参数根据业务场景随意构造
            // let params = {type:'edit',index:this.index,rowData:this.rowData};
            // this.$emit('on-custom-comp',params);
            this.$router.push('/Crescent/bulletin/dash/modify')
        },
        declare() {
            this.$router.push('/Crescent/declare/create')
        },
        showModel(rowData, index) {
            this.$axios.get(this.host + 'bulletin/getBulletin', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then((res) => {
                res.data.deadline = res.data.deadline.slice(0, 10);
                this.updateBulletinModel(res.data);
                this.$bvModal.show('modal-scrollable-bulletin');
            })
        }
    },
    computed: {
        ...mapState('global', ['host', 'accountState'])
    }
})
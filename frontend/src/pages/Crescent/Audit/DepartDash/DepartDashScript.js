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
                    {field: 'projectName', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '当前状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bulletin', title: '申报课题', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'leader', title: '负责人', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 90, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-audit-depart',isResize:true}
                ],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                isLoading: true
            }
        }
    },
    methods:{
        pageChange(index) {
            this.easytable.pageIndex = index;
            this.setTableData(index, this.easytable.pageSize, this.easytable.fullData);
        },
        setTableData(index, size, fullData) {
            let ex = index * size;
            let ret = fullData.slice(ex - size, ex);
            this.easytable.tableData = ret === "" ? [] :ret;
        }
    },
    mounted() {
        this.$axios.get(this.apiHost + 'audit/getDeclareList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    }
}
Vue.component('table-operation-audit-depart',{
    template:`
        <span>
            <a @click.stop.prevent="audit(rowData)">{{ rowData.stateId===2 ? '评审' : '查看' }}</a>
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
        ...mapActions('global', ['updateIsAudit', 'updateModel']),
        audit(rowData) {
            this.updateIsAudit(rowData.stateId === 2).then(() => {
                this.$axios.get(this.apiHost + 'bulletin/getBulletin', {
                    params: {
                        bulletinId: rowData.bulletinId
                    }
                }).then(bulletinRes => {
                    this.$axios.get(this.apiHost + 'declare/getDeclare', {
                        params: {
                            declareId: rowData.declareId
                        }
                    }).then(declareRes => {
                        this.updateModel({
                            bulletin: bulletinRes.data,
                            declare: declareRes.data
                        }).then(() => {
                            this.$router.push('/Crescent/audit/departDash/departAudit').then();
                        });
                    })
                })
            })
        }
    },
    computed: {
        ...mapState('global', ['model'])
    }
})
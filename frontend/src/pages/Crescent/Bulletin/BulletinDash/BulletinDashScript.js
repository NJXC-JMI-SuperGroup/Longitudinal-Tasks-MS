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
                schema: this.$store.state.global.schema.bulletin
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
            this.easytable.tableData = ret === "" ? [] : ret;
        }
    },
    mounted() {
        this.$axios.get(this.host + 'bulletin/getBulletinList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    },
    computed: {
        ...mapState('global', ['host']),
        ...mapState('global', {
            bulletinModel: state => state.model.bulletin,
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
        ...mapActions('global', ['updateBulletinModel', 'updateDeclareModel']),
        update(rowData){
            this.$axios.get(this.host + 'bulletin/getBulletin', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then((res) => {
                res.data.deadline = res.data.deadline.slice(0, 10);
                this.updateBulletinModel(res.data).then(() => {
                    this.$router.push('/Crescent/bulletin/dash/modify').then();
                })
            })
        },
        declare(rowData) {
            this.$router.push('/Crescent/declare/create').then(() => {
                this.updateDeclareModel({
                    declareId: null,
                    projectName: null,
                    index: null,
                    leaderId: null,
                    leaderJobTitle: null,
                    bulletinId: rowData.bulletinId,
                    declareDeptId: null,
                    exceptDeadline: null,
                    exceptAchievement: null,
                    stateId: null,
                    state: null,
                    rejectionReason: null,
                    expertScore: null,
                    expertSuggestion: null,
                    addition: false,
                    additionUrl: null
                })
            })
        },
        showModel(rowData) {
            this.$axios.get(this.host + 'bulletin/getBulletin', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then((res) => {
                res.data.deadline = res.data.deadline.slice(0, 10);
                this.updateBulletinModel(res.data).then(() => {
                    this.$bvModal.show('modal-scrollable-bulletin');
                });
            })
        }
    },
    computed: {
        ...mapState('global', ['host', 'accountState'])
    }
})
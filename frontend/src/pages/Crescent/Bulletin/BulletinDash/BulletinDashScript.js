import Vue from 'vue'
import {mapActions, mapState} from "vuex";
let moment = require('moment');

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
                    {field: 'title', title: '课题', width: 200, titleAlign: 'left', columnAlign: 'left', isResize: true},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center'},
                    {field: 'bulletinLevel', title: '课题级别', width: 100, titleAlign: 'center', columnAlign: 'center'},
                    {field: 'publishDept', title: '发布单位', width: 75, titleAlign: 'center', columnAlign: 'center'},
                    {
                        field: 'deadline', title: '截止时间', width: 120, titleAlign: 'center', columnAlign: 'center',
                        formatter: function(rowData) {
                            return moment(rowData.deadline).format('YYYY-MM-DD');
                        }
                    },
                    {field: 'custom-adv', title: '操作',width: 80, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-bulletin'}
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
        },
        columnCellClass(rowIndex){
            return rowIndex % 2 ? 'easytable-class-column-gray' : 'easytable-class-column-white';
        }
    },
    mounted() {
        this.$axios.get(this.apiHost + 'bulletin/getBulletinList').then((res) => {
            this.easytable.fullData = res.data;
            this.easytable.total = res.data.length;
            this.setTableData(this.easytable.pageIndex, this.easytable.pageSize, this.easytable.fullData);
        }).finally(() => {
            this.easytable.isLoading = false;
        })
    },
    computed: {
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
                <a @click.stop.prevent="update(rowData,index)" v-if="accountState.level===14">更新 </a>
                <a @click.stop.prevent="declare(rowData,index)" v-if="accountState.level===0">申报</a>
            </template>
        </span>`,
    props:{
        rowData:{ type:Object },
        field:{ type:String },
        index:{ type:Number }
    },
    methods:{
        ...mapActions('global', ['updateBulletinModel', 'updateDeclareModel', 'updateUploader']),
        update(rowData){
            this.$axios.get(this.apiHost + 'bulletin/getBulletin', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then((res) => {
                res.data.deadline = moment(new Date(res.data.deadline)).format('YYYY-MM-DD');
                this.updateBulletinModel(res.data).then(() => {
                    this.updateUploader({
                        hint: '提交后请等待文件上传',
                        target: this.apiHost + 'bulletin/uploadFiles'
                    }).then(() => {
                        this.$router.push('/Crescent/bulletin/dash/modify').then();
                    });
                })
            })
        },
        declare(rowData) {
            this.$router.push('/Crescent/declare/create').then(() => {
                this.updateDeclareModel({
                    declareId: null,
                    projectName: null,
                    index: null,
                    leader: null,
                    leaderId: null,
                    leaderJobTitle: null,
                    bulletinId: rowData.bulletinId,
                    declareDeptId: null,
                    expectDeadline: null,
                    expectAchievement: null,
                    stateId: null,
                    state: null,
                    addition: false,
                    additionUrl: null
                })
            })
        },
        showModel(rowData) {
            this.$axios.get(this.apiHost + 'bulletin/getBulletin', {
                params: {
                    bulletinId: rowData.bulletinId
                }
            }).then((res) => {
                res.data.deadline = moment(new Date(res.data.deadline)).format('YYYY-MM-DD');
                res.data.additionUrl = this.apiHost + res.data.additionUrl;
                res.data.limit = res.data.limit ? '限项': '不限项';
                res.data.expertAudit = res.data.expertAudit ? '需要' : '不需要';
                this.updateBulletinModel(res.data).then(() => {
                    this.$bvModal.show('modal-scrollable-bulletin');
                });
            })
        }
    },
    computed: {
        ...mapState('global', ['accountState'])
    }
})
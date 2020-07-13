import Vue from 'vue'
import validators from "vue-form-generator/src/utils/validators";
import {mapState} from "vuex";

export default {
    data() {
        return {
            easytable: {
                tableData: [
                    {"title":"xxx公告","state":"进行中", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"进行中", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"进行中", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"进行中", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"进行中", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"已截止", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"已截止", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"已截止", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"已截止", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"},
                    {"title":"xxx公告","state":"已截止", "category":"科技创新", "level":"校级课题","dept":"xxxxx","deadline":"2021-12-21"}
                ],
                columns: [
                    {field: 'title', title: '课题', width: 140, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'state', title: '状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'category', title: '课题类型', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'level', title: '课题级别', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dept', title: '发布单位', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'deadline', title: '截止时间', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-bulletin',isResize:true}
                ]
            },
            form: {
                schema: {
                    groups: [{
                        legend: '课题信息',
                        fields: [{
                            type: 'input',
                            inputType: 'text',
                            label: '课题标题',
                            placeholder: '课题标题',
                            id: 'showTitle',
                            readonly: true
                        }, {
                            type: 'input',
                            inputType: 'text',
                            label: '课题编号',
                            placeholder: '课题编号',
                            id: 'showId',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showDept",
                            label: "课题发布单位",
                            placeholder: '单位',
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            label: "课题类型",
                            id: "showCategory",
                            placeholder: "类型",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showLimit",
                            label: "课题是否限项",
                            model: "isLimit",
                            readonly: true
                        }, {
                            type: "input",
                            inputType: "number",
                            id: "showLimitNumber",
                            label: "课题限项数目(视上个条目决定是否显示)",
                            visible: function (model) {
                                return model.isLimit;
                            },
                            validator: validators.integer,
                            readonly: true
                        }, {
                            type: "input",
                            inputType: 'text',
                            id: "showIsExpert",
                            label: "课题是否需要专家评审",
                            model: "isExpert",
                            readonly: true
                        }, {
                            type: "input",
                            id: "showLevel",
                            inputType: "text",
                            label: "课题级别",
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
                },
                model: {
                    isLimit: true,
                    isExpert: false,
                    limitNumber: 0,
                    deadline: new Date()
                }
            },
            showContent: `<div class="bd-example">
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
</div>`
        }
    },
    methods:{
        customCompFunc(params){
            console.log(params);
            alert(`${params.index} ${params.rowData['title']}`)
        }
    }
}
Vue.component('table-operation-bulletin',{
    template:`
        <span>
            <a @click.stop.prevent="showModel(rowData,index)">查看 </a>
            <template v-if="rowData.state==='进行中'">
                <a @click.stop.prevent="update(rowData,index)" v-if="userLevel===2 || userLevel===4">更新 </a>
                <a @click.stop.prevent="declare(rowData,index)" v-if="userLevel===1">申报</a>
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
        update(){
            // 参数根据业务场景随意构造
            // let params = {type:'edit',index:this.index,rowData:this.rowData};
            // this.$emit('on-custom-comp',params);
            this.$router.push('/Crescent/bulletin/dash/modify')
        },
        declare() {
            this.$router.push('/Crescent/declare/create')
        },
        showModel() {
            this.$bvModal.show('modal-scrollable-bulletin')
        }
    },
    computed: {
        ...mapState('global', {
            userLevel: state => state.userLevel
        })
    }
})
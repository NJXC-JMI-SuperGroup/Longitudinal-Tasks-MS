<template>
    <div>
        <v-table class="w-100"
                is-horizontal-resize
                :columns="easytable.columns"
                :table-data="easytable.tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                @on-custom-comp="customCompFunc"
        />
        <div class="d-flex justify-content-center">
            <v-pagination class="mt-2" :total="600" :page-size="10" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "DeclareProgress",
        data() {
            return {
                easytable: {
                    tableData: [
                        {"idx":"HGGSDKJG123","state":"申请中","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"申请中","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"申请中","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"申请中","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"},
                        {"idx":"HGGSDKJG123","state":"已立项","title":"xxx项目","dept":"xxxxx","manager":"xx老师","time":"2020-01-16"}
                    ],
                    columns: [
                        {field: 'idx', title: '项目编号', width: 90, titleAlign: 'left', columnAlign: 'left',isResize:true},
                        {field: 'state', title: '当前状态', width: 60, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'title', title: '项目名称', width: 130, titleAlign: 'left', columnAlign: 'left',isResize:true},
                        {field: 'dept', title: '部门', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'manager', title: '负责人', width: 50, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'time', title: '发布时间', width: 75, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'custom-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation-declare',isResize:true}
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
    Vue.component('table-operation-declare',{
        template:`<span>
            <a href="" @click.stop.prevent="update(rowData,index)">下载申报书及附件</a>&nbsp;
            <a href="" @click.stop.prevent="update(rowData,index)">删除</a>
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
                let params = {type:'edit',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            }
        }
    })
</script>

<style scoped>

</style>
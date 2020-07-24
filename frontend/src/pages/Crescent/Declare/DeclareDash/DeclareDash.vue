<template>
    <div>
        <v-table class="w-100"
                 is-horizontal-resize
                 :columns="easytable.columns"
                 :table-data="easytable.tableData"
                 :paging-index="(easytable.pageIndex - 1) * easytable.pageSize"
                 :is-loading="easytable.isLoading"
                 row-hover-color="#eee"
                 row-click-color="#edf7ff"
        />
        <div class="d-flex justify-content-center">
            <v-pagination class="mt-2" @page-change="pageChange" :total="easytable.total"
                          :page-size="Number(easytable.pageSize)"
                          :layout="['total', 'prev', 'pager', 'next', 'jumper']"/>
        </div>
        <b-modal id="modal-scrollable-declare" scrollable hide-footer title="详细">
            <template v-if="declareModel.addition">
                申报书及附件<a class="badge-warning" :href="declareModel.additionUrl" target="_blank">链接</a><br/>
            </template>
            <br/>
            <vue-form-generator :schema="form.schema" :model="declareModel"/>
            <br/>
        </b-modal>
        <b-modal id="modal-reason" scrollable hide-footer title="驳回理由">{{ declareModel.rejectionReason }}</b-modal>
        <b-modal id="modal-expert" scrollable hide-footer title="专审结果">
            专家评分：{{ declareModel.expertScore }} <br>
            专家意见与建议：
            <div class="p-2 border">{{ declareModel.expertSuggestion }}</div>
        </b-modal>
    </div>
</template>

<script src="./DeclareDashScript.js"/>

<style lang="less" scoped/>
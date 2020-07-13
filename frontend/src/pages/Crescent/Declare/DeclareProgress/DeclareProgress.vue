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
        <b-modal id="modal-scrollable-declare" scrollable hide-footer title="详细">
            申报书下载链接 <a href="https://cn.bing.com" target="_blank">FAKE LINK</a><br/>
            其他附件材料链接 <a href="https://cn.bing.com" target="_blank">also FAKE LINK</a>
            <vue-form-generator :schema="form.schema" :model="form.model" />
        </b-modal>
        <b-modal id="modal-reason" scrollable hide-footer title="驳回理由">{{ rejectReason }}</b-modal>
        <b-modal id="modal-expert" scrollable hide-footer title="专审结果">
            专家评分：{{ expertScore }} <br>
            专家意见与建议：<div class="p-2 border">{{ expertReason }}</div>
        </b-modal>
    </div>
</template>

<script src="./DeclareProgressScript.js" />

<style lang="less" scoped />
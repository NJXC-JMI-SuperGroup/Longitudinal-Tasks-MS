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
                 @on-custom-comp="customCompFunc"
        />
        <div class="d-flex justify-content-center">
            <v-pagination class="mt-2" @page-change="pageChange" :total="easytable.total"
                          :page-size="Number(easytable.pageSize)"
                          :layout="['total', 'prev', 'pager', 'next', 'jumper']"/>
        </div>
        <b-modal id="modal-scrollable-bulletin" scrollable hide-footer title="详细">
            <template v-if="bulletinModel.link && bulletinModel.link.length">
                课题通知<a class="badge-warning" :href="bulletinModel.link" target="_blank">链接</a><br/>
            </template>
            <template v-if="bulletinModel.addition">
                课题附件<a class="badge-warning" :href="bulletinModel.additionUrl" target="_blank">链接</a><br/>
            </template>
            <br/>
            <vue-form-generator :schema="form.schema" :model="bulletinModel"/>
            <div class="border p-2" v-html="bulletinModel.content"/>
            <br/>
        </b-modal>
    </div>
</template>

<script src="./BulletinDashScript.js"/>

<style scoped/>
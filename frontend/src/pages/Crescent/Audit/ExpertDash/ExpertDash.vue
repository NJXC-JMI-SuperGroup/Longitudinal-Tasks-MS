<template>
    <div>
        <v-table class="w-100"
                 is-horizontal-resize
                 :column-cell-class-name="columnCellClass"
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
        <b-modal id="modal-scrollable-audit" scrollable hide-footer title="评审">
            <vue-form-generator ref="vfg" :schema="isAudit ? form.schema : form.schemaReadonly"
                                :model="form.model" :options="form.options" />
            <div v-if="isAudit" class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary" @click="submit">确认</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script src="./ExpertDashScript.js" />

<style lang="less" scoped/>
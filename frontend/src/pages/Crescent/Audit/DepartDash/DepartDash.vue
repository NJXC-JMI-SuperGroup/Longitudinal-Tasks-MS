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
    </div>
</template>

<script src="./DepartDashScript.js" />

<style lang="less" scoped />
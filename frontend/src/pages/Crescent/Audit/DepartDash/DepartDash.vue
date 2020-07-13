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

<script src="./DepartDashScript.js" />

<style lang="less" scoped />
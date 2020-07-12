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
        <b-modal id="modal-scrollable" scrollable hide-footer title="Scrollable Content">
            课题通知链接 <a href="https://cn.bing.com" target="_blank">FAKE LINK</a>
            <vue-form-generator :schema="form.schema" :model="form.model" :options="form.options" />
            <div v-html="showContent" />
        </b-modal>
    </div>
</template>

<script src="./BulletinDashScript.js" />

<style scoped />
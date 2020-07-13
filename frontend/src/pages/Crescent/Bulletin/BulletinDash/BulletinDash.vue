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
        <b-modal id="modal-scrollable-bulletin" scrollable hide-footer title="详细">
            课题通知链接 <a href="https://cn.bing.com" target="_blank">FAKE LINK</a><br/>
            课题附件链接 <a href="https://cn.bing.com" target="_blank">also FAKE LINK</a><br/>
            <vue-form-generator :schema="form.schema" :model="form.model" />
            <div class="border p-2" v-html="showContent" />
        </b-modal>
    </div>
</template>

<script src="./BulletinDashScript.js" />

<style scoped />
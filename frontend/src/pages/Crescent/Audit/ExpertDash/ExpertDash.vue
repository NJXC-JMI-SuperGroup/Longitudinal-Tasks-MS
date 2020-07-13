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
        <b-modal id="show-expert-result" scrollable hide-footer title="专审结果">
            专家评分：{{ expertScore }} <br>
            专家意见与建议：<div class="p-2 border">{{ expertReason }}</div>
            <div class="w-100 d-flex justify-content-center">
                <b-button squared variant="outline-success" class="mt-2">转入立项</b-button>
            </div>
        </b-modal>
        <b-modal id="show-expert-account" scrollable hide-footer title="外审账号">
            <vue-form-generator :schema="form.schema" :model="form.model" :options="form.options" />
            <div class="w-100 d-flex justify-content-around mb-2">
                <b-button squared variant="outline-primary" my-2>生成账号</b-button>
                <b-button squared variant="outline-success">一键复制</b-button>
            </div>
            <b-list-group class="border p-2">
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
                <b-list-group-item class="py-0">Awesome link</b-list-group-item>
            </b-list-group>
        </b-modal>
    </div>
</template>

<script src="./ExpertDashScript.js" />

<style lang="less" scoped/>
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
        <b-modal id="show-expert-result" scrollable hide-footer title="专审结果">
            <b-card no-body>
                <b-tabs pills card>
                    <template v-for="(item, index) in tabs">
                        <b-tab :title="'t-'+index" :key="'tabs-'+index"><b-card-text>
                            <p>总评：{{item.score}}</p>
                            <p>专家意见：</p>
                            <pre>{{item.suggestion}}</pre>
                        </b-card-text></b-tab>
                    </template>
                </b-tabs>
            </b-card>
            <div class="w-100 d-flex justify-content-center">
                <b-button squared variant="outline-success" class="mt-2" @click="submit">转入立项</b-button>
            </div>
        </b-modal>
        <b-modal id="show-expert-account" scrollable hide-footer title="当前课题外审账号">
            <vue-form-generator ref="accountVFG" :schema="form.schema"
                                :model="form.model" :options="form.options" />
            <div class="w-100 d-flex justify-content-around mb-2">
                <b-button squared variant="outline-primary" my-2 @click="createAccount">生成账号</b-button>
            </div>
            <b-list-group class="border p-2">
                <template v-for="(item, index) in form.model.list">
                    <b-list-group-item :key="'username-'+index" class="py-0">账号{{index}}：{{item.username}}</b-list-group-item>
                    <b-list-group-item :key="'pwd-'+index" class="py-0"><span class="mx-3" />密码：{{item.password}}</b-list-group-item>
                </template>
            </b-list-group>
        </b-modal>
    </div>
</template>

<script src="./ExpertDashScript.js" />

<style lang="less" scoped/>
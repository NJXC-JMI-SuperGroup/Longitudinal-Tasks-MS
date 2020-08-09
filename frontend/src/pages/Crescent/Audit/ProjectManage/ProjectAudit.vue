<template>
    <div class="row">
        <detail-for-audit ref="detailForm" />
        <div class="w-100 d-flex mt-4 justify-content-lg-around">
            <b-button v-if="[7, 8].indexOf(model.declare.stateId) === -1"
                      squared variant="outline-danger" @click="submit(8)">拒绝申报</b-button>
            <template v-if="model.declare.stateId === 4">
                <b-button squared variant="outline-primary" v-b-modal.modal-redo>驳回</b-button>
                <b-button v-if="model.bulletin.expertAudit === '需要'"
                          squared variant="outline-success" @click="submit(5)">开始专审</b-button>
            </template>
            <b-button v-if="[4, 5].indexOf(model.declare.stateId) !== -1"
                      squared variant="outline-success" @click="submit(9)">上报</b-button>
            <b-button v-if="[4, 5, 9].indexOf(model.declare.stateId) !== -1"
                      squared variant="outline-success" v-b-modal.modal-over>立项</b-button>
            <template v-if="model.declare.stateId >= 5 && model.bulletin.expertAudit === '需要'">
                <b-button squared variant="outline-primary" @click="expertAccount">外审账号</b-button>
                <b-button squared variant="outline-primary" @click="expertResult" v-b-modal.expert-result>外审结果</b-button>
            </template>
            <b-button squared variant="outline-primary" v-b-modal.modal-process>项目进度</b-button>
        </div>
        <b-modal id="modal-redo" scrollable hide-footer title="驳回申报">
            <vue-form-generator :schema="form.schemaReject" :model="form.model" />
            <div class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary" @click="submit(2)">确认驳回</b-button>
            </div>
        </b-modal>
        <b-modal id="modal-over" scrollable hide-footer title="立项">
            <vue-form-generator :schema="form.schemaOver" :model="form.model" />
            <div class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary" @click="submit(7)">确认立项</b-button>
            </div>
        </b-modal>
        <b-modal id="modal-process" scrollable hide-footer title="项目申报进度">
            process
        </b-modal>
        <b-modal id="expert-result" scrollable hide-footer title="专审结果">
            <b-card no-body>
                <b-tabs pills card>
                    <template v-for="(item, index) in tabs">
                        <b-tab :title="'专家'+(index + 1)" :key="'tabs-'+index"><b-card-text>
                            <p>总评：{{item.score}}</p>
                            <p>专家意见：</p>
                            <pre>{{item.suggestion}}</pre>
                        </b-card-text></b-tab>
                    </template>
                </b-tabs>
            </b-card>
        </b-modal>
        <b-modal id="expert-account" scrollable hide-footer title="当前课题外审账号">
            <vue-form-generator ref="accountVFG" :schema="formAccount.schema"
                                :model="formAccount.model" :options="formAccount.options" />
            <div class="w-100 d-flex justify-content-around mb-2">
                <b-button squared variant="outline-primary" my-2 @click="createAccount">生成账号</b-button>
            </div>
            <b-list-group class="border p-2">
                <template v-for="(item, index) in formAccount.model.list">
                    <b-list-group-item :key="'username-'+index" class="py-0">账号{{index+1}}：{{item.username}}</b-list-group-item>
                    <b-list-group-item :key="'pwd-'+index" class="py-0"><span class="mx-3" />密码：{{item.password}}</b-list-group-item>
                </template>
            </b-list-group>
        </b-modal>
    </div>
</template>

<script src="./ProjectAuditScript.js"/>

<style lang="less" scoped/>
<template>
    <div class="row mx-3 py-3 shadow detail-for-audit">
        <div class="col-6">
            <template v-if="form.model.bulletin.link && form.model.bulletin.link.length">
                课题通知<a class="badge-warning" :href="form.model.bulletin.link" target="_blank">链接</a><br/>
            </template>
            <template v-if="form.model.bulletin.addition">
                课题附件<a class="badge-warning" :href="form.model.bulletin.additionUrl" target="_blank">链接</a><br/>
            </template>
            <br/>
            <vue-form-generator :schema="form.schema.bulletin" :model="form.model.bulletin"/>
            <div class="border p-2" v-html="form.model.bulletin.content"/>
        </div>
        <div class="col-6">
            <template v-if="form.model.declare.addition">
                申报书及附件<a class="badge-warning" :href="form.model.declare.additionUrl" target="_blank">链接</a><br/>
            </template>
            <br/>
            <vue-form-generator :schema="form.schema.declare" :model="form.model.declare"/>
        </div>
    </div>
</template>

<script src="./DetailForAuditScript.js" />

<style lang="less" scoped>
    .detail-for-audit {
        height: 64vh;
        overflow-y: scroll;
    }
</style>
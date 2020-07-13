<template>
    <div class="row mx-3 py-3 shadow detail-for-audit">
        <div class="col-6">
            <vue-form-generator :schema="form.schemaLeft" :model="form.model" :options="form.options" />
            <div class="p-2 border" v-html="showContent" />
            <br />
            课题通知链接 <a href="https://cn.bing.com" target="_blank">FAKE LINK</a><br/>
            课题附件链接 <a href="https://cn.bing.com" target="_blank">also FAKE LINK</a>
        </div>
        <div class="col-6">
            <vue-form-generator :schema="form.schemaRight" :model="form.model" :options="form.options" />
            申报书下载链接 <a href="https://cn.bing.com" target="_blank">FAKE LINK</a><br/>
            其他附件材料链接 <a href="https://cn.bing.com" target="_blank">also FAKE LINK</a>
        </div>
    </div>
</template>

<script src="./DetailForAuditScript.js" />

<style src="./DetailForAuditStyle.less" lang="less" scoped/>
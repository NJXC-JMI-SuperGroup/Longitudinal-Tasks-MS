<template>
    <div>
        <detail-for-declare v-if="loaded" ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-toast variant="danger" id="submit-declare-wait-files" title="文件尚未上传成功" static hide="260">
                请等待文件上传完毕后提交。
            </b-toast>
            <b-toast variant="warning" id="submit-declare-without-files" title="未上传附件" static hide="260">
                请上传文件完毕后提交。
            </b-toast>
        </div>
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="updateDeclare">确认更新申报</b-button>
        </div>
    </div>
</template>

<script src="./DeclareModifyScript.js" />

<style lang="less" scoped />
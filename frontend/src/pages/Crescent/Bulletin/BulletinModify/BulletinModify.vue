<template>
    <div>
        <detail-for-bulletin ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-toast variant="danger" id="submit-bulletin-wait-files" title="文件尚未上传成功" static hide="260">
                请等待文件上传完毕后提交。
            </b-toast>
        </div>
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="updateBulletin">确认更新课题</b-button>
        </div>
    </div>
</template>

<script src="./BulletinModifyScript.js" />

<style lang="less" scoped />
<template>
    <div>
        <detail-for-bulletin ref="detailForm" text="上传课题附件：（拖拽至此处或）" />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="publishBulletin">发布课题</b-button>
        </div>
    </div>
</template>

<script src="./BulletinPublishScript.js" />

<style lang="less" scoped />
<template>
    <div>
        <detail-for-bulletin v-if="!loading" ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="publishBulletin">发布课题</b-button>
        </div>
    </div>
</template>

<script src="./BulletinPublishScript.js" />

<style lang="less" scoped />
<template>
    <div>
        <detail-for-bulletin ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="updateBulletin">确认更新课题</b-button>
        </div>
    </div>
</template>

<script src="./BulletinModifyScript.js" />

<style lang="less" scoped />
<template>
    <div class="row">
        <detail-for-declare text="(附件无变动，则无需再次上传。本次上传将取代已有文件)" :textAreaRows=Number(12) />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary">确认更新申报</b-button>
        </div>
    </div>
</template>

<script src="./DeclareModifyScript.js" />

<style lang="less" scoped />
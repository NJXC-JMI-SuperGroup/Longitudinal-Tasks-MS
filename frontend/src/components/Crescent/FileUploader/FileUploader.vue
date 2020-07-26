<template>
    <uploader ref="uploader" :options="options" :auto-start="true">
        <uploader-unsupport />
        <uploader-drop>
            <p>{{uler.hint}}</p>
            <span>拖拽至此或</span>
            <uploader-btn class="mx-3">选择文件</uploader-btn>
            <uploader-btn :directory="true">选择文件夹</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
    </uploader>
</template>

<script src="./FileUploaderScript.js" />

<style lang="less">
    /*div.uploader-file-actions {*/
    /*    display: none;*/
    /*}*/
</style>
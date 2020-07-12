<template>
    <div class="row">
        <vue-form-generator class="col-6" :schema="form.schemaLeft" :model="form.model" :options="form.options" />
        <div class="col-6">
            <vue-form-generator :schema="form.schemaRight" :model="form.model" :options="form.options" />
            <uploader>
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>上传申报书：（拖拽至此处或）</p>
                    <uploader-btn>选择文件</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>
            <uploader class="my-3">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>上传其他附件材料：（拖拽至此处或）</p>
                    <uploader-btn>选择文件</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>
        </div>
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary">提交申报</b-button>
        </div>
    </div>
</template>

<script src="./DeclareCreateScript.js" />

<style scoped />
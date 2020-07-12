<template>
    <div class="row">
        <vue-form-generator class="col-6" :schema="form.schemaLeft" :model="form.model" :options="form.options" />
        <div class="col-6">
            <vue-form-generator :schema="form.schemaRight" :model="form.model" :options="form.option"></vue-form-generator>
            <uploader>
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>上传课题附件：（拖拽至此处或）(附件无变动，则无需再次上传。本次上传将取代已有文件)</p>
                    <uploader-btn>选择文件</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>
        </div>
        <quill-editor class="mx-4 mb-3 overflow-hidden border-bottom"
                      :content="quill.content"
        />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary">确认更新</b-button>
        </div>
    </div>
</template>

<script src="./BulletinModifyScript.js" />

<style lang="less" scoped />
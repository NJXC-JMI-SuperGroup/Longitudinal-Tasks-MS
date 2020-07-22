<template>
    <div class="row">
        <vue-form-generator class="col-6" ref="vfg" :schema="form.schemaLeft" :model="model" />
        <div class="col-6">
            <vue-form-generator :schema="form.schemaRight" :model="model"></vue-form-generator>
            <uploader>
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>{{ text }}</p>
                    <uploader-btn>选择文件</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>
        </div>
        <quill-editor class="mx-4 mb-3 overflow-hidden border-bottom"
                      :content="model.content" ref="quillEditor"
        />
    </div>
</template>

<script src="./DetailForBulletinScript.js" />

<style lang="less" scoped />
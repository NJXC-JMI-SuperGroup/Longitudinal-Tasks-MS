<template>
    <div class="row">
        <vue-form-generator class="col-6" ref="vfgLeft"
                            :schema="form.schemaLeft" :model="form.model" :options="form.options" />
        <div class="col-6 mt-4">
            <vue-form-generator ref="vfgRight"
                                :schema="form.schemaRight" :model="form.model" :options="form.options" />
            <file-uploader ref="fu" />
        </div>
        <vue-form-generator class="mx-4 mb-0" :schema="{groups: [{legend: '编辑课题内容'}]}" />
        <quill-editor class="mx-4 mb-3 overflow-hidden border-bottom"
                      :content="form.model.content" ref="quillEditor" />
    </div>
</template>

<script src="./DetailForBulletinScript.js" />

<style lang="less" scoped />
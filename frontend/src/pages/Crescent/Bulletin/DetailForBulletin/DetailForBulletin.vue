<template>
    <div class="row">
        <vue-form-generator class="col-6" ref="vfgLeft"
                            :schema="form.schemaLeft" :model="form.model" :options="form.options" />
        <vue-form-generator class="col-6" ref="vfgRight"
                            :schema="form.schemaRight" :model="form.model" :options="form.options" />
        <quill-editor class="mx-4 mb-3 overflow-hidden border-bottom"
                      :content="form.model.content" ref="quillEditor" />
    </div>
</template>

<script src="./DetailForBulletinScript.js" />

<style lang="less" scoped />
<template>
    <div class="row">
        <vue-form-generator class="col-6" ref="vfgLeft" :schema="form.schemaLeft"
                            :model="form.model" :options="form.options" />
        <div class="col-6 mt-4">
            <vue-form-generator ref="vfgRight"
                                :schema="form.schemaRight" :model="form.model" :options="form.options" />
            <file-uploader ref="fu" />
        </div>
    </div>
</template>

<script src="./DetailForDeclareScript.js"/>

<style lang="less" scoped/>
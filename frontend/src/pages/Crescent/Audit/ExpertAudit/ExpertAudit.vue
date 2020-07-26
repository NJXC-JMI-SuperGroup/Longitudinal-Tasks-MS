<template>
    <div class="row">
        <detail-for-audit />
        <div class="w-100 d-flex mt-4 justify-content-lg-around">
            <b-button v-b-modal.modal-scrollable-audit squared variant="outline-primary">
                {{isAudit?'评审':'查看评审'}}
            </b-button>
        </div>
        <b-modal id="modal-scrollable-audit" scrollable hide-footer title="Scrollable Content">
            <vue-form-generator ref="vfg" :schema="isAudit ? form.schema : form.schemaReadonly"
                                :model="form.model" :options="form.options" />
            <div v-if="isAudit" class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary" @click="submit">确认</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script src="./ExpertAuditScript.js" />

<style lang="less" scoped />
<template>
    <div class="row">
        <detail-for-audit />
        <div class="w-100 d-flex mt-4 justify-content-lg-around">
            <b-button squared variant="outline-primary" v-b-modal.modal-scrollable-audit>{{isAudit?'评审':'查看评审'}}</b-button>
        </div>
        <b-modal id="modal-scrollable-audit" scrollable hide-footer title="Scrollable Content">
            <vue-form-generator v-if="isAudit" :schema="form.schemaModel" :model="form.model" />
            <vue-form-generator v-else :schema="form.schemaModelReadonly" :model="form.model" />
            <div v-if="isAudit" class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary">确认</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script src="./ExpertAuditScript.js" />

<style lang="less" scoped />
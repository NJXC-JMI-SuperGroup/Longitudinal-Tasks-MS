<template>
    <div class="row">
        <detail-for-audit />
        <div v-if="isAudit" class="w-100 d-flex mt-4 justify-content-lg-around">
            <b-button squared variant="outline-danger">拒绝申报</b-button>
            <b-button squared variant="outline-primary" v-b-modal.modal-scrollable-redo>驳回</b-button>
            <b-button squared variant="outline-success">转入立项/专家评审(此按钮视具体申报定)</b-button>
        </div>
        <b-modal id="modal-scrollable-redo" scrollable hide-footer title="Scrollable Content">
            <vue-form-generator :schema="form.schemaModel" :model="form.model" />
            <div class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary">确认驳回</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script src="./DepartAuditScript.js" />

<style scoped />
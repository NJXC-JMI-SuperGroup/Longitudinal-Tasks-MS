<template>
    <div class="row">
        <detail-for-audit ref="detailForm" />
        <div v-if="isAudit" class="w-100 d-flex mt-4 justify-content-lg-around">
            <b-button squared variant="outline-danger" @click="submit(8)">拒绝申报</b-button>
            <b-button squared variant="outline-primary" v-b-modal.modal-scrollable-redo>驳回</b-button>
            <b-button squared variant="outline-success" @click="submit(4)">转入科技处</b-button>
        </div>
        <b-modal id="modal-scrollable-redo" scrollable hide-footer title="驳回申报">
            <vue-form-generator :schema="form.schema" :model="form.model" />
            <div class="w-100 d-flex justify-content-lg-around">
                <b-button squared variant="outline-primary" @click="submit(1)">确认驳回</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script src="./DepartAuditScript.js" />

<style scoped />
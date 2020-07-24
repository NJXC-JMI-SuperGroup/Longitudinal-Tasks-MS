<template>
    <div>
        <detail-for-declare v-if="!loading" ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="createDeclare">提交申报</b-button>
        </div>
    </div>
</template>

<script src="./DeclareCreateScript.js" />

<style scoped />
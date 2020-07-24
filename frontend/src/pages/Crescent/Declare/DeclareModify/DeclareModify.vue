<template>
    <div class="row">
        <detail-for-declare ref="detailForm" />
        <div class="w-100 d-flex justify-content-center">
            <b-button squared variant="outline-primary" @click="updateDeclare">确认更新申报</b-button>
        </div>
    </div>
</template>

<script src="./DeclareModifyScript.js" />

<style lang="less" scoped />
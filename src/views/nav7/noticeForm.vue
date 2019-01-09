<template>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit"
             style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="文章标题">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
            <el-select v-model="form.region" placeholder="请选择文章类型">
                <el-option label="报修须知" value="one"></el-option>
                <el-option label="热点答疑" value="two"></el-option>
                <el-option label="系统公告" value="three"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="是否同步">
            <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="同步范围">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="教职工" name="type"></el-checkbox>
                <el-checkbox label="学生" name="type"></el-checkbox>
                <el-checkbox label="领导" name="type"></el-checkbox>
                <el-checkbox label="全体" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="操作权限">
            <el-radio-group v-model="form.resource">
                <el-radio label="超级管理员"></el-radio>
                <el-radio label="管理员"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="文章内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }

</script>
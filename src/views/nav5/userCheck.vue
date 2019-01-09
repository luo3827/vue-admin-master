<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名--先确定字段，后填充数据"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable>
            </el-table-column>
            <el-table-column prop="userType" label="类别" width="120" sortable>
            </el-table-column>
            <el-table-column prop="UID" label="UID" width="320" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" width="150" sortable>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="200" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100" sortable>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template scope="scope">
                    <el-button size="small" @click="handleDetail()">通过</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editForm.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="editForm.userType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="UID">
                    <el-input v-model="editForm.UID" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editForm.status"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="addForm.userType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="UID">
                    <el-input v-model="addForm.UID" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="addForm.status"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {getUsersCheckPage, removeUsersCheck, batchRemoveUsersCheck, editUsersCheck, addUsersCheck} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    userType:'',
                    sex: -1,
                    age: 0,
                    UID: '',
                    email: '',
                    phone: '',
                    status: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    userType:'',
                    sex: -1,
                    age: 0,
                    UID: '',
                    email: '',
                    phone: '',
                    status: ''
                }

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                getUsersCheckPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};
                    removeUsersCheck(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            handleDetail: function () {
                this.$ajax({
                    method: 'get',
                    url: 'https://www.baidu.com/',
                    data: {},
                }).then(function (res) {
                    console.log(res)
                })
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    userType:'',
                    sex: -1,
                    age: 0,
                    UID: '',
                    email: '',
                    phone: '',
                    status: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            editUsersCheck(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUsersCheck(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {ids: ids};
                    batchRemoveUsersCheck(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped>

</style>
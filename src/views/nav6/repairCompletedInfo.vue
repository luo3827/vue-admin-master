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
            <!--测试 仅列出所需字段 内容统一-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="报修人" width="120" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="UID" label="单号" width="320" sortable>
            </el-table-column>
            <el-table-column prop="repairTime" label="提交时间" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="linkman" label="联系人" width="100"  sortable>
            </el-table-column>
            <el-table-column prop="repairType" label="维修类型" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="building" label="住宅楼" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="130" sortable>
            </el-table-column>

            <el-table-column prop="repairStatus" label="状态" min-width="100" sortable>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <el-button size="small" @click="handleDetail()">打印</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" @click="handleDetail()">完成</el-button>
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
                <el-form-item label="报修人" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="单号">
                    <el-input v-model="editForm.UID" :min="0" :max="200"></el-input>
                </el-form-item>
                <el-form-item label="提交时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.repairTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input type="textarea" v-model="editForm.linkman"></el-input>
                </el-form-item>
                <el-form-item label="维修类型">
                    <el-input v-model="editForm.repairType" ></el-input>
                </el-form-item>
                <el-form-item label="住宅楼">
                    <el-input  v-model="editForm.building"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input type="textarea" v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editForm.repairStatus" ></el-input>
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
                <el-form-item label="单号">
                    <el-input v-model="addForm.UID" :min="0" :max="200"></el-input>
                </el-form-item>
                <el-form-item label="提交时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.repairTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input type="textarea" v-model="addForm.linkman"></el-input>
                </el-form-item>
                <el-form-item label="维修类型">
                    <el-input v-model="addForm.repairType" ></el-input>
                </el-form-item>
                <el-form-item label="住宅楼">
                    <el-input  v-model="addForm.building"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input type="textarea" v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="addForm.repairStatus" ></el-input>
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
    import util from '../../common/js/util'
    import {getRepairCurList, removeRepairCur, batchRemoveRepairCur, editRepairCur, addRepairCur} from '../../api/api';

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
                    userType: '',
                    name: '',
                    linkman: '',
                    UID: '',
                    repairTime: '',
                    sex:-1,
                    repairType:'',
                    repairStatus:'',
                    building:'',
                    phone:''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入报修人', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    userType: '',
                    name: '',
                    linkman: '',
                    UID: '',
                    repairTime: '',
                    sex:-1,
                    repairType:'',
                    repairStatus:'',
                    building:'',
                    phone:''
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
                getRepairCurList(para).then((res) => {
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
                    removeRepairCur(para).then((res) => {
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
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            para.repairTime = (!para.repairTime || para.repairTime == '') ? '' : util.formatDate.format(new Date(para.repairTime), 'yyyy-MM-dd');
                            editRepairCur(para).then((res) => {
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
                            para.repairTime = (!para.repairTime || para.repairTime == '') ? '' : util.formatDate.format(new Date(para.repairTime), 'yyyy-MM-dd');
                            addRepairCur(para).then((res) => {
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
                    batchRemoveRepairCur(para).then((res) => {
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
//应用 axios 来处理请求。基于Promise （ES6原生）
import axios from 'axios';

let base = '';
//对 nav1 的 user 进行处理
export const requestLogin = params => {
    return axios.post(`${base}/login`, params)
        .then(res => res.data);
};
export const getUserList = params => {
    return axios.get(`${base}/user/list`, {params: params});
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {params: params});
};

// adminList 角色管理
export const getAdminList = params => {
    return axios.get(`${base}/admin/list`, {params: params});
};
export const getAdminListPage = params => {
    return axios.get(`${base}/admin/listpage`, {params: params});
};

export const removeAdmin = params => {
    return axios.get(`${base}/admin/remove`, {params: params});
};

export const batchRemoveAdmin = params => {
    return axios.get(`${base}/admin/batchremove`, {params: params});
};

export const editAdmin = params => {
    return axios.get(`${base}/admin/edit`, {params: params});
};

export const addAdmin = params => {
    return axios.get(`${base}/admin/add`, {params: params});
};

// staffList 用户信息管理
export const getStaffListPage = params => {
    return axios.get(`${base}/staff/listpage`, {params: params});
};
export const editStaff = params => {
    return axios.get(`${base}/staff/edit`, {params: params});
};
export const removeStaff = params => {
    return axios.get(`${base}/staff/remove`, {params: params});
};
export const batchRemoveStaff = params => {
    return axios.get(`${base}/staff/batchremove`, {params: params});
};
export const addStaff = params => {
    return axios.get(`${base}/staff/add`, {params: params});
};

// studentList 用户信息管理
export const getStudentListPage = params => {
    return axios.get(`${base}/student/listpage`, {params: params});
};
export const editStudent = params => {
    return axios.get(`${base}/student/edit`, {params: params});
};
export const addStudent = params => {
    return axios.get(`${base}/student/add`, {params: params});
};
export const removeStudent = params => {
    return axios.get(`${base}/student/remove`, {params: params});
};
export const batchRemoveStudent = params => {
    return axios.get(`${base}/student/batchremove`, {params: params});
};

// usersCheck 用户信息管理
export const getUsersCheckPage = params => {
    return axios.get(`${base}/usercheck/listpage`, {params: params});
};
export const editUsersCheck = params => {
    return axios.get(`${base}/usercheck/edit`, {params: params});
};
export const addUsersCheck = params => {
    return axios.get(`${base}/usercheck/add`, {params: params});
};
export const removeUsersCheck = params => {
    return axios.get(`${base}/usercheck/remove`, {params: params});
};
export const batchRemoveUsersCheck = params => {
    return axios.get(`${base}/usercheck/batchremove`, {params: params});
};

// repairCurList 报修信息管理
export const getRepairCurList = params => {
    return axios.get(`${base}/repaircurinfo/listpage`, {params: params});
};
export const editRepairCur = params => {
    return axios.get(`${base}/repaircurinfo/edit`, {params: params});
};
export const addRepairCur = params => {
    return axios.get(`${base}/repaircurinfo/add`, {params: params});
};
export const removeRepairCur = params => {
    return axios.get(`${base}/repaircurinfo/remove`, {params: params});
};
export const batchRemoveRepairCur = params => {
    return axios.get(`${base}/repaircurinfo/batchremove`, {params: params});
};


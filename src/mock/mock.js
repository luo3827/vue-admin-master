import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users, AdminList,StaffList,StudentList,UsersList,RepairList} from './data/user';

let _Users = Users;
let _AdminList = AdminList;
let _StaffList = StaffList;
let _StudentList = StudentList;
let _UsersList = UsersList;
let _RepairList = RepairList;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });
        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });
        //登录
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {code: 200, msg: '请求成功', user}]);
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    }
                }, 1000);
            });
        });

        //获取用户列表
        mock.onGet('/user/list').reply(config => {
            let {name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取管理员列表

        mock.onGet('/admin/list').reply(config => {
            let {name} = config.params;
            let mockUsers = _AdminList.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取管理员列表（分页）
        mock.onGet('/admin/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _AdminList.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取教职工列表（分页）
        mock.onGet('/staff/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _StaffList.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取学生列表（分页）
        mock.onGet('/student/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _StudentList.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取用户审核列表（分页）
        mock.onGet('/usercheck/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers = _UsersList.filter(user => {
                if (name && user.repairName.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });
        //获取报修信息列表（分页）
        mock.onGet('/repaircurinfo/listpage').reply(config => {
            let {page, name} = config.params;
            let mockUsers =_RepairList .filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //删除管理员
        mock.onGet('/admin/remove').reply(config => {
            let {id} = config.params;
            _AdminList = _AdminList.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //删除教职工
        mock.onGet('/staff/remove').reply(config => {
            let {id} = config.params;
            _StaffList = _StaffList.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //删除学生
        mock.onGet('/student/remove').reply(config => {
            let {id} = config.params;
            _StudentList = _StudentList.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //删除用户审核列表
        mock.onGet('/usercheck/remove').reply(config => {
            let {id} = config.params;
            _UsersList = _UsersList.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //删除报修信息列表
        mock.onGet('/repaircurinfo/remove').reply(config => {
            let {id} = config.params;
            _RepairList = _RepairList.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除管理员
        mock.onGet('/admin/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _AdminList = _AdminList.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除教职工
        mock.onGet('/staff/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _StaffList = _StaffList.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除学生
        mock.onGet('/student/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _StudentList = _StudentList.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除用户审核列表
        mock.onGet('/usercheck/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _UsersList = _UsersList.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除报修信息列表
        mock.onGet('/repaircurinfo/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _RepairList = _RepairList.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onGet('/user/edit').reply(config => {
            let {id, name, addr, age, birth, sex} = config.params;
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });
        //编辑管理员
        mock.onGet('/admin/edit').reply(config => {
            let {id, name, jobNumber, age, phone,sex, department} = config.params;
            _AdminList.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.jobNumber = jobNumber;
                    u.age = age;
                    u.sex = sex;
                    u.phone = phone;
                    u.department = department;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });
        //编辑教职工
        mock.onGet('/staff/edit').reply(config => {
            let {id, name, jobNumber, building, phone,sex, doorNumber,academy,houseType,status} = config.params;
            _StaffList.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.sex = sex;
                    u.jobNumber = jobNumber;
                    u.building = building;
                    u.doorNumber = doorNumber;
                    u.academy = academy;
                    u.houseType = houseType;
                    u.phone = phone;
                    u.status = status;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });
        //编辑学生 _StudentList
        mock.onGet('/student/edit').reply(config => {
            let {id, name, sex,jobNumber, building, grade,major,doorNumber,phone,status,idCard,academy} = config.params;
            _StudentList.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.sex = sex;
                    u.jobNumber = jobNumber;
                    u.building = building;
                    u.doorNumber = doorNumber;
                    u.academy = academy;
                    u.phone = phone;
                    u.status = status;
                    u.idCard = idCard;
                    u.jobNumber = jobNumber;
                    u.major = major;
                    u.grade = grade;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });
        //编辑用户审核
        mock.onGet('/usercheck/edit').reply(config => {
            let {id, name, sex,phone,status,userType,age,UID,email} = config.params;
            _UsersList.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.sex = sex;
                    u.phone = phone;
                    u.status = status;
                    u.email = email;
                    u.UID = UID;
                    u.age = age;
                    u.userType = userType;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });
        //编辑报修信息列表
        mock.onGet('/repaircurinfo/edit').reply(config => {
            let {id, userType, name,linkman,UID,repairTime,sex,repairType,repairStatus,building,phone} = config.params;
            _RepairList.some(u => {
                if (u.id === id) {
                    u.userType = userType;
                    u.name = name;
                    u.linkman = linkman;
                    u.UID = UID;
                    u.repairTime = repairTime;
                    u.sex = sex;
                    u.repairType = repairType;
                    u.repairStatus = repairStatus;
                    u.building = building;
                    u.phone = phone;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/user/add').reply(config => {
            let {name, addr, age, birth, sex} = config.params;
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增管理员
        mock.onGet('/admin/add').reply(config => {
            let {name, jobNumber, age, phone, department,sex} = config.params;
            _AdminList.push({
                name: name,
                jobNumber: jobNumber,
                age: age,
                sex:sex,
                phone: phone,
                department: department
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增教职工
        mock.onGet('/staff/add').reply(config => {
            let {name, jobNumber, building, phone,sex,doorNumber,academy,houseType,status} = config.params;
            _StaffList.push({
                name: name,
                jobNumber: jobNumber,
                sex: sex,
                building:building,
                phone: phone,
                status: status,
                doorNumber: doorNumber,
                academy: academy,
                houseType: houseType,
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增学生 _StudentList
        mock.onGet('/student/add').reply(config => {
            let {name, jobNumber, building, phone,sex,doorNumber,academy,major,status,idCard,grade} = config.params;
            _StudentList.push({
                name: name,
                jobNumber: jobNumber,
                sex: sex,
                building:building,
                phone: phone,
                status: status,
                doorNumber: doorNumber,
                academy: academy,
                idCard:idCard,
                major:major,
                grade:grade
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增用户审核
        mock.onGet('/usercheck/add').reply(config => {
            let {name, sex,phone,status,userType,age,UID,email} = config.params;
            _UsersList.push({
                name: name,
                sex: sex,
                phone: phone,
                status: status,
                email: email,
                UID:UID,
                age:age,
                userType:userType
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增报修信息
        mock.onGet('/repaircurinfo/add').reply(config => {
            let {userType, name,linkman,UID,repairTime,sex,repairType,repairStatus,building,phone} = config.params;
            _RepairList.push({
                userType: userType,
                name: name,
                linkman: linkman,
                repairTime: repairTime,
                sex: sex,
                UID:UID,
                repairType:repairType,
                repairStatus:repairStatus,
                building:building,
                phone:phone
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
    }
};
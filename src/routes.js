//import ES6语法  导入相应的模块
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'

import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'

import superAdmin from './views/nav4/superAdmin'
import admin from './views/nav4/admin'

import staffInfo from './views/nav5/staffInfo'
import studentInfo from './views/nav5/studentInfo'
import userCheck from './views/nav5/userCheck'

import repairCurrentInfo from './views/nav6/repairCurrentInfo'
import repairCompletedInfo from './views/nav6/repairCompletedInfo'
import repairEcharts from './views/nav6/repairEcharts'

import noticeForm from './views/nav7/noticeForm'
import inform from './views/nav7/inform'

import opionList from './views/nav8/optionList'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        //嵌套子路由
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '角色管理',
        iconCls: 'fa fa-address-book-o',
        children: [
            { path: '/superadmin', component: superAdmin, name: '超级管理员' },
            { path: '/admin', component: admin, name: '管理员' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户信息管理',
        iconCls: 'fa fa-address-book',
        children: [
            { path: '/staffInfo', component: staffInfo, name: '教职工列表' },
            { path: '/studentInfo', component: studentInfo, name: '学生列表' },
            { path: '/userCheck', component: userCheck, name: '用户审核' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '报修信息管理',
        iconCls: 'fa fa-credit-card',
        children: [
            { path: '/repairCurrentInfo', component: repairCurrentInfo, name: '报修列表' },
            { path: '/repairCompletedInfo', component: repairCompletedInfo, name: '已修列表' },
            { path: '/repairEcharts', component: repairEcharts, name: '数据统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '公告内容管理',
        iconCls: 'fa fa-briefcase',
        children: [
            { path: '/noticeForm', component: noticeForm, name: '公告发布' },
            { path: '/inform', component: inform, name: '公告内容管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '意见反馈',
        iconCls: 'fa fa-envelope',
        children: [
            { path: '/opionList', component: opionList, name: '意见管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
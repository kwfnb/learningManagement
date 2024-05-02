//系统管理员
let admin = [
                {
                    title:"主页",
                    path:"/home",
                    icon:"el-icon-s-home"
                },
                {
                    title:"社团管理",
                    icon:"el-icon-s-flag",
                    itemList:[
                        {title:"社团管理",path:"/associationList"},
                        {title:"创建社团",path:"/associationAdd"},
                        {title:"社团调整",path:"/associationUpdate"},
                    ]
                },
                {
                    title:"学生管理",
                    icon:"el-icon-user-solid",
                    itemList:[
                        {title:"学生列表",path:"/studentList"},
                        {title:"成员更变",path:"/studentUpdate"},
                    ]
                },
                {
                    title:"活动管理",
                    icon:"el-icon-s-claim",
                    itemList:[
                        {title:"活动列表",path:"/activityList"},
                        {title:"活动审核",path:"/activityReview"},
                    ]
                },
                {
                    title:"账户管理",
                    icon:"el-icon-s-tools",
                    path:"/account"
                },
]

//普通用户index_user
let user = [
                {
                    title:"主页",
                    path:"/homeUser",
                    icon:"el-icon-s-home"
                },
                {
                    title:"个人中心",
                    path:"/personal",
                    icon:"el-icon-user-solid"
                },
                {
                    title:"我的社团",
                    path:"/myClub",
                    icon:"el-icon-platform-eleme"
                },
                {
                    title:"阅览社团",
                    path:"/glanceClub",
                    icon:"el-icon-platform-eleme"
                },
                {
                    title:"我的活动",
                    path:"/myActivities",
                    icon:"el-icon-s-flag"
                },
                {
                    title:"动态消息",
                    path:"/dynamicMessage",
                    icon:"el-icon-s-promotion"
                },
]

var menuList = [];

menuList.push(admin);
menuList.push(user);

export default menuList;
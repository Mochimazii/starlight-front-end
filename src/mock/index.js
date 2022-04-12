import Mock from 'mockjs'
let baseUrl = 'http://mock/api'

Mock.mock(`${baseUrl}/user/login`, `post`,{
    'code': '200',
    'data|32':/[a-z][A-Z][0-9]/,
    'message':"成功",
});

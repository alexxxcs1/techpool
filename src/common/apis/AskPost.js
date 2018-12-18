import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}


    //注册
    customer.setUserReg = (username, sex, password) => {
        return ajaxinstance.post('Login/register', qs.stringify({
            username,
            sex,
            password
        }));
    }
    //获取用户信息
    customer.getUserInfo = () => {
        return ajaxinstance.post('index/getUserInfo');
    }
    //获取个人中心用户信息
    customer.getIndexInfo = () => {
        return ajaxinstance.post('index/user');
    }
    //获取今天的题目
    customer.getQuestion = () => {
        return ajaxinstance.post('index/getQuestion');
    }
    customer.answerAllQuestion = () => {
        return ajaxinstance.post('index/addQuestion');
    }
    //获取个人排行榜
    customer.getPersonRank = () => {
        return ajaxinstance.post('index/getTotleRank');
    }
    //获取个人排行榜(管理员)
    customer.getAdminPersonRank = (regionid, cate) => {
        return ajaxinstance.post('index/getRegionInfo', qs.stringify({
            regionid,
            cate
        }));
    }
    //获取大区排行榜
    customer.getRegionRank = () => {
        return ajaxinstance.post('index/getRegionRank');
    }
    return customer
}

export default AskPost
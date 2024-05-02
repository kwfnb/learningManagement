const VUE_BASE_URL = "http://127.0.0.1:3000";

const calculateOverall = function(player){
    let overallRating = 0;

    // 根据不同位置赋予技能权重
    let weights;
    switch (player.position) {
        case "前锋":
            weights = {
                sho: 0.3,
                pac: 0.25,
                dri: 0.2,
                phy: 0.15,
                pas: 0.1,
            };
            break;
        case "中场":
            weights = {
                pas: 0.3, /* 传球 */
                dri: 0.25, /* 盘带 */
                phy: 0.15, /* 身体 */
                pac: 0.1, /* 速度 */
                sho: 0.1, /* 射门 */
                def: 0.1 /* 防守 */
            };
            break;
        case "后卫":
            weights = {
                def: 0.3,
                phy: 0.25,
                pac: 0.2,
                dri: 0.1,
                pas: 0.1,
                sho: 0.05
            };
            break;
        case "门将":
            weights = {
                def: 0.35,
                phy: 0.25,
                pac: 0.2,
                pas: 0.15,
                dri: 0.05
            };
            break;
        default:
            weights = {
                sho: 0.17,
                pac: 0.17,
                dri: 0.17,
                phy: 0.17,
                pas: 0.17,
                def: 0.15
            };
            break;
    }

    // 计算总评分
    for (let skill in weights) {
        overallRating += player[skill] * weights[skill];
    }

    return overallRating.toFixed(0);
}


module.exports = {
    VUE_BASE_URL,
    calculateOverall
}
<template>
    <div class="common">
        <header>
            <h1>{{sj.article_title}}</h1>
            <div class="time">{{ sj.article_time| timeFormat('YMDHMS') }}</div>
        </header>
        <div class="content">
            <div class="main">
                <img src="http://shp.qpic.cn/collector/298436215/0912c62a-dec4-4d10-9226-ac91738c3683/0">
                <div v-for="(item,index) in sj.article_value" :key="index">
                    <img v-if="0< index && index < 3" :src="item">
                </div>
                <div v-for="(item,index) in sj.article_value" :key="index+100">
                    <img v-if="index >= 3 && kongzhi" :src="item">
                </div>
            </div>
        </div>
        <footer>
            <div v-if="!kongzhi">
                <p>★☆★☆更多隐藏内容☆★☆★</p>
                <p>↓</p>
                <el-button type="primary" @click="ck">查看隐藏内容</el-button>
            </div>
            <div v-if="kongzhi" class="kongzhiTrueClass">
                <p>
                    <b>资源群:</b>
                    <a target="_blank" :href="footerSj.qunSrc">点击进入</a>
                </p>
                <p>(请勿重复加群，每一个群都是同步更新)</p>
                <p class="gd"><a target="_blank" :href="footerSj.qunSrc">更多吃瓜爆料，美图分享</a></p>
                <p class="dj"><a target="_blank" :href="footerSj.qunSrc">↓↓↓点击下方图片加入↓↓↓</a></p>
                <p><a target="_blank" :href="footerSj.qunSrc">⌯'ㅅ'⌯</a></p>
                <p>
                    <a target="_blank" :href="footerSj.qunSrc">
                        <img :src="footerSj.imgSrc">
                    </a>
                </p>
            </div>
        </footer>
        <div class="suiji">
            <el-card class="box-card">
                <p>随机推荐</p>
                <div v-for="(item,index) in suijiSj" :key="index" class="suijiBox">
                    <img :src="item.src" alt="">
                    <span>
                        {{ item.article_title }}
                    </span>
                </div>
            </el-card>
        </div>
        <div class="mark">
            <el-dialog :visible.sync="markShow" width="80%" center :show-close="false">
                <p>此资源需转发后才能解锁观看！</p>
                <p>完成之后打开分享出去的卡片观看！</p>
                <img src="http://shp.qpic.cn/collector/428683027/f76d8887-1fba-48eb-9c29-185146797756/0">
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="qdClick()">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        sj: {},
        //控制弹出层
        markShow: false,
        //随机推荐数据
        suijiSj: [],
        //底部数据
        footerSj: {
            //群链接
            qunSrc: "https://qm.qq.com/cgi-bin/qm/qr?k=fK1vDrtfGTNwO6h3Fmncfy_oX2zJLI02&jump_from=webapi",
            imgSrc: "https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/234fe5673f6343855906aca0f30b41e41abe85b50dac3b8b82b4e923157f255ed6026371ab50178b91e099a6f312fb27?pictype=scale&from=30113&version=3.3.3.3&uin=459332753&fname=QQ%E5%9B%BE%E7%89%8720210927200215.png&size=750"
        },
        //控制隐藏内容
        kongzhi: false,
    }),
    async created() {
        await this.init()
        await this.group()
        await this.suiji()
    },
    mounted() {
        if (this.$route.query.value == '123' || localStorage.getItem(this.dateTime)) {
            this.kongzhi = true
        }
    },
    methods: {
        //初始化获取文章数据
        async init() {
            let params = {
                "tableName": "article",
                "selectColumns": ["article_time", "article_title", "article_value"],
                "whereColumns": { "article_id": this.$route.query.key }
            }
            const { code, data } = await this.$API.select(params)
            if (code == '00000') {
                data[0].article_value = data[0].article_value.replace(/\n/g, "");
                data[0].article_value = data[0].article_value.split(',')
                this.sj = data[0]
            }

        },
        //获取群链接等信息
        async group() {
            let params = {
                "beforeSql": "SELECT * from article  left join article_group on article.group_id=article_group.group_id",
                "condition": {
                    "article.article_id": this.$route.query.id
                }
            }
            let { code, data } = await this.$API.multiTableQuery(params)
            if (code == '00000') {
                console.log(data);
            }
        },
        //随机推荐
        async suiji() {
            let params = {
                "tableName": "article",
                "selectColumns": [
                    "*"
                ],
                "whereNoColumns": {
                    "article_id": this.$route.query.key
                },
                "size": 3
            }
            const { code, data } = await this.$API.randSelect(params)
            if (code == '00000') {
                this.suijiSj = data
            }
        },
        //查看隐藏内容
        ck() {
            this.markShow = true
        },
        //确定
        qdClick() {
            this.markShow = false
            this.$router.push({ path: 'common', query: { value: '123' } })
            setTimeout(() => {
                localStorage.setItem(JSON.stringify(this.dateTime), JSON.stringify(this.dateTime))
            }, 1);
            location.reload();
        }
    },
};
</script>

<style lang="scss" scoped>
.common {
    background: #f5f6f9;
    padding: 20px;
}
header {
    h1 {
        font-size: 18px;
    }
    .time {
        padding: 10px 0;
        color: #a8a8a8;
    }
}
.content {
    img {
        max-width: 100%;
        height: auto;
        text-indent: 0;
        margin: 10px 0;
    }
}
.suiji {
    .suijiBox {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img {
            width: 50px;
            height: auto;
        }
        span {
            font-size: 14px;
        }
    }

    p {
        margin-bottom: 10px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
}
footer {
    margin-bottom: 50px;
    .el-button--primary {
        width: 100%;
        margin-top: 10px;
    }
    .kongzhiTrueClass {
        b {
            color: #ff0088;
            background-color: #fbeeb8;
        }
        a {
            color: #0e8bff;
            text-decoration: none;
            outline: none;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    }
    .gd {
        a {
            color: #e03e2d;
            background-color: #fbeeb8;
        }
    }
    .dj {
        a {
            color: #2dc26b;
            background-color: #c2e0f4;
        }
    }
    p {
        margin: 5px 0;
    }
}
.mark {
    /deep/ .el-dialog--center .el-dialog__body {
        padding: 0 20px;
    }
    .el-button--primary {
        width: 100%;
    }
    img {
        max-width: 100%;
        height: auto;
        text-indent: 0;
        margin: 10px 0;
    }
}
</style>
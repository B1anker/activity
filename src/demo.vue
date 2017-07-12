<template>
<div class="Qdetail">
	<!-- <div class="head bg-white"> <img onclick="window.history.go(-1)" src="../../assets/img/left.png"/>福问答详情</div> -->
	<div class="question_wrap">
		<div class="question">
			<div class="no-wrap"><span>问</span>：</div>
			和股票、债券型基金比较起来，投资咱们的存金宝都有哪些优缺点，投资黄金应该如何做，黄金在我们的资产中占有多大的比例比较合适？
		</div>
		<div class="answer">
			<div><span>答</span>：</div>
			从大的时间尺度上来看，随着全球政治金融环境进入高度不确定期，金融市场整体波动性较过去几年显著增加。黄金作为与债券、股票等传统金融投资工具关联性极低的品种，应作为资产组合稳定器予以长期配置。根据国内外大型投资机构的惯例，黄金在整体资产中的配置比例可为5%~10%，即可有效减低尾部风险。博时量化实测表明，2014~2016年，在多资产策略中配置5%的黄金资产，整体组合风险收益比有显著提高。
		</div>
	</div>
	<div class="question_wrap">
		<div class="question">
			<div class="no-wrap"><span>问</span>：</div>
			目前这样的行情适合买入黄金做长线投资吗？做短线总是买不到最佳点很难赚钱这里面有什么诀窍吗？
		</div>
		<div class="answer">
			<div><span>答</span>：</div>
			我们不建议将黄金资产作为单纯的投机交易工具，由于其价格变动受影响的因素较多，且众多突发的金融及政治事件一般缺乏预见性，故黄金市场的投机交易难度较大，建议总体以配置思路对待。当然在整体配置中也可在确定性较高时进行一定比例的仓位调整，但不建议进行较大变化。
		</div>
	</div>
	<div class="question_wrap">
		<div class="question">
			<div class="no-wrap"><span>问</span>：</div>
			请问存金宝怎么分红的呢？与一般权益类基金的分红有区别吗？分红后影响净值吗？
		</div>
		<div class="answer">
			<div><span>答</span>：</div>
			存金宝份额为不定期分红，当前基本为2周左右一次。与股票分红派息类似，相应分红金额从基金总资产中扣除，基金净值相应调降。
		</div>
	</div>
	<div class="question_wrap">
		<div class="question">
			<div class="no-wrap"><span>问</span>：</div>
			为什么存金宝都是要到十点多才显示收益？
		</div>
		<div class="answer">
			<div><span>答</span>：</div>
			存金宝即是博时黄金ETF的I类份额，基金公司每日日终涉及净值清算、与托管行核对、制作申赎清单等多道环节，需要一定的处理时间。
		</div>
	</div>
	<p class="zan"><img src="../../assets/img/welfare/shou.png">有帮助<span>({{helpCount}})</span></p>

</div>
</template>

<script>
import api from '@/modules/api'
export default {
  name: 'Qdetails',

  mounted () {
    document.getElementById('title').innerText = '福利社';
    this.fecthQAList()
    this.statistics()
  },

  data () {
    return {
      helpCount: 0
    }
  },

  methods: {
    statistics () {
			var _hmt = _hmt || [];
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?195d6761f575044dce77f31189c6e536";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();
		},
		fecthQAList() {
			this.$http.get(api.QAList).then((res) => {
				try {
					this.helpCount = res.body[0].helpCount;
				} catch (e) {
					console.log(e);
					this.helpCount = 0;
				}
			})
		}
	}
}
</script>

<style>
.zan {
	position: fixed;
	width: 100%;
	bottom: 0;
	text-align: center;
	background-color: white;
	font-size: 1rem;
	color: #e5493c;
	padding: 1rem 0;
	border-top: 1px solid #ddd;
}

.zan img {
	vertical-align: middle;
}

.zan span {
	color: #5d5d5d
}

.Qdetail {
	background: #f6f6f6;
	text-align: left;
	color: #383838;
	padding-bottom: 3rem;
}

.Qdetail .head {
	position: relative;
	padding-top: 0.5rem;
	font-size: 1.2rem;
	text-align: center;
	border-bottom: 1px solid #f6f6f6;
	padding-bottom: 1rem;
}

.Qdetail .head img {
	position: absolute;
	height: 2rem;
	left: 0.5rem;
	top: 0.5rem;
}

.question_wrap p {
	font-size: 1.1rem;
}

.question,
.answer {
	padding-left: 2.5rem;
	position: relative;
}

.question div span,
.answer div span {
	width: 1.4rem;
	height: 1.4rem;
	background: #e5493c;
	color: #fff;
	display: inline-block;
	text-align: center;
	border-top-right-radius: 5px;
}

.question div,
.answer div {
	position: absolute;
	left: 0
}

.Qdetail .answer {
	margin-left: 0;
}

.answer div {
	position: absolute;
	left: 0.5rem;
}

.no-wrap {
	white-space: nowrap;
}

.answer div span {
	background: #dcb35b;
	color: #fff;
	border-bottom-right-radius: 5px;
}
</style>

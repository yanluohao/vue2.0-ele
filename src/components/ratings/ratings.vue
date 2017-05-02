<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<span class="score">{{seller.score}}</span>
					<span class="title">综合评分</span>
					<span class="rank">高于周边商家{{seller.rankRate}}%</span>
				</div>
				<div class="overview-right">
					<div class="title">
						<span>服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="title">
						<span>商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="title">
						<span>送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" @changeType="changeType" @toggle="toggleContent"></ratingselect>
			<div class="rating-wrapper">
				<ul v-show="ratings&&ratings.length">
					<li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
						<img :src="rating.avatar" alt="" class="avatar">
						<div class="time">{{rating.rateTime|formatDate}}</div>
						<div class="info">
							<div class="user">
								{{rating.username}}
							</div>
							<div class="delivery">
								<star :size="24" :score="rating.score"></star><span v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text" v-show="rating.text">
								{{rating.text}}
							</div>
							<p class="text-info">
								<span class="icon" :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></span><span v-for="icon in rating.recommend" class="tag">{{icon}}</span>
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BScroll from "better-scroll";
	import star from "../star/star.vue";
	import split from "../split/split.vue";
	import ratingselect from "../ratingselect/ratingselect.vue";
	import {formatDate} from "../../common/js/date.js";


	const ERR_OK=0;
	const ALL=2;


	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:false
			}
		},
		methods:{
			changeType(type){
				this.selectType=type;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			toggleContent(){
				this.onlyContent=!this.onlyContent;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			needShow(type,text){
				if(this.onlyContent&&!text){
					return false
				}
				if(this.selectType==ALL){
					return true;
				}else if(this.selectType==type){
					return true;
				}
				return false;
			}
		},
		created(){
			this.$http.get("/api/ratings").then((res)=>{
				res=res.body;
				if(res.errno==ERR_OK){
					this.ratings=res.data;
					this.$nextTick(() => {
					  this.scroll = new BScroll(this.$refs.ratings, {
					    click: true
					  });
					});
				}
			})
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		components:{
			star,
			split,
			ratingselect
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"


	.ratings
		position:absolute
		top:174px
		bottom:0
		left:0
		overflow:hidden
		.ratings-content
			.overview
				display: flex
				padding:18px 0
				.overview-left
					flex:0 0 137px
					width:137px
					text-align: center
					border-right:1px solid rgba(7,17,27,.1)
					@media (max-width:320px)
						flex:0 0 120px
						width:120px
					span
						display: block
					.score
						font-size: 24px
						color:rgb(255,153,0)
						line-height:28px
					.title
						margin:6px 0 8px
						color:rgb(7,17,27)
						line-height:12px
						font-size: 12px
					.rank
						line-height:10px
						margin-bottom:6px
						color:rgb(147,153,159)
						font-size: 10px
				.overview-right
					flex:1
					padding:0 24px
					.title
						font-size: 0
						line-height:18px
						span
							font-size: 12px
						.star
							display: inline-block
							margin:0 12px
							vertical-align:top
						.score
							color:rgb(255,153,0)
						.time
							margin-left:12px
							color:rgb(147,153,159)
			.rating-wrapper
				border-top:1px solid #e6e7e8
				padding:0 18px
				.rating-item
					position:relative
					margin-top:18px
					padding-bottom:18px
					border-1px(#e6e7e8)
					&:last-of-type:after
						border:none
					.avatar
						position:absolute
						top:0
						left:0
						width:28px
						height:28px
						border-radius:50%
					.time
						position:absolute
						right:0
						top:0
						font-size: 10px
						font-weight: 200
						color:rgb(147,153,159)
						line-height:12px
					.info
						margin-left:40px
						.user
							line-height:12px
							font-size: 10px
							color:rgb(7,17,27)
						.delivery
							margin:4px 0 6px
							font-size: 0
							.star
								display:inline-block
								margin-right:6px
							span
								font-size: 10px
								font-weight: 200
								color:rgb(147,153,159)
								line-height:12px
						.text
							line-height:18px
							margin-bottom:8px
							font-size: 12px
							color:rgb(7,17,27)
						.text-info
							font-size: 0
							.icon
								margin:3px 8px 0 0
								font-size: 12px
								line-height:16px
								&.icon-thumb_up
									color:rgb(0,160,220)
								&.icon-thumb_down
									color:rgb(183,187,191)
							.tag
								display: inline-block
								line-height:16px
								margin:0 8px 4px 0
								padding:0px 6px
								font-size: 9px
								color:rgb(147,153,159)
								border:1px solid rgba(7,17,27,.1)
								border-radius:2px
</style>
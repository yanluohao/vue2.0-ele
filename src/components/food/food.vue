<template>
	<transition name="move">
		<div class="food" ref="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="商品信息">
					<div class="back" @click="hide">
						<i class="icon-arrow_left"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol @add="addFood" :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count||food.count==0">加入购物车</div>
					</transition>	
				</div>
				<split v-show="food.info"></split>
				<div class="food-info" v-show="food.info">
					<div class="info-title">
						商品介绍
					</div>
					<div class="info">
						{{food.info}}
					</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :ratings="food.ratings" :selectType="selectType" :desc="desc" :onlyContent="onlyContent" @changeType="changeType" @toggle="toggleContent"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings&&food.ratings.length">
							<li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
								<div class="rateTime">{{rating.rateTime|formatDate}}</div>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" alt="" class="avatar">
								</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>	
</template>
<script type="text/javascript">
	import Vue from "vue";
	import BScroll from 'better-scroll';
	import cartcontrol from "../cartcontrol/cartcontrol.vue";
	import split from "../split/split.vue";
	import ratingselect from "../ratingselect/ratingselect.vue";
	import {formatDate} from "../../common/js/date.js";


	const ALL=2;

	export default {
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showFlag:false,
				selectType: ALL,
				onlyContent: false,
				desc: {
				  all: '全部',
				  positive: '推荐',
				  negative: '吐槽'
				}
			}
		},
		methods:{
			show(){
				this.showFlag=true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						})
					}
					else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag=false;
			},
			addFood(target){
				this.$emit('add', target);
			},
			addFirst(event){
				if(!event._constructed){
					return;
				}
				this.$emit('add',event.target)
				Vue.set(this.food,'count',1)
			},
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
			needShow(type, text) {
			  if (this.onlyContent && !text) {
			    return false;
			  }
			  if (this.selectType === ALL) {
			    return true;
			  } else {
			    return type === this.selectType;
			  }
			}
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.food
		position:fixed
		top:0
		left:0
		bottom:48px
		z-index:30
		width:100%
		transition:all .2s linear
		background:#fff
		&.move-enter-active,&.move-leave
			transform: translate3d(0,0,0)
		&.move-enter,&.move-leave-active
			transform: translate3d(100%,0,0)
		.image-header
			position:relative
			width:100%
			height:0
			padding-top:100%
			img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
			.back
				position:absolute
				top:10px
				left:0
				.icon-arrow_left
					display: block
					padding:10px
					font-size:20px
					color:#ffffff
		.content
			position:relative
			padding:18px
			.title
				margin-bottom:8px
				line-height:14px
				font-size: 14px
				font-weight: 700
				color:rgb(7,17,27)
			.detail
				margin-bottom:18px
				font-size: 0
				height:10px
				line-height:10px
				.sell-count,.rating
					font-size: 10px
					color:rgb(147,153,159)
				.sell-count
					margin-right:12px
			.price
				line-height:24px
				font-weight: 700
				.now
					font-size: 14px
					font-weight: 700
					color:rgb(240,20,20)
					margin-right:8px
				.old
					text-decoration:line-through
					font-size: 10px
					color:rgb(147,153,159)
			.cartcontrol-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position:absolute
				bottom:18px
				right:18px
				line-height:24px
				height:24px
				padding:0 12px
				border-radius:12px
				background:rgb(0,160,220)
				color:#fff
				font-size: 10px
				text-align: center
				opacity:1
				&.fade-enter-active,&.fade-leave-active
					transition:all .2s
				&.fade-enter-active,&.fade-leave
					opacity:0
					z-index:-1
		.food-info
			padding:18px
			background:#fff
			.info-title
				font-size:14px
				font-weight: 500
			.info
				line-height:24px
				padding:6px 8px 0 8px
				font-size: 12px
				color:rgb(77,85,93)
		.food-content 
			&>.rating
				padding-top:18px
				background:#fff
				.title
					padding-left:18px
					font-size:14px
					font-weight: 500
					margin-bottom:6px
				.rating-wrapper
					border-top:1px solid rgba(7,17,27,.1)
					padding:0 18px
					.rating-item
						position:relative
						padding:16px 0
						font-size: 10px
						color:rgb(147,153,159)
						line-height:12px
						border-1px(rgba(7,17,27,.1))
						&:last-of-type:after
							border:none
						.user
							position:absolute
							right:0
							top:16px
							.avatar
								width:12px
								height:12px
								border-radius:50%
								
							.name
								vertical-align:top
						.text
							margin-top:6px
							color:rgb(7,17,27)
							line-height:16px
							span
								margin-right:4px
								line-height:24px
								&.icon-thumb_up
									color:rgb(0,160,220)
								&.icon-thumb_down
									color:rgb(147,153,159)
				.no-rating
					padding: 16px 0
					font-size: 12px
					color: rgb(147, 153, 159)
</style>
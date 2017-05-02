<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="head">
				<div class="info border-1px">
					<div class="left">
						<span class="name">{{seller.name}}</span>
						<div class="line">
							<star :size="36" :score="seller.score"></star>
							<span class="count">({{seller.ratingCount}})</span>
							<span class="seller-count">月售{{seller.sellCount}}单</span>
						</div>
					</div>
					<div class="right" :class="{'favorite':favorite}">
						<span class="icon-favorite" @click="toggleFavorite"></span>
						<span class="text">{{favoriteText}}</span>
					</div>
				</div>
				<div class="details">
					<div class="item">
						<p class="title">起送价</p>
						<p class="price"><span class="num">{{seller.minPrice}}</span>元</p>
					</div>
					<div class="item">
						<p class="title">商家配送</p>
						<p class="price"><span class="num">{{seller.deliveryPrice}}</span>元</p>
					</div>
					<div class="item">
						<p class="title">平均配送时间</p>
						<p class="price"><span class="num">{{seller.deliveryTime}}</span>分钟</p>
					</div>
				</div>
			</div>
			<split></split>
			<div class="notice">
				<div class="title">公告与活动</div>
				<p class="bulletin">{{seller.bulletin}}</p>
				<ul class="supports">
					<li class="item top-1px" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span><span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split v-show="seller.pics"></split>
			<div class="store-pics" v-if="seller.pics">
				<div class="title">商家实景</div>
				<div class="pic-wrapper" ref="picWrapper">
					<div class="pics" ref="pics">
						<img :src="pic" alt="" v-for="pic in seller.pics">
					</div>
				</div>
			</div>
			<split></split>
			<div class="store-info">
				<div class="title">商家信息</div>
				<ul>
					<li class="item top-1px" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import star from "../star/star.vue";
	import {loadLocalStorage,saveLocalStorage} from "../../common/js/store.js";
	import split from "../split/split.vue";
	import BScroll from "better-scroll";

	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				favorite:(()=>{
					return loadLocalStorage(this.seller.id,'favorite',false);
				})()
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?"已收藏":"收藏"
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		mounted(){
			this.$nextTick(()=>{
				this._initScroll();
				this._initPics();
			})
		},
		watch: {
		  seller() {
		    this.$nextTick(() => {
		      this._initScroll();
		      this._initPics();
		    });
		  }
		},
		methods:{
			toggleFavorite(){
				this.favorite=!this.favorite;
				saveLocalStorage(this.seller.id,'favorite',this.favorite);
			},
			_initScroll(){
				if (!this.scroll) {
				  this.scroll = new BScroll(this.$refs.seller, {
				    click: true
				  });
				} else {
				  this.scroll.refresh();
				}
			},
			_initPics(){
				if(this.seller.pics){
					let picWidth=120;
					let margin=6;
					let width=(picWidth+margin)*this.seller.pics.length-margin;
					this.$refs.pics.style.width=width+"px";
					this.$nextTick(()=>{
						this.picScroll=new BScroll(this.$refs.picWrapper,{
							scrollX:true,
							eventPassthrough: 'vertical'
						})
					})
				}
			}
		},
		components:{
			star,
			split
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"


	.seller
		position:absolute
		top:174px
		bottom:0
		left:0
		overflow:hidden
		.seller-content
			.head
				padding:18px
				.info
					position:relative
					border-1px(rgba(7,17,27,.1))
					padding-bottom:18px
					.left
						.line
							margin-top:8px
							.name
								display: block
								line-height:14px
								font-size: 14px
								color:rgb(7,17,27)
							.star
								display: inline-block
							.count,.seller-count
								vertical-align:top
								line-height:18px
								font-size: 10px
								color:rgb(77,85,93)
							.count
								margin:0 8px 0 12px
					.right
						position:absolute
						top:0;
						right:0
						width:50px
						text-align:center
						&.favorite
							.icon-favorite
								color:rgb(240,20,20)			
						.icon-favorite
							display:block
							font-size: 24px
							line-height:24px
							margin-bottom:4px
						.text
							font-size: 10px
							line-height:10px
							color:rgb(77,85,93)
				.details
					display: flex
					font-size: 0
					.item
						flex:1
						margin-top:18px
						font-size: 10px
						text-align: center
						border-right:1px solid rgba(7,17,27,.1)
						&:last-of-type
							border:none
						.title
							line-height:10px
							color:rgb(147,153,159)
							margin-bottom:4px
						.price
							line-height:24px
							color:rgb(7,17,27)
							.num
								font-size: 24px
			.notice
				padding:18px 18px 0 18px
				.bulletin
					line-height:24px
					padding:8px 12px 16px
					font-size: 12px
					color:rgb(240,20,20)	
				.supports
					.item
						padding:16px 12px
						font-size: 0px
						top-1px(rgba(7,17,27,.1))
						.icon
							display: inline-block
							width:16px
							height:16px
							border-radius:2px
							background-size:100% 100%
							&.decrease
								bg-image('decrease_4')
							&.discount
								bg-image('discount_4')
							&.guarantee
								bg-image('guarantee_4')
							&.invoice
								bg-image('invoice_4')
							&.special
								bg-image('special_4')
						.text
							display: inline-block
							line-height:16px
							vertical-align:top
							margin-left:6px
							font-size: 12px
			.store-pics
				padding:18px
				.title
					margin-bottom:12px
				.pic-wrapper
					position:relative
					overflow:hidden
					height:90px
					.pics
						position:absolute
						height:90px
						img
							display: inline-block
							width:120px
							height:90px
							margin-right:6px
							&:last-of-type
								margin-right:0
			.store-info
				padding:18px 18px 0 18px
				.title
					margin-bottom:12px
				.item
					padding:16px 12px
					top-1px(rgba(7,17,27,.1))
					font-size: 12px
					line-height:16px
					color:rgb(7,17,27)
							
				
</style>
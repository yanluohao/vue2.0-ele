<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span>{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports">
				<span class="count" @click="event">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="event">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<transition name="modal">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<v-star :size="48" :score="seller.score"></v-star>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="item in seller.supports" class="support-item">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="description">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							{{seller.bulletin}}
						</div>
					</div>
				</div>
				<div class="detail-close" @click="detailShow=false">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import star from '../star/star.vue';

	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				detailShow:false
			}
		},
		methods:{
			event() {
				this.detailShow=true;
			},
			beforeEnter(el){
				el.style.opacity=0;
			}
		},
		created() {
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		components:{
			'v-star':star
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	
	.header
		position:relative
		overflow:hidden
		color:#fff
		background:rgba(7,17,27,.5)
		.content-wrapper
			position:relative
			padding:24px 12px 18px 24px
			font-size: 0
			.avatar
				display: inline-block
				vertical-align:top
				img
					border-radius:4px
			.content
				display: inline-block
				margin-left:16px;
				font-size: 14px;
				.title
					margin:2px 0 8px 0
					.brand
						display: inline-block
						vertical-align:top
						width:30px
						height:18px
						bg-image('brand')
						background-size:30px 18px
						background-repeat:no-repeat
					.name
						margin-left:6px
						font-size:16px
						line-height:18px
						font-weight: bold
				.description
					margin-bottom:10px
					font-size: 12px
					line-height:12px
				.supports
					line-height:12px
					font-size: 10px
				.supports
					.icon
						vertical-align:top
						display: inline-block
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
			.support-count
				position:absolute
				right:12px
				bottom:14px
				padding:0 8px
				height:24px
				line-height:24px
				border-radius:14px
				background:rgba(0,0,0,.2)
				text-align: center
				.count
					font-size: 10px
					vertical-align:top
				.icon-keyboard_arrow_right
					margin-left:2px
					line-height:24px
					font-size: 10px
		.bulletin-wrapper
			position:relative
			height:28px
			line-height:28px
			padding:0 22px 0 12px
			white-space: nowrap
			overflow:hidden
			text-overflow: ellipsis
			background:rgba(7,17,27,.2)
			.bulletin-title
				display: inline-block
				margin-top:8px
				width:22px
				height:12px
				bg-image:('bulletin')
				background-size:22px 12px
				background-repeat:no-repeat
			.bulletin-text
				vertical-align:top
				margin:0 4px
				font-size:10px
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				right:12px
				bottom:8px
		.background
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			z-index:-1
			filter:blur(10px)			
		.detail
			position:fixed
			top:0
			left:0
			z-index:100
			width:100%
			height:100%
			overflow:auto
			background:rgba(7,17,27,.8)
			backdrop-filter: blur(10px)
			// transition:all .5s
			// filter:blur(10px)
			.detail-wrapper
				min-height:100%
				.detail-main
					padding-top:64px
					padding-bottom:64px
					text-align: center
					.name
						line-height:16px
						text-align: center
						font-size: 16px
						font-weight: 700
						margin-bottom:16px
					.title
						display: flex
						margin:28px auto 24px
						width:80%
						.line
							position:relative
							top:-7px
							flex:1
							border-bottom:1px solid rgba(255,255,255,.2)
						.text
							padding: 0 12px
							font-weight: 700
							font-size: 14px
					.supports
						.support-item
							padding:0 48px
							text-align: left
							.icon
								vertical-align:top
								display: inline-block
								width:16px
								height:16px
								margin:0 6px 12px 0
								background-size:16px 16px
								background-repeat:no-repeat
								&.decrease
									bg-image('decrease_1')
								&.discount
									bg-image('discount_1')
								&.guarantee
									bg-image('guarantee_1')
								&.invoice
									bg-image('invoice_1')
								&.special
									bg-image('special_1')
							.description
								font-size: 12px
								line-height:12px
					.bulletin
						padding:0 48px
						text-align: left
						font-size: 12px
						line-height:24px
			.detail-close
				position:relative
				width:32px;
				height:32px;
				margin:-64px auto 0
				clear:both
				font-size:32px
				color:rgba(255,255,255,.5)
		.modal-enter,
		.modal-leave-active
			transition:all .5s
			opacity:0
			transform: translateY(-100%)
		.modal-enter-active
			transition:all .5s
			transform: translateY(0)
</style>
<template>
	<div class="ratingselect">
		<div class="border-1px">
			<div @click="select(2,$event)" :class="{'active':selectType==2}" class="positive">{{desc.all}}<span>{{all}}</span></div>
			<div @click="select(0,$event)" :class="{'active':selectType==0}" class="positive">{{desc.positive}}<span>{{recommend}}</span></div>
			<div @click="select(1,$event)" :class="{'active':selectType==1}" class="negative">{{desc.negative}}<span>{{complaints}}</span></div>
		</div>
		<div class="switch" :class="{'active':onlyContent}" @click="toggleContent">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/javascript">
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;


	export default {
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent: {
			  type: Boolean,
			  default: false
			},
			desc: {
			  type: Object,
			  default() {
			    return {
			      all: '全部',
			      positive: '推荐',
			      negative: '吐槽'
			    };
			  }
			}
		},
		computed:{
			all(){
				return this.ratings.length;
			},
			recommend(){
				var len=0;
				this.ratings.forEach(function(item){
					if(item.rateType==POSITIVE){
						len++;
					}
				})
				return len;
			},
			complaints(){
				var len=0;
				this.ratings.forEach(function(item){
					if(item.rateType==NEGATIVE){
						len++;
					}
				})
				return len;
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.$emit('changeType',type);
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.$emit('toggle')
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl' 
	
	.ratingselect
		padding:0 18px
		&>.border-1px
			margin-top:12px
			padding-bottom:18px
			border-1px(rgba(7,17,27,.1))
			div
				display: inline-block
				margin-right:8px
				padding:8px 12px
				font-size: 12px
				line-height:16px
				border-radius:2px
				span
					margin-left:5px
					font-size: 8px
				&.positive
					background:rgba(0,160,220,.2)
					color:rgb(77,85,93)
					&.active
						background:rgb(0,160,220)
						color:#fff	
				&.negative
					background:rgba(77,85,93,.2)
					color:rgb(77,85,93)
					&.active
						background:rgb(0,160,220)	
						color:#fff	
		.switch
			line-height:24px
			padding:12px 0
			font-size: 12px
			color:rgb(147,153,159)
			&.active
				.icon-check_circle,.text
					color:#00c850
			.icon-check_circle
				font-size: 24px
				margin-right:4px
			.text
				vertical-align:top
</style>

;(function($){
	var scroll = {
		init: function(o){
			$.extend(this,{
				animationTime:1000
			},o);
			this.active = 0;
			this.z1 = 9;
			this.z2 = 99;
			this.z3 = 999;
			this.domReady();
			this.eventBind();
		},
		domReady: function(){
			this.windowHeight = document.documentElement.clientHeight;
			$('body').height(this.windowHeight)
			this.$page = $("."+this.itemClass).hide();
			this.$page.height(this.windowHeight);
			this.$page.eq(this.active).show();
		},
		moveUp:function(){
			var that = this;
			if(this.active < this.$page.length-1){
				this.$page.eq(this.active).animate({
					"transform":"translateY(-100%)"
				},this.animationTime);
				this.active++
				this.$page.eq(this.active).css({
					"transform": "translateY(100%)"
				}).show()

				this.$page.eq(this.active).animate({
					"transform": "translateY(0)"
				},{
					duration:this.animationTime,
					complete:function(){
						that.callback && that.callback(that.active);
					}
				})

				
			}
		},
		moveDown:function(){
			var that = this;
			if(this.active >0){
				this.$page.eq(this.active).animate({
					"transform":"translateY(100%)"
				},this.animationTime);
				this.active--
				this.$page.eq(this.active).css({
					"transform": "translateY(-100%)"
				}).show()

				this.$page.eq(this.active).animate({
					"transform": "translateY(0)"
				},{
					duration:this.animationTime,
					complete:function(){
						that.callback && that.callback(that.active);
					}
				})
			}
		},
		eventBind: function(){
			var that = this;
			this.$page.swipeUp(function(){
				that.moveUp();
			})
			this.$page.swipeDown(function(){
				that.moveDown();
			})
		}
	}
	var audi = {
		init : function(){
			this.eventBind();
		},
		eventBind: function(){
			$(".animate-slide-right").swipeRight(function(){
				// 向右滑动事件
				$(this).addClass("animated fadeOutRight");
				// 添加建筑动画
				$(".animate-building li").addClass("animation-b");
				// 添加汽车动画
				setTimeout(function(){
					$(".animate-car").addClass("animation-car");
					$(".animate-car .wheel").addClass("animation-wheel");
				},1000)
			})
			$(".pointer").click(function(){
				var $date  = $(".entry-time .time");
				var time = 1000;
				$(this).hide();
				$date.each(function(i){
					if(i>0){
						(function($dom,i){
							setTimeout(function(){
								$dom.addClass("animated bounceIn");
							},time*i);
						})($(this),i)
					}else{
						$(this).addClass("animated bounceIn");
					}
				})
				setTimeout(function(){
					$(".prize-cup").addClass("animated bounceIn");
				},time*5);
			})
		}
	}
	audi.init();
	scroll.init({
		itemClass:"page-item",
		animationTime: 500,
		callback: function(i){
			debugger;
			if(i == 5){
				$(".zhizhen").addClass("animation-rotate");
				$(".ping-animate .p").addClass("hover");
			}
		}
	})
})(Zepto)
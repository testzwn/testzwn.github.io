;(function($){
	window.scrollTo(0,1)

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
			this.$page = $("."+this.itemClass);
			this.$page.height(this.windowHeight);
			this.$page.eq(this.active).addClass('active')
		},
		moveUp:function(){
			var that = this;
			var prev = this.$page.eq(this.active);
			var active = this.$page.eq(this.active + 1);
			if(this.active < this.$page.length-1 && !this.isAnimated){	
				this.isAnimated = true;
				prev.addClass('animated slideOutUp').removeClass("active");
				this.active++
				setTimeout(function(){
					active.addClass('animated slideInUp active')
				}.bind(this), 0)
				active.one('webkitAnimationEnd', function(){
					prev.removeClass('animated slideOutUp');
					active.removeClass('animated slideInUp');
					that.callback && that.callback(that.active);
					that.isAnimated = false;
				})				
				
			}
		},
		moveDown:function(){
			var that = this;
			var prev = this.$page.eq(this.active)
			var active = this.$page.eq(this.active - 1)
			if(this.active >0 && !this.isAnimated){
				this.isAnimated = true;
				prev.addClass('animated slideOutDown')
				this.active--
				setTimeout(function(){
					active.addClass('animated slideInDown active')
				}.bind(this), 0)
				active.one('webkitAnimationEnd', function(){
					prev.removeClass('animated slideOutDown').removeClass("active");
					active.removeClass('animated slideInDown');
					that.callback && that.callback(that.active);
					that.isAnimated = false;
				})
			}
		},
		eventBind: function(){
			var that = this;
			$(document).on('touchmove', function(e){
				e.preventDefault()
			})
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
		animationTime: 300,
		callback: function(i){
			if(i == 5){
				$(".zhizhen").addClass("animation-rotate");
				$(".ping-animate .p").addClass("hover");
			}
		}
	})
})(Zepto)


// 스크롤시 헤더, 하단 탭
let lastScroll = 0;     
$(window).scroll(function() {
  curr = $(this).scrollTop();       
  if (curr > lastScroll) {
    $('header').addClass('hide')
    $('#tabBar').addClass('hide');
    $('#top-btn').addClass('slide');
  } else {
    $('header').removeClass('hide')
    $('#tabBar').removeClass('hide');
    $('#top-btn').removeClass('slide');
  } 
  lastScroll = curr;
})



// sc-visual
var visualSlide = new Swiper('.sc-visual .main-visual', {
  autoplay: {
    delay: 3000,
  },
  on: {
    "init" : function() {
      $('.main-visual .curr').text(this.realIndex+1);
    },
    "slideChange" : function() {
      $('.main-visual .curr').text(this.realIndex+1)
    }
  }
})



// sc-search
var myFindSlide = new Swiper('.sc-search .swiper', {
 slidesPerView:'auto',
 spaceBetween:14,
});




// sc-banner
var bannerSlide = new Swiper('.sc-banner .banner-slide', {
    pagination : {
      el : '.sc-banner .pagination',
      clickable : true,
    },
    spaceBetween:10,
});





// sc-today
var todaySlide = new Swiper('.sc-today .prd-slide-normal', {
    spaceBetween:10,
    slidesPerView:'auto'
});

// --- 남은 시간 --- 
diffDay("#time","2024-08-01");
  setInterval(() => {
    diffDay("#time","2024-08-01");
}, 1000);






// sc-rank
// --- 탭 메뉴 --- 
var rankTabSlide = new Swiper('.sc-rank .tab-slide', {
  spaceBetween:8,
  slidesPerView:'auto'
});

// --- 컨텐츠 --- 
var rankSlide = new Swiper('.sc-rank .prd-slide-col', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  speed: 900,
  pagination: {
    el: ".sc-rank .fraction",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return `<span class="curr">${current}</span>
              <span class="total">${total}</span>`;
    }
  },
  navigation: {
    nextEl: ".sc-rank .navi-next",
    prevEl: ".sc-rank .navi-prev",
  },
  autoplay: {
    delay: 5000,
  },
  on: {
    slideChange: function () {
      var Idx = this.realIndex;
      $('.sc-rank .tab-item').eq(Idx).addClass('on').siblings().removeClass('on');
      rankTabSlide.slideTo(Idx);
    },
  },
});
$('.sc-rank .tab-item a').click(function (e) {
    e.preventDefault();
    var index = $(this).parent('li').index();
    rankSlide.slideTo(index, 300);

    goIndex = (index <= 2)?0:index;
    rankTabSlide.slideTo(goIndex);
});











// sc-brand
// --- bg 이미지 --- 
var brandBgSlide = new Swiper('.sc-brand .bg-slide', {
  effect:"fade",
});
// --- 탭 메뉴 --- 
var brandTabSlide = new Swiper('.sc-brand .tab-slide', {
  spaceBetween:8,
  slidesPerView:'auto'
});
// --- 컨텐츠 --- 
var brandSlide = new Swiper('.sc-brand .prd-slide-col', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 900,
  pagination: {
    el: ".sc-brand .fraction",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return `<span class="curr">${current}</span>
              <span class="total">${total}</span>`;
    }
  },
  navigation: {
    nextEl: ".sc-brand .navi-next",
    prevEl: ".sc-brand .navi-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      var Idx = this.realIndex;
      $('.sc-brand .tab-item').eq(Idx).addClass('on').siblings().removeClass('on');
      brandBgSlide.slideTo(Idx)
    },
  },
});
$('.sc-brand .tab-item a').click(function (e) {
    e.preventDefault();
    var index = $(this).parent('li').index();
    brandSlide.slideTo(index, 300);
    brandGoIndex = (index <= 2)?0:index;
    brandTabSlide.slideTo(brandGoIndex);
});







// sc-health 
var healthSlide = new Swiper('.sc-health .prd-slide-normal', {
  spaceBetween:10,
  slidesPerView:'auto'
});











// sc-event
var eventTabSlide = new Swiper('.sc-event .tab-slide', {
  spaceBetween:8,
  slidesPerView:'auto'
});
var eventSlide = new Swiper('.sc-event .prd-slide-col', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 900,
  pagination: {
    el: ".sc-event .fraction",
    type: "fraction",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return `<span class="curr">${current}</span>
              <span class="total">${total}</span>`;
    }
  },
  navigation: {
    nextEl: ".sc-event .navi-next",
    prevEl: ".sc-event .navi-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      var Idx = this.realIndex;
      $('.sc-event .tab-item').eq(Idx).addClass('on').siblings().removeClass('on');
      eventTabSlide.slideTo(Idx)
    },
  },
});
$('.sc-event .tab-item a').click(function (e) {
    e.preventDefault();
    var index = $(this).parent('li').index();
    eventSlide.slideTo(index, 300);
});







// sc-product
var productSlide = new Swiper('.sc-product .prd-slide-normal', {
  spaceBetween:10,
  slidesPerView:'auto'
});






// footer 
$('.btn-toggle').click(function() {
  $('.toggle-wrap').toggleClass('on');
  $('.btn-toggle').toggleClass('on');
})

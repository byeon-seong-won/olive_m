
// 오늘의 특가 남은 시간
function diffDay(frame,time) {
  const setTime = new Date(time);
  const todayTime = new Date();
  const diff = setTime - todayTime;
  
  const diffDay = Math.floor(diff / (1000*60*60*24));
  const diffHour = Math.floor((diff / (1000*60*60)) % 24);
  const diffMin = Math.floor((diff / (1000*60)) % 60);
  const diffSec = Math.floor(diff / 1000 % 60);
  
  html = `${diffDay}:${diffHour}:${diffMin}:${diffSec}`
  $(frame).html(html);
}





// 천 단위로 쉼표를 추가하는 함수
function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}









// ---------------- json파일 가져오기 ---------------- 
// 1) sc-visual - 메인 비주얼
fetch('./assets/data/mainBanner.json')
  .then(res=>res.json())
  .then(json=>{
      data = json.data;
      mainBanner = data.mainBanners;

      mainBannerEl=``;
      mainBanner.forEach( bannerEl => {

        let contentsDescriptionHTML = bannerEl.contentsDescription.replace(/\n/g, '<br>');
        let sentences = contentsDescriptionHTML.split("<br>");
        let last_sentence = sentences.pop(); 
        let remainingSentencesHTML = sentences.join('<br>');

        console.log("last_sentence" + last_sentence)
        mainBannerEl+= `
                <div class="swiper-slide">
                  <a href="#">
                    <div class="info-area">
                      <p class="title">${remainingSentencesHTML}</p>
                      <strong>${last_sentence}</strong>
                    </div>
                    <img src="https://image.oliveyoung.co.kr/uploads/images/display/${bannerEl. imageUrl}" alt="${bannerEl.imageSubText}">
                  </a>
                </div>`
        });
        $('#mainBannerList').html(mainBannerEl);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});



// 1) sc-visual - 퀵 메뉴
fetch('./assets/data/mainBanner.json')
  .then(res=>res.json())
  .then(json=>{
      data = json.data;
      qmenu = data.quickMenus;
  
      qmenulistEl=``;
      qmenu.forEach( qmenuEl => {
        qmenulistEl+= `
            <li class="cate-item">
              <a href="#">
                <div class="thumb-area">
                <img src="https://image.oliveyoung.co.kr/uploads/images/display/${qmenuEl.imageUrl}" alt="${qmenuEl.imageSubText}">
                </div>
                <div class="info-area">
                  <p>${qmenuEl.imageSubText}</p>
                </div>
              </a>
            </li>
              `
      });
      $('#quickmenu').html(qmenulistEl);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
});




// 2) sc-banner
fetch('./assets/data/healthBanner.json')
  .then(res=>res.json())
  .then(json=>{
    data = json.data;
    healthEventBanner = data.healthEventBanners;

    healthEventBannerEl=``;
    healthEventBanner.forEach( healthEl => {
    healthEventBannerEl+= `
            <div class="swiper-slide">
                <a href="#">
                  <img src="https://image.oliveyoung.co.kr/uploads/images/display/${healthEl.imageUrl}" alt="${healthEl.imageSubText}">
                </a>
            </div>`
    });
    $('#healthBannerList').html(healthEventBannerEl);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});




// 3) sc-today
fetch('./assets/data/data-01.json')
  .then(res=>res.json())
  .then(json=>{
    data = json.data;
    today = data.todaySpecials.goodsInfo;
  
    todayitemEl=``;
    today.forEach( todayEl => {
      let price = addCommasToNumber(todayEl.priceToPay),
          delprice = addCommasToNumber(todayEl.originalPrice),
          review = addCommasToNumber(todayEl.goodsReviewTotalCount);

      todayitemEl+= `
            <div class="swiper-slide prd-item">
            <a href="#">
              <div class="thumb-area">
              <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${todayEl.imagePath}" alt="${todayEl.goodsName}">
              </div>
              <div class="info-area">
                <p class="title">${todayEl.goodsName}</p>
                ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                <p class="price-info">
                  ${todayEl.discountRate == "0" ? '' : `<span class="sale">${todayEl.discountRate}%</span>`} 
                  <span class="price">${price}원</span>
                </p>
                <div class="subtext">
                  ${todayEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                  ${todayEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                  ${todayEl.giftPromotion == null ? '' : `<span class="best">${todayEl.giftPromotion}</span>`}
                  ${todayEl.presentFlag ? '<span class="best">증정</span>' : ''}
                </div>
                <p class="review">
                  <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                  <span>${todayEl.goodsReviewScore} (${review})</span>
                </p>
              </div>
              <div class="btn-area">
                <button aria-label="저장">
                  <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                </button>
                <button aria-label="장바구니">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25" stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11" stroke-width="1.25" stroke-linecap="round"></path></svg>
                </button>
              </div>
            </a>
          </div>`
    });
    $('#today').html(todayitemEl);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
});





// 3) sc-week
fetch('./assets/data/data-01.json')
  .then(res=>res.json())
  .then(json=>{
      data = json.data;
      week = data.weeklySpecials;
  
      weekitemEl=``;
      week.forEach( weekEl => {
        let contentsDescription = weekEl.contentsDescription;
        let index = contentsDescription.indexOf('#');
        let contentsDescriptionHTML_tit = (index !== -1) ? contentsDescription.slice(0, index) : contentsDescription;
        let contentsDescriptionHTML_sb = (index !== -1) ? contentsDescription.slice(index) : contentsDescription;
        weekitemEl+= `
                  <li class="week-item">
                    <a href="#">
                      <div class="thumb-area">
                        <img src="https://image.oliveyoung.co.kr/uploads/images/display/${weekEl.imageUrl}" alt="${weekEl.imageSubText}">
                      </div>
                      <div class="info-area">
                        <strong>${contentsDescriptionHTML_tit}</strong>
                        <p>${contentsDescriptionHTML_sb}</p>
                      </div>
                    </a>
                  </li>
                  `
      });
      $('#week').html(weekitemEl);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
});







// 4) sc-rank
fetch('./assets/data/data-01.json')
  .then(res => res.json())
  .then(json => {
    data = json.data;
    rank = data.categorySuggestionGoods;

    rankitemEl = ``;
    rank.forEach( rankEl => {
      rankitemEl += `
        <ul class="swiper-slide prd-list type-col">
      `;
      rankEl.goodsInfo.forEach( (subrankEl, index) => {
        let price = addCommasToNumber(subrankEl.priceToPay),
            delprice = addCommasToNumber(subrankEl.originalPrice),
            review = addCommasToNumber(subrankEl.goodsReviewTotalCount);

        rankitemEl += `
          <li class="prd-item">
            <a href="#">
              <div class="thumb-area">
                <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${subrankEl.imagePath}" alt="${subrankEl.goodsName}">
                <div class="rank">${index + 1}</div>
              </div>
              <div class="info-area-wrap">
                <div class="info-area">
                  <p class="title">${subrankEl.goodsName}</p>
                  <p class="price-info">
                    ${subrankEl.discountRate == "0" ? '' : `<span class="sale">${subrankEl.discountRate}%</span>`}
                    <span class="price">${price}원</span>
                    ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                  </p>
                  <div class="subtext">
                    ${subrankEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                    ${subrankEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                    ${subrankEl.giftPromotion == null ? '' : `<span class="best">${subrankEl.giftPromotion}</span>`}
                    ${subrankEl.presentFlag ? '<span class="best">증정</span>' : ''}
                  </div>
                  <p class="review">
                    <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                    <span>${subrankEl.goodsReviewScore} (${review})</span>
                  </p>
                </div>
              </div>
              <div class="btn-area">
                <button aria-label="저장">
                  <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26. 1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12. 9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.  1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.  84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.  1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.  64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.  14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.  8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z"   stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                </button>
                <button aria-label="장바구니">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6. 09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25"  stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4. 91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11"  stroke-width="1.25" stroke-linecap="round"></path></svg>
                </button>
              </div>
            </a>
          </li>
        `;
      });
      rankitemEl += `
        </ul>
      `;
    });
    $('#rank').html(rankitemEl);
  })
  .catch(error => {
    console.error(error);
});









// 5) sc-brand
fetch('./assets/data/data-02.json')
  .then(res => res.json())
  .then(json => {
    data = json.data;
    brand = data.popularBrands;

    branditemEl = ``;
    brand.forEach( brandEl => {
          branditemEl+= `
          <div class="swiper-slide">
            <a href="#" class="slide-banner">
            <img src="https://image.oliveyoung.co.kr/uploads/images/display/${brandEl.imageInfo.imageUrl}" alt="${brandEl.imageInfo.imageSubText}">
              <div class="bg-txt">
                <p>${brandEl.onlineBrandInfo.brandName}</p>
                <span>
                  <svg width="12" height="12" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="white" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-white__Qq_a1 "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                  ${brandEl.onlineBrandInfo.brandWishedCount}명이 좋아합니다.
                </span>
              </div>
            </a>
            <ul class="prd-list type-col">
          `
            brandEl.goodsInfo.forEach( subbrandEl => {
            let price = addCommasToNumber(subbrandEl.priceToPay),
                delprice = addCommasToNumber(subbrandEl.originalPrice),
                review = addCommasToNumber(subbrandEl.goodsReviewTotalCount);
  
            branditemEl+= `
              <li class="prd-item">
                <a href="#">
                  <div class="thumb-area">
                    <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${subbrandEl.imagePath}" alt="${subbrandEl.goodsName}">
                  </div>
                  <div class="info-area-wrap">
                    <div class="info-area">
                      <p class="title">${subbrandEl.goodsName}</p>
                      <p class="price-info">
                        ${subbrandEl.discountRate == "0" ? '' : `<span class="sale">${subbrandEl.discountRate}%</span>`}
                        <span class="price">${price}원</span>
                        ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                      </p>
                      <div class="subtext">
                        ${subbrandEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                        ${subbrandEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                        ${subbrandEl.giftPromotion == null ? '' : `<span class="best">${subbrandEl.giftPromotion}</span>`}
                        ${subbrandEl.presentFlag ? '<span class="best">증정</span>' : ''}
                      </div>
                      <p class="review">
                        <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                        <span>4.8 (${review})</span>
                      </p>
                    </div>
                  </div>
                  <div class="btn-area">
                    <button aria-label="저장">
                      <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                    </button>
                    <button aria-label="장바구니">
                      <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25" stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11" stroke-width="1.25" stroke-linecap="round"></path></svg>
                    </button>
                  </div>
                </a>
              </li>
              `;
            });
            branditemEl += `
              </ul>
            </div>
          `;
        });
        $('#brand').html(branditemEl);
  })
  .catch(error => {
    console.error(error);
});








// 6) sc-health
fetch('./assets/data/data-02.json')
  .then(res=>res.json())
  .then(json=>{
    data = json.data;
    health = data.goodsCurations.goodsInfo;
  
    healthitemEl=``;
    health.forEach( healthEl => {
      let price = addCommasToNumber(healthEl.priceToPay),
          delprice = addCommasToNumber(healthEl.originalPrice),
          review = addCommasToNumber(healthEl.goodsReviewTotalCount);

          healthitemEl+= `
            <div class="swiper-slide prd-item">
            <a href="#">
              <div class="thumb-area">
              <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${healthEl.imagePath}" alt="${healthEl.goodsName}">
              </div>
              <div class="info-area">
                <p class="title">${healthEl.goodsName}</p>
                ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                <p class="price-info">
                  ${healthEl.discountRate == "0" ? '' : `<span class="sale">${healthEl.discountRate}%</span>`}
                  <span class="price">${price}원</span>
                </p>
                <div class="subtext">
                  ${healthEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                  ${healthEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                  ${healthEl.presentFlag ? '<span class="best">증정</span>' : ''}
                </div>
                <p class="review">
                  <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                  <span>${healthEl.goodsReviewScore} (${review})</span>
                </p>
              </div>
              <div class="btn-area">
                <button aria-label="저장">
                  <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                </button>
                <button aria-label="장바구니">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25" stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11" stroke-width="1.25" stroke-linecap="round"></path></svg>
                </button>
              </div>
            </a>
          </div>`
    });
    $('#health').html(healthitemEl);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
});









// 7) sc-event
fetch('./assets/data/data-02.json')
  .then(res => res.json())
  .then(json => {
    data = json.data;
    events = data.popularEventsGoods;

    eventitemEl = ``;
    events.forEach( eventEl => {
      let contentsDescription = eventEl.imageInfo.contentsDescription;
      let contentsDescriptionHTML = contentsDescription.replace(/\n/g, '<br>');

      let index = contentsDescriptionHTML.indexOf('#');
      let contentsDescriptionHTML_tit = (index !== -1) ? contentsDescriptionHTML.slice(0, index) : contentsDescriptionHTML;
      let contentsDescriptionHTML_sb = (index !== -1) ? contentsDescriptionHTML.slice(index) : contentsDescriptionHTML;
      eventitemEl+= `
          <div class="swiper-slide">
            <a href="#" class="main-img">
              <img src="https://image.oliveyoung.co.kr/uploads/images/${eventEl.imageInfo.imageUrl}" alt="${eventEl.imageInfo.imageSubText}">
              <div class="main-img-text">
                <p>
                  ${contentsDescriptionHTML_tit}
                </p>
                <p>${contentsDescriptionHTML_sb}</p>
              </div>
            </a>
            <ul class="prd-list type-col">
          `
            eventEl.goodsInfo.forEach( subeventEl => {
            let price = addCommasToNumber(subeventEl.priceToPay),
                delprice = addCommasToNumber(subeventEl.originalPrice),
                review = addCommasToNumber(subeventEl.goodsReviewTotalCount);
  
                eventitemEl+= `
              <li class="prd-item">
                <a href="#">
                  <div class="thumb-area">
                    <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${subeventEl.imagePath}" alt="${subeventEl.goodsName}">
                  </div>
                  <div class="info-area-wrap">
                    <div class="info-area">
                      <p class="title">${subeventEl.goodsName}</p>
                      <p class="price-info">
                        ${subeventEl.discountRate == "0" ? '' : `<span class="sale">${subeventEl.discountRate}%</span>`}
                        <span class="price">${price}원</span>
                        ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                      </p>
                      <div class="subtext">
                        ${subeventEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                        ${subeventEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                        ${subeventEl.giftPromotion == null ? '' : `<span class="best">${subeventEl.giftPromotion}</span>`}
                        ${subeventEl.presentFlag ? '<span class="best">증정</span>' : ''}
                      </div>
                      <p class="review">
                        <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                        <span>4.8 (${review})</span>
                      </p>
                    </div>
                  </div>
                  <div class="btn-area">
                    <button aria-label="저장">
                      <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                    </button>
                    <button aria-label="장바구니">
                      <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25" stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11" stroke-width="1.25" stroke-linecap="round"></path></svg>
                    </button>
                  </div>
                </a>
              </li>
              `;
            });
            eventitemEl += `
              </ul>
            </div>
          `;
        });
        $('#event').html(eventitemEl);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});













// 8) sc-product
fetch('./assets/data/data-02.json')
  .then(res=>res.json())
  .then(json=>{
    data = json.data;
    prod = data.recommendGoods;
  
    proditemEl=``;
    prod.forEach( prodEl => {
      let price = addCommasToNumber(prodEl.priceToPay),
          delprice = addCommasToNumber(prodEl.originalPrice),
          review = addCommasToNumber(prodEl.goodsReviewTotalCount);

          proditemEl+= `
            <div class="swiper-slide prd-item">
            <a href="#">
              <div class="thumb-area">
              <img src="https://image.oliveyoung.co.kr/uploads/images/goods/${prodEl.imagePath}" alt="${prodEl.goodsName}">
              </div>
              <div class="info-area">
                <p class="title">${prodEl.goodsName}</p>
                ${delprice == price ? "" : `<span class="del">${delprice}원</span>`}
                <p class="price-info">
                  ${prodEl.discountRate == "0" ? '' : `<span class="sale">${prodEl.discountRate}%</span>`}
                  <span class="price">${price}원</span>
                </p>
                <div class="subtext">
                  ${prodEl.quickDeliveryFlag ? '<span class="today">오늘드림</span>' : ''}
                  ${prodEl.bestGoodsFlag ? '<span class="best">BEST</span>' : ''}
                  ${prodEl.presentFlag ? '<span class="best">증정</span>' : ''}
                </div>
                <p class="review">
                  <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray50" class="Icon_icon__QJbJu Icon_solid__xBt0w Icon_color-gray50__eVyl1 "><path d="M16.6084 3.70276C16.6816 3.55408 16.8936 3.55397 16.9671 3.70259L21.1538 12.1752C21.1829 12.2342 21.2392 12.2751 21.3043 12.2845L30.6574 13.6388C30.8215 13.6627 30.8871 13.8642 30.7685 13.98L24.0042 20.5799C23.9572 20.6259 23.9357 20.6921 23.9468 20.757L25.549 30.0708C25.5771 30.2342 25.4057 30.3589 25.2589 30.2817L16.8918 25.8882C16.8334 25.8576 16.7638 25.8576 16.7056 25.8883L8.34276 30.2901C8.19607 30.3674 8.02453 30.2429 8.05247 30.0795L9.64543 20.7641C9.65652 20.6992 9.63498 20.633 9.58782 20.5871L2.81711 13.9938C2.69835 13.8782 2.76376 13.6766 2.92779 13.6526L12.2795 12.289C12.3446 12.2795 12.4009 12.2386 12.43 12.1795L16.6084 3.70276Z" stroke-width="2" stroke-linejoin="round"></path></svg>
                  <span>${prodEl.goodsReviewScore} (${review})</span>
                </p>
              </div>
              <div class="btn-area">
                <button aria-label="저장">
                  <svg width="16" height="16" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M24.9236 21.4359C26.1876 20.0985 27.3143 18.6016 28.3235 17.0596C29.5945 15.1197 30.2596 12.9168 29.8536 10.5884C29.3355 7.61996 27.1535 5.30237 24.2231 4.72986C21.1888 4.13636 18.272 5.46482 16.7185 8.07533C16.5997 8.27428 16.2211 8.84645 16.2211 8.84645C16.2211 8.84645 15.8377 8.27503 15.7185 8.07632C14.1584 5.4689 11.2425 4.14773 8.20788 4.74725C5.27864 5.32557 3.10279 7.64747 2.58907 10.6154C2.18617 12.9446 2.85716 15.1462 4.13193 17.0836C5.14421 18.6236 6.27393 20.1167 7.54057 21.4531C10.1402 24.1965 13.1901 26.8119 16.2398 29.1964C19.2847 26.8059 22.3294 24.1845 24.9236 21.4359Z" stroke-width="1.25" stroke-miterlimit="10" stroke-linejoin="round"></path></svg>
                </button>
                <button aria-label="장바구니">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="gray40" class="Icon_icon__QJbJu Icon_line__sHask Icon_color-gray40__Bjxmy "><path d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z" stroke-width="1.25" stroke-linejoin="round"></path><path d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11" stroke-width="1.25" stroke-linecap="round"></path></svg>
                </button>
              </div>
            </a>
          </div>`
    });
    $('#prod').html(proditemEl);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
});
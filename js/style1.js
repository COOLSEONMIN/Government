$(document).ready(function(){

  //처음위치
  $("#hambox").css({"left":"0px"});
  $(".sub_box").css({"left":"-200px"});

  //햄버거메뉴 클릭시 나오는 사이드 바....
  qchk=true;
  $(".trigger").click(function(){

    $(this).toggleClass("active");

    if(qchk){
      $(this).stop().animate({left:"200px"},500);
      $("#hambox").stop().animate({left:"-200px"},500);
      qchk=false;
    }else{
      $(this).stop().animate({left:"200px"},500);
      $("#hambox").stop().animate({left:"0px"},500);
      qchk=true;
    }


  });

  //사이드바가 등장 후 주메뉴 오버시 나오는 서브 박스....
  $(".main").hover(function(){
    $(this).find(".sub").stop().show("slow");
    $(".sub_box").stop().animate({left:"200px"},300);
    $(".trigger").stop().animate({left:"380px"},300);
  },function(){
    $(this).find(".sub").stop().hide("fast");
  });

  //서브메뉴가 있는 메뉴영역을 나가면 햄버거메뉴와 서브배경박스 다시 들어가게.....
  $(".main").mouseleave(function(){
    $(".sub_box").stop().animate({left:"-250px"},300);
    $(".trigger").stop().animate({left:"200px"},300);
  });

  /* 메인슬라이드 */
  
  let $img = $(".visual ul li"); 
  let oldidx = 0; 
  let idx = 0; 
  let img_n = $img.length; 
  function changeImg(idx){

    if(oldidx != idx){ 
  
      $img.eq(oldidx).stop().fadeOut("300"); //기존 이미지 사라짐
      $img.eq(idx).stop().fadeIn("300"); //새로 바뀌는 이미지 나타남
    }
    oldidx = idx; //선택된 이미지는 다시 기존이미지로 저장되어서 fade Out...
  };

//자동함수 생성
function changeAuto(){

  idx++;
  //선택한 이미지가 마지막일때 다시 처음 이미지부터 시작
  if(idx > img_n-1){ //index는 0부터 시작하고 length는 1부터 시작하므로 1을 빼주어야 마지막 숫자가 맞음
    idx=0;
  }

  changeImg(idx); //함수호출

}

  timer = setInterval(changeAuto,4000); //4초 간격으로 함수를 자동재생

/* 갤러리배너 */

//다음보기
  $(".ban_btn .ban_right").click(function(){

    $(".galleryimg ul").stop(true,true).animate({marginLeft:"-=340px"},500,function(){			
			$(".galleryimg ul li:first-child").appendTo(".galleryimg ul"); //첫번째 이미지가 맨뒤로 이동
			$(this).css({marginLeft:"0px"}); //최종목적지
		});	

  });

  //이전보기
  $(".ban_btn .ban_left").click(function(){

    $(".galleryimg ul").stop(true,true).animate({marginLeft:"+=340px"},500,function(){			
			$(".galleryimg ul li:last-child").prependTo(".galleryimg ul"); //마지막 이미지가 맨앞로 이동
			$(this).css({marginLeft:"0px"}); //최종목적지
		});	

  });

  /* 오른쪽 슬라이드 배너 */
  let $simg=$(".slide ul");
  let $simgli=$(".slide ul li");
  let $sbtn=$(".slide_btn ul li");
  let simg_w=$simgli.width(); //이미지의 가로너비
  let simg_n=$simgli.length; //이미지의 총개수
  let soldidx=0; //기존이미지
  let sindex=0; //선택된 새이미지


  //index번째 비주얼이미지 이동하는 함수생성
  function slideImg(sindex){ 

    targetX=-(sindex*simg_w) //움직이는 거리(너비)

    $simg.stop().animate({left:targetX},600); //위에서 계산한 거리만큼 움직임
    $sbtn.eq(soldidx).removeClass("active"); //기존버튼 비활성화
    $sbtn.eq(sindex).addClass("active"); //선택버튼 활성화
    soldidx=sindex;
    
  };

  //자동함수 생성
  function slideAuto(){

    sindex++;
    if(sindex == simg_n){ //simg_n은 이미지개수 5, index는 0,1,2,3,4
      sindex=0;
    }
    slideImg(sindex); //함수호출

  }

  auto = setInterval(slideAuto,4000);  

  //하단버튼
  $sbtn.click(function(){

    clearInterval(auto); 
    $(".play").hide();
    $(".stop").show();
    sindex=$(this).index();
    slideImg(sindex);
    auto = setInterval(slideAuto,4000);

  });



});

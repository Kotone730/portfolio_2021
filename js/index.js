//テキストを含む一般的なモーダル
$(".info").modaal({
  overlay_close:true,//モーダル背景クリック時に閉じるか
  before_open:function(){// モーダルが開く前に行う動作
    $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
  },
  after_close:function(){// モーダルが閉じた後に行う動作
    $('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
  }
});
  

$.scrollify({
  section : ".box",//1ページスクロールさせたいエリアクラス名
  scrollbars:"false",//スクロールバー表示・非表示設定
  interstitialSection : "#header,#footer",//ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
  easing: "swing", // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
    scrollSpeed: 600, // スクロール時の速度
  
  //以下、ページネーション設定
  before:function(i,panels) {
    var ref = panels[i].attr("data-section-name");
      $(".pagination .active").removeClass("active");
      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $(".box").each(function(i) {//1ページスクロールさせたいエリアクラス名を指定
        activeClass = "";
        if(i===$.scrollify.currentIndex()) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });
      pagination += "</ul>";

      $("header").append(pagination);//はじめのエリアにページネーションを表示
      $(".pagination a").on("click",$.scrollify.move);
    }

  });
 $(window).on('load resize', function() {
    var windowWidth = window.innerWidth;
    var elements = $('.box');
    if (windowWidth >= 768) {
      Stickyfill.add(elements);
    }else{
      Stickyfill.remove(elements);
    } 
  });



//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Line(splash_text, {//id名を指定
	easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
	duration: 2000,//時間指定(1000＝1秒)
	strokeWidth: 0.4,//進捗ゲージの太さ
	color: '#fff',//進捗ゲージのカラー
	trailWidth: 0.4,//ゲージベースの線の太さ
	trailColor: '#fb80c8',//ゲージベースの線のカラー
	text: {//テキストの形状を直接指定				
		style: {//天地中央に配置
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: '0',
			margin: '-30px 0 0 0',//バーより上に配置
			transform:'translate(-50%,-50%)',
			'font-size':'1rem',
			color: '#fff',
		},
		autoStyleContainer: false //自動付与のスタイルを切る
	},
	step: function(state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
	}
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
	$("#splash_text").fadeOut(10);//フェイドアウトでローディングテキストを削除
	$(".loader_cover-up").addClass("coveranime");//カバーが上に上がるクラス追加
	$(".loader_cover-down").addClass("coveranime");//カバーが下に下がるクラス追加
	$("#splash").fadeOut();//#splashエリアをフェードアウト
});

  
/**
 * function_works_list.js
 * 最新実績一覧
 */
 (function (win, doc) {


    $(function () {


        var xml_url = '/api_worksall/';

        $.ajax({
            type: 'GET',
            url: xml_url,
            dataType: 'xml',
            cache: false,
        }).done(xmlParser)
        .fail(function () {
            $('#carousel').html('<p class="errortxt">リロードをしてください。</p>');
        });

        function xmlParser(xml) {
            var lists, cntid;
            var ul = $('<ul></ul>');
            var images = []; //xmlデータ格納用配列
            var showlinum = 12;//表示する画像の数

            //xmlを取得し配列に格納　　
            $(xml).find('list').each(function () {
                //xmlの中身を取得し変数に入れる
                var $this = $(this);
                var url = $this.find('url').text(),
                classchange = $this.find('device').text(),
                image = $this.find('pic_index').text(),
                sitename = $this.find('title').text(),
                cntid = $this.find('no').text();

                //xmlをｌｉに入れるために変数でDOMを組み立てる
                // var listr = '<li><a href="' + url +'"><p class="' + classchange +'"><img src="' + image +'"></p><p class="sitename">' + sitename +'</p></a></li>';

                //xmlをｌｉに入れるために変数でDOMを組み立てる
                var li = $('<li>'),
                a = $('<a>').attr('href' , url),
                pthumb =$('<p>').attr('class' , 'thumb').addClass(classchange),
                img = $('<img>').attr('src' ,image ),
                psitename = $('<p>').attr('class' , 'sitename').text(sitename),
                pimg = pthumb.prepend(img),
                awrap = a.append(pimg,psitename),
                lists = li.append(awrap),
                ul_list = ul.append(lists);

                

                //配列にpush
                images.push(lists);
            });
            //html出力(表示数変えるならshowlinumの数を変更)
            $('#carousel ul').html(images.slice(0,showlinum));

            //クリックイベント用変数
            var li_move = 3,
            carouselwrap_width = $("#carouselwrap").width(),
            li_width = $("#carousel li").outerWidth(true),
            li_move_wrap = li_move * li_width,
            li_num = $("#carousel li").length,
            ul_width = li_width * li_num,
            carousel_ul = $("#carousel ul"),
            prev_btn2 = $("#lefbtn"),
            next_btn2 = $("#rightbtn"),
            li_array = [],
            current = 0;

            /*実績詳細ページと同じサムネイルは非表示用変数*/
            var actdir = 'works-detail';//今回適応するフォルダ名
            var urlpathstr = location.pathname;
            var urlpathes = urlpathstr.split("/");

            /*取得+分割＝配列となったurlの文字列から画像名と一致する文字列を取得
            画像名と一致させる文字列として変数に入れる*/
            if(urlpathstr.indexOf(actdir) !== -1) {//今回適応するディレクトリのみ対象とするため振り分け
               $('#carousel ul').html(images.slice(0,showlinum+1));
               li_num = $("#carousel li").length;
               ul_width = li_width * li_num;
               carousel_ul.css({
                width: ul_width + "px"
            });

                var muchurl = '';
                for (var i = 0,length = urlpathes.length; i < length; i++) {
                    if(urlpathes[i] === actdir) {
                       i++;
                       muchurl = urlpathes[i];
                   }
               }

               /*listになってる画像からurlと一致する部分を取り出す。そしてそれをlistより除く*/
               var imgli = $('#carousel ul li img');
               imgli.each(function(){
                var imgsrces = $(this).attr('src').split('/');
                var imgtarget = imgsrces.length-1;

                if(imgsrces[imgtarget].indexOf(muchurl) !== -1) {
                    $(this).parents('li').remove();
                }
             });//each
        }//if

            //初期化
            var last_li_group = carousel_ul.find('li').slice(li_move*-1).prependTo(carousel_ul);
            carousel_ul.css({
                width: ul_width + "px"
            });
            carousel_ul.css("margin-left", -li_move_wrap);


            //イベント
            prev_btn2.on('click', function () {
                carousel_ul.not(':animated').animate({
                    marginLeft: parseInt(carousel_ul.css('margin-left'),10) + li_move_wrap + 'px'
                }, 800, 'easeOutQuart', function () {
                    carousel_ul.find('li').slice(li_move*-1).prependTo(carousel_ul);
                    carousel_ul.css("margin-left", -li_move_wrap);
                });
            });

            next_btn2.on('click', function () {
                carousel_ul.not(':animated').animate({
                    marginLeft: parseInt(carousel_ul.css('margin-left'),10) - li_move_wrap + 'px'
                }, 800, function () {
                    carousel_ul.find('li').slice(0, 3).appendTo(carousel_ul);
                    carousel_ul.css("margin-left", -li_move_wrap);
                });
            });  
 
        } //xmlParser

    });
})(this, document);

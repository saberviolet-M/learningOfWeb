window.onload = function() {
    imgLocation('container', 'box');
    var imgData = { "data": [{ "src": "../images/1.jpg" }, { "src": "../images/2.jpg" }, { "src": "../images/3.jpg" }, { "src": "../images/4.jpg" }, { "src": "../images/5.jpg" }, { "src": "../images/6.jpg" }, { "src": "../images/7.jpg" }, { "src": "../images/8.jpg" }, { "src": "../images/9.jpg" }, { "src": "../images/10.jpg" }, { "src": "../images/11.jpg" }, { "src": "../images/12.jpg" }, { "src": "../images/13.jpg" }, { "src": "../images/14.jpg" }] }
    window.onscroll = function() {
        if (checkFlag()) {
            // console.log("ture");
            var cparent = document.getElementById('container');
            for (var i = 0; i < imgData.data.length; i++) {
                var ccontent = document.createElement('div');
                ccontent.className = 'box';
                cparent.appendChild(ccontent);
                var boximg = document.createElement('div');
                boximg.className = 'box_img';
                ccontent.appendChild(boximg);
                var img = document.createElement('img');
                img.src = 'img/' + imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation('container', 'box');
        }
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    // console.log(lastContentHeight);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop);
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(lastContentHeight + ":" + scrollTop + ":" + pageHeight);
    if (lastContentHeight < scrollTop + pageHeight) {
        return true;
    }
}

function imgLocation(parent, content) {
    let cparent = document.getElementById(parent);
    let ccontent = getChildElement(cparent, content);
    let imgWidth = ccontent[0].offsetWidth;
    let num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:" + imgWidth * num + "px;margin:0 auto";

    var BoxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
        if (i < num) {
            BoxHeightArr[i] = ccontent[i].offsetHeight;
        } else {
            var minheight = Math.min.apply(null, BoxHeightArr);
            var minIndex = getminheightLocation(BoxHeightArr, minheight);
            ccontent[i].style.position = 'absolute';
            ccontent[i].style.top = minheight + 'px';
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + 'px';
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
}

function getminheightLocation(BoxHeightArr, minheight) {
    for (var i in BoxHeightArr) {
        if (BoxHeightArr[i] == minheight) {
            return i;
        }
    }
}

function getChildElement(parent, content) {
    let contentArr = [];
    let allcontent = parent.getElementsByTagName('*');
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
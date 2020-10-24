var imgs = document.querySelector('.bg').querySelectorAll('img');
for (var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function() {
        document.body.style.backgroundImage = 'url(' + this.src + ')';
        document.getElementById("bg").style.cssText = "display:none;";
        document.getElementById("btn").style.display = "block";
    }
}

function demo() {
    document.getElementById("btn").style.display = "none";
    document.getElementById("bg").style.cssText = "display:block;";
}
/*
改进：
1、避免具体数字（图片宽度、图片数量）
2、三个轮播函数整合
左滚动：滚动过去的图片移出，增加到列表结尾，scrollLeft = 0
右滚动：从最后一张开始依次移出、增加到列表开头，scrollLeft = 滚动图片数*宽度，开始滚动
*/
window.onload = function () {
	var slideBox = document.getElementById('picturesSlide');//整个滚动区域
	var picArea = document.getElementById('pic');//图片容器
	var picWidth = picArea.offsetWidth;
	// var pics = picArea.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var slideInterval = setTimeout(function () {
		slideLeft(1);
	},5000);
	var slideDirection = document.getElementById('btn').getElementsByTagName('p');//箭头
	var slidePages = document.getElementById('btn').getElementsByTagName('li');//页码小圆点
	var index = 0;
	slidePages[index].style.backgroundColor = "red";

	// 鼠标移入/移出，箭头出现/消失，图片轮播暂停/继续
	slideBox.onmouseover = function () {			
		for (var j = 0; j < slideDirection.length; j++) {
			slideDirection[j].style.display = "block";
		}
	}
	slideBox.onmouseout = function () {
		for (var j = 0; j < slideDirection.length; j++) {
			slideDirection[j].style.display = "none";
		}
	}
	picArea.onmouseover = function () {
		clearTimeout(slideInterval);
	}
	picArea.onmouseout = function () {
		slideInterval = setTimeout(function () {
			slideLeft(1);
		},5000);
	}

	//箭头点击事件
	document.getElementById('right').onclick = function () {
		slideLeft(1);
	}
	document.getElementById('left').onclick = function () {
		slideRight(1);
	}

	for (var i = 0; i < slidePages.length; i++) {	
		slidePages[i].i = i;
		slidePages[i].onclick = function () {
			var count = this.i - index;
			if (count > 0) {
				slideLeft(count);
			} else if (count < 0) {
				slideRight(-count);
			}
		}
	}

	function slideLeft(slideCount) {
		
		clearTimeout(slideInterval);

		slidePages[index].style.backgroundColor = "black";
		index += slideCount;
		if (index >= slidePages.length) {
			index = 0;
		}
		slidePages[index].style.backgroundColor = "red";

		var timer = setInterval(function () {
			picArea.scrollLeft += 10;
			if (picArea.scrollLeft >= picWidth*slideCount) {
				//我操你妈
				clearInterval(timer);
				var ul = document.getElementById('pic').getElementsByTagName('ul')[0];
				var haveSlided = null;
				for (var i = 0; i < slideCount; i++) {
					haveSlided = ul.removeChild(ul.getElementsByTagName('li')[0]);
					ul.appendChild(haveSlided);
				}
				picArea.scrollLeft = 0;

				slideInterval = setTimeout(function () {
					slideLeft(1);
				},5000);
			}
		},1);

	}

	function slideRight(slideCount) {

		clearTimeout(slideInterval);

		var ul = document.getElementById('pic').getElementsByTagName('ul')[0];
		var toSlide = null;
		for (var i = 0; i < slideCount; i++) {
			toSlide = ul.removeChild(ul.getElementsByTagName('li')[slidePages.length-1]);
			ul.insertBefore(toSlide,ul.getElementsByTagName('li')[0]);
		}
		picArea.scrollLeft = picWidth*slideCount;

		slidePages[index].style.backgroundColor = "black";
		index -= slideCount;
		if (index <= -1) {
			index = slidePages.length-1;
		}
		slidePages[index].style.backgroundColor = "red";
		
		var timer = setInterval(function () {
			picArea.scrollLeft -= 10;
			if (picArea.scrollLeft <= 0) {
				clearInterval(timer);
				slideInterval = setTimeout(function () {
					slideLeft(1);
				},5000);
			}
		});

	}
}

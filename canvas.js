var cvs=document.getElementById("cvs");

var context=cvs.getContext("2d");


var x=250;
var y=250;
var resarray=new Array;
var bubble
var l;
var i,j,a,b,sorted,temp, insert,left, mid, right;
var flag=0,flag2=1,stop=0;


function Random(){
	var i=document.form1.ran.value;
	Number(i);
	var arr=new Array;
	console.log(i);
	for(var k=0;k<i;k++){
		arr.push({no:k,key:Math.random()});
	}
	
	arr.sort(function(a,b){
		return (a.key < b.key) ? -1 : 1;
	});
	var a="";
	for(key in arr){
		a+=arr[key].no+" ";
	document.form1.textbox.value=a;
	}
}

function Run(){
	var t_input=document.form1.textbox.value;
	resarray=t_input.split(" ");
	l=resarray.length;
	l--;
	for(var k=0;k<l;k++){
		resarray[k]=parseInt(resarray[k]);
	}
	Draw();
	k1=0;
	j=l-1;
}

function Gettext(){
	var algo=document.form1.example.value;
	if(algo=="1")setInterval(Bubblesort,20);
	if(algo=="2"){
	i=1;
	flag=1;
	setInterval(Insertsort,2);}
	if(algo=="3")quickSort();
	if(algo=="4")mergeSort();
	if(algo=="5")shellSort();
	if(algo=="6")bogoSort();
}


function Draw(){
	context.clearRect(0,0,1500,1000);
	context.fillStyle="green";
	for(var k=0;k<l;k++){
		context.fillRect(1000*k/l,0,1000/l,resarray[k]*1000/l);
	}
	context.fill();
	
}





Bubblesort=function(){
	var flag=1;
	while(flag){
	 flag=0;
	for(var j=0;j<l-1;j++){
		if(resarray[j]>resarray[j+1]){
		tmp=resarray[j+1];
		resarray[j+1]=resarray[j];
		resarray[j]=tmp;
		Draw();
		break;
		}
		}
	}
}


BinaryInsertSort=function() {
    /* 最初から最後まですべてソート済みになるまで繰り返す */
    while(sorted < l) {
        /* ソート済み領域の直後の値を取り出す */
        insert = resarray[sorted];
        
        /* 挿入する場所を見つける(バイナリサーチ) */
        left = 0;
        right = sorted;
        while(left < right) {
            mid = (left + right) / 2;
            
            if(resarray[mid] < insert) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        i = left;
        /* ソート済み領域直後の値を挿入する
            (単純挿入ソートと同じ) */
        while(i <= sorted) {
            flag=1;
            temp = resarray[i];
            resarray[i] = insert;
            insert = temp;
            console.log("a");
            Draw();
            i++;
            break;
        }
        sorted++;
    }
}

Insertsort=function() {
    while (i < l) {
    stop=0;
    if(flag){
    tmp = resarray[i];
    j=i;
    }
    console.log(i,j,0);
    while((0 < j)&&(resarray[j - 1] > tmp)){
      resarray[j] = resarray[j - 1];
      j--;
      flag=0;
      stop=1;
      break;
      }
      if(stop)break;
    if ((j < i)&&flag2){
      resarray[j] = tmp;
      Draw();
      flag2=0;
      console.log(i,j,2);
      break;
      }
      flag=1;
      flag2=1;
      i++;
      console.log(flag,flag2,i,j)
  }
/*for(a=0;a<l;a++){
	console.log(resarray[a]);
}*/
}

	

						
function qSort(resarray) {
  function partition(l, u) {
    if (l >= u) return; // 長さ1なら終わり
    
    var t = x[l], m = l;
    // tは基準値，mはt未満のグループの最後のインデックスを常に指す
    
    for (var i = l + 1; i <= u; i++) {
      if (x[i] < t) { 
        var temp = x[i]; //swap
        x[i] = x[++m];
        x[m] = temp;
      }
    }
    
    var temp = x[m]; //swap
    x[m] = x[l];
    x[l] = temp;

    partition(l, m - 1);
    partition(m + 1, u);
  }
  
  partition(0, resarray.length - 1);
  return resarray;
}


function quickSort() {
  // For the sake of redrawing, we need to break down the
  // recursive calls into a loop using setTimeout().
  var stack = [];
  stack.push([0, resarray.length]);
  var loop = function() {
    if (stack.length > 0) {
      var top = stack.pop();
      var offset = top[0];
      var length = top[1];
      if (length > 1) {
        var middlePos = partition(resarray, offset, length);
        stack.push([middlePos + 1, offset + length - middlePos - 1]);
        stack.push([offset, middlePos - offset]);
        Draw();
      }
      setTimeout(loop, 30);
    }
  }
  Draw();
  setTimeout(loop, 30);
}

function partition(resarray,offset, l) {
  var pivot = resarray[offset];
  var pivotPos = offset;
  for (var i = offset + 1; i < offset + l; ++i) {
    if (resarray[i] < pivot) {
      swap(resarray, pivotPos, i);
      ++pivotPos;
      swap(resarray, pivotPos, i);
    }
  }
  return pivotPos;
}

function swap(array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function mergeSortInternal(resarray, first, last) {
  if (last - first <= 1) {
    return;
  }
  var middle = Math.floor((first + last) / 2);
  mergeSortInternal(resarray, first, middle);
  mergeSortInternal(resarray, middle, last);

  var work = [];
  for (var i = first; i < middle; ++i) {
    work.push(resarray[i]);
  }

  var i = first;
  var j = 0;
  var k = middle;
  while (j < middle - first && k < last) {
    if (work[j] <= resarray[k]) {
      resarray[i] = work[j];
      ++i;
      ++j;
    } else {
      resarray[i] = resarray[k];
      ++i;
      ++k;
    }
  }
  while (j < middle - first) {
    resarray[i] = work[j];
    ++i;
    ++j;
  }
}

function mergeSortOrig(resarray) {
  mergeSortInternal(resarray, 0, resarray.length);
  Draw();
}

function mergeSort() {
  var regions = [];
  var stack = [];
  stack.push([0, resarray.length]);
  while (stack.length > 0) {
    var top = stack.pop();
    var first = top[0];
    var last = top[1];
    var middle = Math.floor((first + last) / 2);
    if (last - first <= 1) {
      continue;
    }
    stack.push([first, middle]);
    stack.push([middle, last]);
    regions.push([first, last]);
  }

  var loop = function() {
    if (regions.length > 0) {
      var top = regions.pop();
      var first = top[0];
      var last = top[1];
      var middle = Math.floor((first + last) / 2);

      var work = [];
      for (var i = first; i < middle; ++i) {
        work.push(resarray[i]);
      }

      var i = first;
      var j = 0;
      var k = middle;
      while (j < middle - first && k < last) {
        if (work[j] <= resarray[k]) {
          resarray[i++] = work[j++];
        } else {
          resarray[i++] = resarray[k++];
        }
      }
      while (j < middle - first) {
        resarray[i++] = work[j++];
      }
      Draw();
      setTimeout(loop, 30);
    }
  }
  Draw();
  setTimeout(loop, 30);
}

function shellSort() {
  var h;
  for (h = 1; h < Math.floor(l / 9);  h = h * 3 + 1) {
  }

  // It's a pain to transform nested two "for" loops into
  // setTimeout equivalents.
  var loop = function() {
    if (h > 0) {
      var i = h;
      var loop2 = function() {
        if (i < l) {
          var j = i;
          while (j >= h && resarray[j - h] > resarray[j]) {
            swap(resarray, j, j - h);
            j -= h;
          }
          ++i;
          Draw();
          setTimeout(loop2, 20);
        } else {
          h = Math.floor(h / 3);
          setTimeout(loop, 20);
        }
      }
      setTimeout(loop2, 20);
    }
  }
  Draw();
  setTimeout(loop, 20);
}

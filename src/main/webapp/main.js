const path = "v1/BSaM";
let items;
let bookmarkData = {};

document.addEventListener('DOMContentLoaded', async function() {
  const $results = document.getElementById('$results');

  $results.addEventListener("change", async function(event) {
    const target = event.target;
    if (target.classList.contains("bookmark")) {
      const label = target.nextElementSibling;
      const bookmarkIndex = target.dataset.index;
      if (target.checked) {
        label.innerText = 'checked!';
        bookmarkData = {}
        bookmarkData = items[bookmarkIndex];
      } else {
        label.innerText = 'bookmark';
        delete bookmarkData[bookmarkIndex];
      }
      postBookMarkData();
    }
  });

  async function search() {

    items = await searchBooks($q.value);
    var texts = items.map((item, index) => {
      //console.log(item.image);
      var imageUrl = item.image !== "" ? item.image : "no_image.jpg";
      var description = item.description ? item.description : "取得したAPIに説明はありませんでした";
      return `
		<div class='book-info'>
		  <div class='bookmark-button'>
		    <input type="checkbox" class='bookmark' id='bookmark${index}' data-index='${index}'>
		    <label for="bookmark">bookmark</label> 
		  </div>
		  <a class='f border bg-white mb8' id="link${index}" href='${item.link}' target='_blank'>
		    <img class='w100 object-fit-contain bg-gray' id="image${index}" src='${imageUrl}' />
		    <div class='p16'>
		      <h3 class='mb8' id="title${index}">${item.title}</h3>
		      <p class='line-clamp-2' id="description${index}">${description}</p>
		    </div>
		  </a>
		</div>`;
    });
    $results.innerHTML = texts.join('');
  }

  await search();
});


// 本を検索して結果を返す
var searchBooks = async (query) => {
  // Google Books APIs のエンドポイント
  var endpoint = 'https://www.googleapis.com/books/v1';
  
  // 検索 API を叩く
  var res = await fetch(`${endpoint}/volumes?q=${$q.value}`);
  // JSON に変換
  var data = await res.json();
  
  // 必要なものだけ抜き出してわかりやすいフォーマットに変更する
  var items = data.items.map(item => {
    var vi = item.volumeInfo;
    return {
      title: vi.title,
      description: vi.description,
      link: vi.infoLink,
      image: vi.imageLinks ? vi.imageLinks.smallThumbnail : '',
    }; 
  });
  
  return items;
};


// 検索ボタンがクリックされた時のイベントハンドラ
onbutton.addEventListener("click", async function() {
	async function search() {
    items = await searchBooks($q.value);
    var texts = items.map((item, index) => {
      //console.log(item.image);
      var imageUrl = item.image !== "" ? item.image : "no_image.jpg";
      var description = item.description ? item.description : "取得したAPIに説明はありませんでした";
      return `
		<div class='book-info'>
		  <div class='bookmark-button'>
		    <input type="checkbox" class='bookmark' id='bookmark${index}' data-index='${index}'>
		    <label for="bookmark">bookmark</label> 
		  </div>
		  <a class='f border bg-white mb8' id="link${index}" href='${item.link}' target='_blank'>
		    <img class='w100 object-fit-contain bg-gray' id="image${index}" src='${imageUrl}' />
		    <div class='p16'>
		      <h3 class='mb8' id="title${index}">${item.title}</h3>
		      <p class='line-clamp-2' id="description${index}">${description}</p>
		    </div>
		  </a>
		</div>`;
    });
    $results.innerHTML = texts.join('');
  }
  await search();
});


async function postBookMarkData(){
	const bookmarkIndex = document.querySelector('.bookmark:checked').dataset.index;
	const item2 = bookmarkData;
    const param = {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({title: item2.title,
        					description: item2.description,
        					link: item2.link,
        					image: item2.image})
    };
    console.log("[POST]だよ．中身は"+param.body + "と"  + "だね");
    fetch(path, param);
}
const path = "v1/BSaM";

document.addEventListener('DOMContentLoaded', async function() {
  getData();

  document.getElementById("deleteAll").addEventListener("click", function() {
    if (confirm("Are you sure?")) {
      deleteData();
      window.location.reload();
    }
  });
});
	
function deleteData() {
  const param = {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json;charaset=utf-8' },
  };

  fetch(path, param);
}

function getData() {
	fetch(path, {
  	method: "GET"
	}).then(response => response.json())
		.then(data => {
			console.log("[GET] data=" + JSON.stringify(data));
			let hist = document.getElementById("hist");
			hist.innerHTML = ""; 
			for(let i = 0; i < data.length; i++) {
				let item = data[i]; // itemにdata[i]を代入する
        		let imageUrl = item.image; // imageUrlを取得する
				let a =  `
		<div class='book-info'>
		  <a class='f border bg-white mb8' id="link" href='${item.link}' target='_blank'>
		    <img class='w100 object-fit-contain bg-gray' id="image" src='${imageUrl}' />
		    <div class='p16'>
		      <h3 class='mb8' id="title">${item.title}</h3>
		      <p class='line-clamp-2' id="description">${item.description}</p>
		    </div>
		  </a>
		</div>`
				hist.insertAdjacentHTML("beforeend", a);
			}
  });
}

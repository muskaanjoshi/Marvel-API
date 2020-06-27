console.log('file loaded')
const Public_key = `566a415987e969c535af2acc11f0aed5`;
const Private_key = `ec85c27490f31ecd2c8ebcdd9f9741e911dfea5d`;

var date = new Date();
var ts = date.getTime();
var hash = md5(ts+Private_key+Public_key);
var enterbtn = document.getElementById("searchbar");
enterbtn.addEventListener("keyup", function(event) 
{
 	 if (event.keyCode === 13) 
  	{
    	event.preventDefault();
    	document.getElementById("postbtn").click();
  	}
});

function myfunction() 
  {
 	var input,filter;
	input = document.getElementById('searchbar');
	filter = input.value.toUpperCase();
	var url=`http://gateway.marvel.com/v1/public/comics?title=${filter}&ts=${ts}&apikey=${Public_key}&hash=${hash}`;

	let postbtn=document.getElementById('postbtn')
	postbtn.addEventListener('click', buttonClickHandler)
	function buttonClickHandler()
	{
	const xhr = new XMLHttpRequest();
	xhr.open("Get",url,true)
	xhr.onload=function()
		{
			if(this.status === 200)
				{
				let obj =JSON.parse(this.responseText)
				var display = obj.data.results;
				let list=document.querySelector('.response');
       			if(display.length===0)
       				list.innerHTML = "<h5>No Data Found !</h5>";
       			else{
    				str=""
					for (key in display)
						{	
						let desc = display[key].description;
						let description = desc===null?'':desc;
						str+=`<p><h4>${display[key].title}</h4><p>${description}</p></p>
							  <img src="${display[key].thumbnail.path + "."+ display[key].thumbnail.extension}"></img><br><br>`;
						}
					list.innerHTML=str;
					console.log(str);   			
       				}		

				}
			else
				{
				console.log('some error occured')
				}
		}
	xhr.send()
	}
  }
//dummy data test enviroment
var db = [];

var lat = 18;
var longuitude = -70;

for(var i=0;i<200;i++){

	var item = {
		id:i+5,
		title:'Centro Hospital 1',
		details:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		location:{
			latitude:lat + i/100,
			longuitude:-70 + i / 50
		},
		specialties:['general','dermatologia','gastroinstestinal']
	};

	db.push(item);
}

framework.global.db = db;
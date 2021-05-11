
//форма с переключателями
const form = document.getElementById("generateCard");
//коллекция переключателей
const radioButtons = document.querySelectorAll("[type='radio']");

let card; //объект - создаваемая карточка
const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur temporibus maxime doloremque minima? Odio quaerat, et at necessitatibus error animi, impedit libero sit, expedita nulla debitis. Quasi qui ipsa commodi.";
let imgUrl = ""; //адрес изображения

class Card {
 	//конструктор с параметрами, создающий объект карточку (не DOM-объект)

   _id;
   _className;
   _text;
   _imageSource;
   #width = 100;
   #height = 50;
 
   get Width() {
     return this.#width;
   }
 
   set Width(value) {
     if(document.getElementById("card")) {
       this.#width = value;
     }
     else {
       this.#width = 0;
     }
   }
 
   get Height() {
     return this.#height;
   }
 
   set Height(value) {
     if(document.getElementById("card")) {
       this.#height = value;
     }
     else {
       this.#height = 0;
     }
   }
 
   constructor(id, className, text, imgUrl) {
     this.Id = id;
     this.ClassName = className;
     this.Text = text;
     this.ImageSource = imgUrl;
   }
 
   get Id() {
     return this._id;
   }
 
   set Id(value) {
     this._id = value;
   }
 
   get ClassName() {
     return this._className;
   }
 
   set ClassName(value) {
     this._className = value;
   }
 
   get Text() {
     return this._text;
   }
 
   set Text(value) {
     this._text = value;
   }
 
   get ImageSource() {
     return this._imageSource;
   }
 
   set ImageSource(value) {
     this._imageSource = value;
   }
 
   //метод - создание карточки
   createCard() {
     let card; //объект - блок (div)
     let p; //объект - абзац (p)
 
     card = document.createElement("div");
     card.id = this.Id;
     card.className = "card";
     card.classList.add(this.ClassName);
 
     form.insertAdjacentElement("afterend", card); //добавляем карточку после формы
 
     p = document.createElement("p");
     p.textContent = this.Text; //добавляем текст абзацу
 
     card.append(p); //добавляем абзац в конец карточки
 
     //если путь к картинке задан, то создаём её
     if (typeof this.ImageSource != "undefined") {
       this.createImage(card);
     }
   }
 
   //метод - создание изображения в карточке
   createImage(card) {
     let img; //объект - изображение в карточке
 
     img = document.createElement("img");
     img.src = this.ImageSource;
     img.alt = "Фото";
 
     card.prepend(img); //добавляем изображение в начало карточки
   }
 
   //метод - модификация объекта (карточки)
   modifiedCard(typeCard, imgUrl) {
     this.ClassName = typeCard;
     this.ImageSource = imgUrl;
 
     //удаление изображения в случае выбора "Без фото"
     if (typeCard == "card-no-photo") {
       document.querySelector(".card img").remove();
     } else {
       if (!document.querySelector(".card img")) {
         this.createImage(document.getElementById("card"));
       }
     }
     document.getElementById("card").className = `card ${this.ClassName}`;
   }
 
   static getSizeCard(id) {
     return [document.getElementById(id).offsetWidth, document.getElementById(id).offsetHeight];
   }
 }

 class ChildCard extends Card {
	#cardName;

	constructor(id, className, text, imgUrl) {
		super(id, className, text, imgUrl);
		this.CardName = "Дочерняя";
	}

	get CardName() {
		return this.#cardName;
	}

	set CardName(value) {
		this.#cardName = value;
	}

	modifiedCard(typeCard) {
		if(document.getElementById("child")) {
			this.ClassName = typeCard;
			document.getElementById("child").classList.add(this.ClassName);
			document.querySelector(".card img").style.width = "75%";
			document.querySelector(".card p").style.width = "80%";
			document.querySelector(".card p").style.margin = "10px auto";
		}		
	}
}
let child = new ChildCard("child", "card-decorative", text, "https://picsum.photos/500/300");
child.createCard();
child.modifiedCard("card-circle");
console.log(document.querySelector(".card img") instanceof HTMLImageElement);


for (let radio of radioButtons) {
	radio.addEventListener("change", () => {
		if (radio.value == "card-no-photo") {
			imgUrl = undefined;
		} else {
			imgUrl = "https://picsum.photos/500/300";
		}

		if (document.getElementById("card")) {
			card.modifiedCard(radio.value, imgUrl);
		} else {
			card = new Card("card", radio.value, text, imgUrl);
			card.createCard();
		}

		if (card) {
			const p = document.getElementById("cardSize");
			const span = document.querySelector(".card-size span");
			p.classList.remove("hide");

			for (let key in Card.getSizeCard("card")) {
				if (key == 0) {
					span.textContent = `ширина: ${Card.getSizeCard("card")[key]}`;
				} else {
					span.textContent += `, высота: ${Card.getSizeCard("card")[key]}`;
				}
			}
		}
	});
}

  


	 



















// const input = {
//     type: "number",
//     placeholder: "Введите возраст",
//     minValue: 1,
//     styles: {
//       display: "flex",
//       margin: "20px auto 0",
//       padding: "5px 10px",
//       border: "2px solid gold",
//       outlineColor: "lightgreen",
//       fontFamily: "Verdana, sans-serif",
//       fontSize: "18px",
//       color: "blue"
//     },
//     getType() {
//       return this.type;
//     },
//     getPlaceholder() {
//       return this.placeholder;
//     },
//     getStyles() {
//       return this.styles;
//     }
//   }
//   const inputAge = createElem("input");
//   document.body.insertAdjacentElement("afterbegin", inputAge);
//   inputAge.focus();
  
//   let p; //абзац с результатом
//   let error; //окно с ошибкой

//   const result = () => {
//     if(document.getElementById("result")) {
//       p.innerHTML = `Вам: ${inputAge.value} ${getGrammaticYear(+inputAge.value)}`;
//     }
//     else {
//       p = createElem("p");
//       inputAge.insertAdjacentElement("afterend", p);
//     }
//   }
  
//   inputAge.addEventListener("input", () => {
//     if(+inputAge.value > 0) {
//         if(document.querySelector(".error")) {
//             setTimeout(() => {
//               error.classList.remove("animate__backInDown");
//               error.classList.add("animate__backOutUp");
//             }, 500);
//             setTimeout(() => {error.remove();}, 3000);
//         }
//         result();
//       }
//       else {
//         if(inputAge.value != "") {
//             error = createElem("div");
//             document.body.insertAdjacentElement("afterbegin", error);
//         }
//         else {
//           if(document.querySelector(".error")) {
//            setTimeout(() => {
//               error.classList.remove("animate__backInDown");
//               error.classList.add("animate__backOutUp");
//             }, 500);
//             setTimeout(() => {error.remove();}, 3000);
//           }
//         }
//       }
//     })

//     function createElem(tagName) {
//         elem = document.createElement(tagName);
//         switch(tagName) {
//           case "p": elem.setAttribute("id", "result");
                    
//                     elem.style.textAlign = "center";
//                     elem.style.fontFamily = "Georgia, serif";
//                     elem.style.fontSize = "22px";
//                     elem.style.color = "green";
//                     elem.innerHTML = `Вам: ${inputAge.value} ${getGrammaticYear(+inputAge.value)}`;
//                     break;
//           case "input": elem.setAttribute("type", input.getType());
//                         elem.setAttribute("placeholder", input.getPlaceholder());
//                         for(let key in input.getStyles()) {
//                           elem.style[key] = input.getStyles()[key];
//                         }
//                         break;
//           case "div": elem.classList.add("error", "animate__animated", "animate__backInDown");
//                       elem.textContent = "Ошибка! Возраст не может быть < 0.";
//                       break;
//         }
      
//         return elem;
//       }
//       function getGrammaticYear(years) {
//         let result = ""; }
    
   


//111-119, 211-219

//25 % 10 == 5 - true
//35 % 10 == 5
//45 % 10 == 5

//1, 21, 31,... (кроме 11) - "год"
//2 - 4, 22, 23, 24,... (кроме 12, 13, 14) - "года"
//5 - 19, 20, 25 - 29, 30, 35 - 39, 40,... - "лет"

// if(years % 10 == 1 && years % 100 != 11) {
//     result = "год";
//   }
//   else if(years % 10 >= 2
//            && years % 10 <= 4
//            && (years % 100 > 14 || years % 100 < 12)
//          ) 
//   {
//     result = "года";
//   }
//   else {
//     result = "лет";
//   }
//   return result;
// }




// let users = [];
// let user;

// let countUsers = prompt("Кол-во пользователей (объектов):"); //string или null (object)

// if(!countUsers && typeof countUsers == "object") {
//   console.log("Вы отменили!");
// }
// else {
//   if(countUsers == "") {
//     console.log("Вы ничего не ввели!");
//   }
//   else {
//     if(isNaN(countUsers)) {
//       console.log("Вы ввели не число!");
//     }
//     else {
//       for(let i = 0; i < countUsers; i++) {
//         user = createUser();
//         users[i] = user;
//       }
//     }
//   }
// }

// function createUser() {
//   let user = {};

//   user.name = prompt("Имя:");
//   user.sex = prompt("Пол (м, ж):");
//   user.age = randomAge();

//   return user;
// }

// function randomAge() {
//   return age = (Math.random() * 100).toFixed(0);
// }

// const getUserName = function(user) { return user.name; }
// getUsers(users);

// function getUsers(users) {
//   for(let user of users) {
//     console.log(`${getUserName(user)}, возраст - ${user.age}`);
//   }
// }



// *** Функциональное выражение (Function Expression) ***
// let number = 5;
// const factorial = function inner(number) {
//   if(number <= 1) {
//     return 1;
//   }
//   return number * inner(number - 1);
// }
// console.log(`Факториал числа ${number} = ${factorial(number)}`);



//let arr = new Map();
//let arr = new Map([
  // "key": value,
  // "key": value,
  // "key": value
// ]);

//size
//get(key), set(ket, value)
//clear()
//delete(key)

//for (let key of arr.keys()) {}
//for (let value of arr.values()) {}
//for (let elem of arr) { 
//    elem[0] //key
//    elem[1] //value
//  }

//arr.forEach((value, key) => {
// 
// })

//*** Ассоциативный массив (с помощью конструктора Map) ***
// let masMap = new Map([
//   ["userName", "Иван"],
//   ["ageUser", 20],
//   ["sex", "м"]
// ]);

// for(let key of masMap.keys()) {
//   console.log("Ключ: " + key);
// }

// console.log("*****");

// for(let value of masMap.values()) {
//   console.log("Значение: " + value);
// }

// if(masMap.has("userName")) {
//     console.log("Имя пользователя: " + masMap.get("userName"));
// }

// console.log("*****");

// for(let elem of masMap) {
//   console.log("Ключ: " + elem[0]); //ключ
//   console.log("Значение: " + elem[1]); //значение
// }

// masMap.forEach((value, key) => {
//   console.log("Ключ: " + key);
//   console.log("Значение: " + value);
// })








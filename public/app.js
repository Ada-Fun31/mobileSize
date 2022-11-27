window.addEventListener('load', function () {

   /*----- user connection -----*/
   let socket = io();

   //listen for confirmation of connection
   socket.on('connect', () => {
      console.log("connected")

      socket.on('userArray', (userArray) => {
         console.log(userArray);
         let userNumber = userArray.length;
         let user = document.getElementById("userNumber");
         user.innerText = "#" + userNumber;
      });

      // setTimeout(() => {
      //    textAnimation("I see,"
      //       , "you find", "your way into", "a secret tunnel")
      // }, 3000)

      // setTimeout(() => {
      //    textAnimation("At here,"
      //       , "we sell privacy", "", "")
      // }, 6000)

   });

   // click on screen event

   let back = document.getElementById("back");
   console.log(back);
   document.body.addEventListener("click", () => {
      console.log("clicked on page");
   })

})


// let text1 = document.getElementById("para1");
// let text2 = document.getElementById("para2");
// let text3 = document.getElementById("para3");
// let text4 = document.getElementById("para4");

// function textAnimation(txt1, txt2, txt3, txt4) {
//    text1.innerHTML = txt1;
//    text2.innerHTML = txt2;
//    text3.innerHTML = txt3;
//    text4.innerHTML = txt4;
// }

function countDown(sec) {
   let counter = sec
   const interval = setInterval(() => {
      counter--;

      if (counter < 0) {
         clearInterval(interval);
         console.log("time is up")
      }
   }, 1000)
}

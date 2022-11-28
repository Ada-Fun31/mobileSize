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

   /*----- eventListener: click -----*/

   // let back = document.getElementById("back");
   // console.log(back);
   // document.body.addEventListener("click", () => {
   //    console.log("clicked on page");
   // })

   /*----- eventListener: touch -----*/
   let startY, endY, userY;
   let para1 = document.getElementById("para1");
   let para2 = document.getElementById("para2");
   let para3 = document.getElementById("para3");
   let para4 = document.getElementById("para4");
   let para5 = document.getElementById("para5");
   let para6 = document.getElementById("para6");
   let para7 = document.getElementById("para7");
   let para8 = document.getElementById("para8");
   let para9 = document.getElementById("para9");

   document.addEventListener("touchstart", (tS) => {
      // tS.preventDefault();
      // console.log("touches-start", tS.changedTouches[0].pageY);
      startY = tS.changedTouches[0].pageY;


      // for each touched point, create a dot
      [...tS.changedTouches].forEach(touch => {
         const dot = document.createElement("div");
         dot.classList.add("dot");
         dot.style.top = `${touch.pageY}px`;
         dot.style.left = `${touch.pageX}px`;
         dot.id = touch.identifier;
         document.body.append(dot);
      })
   })

   document.addEventListener("touchmove", (tM) => {
      // remain dot when moving
      [...tM.changedTouches].forEach(touch => {
         const dot = document.getElementById(touch.identifier);
         dot.style.top = `${touch.pageY}px`;
         dot.style.left = `${touch.pageX}px`;
      })
   })

   let swipes = 0;
   document.addEventListener("touchend", (tE) => {
      /*--- swipe function ---*/

      endY = tE.changedTouches[0].pageY;
      console.log("diff", (startY - endY));
      userY = startY - endY;

      if (userY > 330) {

         if (swipes == 1) {
            console.log("second swipe")
            para7.style.display = "block";
            para8.style.display = "block";
            para9.style.display = "block";
         }

         if (swipes == 0) {
            console.log("first swipe");
            // para1.style.display = "none"
            para1.innerText = "";
            para2.innerText = "";
            para3.innerText = "";

            para4.style.display = "block";
            para5.style.display = "block";
            para6.style.display = "block";
         }
         console.log(swipes);
         swipes = swipes + 1;
      }


      // remove dot by got's id
      [...tE.changedTouches].forEach(touch => {
         const dot = document.getElementById(touch.identifier);
         dot.remove();
      })
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

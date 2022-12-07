window.addEventListener('load', function () {

   /*----- 整个public的io -----*/
   let socket = io();

   //listen for confirmation of connection
   socket.on('connect', () => {
      console.log("connected")

      // socket.on('userArray', (userArray) => {
      //    console.log(userArray);
      //    let userNumber = userArray.length;
      //    let user = document.getElementById("userNumber");
      //    user.innerText = "#" + userNumber;
      // });

      socket.on('userNum', (num) => {
         console.log(num);
         let user = document.getElementById("userNumber");
         user.innerText = "#" + num;
      })

   });

   /*----- eventListener: click -----*/

   // let back = document.getElementById("back");
   // console.log(back);
   // document.body.addEventListener("click", () => {
   //    console.log("clicked on page");
   // })

   /*----- eventListener: touch -----*/
   let startY, endY, userY;
   let notifier = document.getElementById("notifier")
   let para1 = document.getElementById("para1");
   let para2 = document.getElementById("para2");
   let para3 = document.getElementById("para3");
   let para4 = document.getElementById("para4");
   let para5 = document.getElementById("para5");
   let para6 = document.getElementById("para6");
   let para7 = document.getElementById("para7");
   let para8 = document.getElementById("para8");
   let para9 = document.getElementById("para9");
   let para10 = document.getElementById("para10");
   let para11 = document.getElementById("para11");
   let para12 = document.getElementById("para12");
   let para13 = document.getElementById("para13");
   let buttonT = document.getElementById("buttonT");
   let buttonL = document.getElementById("buttonL");
   let buttonN = document.getElementById("buttonN");
   let locInp = document.getElementById("location-input");
   let NInp = document.getElementById("name-input");
   let popbut1 = document.getElementById("pop1");
   let popbut2 = document.getElementById("pop2");

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
         if (swipes == 3) {
            console.log("turn default");
            para10.style.display = "none";
            para11.style.display = "none";
            para12.style.display = "none";
            para13.style.display = "none";

            buttonT.style.display = "none";
            buttonL.style.display = "none";
            buttonN.style.display = "none";


            swipes = 0;
         }

         if (swipes == 2) {
            console.log("third swipe");
            para4.style.display = "none";
            para5.style.display = "none";
            para6.style.display = "none";
            para7.style.display = "none";
            para8.style.display = "none";
            para9.style.display = "none";
            notifier.style.display = "none";


            para10.style.display = "block";
            para11.style.display = "block";
            para12.style.display = "block";
            para13.style.display = "block";
            buttonT.style.display = "inline-block";
            buttonL.style.display = "inline-block";
            buttonN.style.display = "inline-block";
         }

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
            // notifier.style.display = "none";

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

   /*---------- buttons click event ----------*/
   buttonT.addEventListener('click', function () {
      console.log("time stamp");
      socket.emit('timeStamp', { status: "success" });

   });

   buttonL.addEventListener('click', function () {
      console.log("user location");
      // change button to input
      locInp.style.display = "inline-block";
      buttonL.style.display = "none";
      // add button to upload
      popbut1.style.display = "inline-block";
      // save location input to db
      popbut1.addEventListener('click', function () {
         console.log("location but clicked");
         let locationInp = {
            location: locInp.value
         }
         socket.emit('location', locationInp);
         // Enter gallery -done in html


      })
   });

   buttonN.addEventListener('click', function () {
      console.log("user name");
      // change button to input
      NInp.style.display = "inline-block";
      buttonN.style.display = "none";
      // add button to upload
      popbut2.style.display = "inline-block";
      // save name input to db, and go gallery
      popbut2.addEventListener('click', function () {
         console.log("name but clicked");
         let NameInp = {
            Name: NInp.value
         }
         socket.emit('Name', NameInp);
         // Enter gallery -done in html

      })
   });

   /*---------- gallery event ----------*/
   // after button clicked, send them to threejs-page


})

















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

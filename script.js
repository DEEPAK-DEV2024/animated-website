const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

function homePage() {
  let tl = gsap.timeline();
  tl.from("nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInout,
  });
  tl.to(".animation-element", {
    y: 0,
    ease: Expo.easeInout,
    duration: 2,
    stagger: 0.2,
    delay: -1,
  });
  tl.from("#home-footer", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInout,
  });
}

let timeOut;
function circleSkew() {
  // define default scale value
  let xScale = 1;
  let YScale = 1;

  let xPreviousValue = 0;
  let yPreviousValue = 0;
  window.addEventListener("mousemove", (para) => {
    clearTimeout(timeOut);
    xdiff = para.clientX - xPreviousValue;
    ydiff = para.clientY - yPreviousValue;

    xPreviousValue = para.clientX;
    yPreviousValue = para.clientY;

    xScale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yScale = gsap.utils.clamp(0.8, 1.2, ydiff);

    mousefollower(xScale, yScale);

    timeOut = setTimeout(() => {
      document.querySelector(
        "#mini-circle"
      ).style.transform = `translate(${para.clientX}px, ${para.clientY}px) scale(1,1)`;
    }, 100);
  });
}
circleSkew();

function mousefollower(xScale, yScale) {
  window.addEventListener("mousemove", (para) => {
    document.querySelector(
      "#mini-circle"
    ).style.transform = `translate(${para.clientX}px, ${para.clientY}px) scale(${xScale},${yScale})`;
  });
}

mousefollower();
homePage();

document.querySelectorAll(".element").forEach((element) => {
  let rotate = 0;
  let diffRotate = 0;
  element.addEventListener("mousemove", (para) => {
    let diff = para.clientY - element.getBoundingClientRect().top;
    diffRotate = para.clientX - rotate;
    rotate = para.clientX;

    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: para.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
    });
  });
  element.addEventListener("mouseleave", (para) => {
    let diff = para.clientY - element.getBoundingClientRect().top;
    diffRotate = para.clientX - rotate;
    rotate = para.clientX;

    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });
});

function dropdownAnimation() {
  document.querySelectorAll('#dropdownMenu>a').forEach((param)=>{
    param.classList.add('dropdownAnimtion')
  });
  document.querySelector('#menuBtn').classList.add('dropdownAnimtionContent');
}

function updateTime() {
  const date = new Date();
  let hour = date.getUTCHours()+5;
  let min = date.getUTCMinutes()+30;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = (hour % 12) || 12; // Convert 0 to 12
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;

  const currentTime = `${hour}:${min} ${ampm}`;
  document.getElementById('time').innerHTML = currentTime;
}


setInterval(updateTime, 1000);


// video
const v1 = document.getElementById('provid1') ;
const v2 = document.getElementById('provid2') ;
const v3 = document.getElementById('provid3') ;
const v4 = document.getElementById('provid4') ;
const v5 = document.getElementById('provid5') ;
const h = document.querySelector(".hover-sign");
const vlist = [v1,v2,v3,v4,v5];
vlist.forEach(function(video){
  video.addEventListener('mouseover',function(){
    video.play()
    h.classList.add("active")
  })
  video.addEventListener('mouseout',function(){
    video.pause()
    h.classList.remove("active")
  })
});
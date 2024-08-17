let navbar = document.querySelector('.header .flex .navbar');
let menuBtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');
let faqBox = document.querySelectorAll('.faq .box-container .box')
let contentBox = document.querySelectorAll('.faq .box-container .box .content');
let iconBox = document.querySelectorAll('.faq .box-container .box .i');
let signUp = document.querySelector('.header .flex .btn');
let model = document.querySelector('.model');
let xmark = document.querySelector('.model .model-body .fa-xmark');
let modelBody = document.querySelector('.model .model-body')
menuBtn.onclick = () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-xmark');
}
window.onscroll = () => {
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-xmark');
    if(window.scrollY > 0) {
        header.classList.add('active');
    }
    else {
        header.classList.remove('active');
    }
}
faqBox.forEach(box => {
    box.onclick = () => {
        let content = box.querySelector('.content');
        let icon = box.querySelector('i');
        if(content.classList.contains('active')){
            content.classList.remove('active');
        }
        else {
            contentBox.forEach(contents => {contents.classList.remove('active')});
            content.classList.add('active');
        }

        if(icon.classList.contains('fa-minus')){
            icon.classList.replace('fa-minus','fa-plus');
        }
        else {
            iconBox.forEach(icons => {icons.classList.replace('fa-minus','fa-plus');});
            icon.classList.replace('fa-plus','fa-minus');
        }
    }
})
signUp.onclick = () => {
    model.classList.add('active');
}
xmark.onclick = () => {
    model.classList.remove('active');
}
model.onclick = () => {
    model.classList.remove('active');
}
modelBody.addEventListener('click',function (event) {
    event.stopPropagation();
})

function pageTransition() {

    var tl = gsap.timeline();

    tl.to('ul.transition li', { duration: 0.5, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 });
    tl.to('ul.transition li', { duration: 0.5, scaleY: 0, transformOrigin: "bottom left", stagger: 0.1, delay: 0.1 });
}

function contentAnimation() {

    var tl = gsap.timeline();
    tl.from('.left', { duration: 1.5, translateY: 50, opacity: 0 });
    tl.to('img', { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }, "-=0.5");

}

function delay(n) {
    n = n || 2000;
    return new Promise(resolve => {
        setTimeout(() => {
            done();
        }, n);
    });
}

barba.init({

    sync: true,

    transitions: [{

        async leave(data) {

            const done = this.async();

            pageTransition();
            await delay(1500);
            done();
        },

        async enter(data) {
            contentAnimation();
        },

        async once(data) {
            contentAnimation();
        }
    }]
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.top = "0";
    } else {
        document.getElementById("nav").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
};
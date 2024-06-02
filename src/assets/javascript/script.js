document.addEventListener('DOMContentLoaded', function() {
    const secondScreen = document.querySelector('.secondScreen');
    const switchBtn = document.getElementById('switchTv');
    let isTurnedOn = false;

    gsap.to(secondScreen.firstElementChild.children, {
        opacity: 0,
        duration: 0
    })
    gsap.to(secondScreen,{
        backgroundColor: 'rgb(0,0,0)',
        ease: Power2.easeOut,
        duration:0
    })


    function toggleSwitcherTV() {
        if (isTurnedOn) {
            gsap.to(secondScreen.firstElementChild.children, {
                opacity: 0,
                stagger: 0.1,
                duration: 0.25
            })
            gsap.to(secondScreen,{
                delay: 0.65,
                backgroundColor: 'rgb(0,0,0)',
                ease: Power2.easeOut,
                duration:0.25
            })
        }
        if (!isTurnedOn) {

            gsap.to(secondScreen,{
                backgroundColor: 'rgb(26, 53, 96)'
            })
            gsap.to(secondScreen.firstElementChild.children, {
                delay: 0.25,
                opacity: 1,
                stagger: 0.15,
            })
        }
        isTurnedOn = !isTurnedOn;
    }

    switchBtn.addEventListener('click', toggleSwitcherTV);

});


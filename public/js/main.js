const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`);
    elem.style.setProperty('--y', `${state.y}px`);
    elem.style.setProperty('--width', `${state.width}px`);
    elem.style.setProperty('--height', `${state.height}px`);
    elem.style.setProperty('--radius', state.radius);
    elem.style.setProperty('--scale', state.scale);
};

document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement;

    const createState = e => {
        const defaultState = {
            x: e.clientX,
            y: e.clientY,
            width: 40,
            height: 40,
            radius: '50%'
        };

        const computedState = {};

        if (onElement != null) {
            const { top, left, width, height } = onElement.getBoundingClientRect();
            const radius = window.getComputedStyle(onElement).borderTopLeftRadius;

            computedState.x = left + width / 2;
            computedState.y = top + height / 2;
            computedState.width = width;
            computedState.height = height;
            computedState.radius = radius;
        }

        return {
            ...defaultState,
            ...computedState
        };
    };

    document.addEventListener('mousemove', e => {
        const state = createState(e);
        updateProperties(cursor, state);
    });

    document.querySelectorAll('a, button').forEach(elem => {
        elem.addEventListener('mouseenter', () => (onElement = elem));
        elem.addEventListener('mouseleave', () => (onElement = undefined));
    });
});



function fadeInPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}



document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) { return; }
    var anchors = document.getElementsByTagName('a');
    
    for (var idx=0; idx<anchors.length; idx+=1) {
        if (anchors[idx].hostname !== window.location.hostname ||
            anchors[idx].pathname === window.location.pathname) {
            continue;
        }
        anchors[idx].addEventListener('click', function(event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;
            
            var listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

//180 15 minutes



window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var fader = document.getElementById('fader');
  fader.classList.remove('fade-in');
});


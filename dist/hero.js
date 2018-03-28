'use strict';

(function () {
    window.onload = function () {
        var els = Array.from(window.document.getElementsByClassName('h-bars'));

        els.forEach(function (e) {
            e.addEventListener('click', function (event) {
                if (event.currentTarget && event.currentTarget.attributes) {
                    var attributes = Array.from(event.currentTarget.attributes);
                    attributes.every(function (attribute) {
                        if (attribute.name !== 'menu') return true;

                        var menu = document.getElementById(attribute.nodeValue);
                        isOpen(menu) ? close(menu) : open(menu);
                    });
                }
            });
        });
    };

    function isOpen(el) {
        if (!el || !el.className) return false;

        return el.className.indexOf('open') > -1;
    }

    function open(el) {
        el.previousClassName = el.className;
        el.className += ' open';
    }

    function close(el) {
        el.className = el.previousClassName;
    }
})();
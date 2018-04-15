'use strict';

(function () {
    window.onload = function () {
        var els = Array.from(window.document.getElementsByTagName('menu-container'));

        els.forEach(function (e) {
            e.addEventListener('click', function (event) {
                var childNodes = Array.from(event.currentTarget.childNodes);
                childNodes.forEach(function (c) {
                    if (!c.attributes) return;
                    var button = Array.from(c.attributes).find(function (attribute) {
                        return attribute.name === 'menu';
                    });

                    if (button) {
                        var menu = document.getElementById(button.nodeValue);
                        isOpen(menu) ? close(menu) : open(menu);
                    }
                });
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
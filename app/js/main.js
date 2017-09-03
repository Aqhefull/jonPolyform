(function () {
    let dragged;
    let safeplace = document.getElementById('safeplace')
    const playgroundWidth = document.getElementById('polyform_operations').offsetWidth + 'px';
    const playgroundHeight = document.getElementById('polyform_operations').offsetHeight + 'px';
    const polyformOper = document.getElementById('polyform_operations');
    const initRotBtn = document.getElementById('rotate');
    const initMovBtn = document.getElementById('move');

    const img = document.getElementById('polyform_objects').getElementsByTagName('img');
    for (let i = 0; i < img.length; i++) {
        img[i].setAttribute("draggable", "true")
        img[i].id = `img${i}`
    }

    /* events fired on the draggable target */
    document.addEventListener("drag", function (event) {

    }, false);

    document.addEventListener("dragstart", function (event) {
        // store a ref. on the dragged elem
        if (event.target.parentNode.id == 'polyform_objects') {
            dragged = event.target.cloneNode();
            safeplace.appendChild(dragged);
        } else if (event.target.parentNode.id = 'polyform_operations')
            dragged = event.target
        // make it half transparent
        event.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function (event) {
        // reset the transparency
        event.target.style.opacity = "";
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function (event) {
        // highlight potential drop target when the draggable element enters it
        if (event.target.id == "polyform_operations") {
            event.target.style.background = "#F2EDED";
        }

    }, false);

    document.addEventListener("dragleave", function (event) {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.id == "polyform_operations") {
            event.target.style.background = "";
        }

    }, false);
    function draggedBorder(w, h) {
        if (parseInt(dragged.style.top) < 0) {
            dragged.style.top = 0 + 'px';
            dragged.onmousemove = null;
            dragged.onmouseup = null;
        }
        if (parseInt(dragged.style.left) < 0) {
            dragged.style.left = 0 + 'px';
            dragged.onmousemove = null;
            dragged.onmouseup = null;
        }
        if (parseInt(dragged.style.top) > (parseInt(h) - parseInt(dragged.offsetHeight) - 30)) {
            dragged.style.top = parseInt(h) - parseInt(dragged.offsetHeight) - 30 + 'px';
            dragged.onmousemove = null;
            dragged.onmouseup = null;
        }
        if (parseInt(dragged.style.left) > (parseInt(w) - parseInt(dragged.offsetWidth) - 30)) {
            dragged.style.left = parseInt(w) - parseInt(dragged.offsetWidth) - 30 + 'px';
            dragged.onmousemove = null;
            dragged.onmouseup = null;
        }
    }
    document.addEventListener("drop", function (event) {
        if (event.target.id != "polyform_operations") {
            return;
        } else if (event.target.id == "polyform_operations") {
            event.target.style.background = "";
            dragged.setAttribute("draggable", "false")
            event.preventDefault();
            dragged.style.position = 'absolute';
            dragged.style.left = (event.pageX - polyformOper.offsetLeft) - 15 - dragged.offsetWidth / 2 + 'px';
            dragged.style.top = (event.pageY - polyformOper.offsetTop) - 15 - dragged.offsetHeight / 2 + 'px';
            draggedBorder(playgroundWidth, playgroundHeight)
            event.target.appendChild(dragged);
        }

    }, false);
    
    function Rotate() {

        let clickCounter = 0;
        let rotateCounter = 1;

        function objRotate(event) {
            if (event.target.parentNode.id == 'polyform_operations') {
                event.target.style.transitionDuration = "0.3s";
                event.target.style.transitionProperty = "all";
                if (rotateCounter == 41) rotateCounter = 1
                event.target.style.webkitTransform = `rotate(${rotateCounter+=5}0deg)`;
            }
        }
        this.rotate = function (event) {
            if (clickCounter == 0) {
                initRotBtn.className += ' polyform__toolbar__item--active';
                polyformOper.addEventListener("click", objRotate)
                clickCounter += 1
            } else if (clickCounter == 1) {
                initRotBtn.classList.remove("polyform__toolbar__item--active");
                polyformOper.removeEventListener("click", objRotate)
                clickCounter = 0
            }

        }
    }

    function Move() {
        let clickCounter = 0;
        let isDown;

        function md(event) {
            if (event.target.parentNode.id == 'polyform_operations') {
                isDown = true;
            }
        }

        function mu(event) {
            isDown = false;
            event.target.style.opacity = "1";
        }

        function mm(event) {
            event.preventDefault();
            if (isDown) {
                if (event.target.parentNode.id == 'polyform_operations') {
                    event.target.style.transitionProperty = "none";
                    event.target.style.transitionDuration = "0s";
                    event.target.style.opacity = "0.5";
                    event.target.style.left = (event.pageX - polyformOper.offsetLeft) - 15 - event.target.offsetWidth / 2 + 'px';
                    event.target.style.top = (event.pageY - polyformOper.offsetTop) - 15 - event.target.offsetHeight / 2 + 'px';
                    if (parseInt(event.target.style.top) < 0) {
                        event.target.style.top = 0 + 'px';
                        event.target.onmousemove = null;
                        event.target.onmouseup = null;
                    }
                    if (parseInt(event.target.style.left) < 0) {
                        event.target.style.left = 0 + 'px';
                        event.target.onmousemove = null;
                        event.target.onmouseup = null;
                    }
                    if (parseInt(event.target.style.top) > (parseInt(playgroundHeight) - parseInt(event.target.offsetHeight) - 30)) {
                        event.target.style.top = parseInt(playgroundHeight) - parseInt(event.target.offsetHeight) - 30 + 'px';
                        event.target.onmousemove = null;
                        event.target.onmouseup = null;
                    }
                    if (parseInt(event.target.style.left) > (parseInt(playgroundWidth) - parseInt(event.target.offsetWidth) - 30)) {
                        event.target.style.left = parseInt(playgroundWidth) - parseInt(event.target.offsetWidth) - 30 + 'px';
                        event.target.onmousemove = null;
                        event.target.onmouseup = null;
                    }
                }
            }
        }
        this.move = function (event) {
            if (clickCounter == 0) {
                initMovBtn.className += ' polyform__toolbar__item--active';
                polyformOper.addEventListener("mousedown", md, true)
                polyformOper.addEventListener('mouseup', mu, true);
                polyformOper.addEventListener('mousemove', mm, true);
                clickCounter += 1
            } else if (clickCounter == 1) {
                initMovBtn.classList.remove("polyform__toolbar__item--active");
                polyformOper.removeEventListener("mousedown", md, true)
                polyformOper.removeEventListener('mouseup', mu, true);
                polyformOper.removeEventListener('mousemove', mm, true);
                clickCounter = 0
            }

        }
    }
    //////////////////////////////////////////////////////////////
    let mov = new Move();
    let rot = new Rotate();
    initMovBtn.addEventListener("click", mov.move)
    initRotBtn.addEventListener("click", rot.rotate)
})()
$.fn.isInView = function () {
    var bound = this.get(0).getBoundingClientRect();
    if (bound.bottom >= window.innerHeight/2)
        return true;
    else
        return false;
};

$.fn.isOutOfView = function () {
    var bound = this.get(0).getBoundingClientRect();
    if (bound.bottom < 1)
        return true;
    else
        return false;
};


$.fn.scrollStopped = function(callback)
{
    $(this).scroll(function () {
        clearTimeout(this);
        setTimeout(function () {
            clearTimeout(this);
            callback();
        }.bind(this), 250);
    });
}
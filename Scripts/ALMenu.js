document.onmousedown = function (e) {
    if (e.which == 1) {
        if (!contextMenu.activeMenu.contains(e.toElement) || contextMenu.activeMenu == e.toElement) {
            contextMenu.HideMenu();
        }
    }
    if (contextMenu.onmousedown != null) {
        contextMenu.onmousedown();
    }
}


var contextMenu = {

    activeMenu: null,
    onmousedown: null,
    raisedBy: null,	
    menues: [],

    RegisterMenuElement: function (id, bindToClass) {
        this.menues.push(document.getElementById(id));
        var obs = document.getElementsByClassName(bindToClass);
        var i;
        for (i = 0; i < obs.length; i++) {
            obs[i].setAttribute("oncontextmenu", "contextMenu.ShowMenu('" + id + "', event);");
        }
    },
	
	RegisterALMenu: function(menu, bindToClass){
		this.menues.push(menu);
		var obs = document.getElementsByClassName(bindToClass);
        var i;
        for (i = 0; i < obs.length; i++) {
            obs[i].setAttribute("oncontextmenu", "contextMenu.ShowMenu('" + menu.id + "', event);");
        }
	},

    ShowMenu: function (id, event) {
        this.raisedBy = event.toElement;
        event.preventDefault();
        for (var i = 0; i < this.menues.length; i++) {
            this.menues[i].style.display = 'none';
        }
        var menu = document.getElementById(id);
        menu.style.display = 'block';
		var _left = ((window.innerWidth - event.pageX+10) < menu.offsetWidth)? Math.abs(event.pageX - menu.offsetWidth) : event.pageX;
		var _top = ((window.innerHeight - event.pageY+10) < menu.offsetHeight)? Math.abs(event.pageY - menu.offsetHeight) : event.pageY;
        menu.style.top = _top.toString() + "px";
        menu.style.left = _left.toString() + "px";
        this.activeMenu = menu;
    },


    ShowMenuAt: function (id, x, y) {
        for (var i = 0; i < this.menues.length; i++) {
            this.menues[i].style.display = 'none';
        }
        var menu = document.getElementById(id);
        menu.style.top = y;
        menu.style.left = x;
        menu.style.display = 'block';
        this.activeMenu = menu;
    },

    HideMenu: function () {
        this.activeMenu.style.display = 'none';
        this.activeMenu = null;
        this.raisedBy = null;
    }
};



var  ALMenu = {
	count: 0,
	ALContextMenu: function(containerId){
		ALMenu.count++;
		this.id = ALMenu.count + "_ALMenu";
		this.menu = document.createElement("DIV");
		this.menu.id = this.id;
		this.menu.className = "ALmenu-container";
		document.getElementById(containerId).appendChild(this.menu);
		this.addMenuItem = function(label, callback)
		{
			var item = document.createElement("DIV");
			item.className = "ALmenu-item";
			item.innerHTML = label;
			item.onclick = callback;
			this.menu.appendChild(item);
			return item.id;
		};
	}
}



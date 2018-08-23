function toggleSidebar() {
	document.getElementById("sidebar").classList.toggle("notshown")
}

document.getElementById("sidebarButton").onclick = toggleSidebar

window.addEventListener("load", function() {
	if (window.matchMedia("(max-width: 768px)").matches) {
		document.getElementById("sidebar").classList.toggle("notshown")
	}
})
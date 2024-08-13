const btnHome = document.getElementById("btn-home")
const btnAbout = document.getElementById("btn-about")
const btnPatchNotes = document.getElementById("btn-patch-notes")

btnHome.onclick = () => { window.location.href = 'index.html' }
btnAbout.onclick = () => { window.location.href = 'about.html' }
btnPatchNotes.onclick = () => { window.location.href = 'patch-notes.html' }
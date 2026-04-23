const proyectos = [
    ...(typeof dataAssets !== 'undefined' ? dataAssets : []),
    ...(typeof dataRenders !== 'undefined' ? dataRenders : []),
    ...(typeof dataAnimaciones !== 'undefined' ? dataAnimaciones : []),
    
];

const grid = document.getElementById('project-grid');
const modC = document.getElementById('modal-contacto');
const modP = document.getElementById('modal-proyecto');

function renderProyectos(filtro = "Assets") {
    grid.innerHTML = "";
    
    const filtrados = proyectos.filter(p => p.calidad === filtro);
    
    if (filtrados.length === 0) {
        grid.innerHTML = `
            <p class="font-secondary" style="grid-column: 1/-1; text-align: center; opacity: 0.5; padding: 50px;">
                No hay proyectos en la categoría "${filtro}" aún.
            </p>`;
        return;
    }

    filtrados.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${p.portada}" alt="${p.titulo}" onerror="this.src='Fotos/LogoTaza.png'">
            <h3 class="font-primary" style="padding: 15px; font-size: 1rem;">${p.titulo}</h3>
        `;

        card.onclick = () => abrirDetalle(p);
        grid.appendChild(card);
    });
}

function abrirDetalle(p) {
    const contenedor = document.getElementById('detalle-contenido');
    
    let mediaHtml = p.multimedia.map(m => {
        if (m.type === 'image') {
            return `<img src="${m.url}" onerror="this.style.display='none'">`;
        } else if (m.type === 'video') {
            return `<video controls><source src="${m.url}" type="video/mp4"></video>`;
        }
        return '';
    }).join('');

    contenedor.innerHTML = `
        <h2 class="font-primary" style="color:var(--highlight); margin-bottom:10px;">${p.titulo}</h2>
        <p class="font-secondary" style="color:#ccc; margin-bottom:20px; line-height:1.6;">${p.desc}</p>
        <div class="media-container">
            ${mediaHtml}
        </div>
    `;
    mostrarModal(modP);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
    
        const el = e.currentTarget;
        el.classList.add('active');
        
        const calidadSeleccionada = el.getAttribute('data-quality');
        renderProyectos(calidadSeleccionada);
    };
});

function mostrarModal(m) {
    m.style.display = "flex";
    setTimeout(() => m.classList.add('show'), 10);
}

function ocultarModal(m) {
    m.classList.remove('show');
    setTimeout(() => m.style.display = "none", 500);
}

document.getElementById('btn-contacto').onclick = (e) => { 
    e.preventDefault(); 
    mostrarModal(modC); 
};

document.getElementById('close-contacto').onclick = () => ocultarModal(modC);
document.getElementById('close-proyecto').onclick = () => ocultarModal(modP);

window.onclick = (e) => {
    if (e.target == modC) ocultarModal(modC);
    if (e.target == modP) ocultarModal(modP);
};

/* :3 */
document.getElementById('gato-pixel').onclick = () => {
    const audio = document.getElementById('miauAudio');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
};

renderProyectos("Assets");

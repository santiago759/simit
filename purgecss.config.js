module.exports = {
    content: ['./index.html', './consulta.html'],
    css: ['./style.css'],
    output: './purged-style.css',
    safelist: [
      'owl-carousel',
      'owl-theme',
      'owl-loaded',
      'owl-drag',
      'owl-stage-outer',
      'owl-stage',
      'owl-item',
      'owl-prev',
      'owl-next',
      'owl-dots', // Añadido para los puntos de navegación
      'owl-dot', // Añadido para los puntos de navegación
      'card-carousel-1',
      'card-carousel-2',
      'card-carousel-3',
      'margin-top-card',
      'row',
      'col-lg-4',
      'col-12',
      'box-shadow-sm',
      'border-0',
      'pb-4',
      'text-secondary',
      'font-weight-bold',
      'd-lg-block',
      'd-md-none',
      'd-none',
      'fs-13',
      'mb-3',
      'mb-lg-0',
      'd-flex',
      'align-items-center',
      'img-fluid',
      'pr-0'
    ]
  }
  
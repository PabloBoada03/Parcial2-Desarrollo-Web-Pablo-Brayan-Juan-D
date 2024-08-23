const informacionPlatos = [
    {
      id: 1,
      nombre: "Ensalada César",
      categoria: "Entrante",
      descripcion: "Ensalada de lechuga romana, parmesano y croutones con aderezo César.",
      precio: 7.5,
      imgUrl: "none"
    },
    {
      id: 2,
      nombre: "Bruschetta",
      categoria: "Entrante",
      descripcion: "Pan tostado con tomate fresco, ajo y albahaca.",
      precio: 5.0,
      imgUrl: "none"
    },
    {
      id: 3,
      nombre: "Gazpacho",
      categoria: "Entrante",
      descripcion: "Sopa fría de tomate con pepino y pimientos.",
      precio: 6.0,
      imgUrl: "none"
    },
    {
      id: 4,
      nombre: "Croquetas de Jamón",
      categoria: "Entrante",
      descripcion: "Deliciosas croquetas rellenas de jamón ibérico.",
      precio: 4.5,
      imgUrl: "none"
    },
    {
      id: 5,
      nombre: "Patatas Bravas",
      categoria: "Entrante",
      descripcion: "Patatas fritas acompañadas de salsa brava picante.",
      precio: 4.0,
      imgUrl: "none"
    },
    {
      id: 6,
      nombre: "Calamares Fritos",
      categoria: "Entrante",
      descripcion: "Aros de calamar empanizados y fritos con salsa alioli.",
      precio: 8.5,
      imgUrl: "none"
    },
    {
      id: 7,
      nombre: "Sopa de Ajo",
      categoria: "Entrante",
      descripcion: "Sopa tradicional de ajo con huevo escalfado.",
      precio: 5.5,
      imgUrl: "none"
    },
    {
      id: 8,
      nombre: "Hummus",
      categoria: "Entrante",
      descripcion: "Crema de garbanzos con pan pita.",
      precio: 4.5,
      imgUrl: "none"
    },
    {
      id: 9,
      nombre: "Tartar de Atún",
      categoria: "Entrante",
      descripcion: "Atún fresco marinado con aguacate y soja.",
      precio: 12.0,
      imgUrl: "none"
    },
    {
      id: 10,
      nombre: "Pulpo a la Gallega",
      categoria: "Entrante",
      descripcion: "Pulpo cocido servido con patatas y pimentón.",
      precio: 9.0,
      imgUrl: "none"
    },
    {
      id: 11,
      nombre: "Paella de Mariscos",
      categoria: "Principal",
      descripcion: "Arroz con mariscos frescos y especias.",
      precio: 15.0,
      imgUrl: "none"
    },
    {
      id: 12,
      nombre: "Filete de Res",
      categoria: "Principal",
      descripcion: "Filete de res a la parrilla con verduras salteadas.",
      precio: 18.5,
      imgUrl: "none"
    },
    {
      id: 13,
      nombre: "Pasta Carbonara",
      categoria: "Principal",
      descripcion: "Pasta con salsa de huevo, queso y panceta.",
      precio: 13.0,
      imgUrl: "none"
    },
    {
      id: 14,
      nombre: "Cordero Asado",
      categoria: "Principal",
      descripcion: "Pierna de cordero asada con hierbas y papas.",
      precio: 22.0,
      imgUrl: "none"
    },
    {
      id: 15,
      nombre: "Pizza Margherita",
      categoria: "Principal",
      descripcion: "Pizza con tomate, mozzarella y albahaca fresca.",
      precio: 10.0,
      imgUrl: "none"
    },
    {
      id: 16,
      nombre: "Salmon a la Plancha",
      categoria: "Principal",
      descripcion: "Filete de salmón a la plancha con ensalada.",
      precio: 17.0,
      imgUrl: "none"
    },
    {
      id: 17,
      nombre: "Pollo al Curry",
      categoria: "Principal",
      descripcion: "Pollo en salsa de curry con arroz basmati.",
      precio: 12.5,
      imgUrl: "none"
    },
    {
      id: 18,
      nombre: "Raviolis de Espinaca",
      categoria: "Principal",
      descripcion: "Pasta rellena de espinacas y ricota en salsa de tomate.",
      precio: 11.5,
      imgUrl: "none"
    },
    {
      id: 19,
      nombre: "Fajitas de Pollo",
      categoria: "Principal",
      descripcion: "Fajitas de pollo con pimientos y cebollas.",
      precio: 14.0,
      imgUrl: "none"
    },
    {
      id: 20,
      nombre: "Hamburguesa Gourmet",
      categoria: "Principal",
      descripcion: "Hamburguesa de carne premium con queso cheddar y tocino.",
      precio: 13.5,
      imgUrl: "none"
    },
    {
      id: 21,
      nombre: "Coca-Cola",
      categoria: "Bebidas",
      descripcion: "Refresco de cola.",
      precio: 2.5,
      imgUrl: "none"
    },
    {
      id: 22,
      nombre: "Café Expreso",
      categoria: "Bebidas",
      descripcion: "Café expreso clásico.",
      precio: 2.0,
      imgUrl: "none"
    },
    {
      id: 23,
      nombre: "Zumo de Naranja",
      categoria: "Bebidas",
      descripcion: "Zumo de naranja natural.",
      precio: 3.0,
      imgUrl: "none"
    },
    {
      id: 24,
      nombre: "Agua Mineral",
      categoria: "Bebidas",
      descripcion: "Agua mineral sin gas.",
      precio: 1.5,
      imgUrl: "none"
    },
    {
      id: 25,
      nombre: "Té Helado",
      categoria: "Bebidas",
      descripcion: "Bebida refrescante de té con limón.",
      precio: 2.5,
      imgUrl: "none"
    },
    {
      id: 26,
      nombre: "Batido de Fresa",
      categoria: "Bebidas",
      descripcion: "Batido cremoso de fresa.",
      precio: 4.0,
      imgUrl: "none"
    },
    {
      id: 27,
      nombre: "Cerveza Artesanal",
      categoria: "Bebidas",
      descripcion: "Cerveza artesanal local.",
      precio: 5.0,
      imgUrl: "none"
    },
    {
      id: 28,
      nombre: "Limonada",
      categoria: "Bebidas",
      descripcion: "Limonada fresca con hielo.",
      precio: 2.5,
      imgUrl: "none"
    },
    {
      id: 29,
      nombre: "Chocolate Caliente",
      categoria: "Bebidas",
      descripcion: "Bebida caliente de chocolate.",
      precio: 3.5,
      imgUrl: "none"
    },
    {
      id: 30,
      nombre: "Agua con Gas",
      categoria: "Bebidas",
      descripcion: "Agua mineral con gas.",
      precio: 1.8,
      imgUrl: "none"
    },
    {
      id: 31,
      nombre: "Tarta de Queso",
      categoria: "Postres",
      descripcion: "Tarta de queso con base de galleta y mermelada de frutas.",
      precio: 5.5,
      imgUrl: "recursos/fotos/COMIDA/postres/queso.jpg"
    },
    {
      id: 32,
      nombre: "Helado de Vainilla",
      categoria: "Postres",
      descripcion: "Helado de vainilla con sirope de chocolate.",
      precio: 4.0,
      imgUrl: "none"
    },
    {
      id: 33,
      nombre: "Flan Casero",
      categoria: "Postres",
      descripcion: "Flan de huevo con caramelo.",
      precio: 3.5,
      imgUrl: "none"
    },
    {
      id: 34,
      nombre: "Brownie",
      categoria: "Postres",
      descripcion: "Brownie de chocolate con nueces.",
      precio: 4.5,
      imgUrl: "none"
    },
    {
      id: 35,
      nombre: "Tarta de Manzana",
      categoria: "Postres",
      descripcion: "Tarta de manzana al horno con canela.",
      precio: 5.0,
      imgUrl: "none"
    },
    {
      id: 36,
      nombre: "Mousse de Chocolate",
      categoria: "Postres",
      descripcion: "Mousse suave de chocolate.",
      precio: 4.5,
      imgUrl: "none"
    },
    {
      id: 37,
      nombre: "Panna Cotta",
      categoria: "Postres",
      descripcion: "Postre italiano de nata cocida con frutas del bosque.",
      precio: 5.5,
      imgUrl: "none"
    },
    {
      id: 38,
      nombre: "Tiramisú",
      categoria: "Postres",
      descripcion: "Clásico tiramisú con café y cacao.",
      precio: 6.0,
      imgUrl: "none"
    },
    {
      id: 39,
      nombre: "Gelatina de Fresa",
      categoria: "Postres",
      descripcion: "Gelatina de fresa servida con crema.",
      precio: 3.0,
      imgUrl: "none"
    },
    {
      id: 40,
      nombre: "Profiteroles",
      categoria: "Postres",
      descripcion: "Profiteroles rellenos de crema y cubiertos de chocolate.",
      precio: 5.0,
      imgUrl: "none"
    }
  ];
  
// ============================================================
// Game Data — Organized by Level → Module → Activity
// ============================================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface WordSearchData {
  words: { word: string; translation: string }[];
  gridSize: number;
}

export interface PictureMatchItem {
  word: string;
  correctEmoji: string;
  options: string[];
}

export interface SituationItem {
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
}

export interface ModuleData {
  id: string;
  name: string;
  description: string;
  quiz: QuizQuestion[];
  wordSearch: WordSearchData;
  pictureMatch: PictureMatchItem[];
  situations: SituationItem[];
}

export interface LevelData {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
  bgLight: string;
  textColor: string;
  modules: ModuleData[];
}

export const levelsData: LevelData[] = [
  {
    id: "beginner",
    label: "Beginner",
    title: "Primeros pasos",
    description:
      "Vocabulario esencial, pronunciación y estructuras básicas para comunicarte con confianza desde el día uno.",
    color: "#8DC87A",
    bgLight: "#EAF5E5",
    textColor: "#3B6D11",
    modules: [
      {
        id: "greetings",
        name: "Saludos y presentaciones",
        description:
          "Aprendé a saludar, presentarte y mantener conversaciones básicas en inglés.",
        quiz: [
          {
            question: '¿Qué significa "Hello"?',
            options: ["Adiós", "Hola", "Gracias", "Por favor"],
            correctIndex: 1,
            explanation: '"Hello" es la forma más común de decir "Hola" en inglés.',
          },
          {
            question: '¿Cómo se dice "¿Cómo estás?" en inglés?',
            options: [
              "What is your name?",
              "How old are you?",
              "How are you?",
              "Where are you from?",
            ],
            correctIndex: 2,
          },
          {
            question: '¿Qué responderías a "Nice to meet you"?',
            options: [
              "I'm fine",
              "Nice to meet you too",
              "Goodbye",
              "Thank you",
            ],
            correctIndex: 1,
          },
          {
            question: '"Good morning" se usa durante:',
            options: ["La noche", "La tarde", "La mañana", "Todo el día"],
            correctIndex: 2,
          },
          {
            question: '¿Qué significa "See you later"?',
            options: ["Mucho gusto", "Hasta luego", "Buenos días", "Bienvenido"],
            correctIndex: 1,
          },
          {
            question: '¿Cómo se dice "Mi nombre es Juan"?',
            options: [
              "My name are Juan",
              "I name is Juan",
              "My name is Juan",
              "Me name is Juan",
            ],
            correctIndex: 2,
          },
          {
            question: '¿Cuál es la respuesta correcta a "How are you?"',
            options: [
              "I am 20 years old",
              "I am fine, thank you",
              "I am from Argentina",
              "I am a student",
            ],
            correctIndex: 1,
          },
          {
            question: '"Goodbye" significa:',
            options: ["Hola", "Buen día", "Adiós", "Buenas noches"],
            correctIndex: 2,
          },
        ],
        wordSearch: {
          words: [
            { word: "HELLO", translation: "Hola" },
            { word: "GOOD", translation: "Bueno" },
            { word: "NAME", translation: "Nombre" },
            { word: "NICE", translation: "Agradable" },
            { word: "MEET", translation: "Conocer" },
            { word: "BYE", translation: "Adiós" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Hello",
            correctEmoji: "👋",
            options: ["👋", "👎", "🎉", "💤"],
          },
          {
            word: "Night",
            correctEmoji: "🌙",
            options: ["☀️", "🌙", "⛅", "🌈"],
          },
          {
            word: "Morning",
            correctEmoji: "☀️",
            options: ["🌙", "⭐", "☀️", "🌧️"],
          },
          {
            word: "Friend",
            correctEmoji: "🤝",
            options: ["💔", "🤝", "🚗", "📱"],
          },
          {
            word: "Happy",
            correctEmoji: "😊",
            options: ["😢", "😡", "😊", "😴"],
          },
          {
            word: "Book",
            correctEmoji: "📖",
            options: ["📱", "📖", "🎮", "🎵"],
          },
        ],
        situations: [
          {
            sentence: "Hello! My name is Sarah. Nice to meet you!",
            translation: "¡Hola! Mi nombre es Sarah. ¡Mucho gusto!",
            options: [
              "Sarah está pidiendo comida en un restaurante",
              "Sarah se está presentando por primera vez",
              "Sarah está despidiéndose de alguien",
              "Sarah está hablando por teléfono",
            ],
            correctIndex: 1,
          },
          {
            sentence: "Good morning! How are you today?",
            translation: "¡Buen día! ¿Cómo estás hoy?",
            options: [
              "Alguien saluda por la mañana y pregunta cómo estás",
              "Alguien te dice adiós antes de irse a dormir",
              "Alguien te está pidiendo la hora",
              "Alguien está enojado contigo",
            ],
            correctIndex: 0,
          },
          {
            sentence: "See you tomorrow! Have a good night!",
            translation: "¡Nos vemos mañana! ¡Que tengas buena noche!",
            options: [
              "Es de mañana y alguien te invita a desayunar",
              "Alguien se presenta por primera vez",
              "Alguien se despide al final del día",
              "Alguien te da la bienvenida a una fiesta",
            ],
            correctIndex: 2,
          },
          {
            sentence: "Excuse me, what is your name?",
            translation: "Disculpe, ¿cuál es su nombre?",
            options: [
              "Alguien te pide que le pases la sal",
              "Alguien quiere saber tu nombre",
              "Alguien te dice que te vayas",
              "Alguien te está contando una historia",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "present-simple",
        name: "Presente simple",
        description:
          "Dominá el presente simple para hablar de rutinas y hábitos diarios.",
        quiz: [
          {
            question: '¿Cuál es la forma correcta? "She ___ to school every day."',
            options: ["go", "goes", "going", "gone"],
            correctIndex: 1,
            explanation:
              'Con "she/he/it" en presente simple, el verbo lleva "-s" o "-es".',
          },
          {
            question: '¿Cómo se forma la negación? "I ___ like coffee."',
            options: ["doesn't", "not", "don't", "isn't"],
            correctIndex: 2,
          },
          {
            question: '"They play soccer on weekends" significa:',
            options: [
              "Ellos jugaron fútbol el fin de semana",
              "Ellos juegan fútbol los fines de semana",
              "Ellos van a jugar fútbol",
              "Ellos están jugando fútbol",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Cuál es correcta? "He ___ breakfast at 7 AM."',
            options: ["have", "has", "having", "haves"],
            correctIndex: 1,
          },
          {
            question: '"Do you speak English?" es una pregunta sobre:',
            options: [
              "Si hablaste inglés ayer",
              "Si estás hablando inglés ahora",
              "Si hablás/sabés hablar inglés",
              "Si vas a hablar inglés",
            ],
            correctIndex: 2,
          },
          {
            question: 'Completá: "My cat ___ on the sofa."',
            options: ["sleep", "sleeps", "sleeping", "sleeped"],
            correctIndex: 1,
          },
          {
            question: '¿Cuál es la pregunta correcta? "___ she work here?"',
            options: ["Do", "Does", "Is", "Are"],
            correctIndex: 1,
          },
          {
            question: '"I always wake up early" contiene el adverbio:',
            options: ["wake", "up", "early", "always"],
            correctIndex: 3,
          },
        ],
        wordSearch: {
          words: [
            { word: "WORK", translation: "Trabajar" },
            { word: "PLAY", translation: "Jugar" },
            { word: "EAT", translation: "Comer" },
            { word: "SLEEP", translation: "Dormir" },
            { word: "READ", translation: "Leer" },
            { word: "WALK", translation: "Caminar" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Eat",
            correctEmoji: "🍽️",
            options: ["🛏️", "🍽️", "📚", "🏃"],
          },
          {
            word: "Sleep",
            correctEmoji: "😴",
            options: ["😴", "🏊", "🎵", "✍️"],
          },
          {
            word: "Work",
            correctEmoji: "💼",
            options: ["🎮", "🏖️", "💼", "🎪"],
          },
          {
            word: "Run",
            correctEmoji: "🏃",
            options: ["🛋️", "🏃", "🍳", "📖"],
          },
          {
            word: "Cook",
            correctEmoji: "👨‍🍳",
            options: ["👨‍🍳", "👨‍💻", "👨‍🎓", "👨‍🔬"],
          },
          {
            word: "Study",
            correctEmoji: "📚",
            options: ["🎸", "📚", "⚽", "🎬"],
          },
        ],
        situations: [
          {
            sentence: "I wake up at 6 AM every day. Then I take a shower and have breakfast.",
            translation:
              "Me despierto a las 6 AM todos los días. Luego me ducho y desayuno.",
            options: [
              "Alguien describe lo que hizo ayer a la mañana",
              "Alguien habla de su rutina diaria",
              "Alguien planea qué va a hacer mañana",
              "Alguien se queja de no poder dormir",
            ],
            correctIndex: 1,
          },
          {
            sentence: "She doesn't eat meat. She prefers vegetables and fruits.",
            translation: "Ella no come carne. Prefiere verduras y frutas.",
            options: [
              "Alguien habla de la dieta de una mujer vegetariana",
              "Alguien pide comida en un restaurante",
              "Alguien cocina carne para la cena",
              "Alguien va al supermercado",
            ],
            correctIndex: 0,
          },
          {
            sentence: "Do you play any musical instrument?",
            translation: "¿Tocás algún instrumento musical?",
            options: [
              "Te están invitando a un concierto",
              "Te preguntan si sabés tocar un instrumento",
              "Te piden que compres un instrumento",
              "Te dicen que la música está muy fuerte",
            ],
            correctIndex: 1,
          },
          {
            sentence: "The train leaves at 8:30 every morning.",
            translation: "El tren sale a las 8:30 cada mañana.",
            options: [
              "El tren se retrasó esta mañana",
              "Alguien perdió el tren",
              "Se informa el horario regular del tren",
              "El tren va a cambiar de horario",
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "daily-vocabulary",
        name: "Vocabulario cotidiano",
        description:
          "Aprendé las palabras más usadas en el día a día para comunicarte en situaciones comunes.",
        quiz: [
          {
            question: '¿Qué es un "Table"?',
            options: ["Silla", "Mesa", "Cama", "Puerta"],
            correctIndex: 1,
          },
          {
            question: '"Kitchen" es el lugar donde:',
            options: ["Dormimos", "Cocinamos", "Estudiamos", "Nos bañamos"],
            correctIndex: 1,
          },
          {
            question: '¿Cómo se dice "rojo" en inglés?',
            options: ["Blue", "Green", "Red", "Yellow"],
            correctIndex: 2,
          },
          {
            question: '"Water" significa:',
            options: ["Fuego", "Tierra", "Aire", "Agua"],
            correctIndex: 3,
          },
          {
            question: '"Family" incluye:',
            options: [
              "Amigos y vecinos",
              "Padres, hermanos e hijos",
              "Profesores y alumnos",
              "Compañeros de trabajo",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Qué son "shoes"?',
            options: ["Guantes", "Zapatos", "Gorras", "Medias"],
            correctIndex: 1,
          },
          {
            question: '"Monday" es un:',
            options: ["Mes", "Color", "Día de la semana", "Número"],
            correctIndex: 2,
          },
          {
            question: '¿Cuántos "months" tiene un año?',
            options: ["7", "10", "12", "52"],
            correctIndex: 2,
          },
        ],
        wordSearch: {
          words: [
            { word: "HOUSE", translation: "Casa" },
            { word: "WATER", translation: "Agua" },
            { word: "BREAD", translation: "Pan" },
            { word: "CHAIR", translation: "Silla" },
            { word: "PHONE", translation: "Teléfono" },
            { word: "CLOCK", translation: "Reloj" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Dog",
            correctEmoji: "🐕",
            options: ["🐈", "🐕", "🐟", "🐦"],
          },
          {
            word: "Car",
            correctEmoji: "🚗",
            options: ["🚲", "✈️", "🚗", "🚢"],
          },
          {
            word: "House",
            correctEmoji: "🏠",
            options: ["🏢", "🏠", "⛺", "🏪"],
          },
          {
            word: "Apple",
            correctEmoji: "🍎",
            options: ["🍌", "🍇", "🍊", "🍎"],
          },
          {
            word: "Rain",
            correctEmoji: "🌧️",
            options: ["☀️", "🌧️", "❄️", "⛅"],
          },
          {
            word: "Tree",
            correctEmoji: "🌳",
            options: ["🌸", "🌵", "🌳", "🍄"],
          },
        ],
        situations: [
          {
            sentence: "Can I have a glass of water, please?",
            translation: "¿Puedo tener un vaso de agua, por favor?",
            options: [
              "Alguien pide un vaso de agua",
              "Alguien está nadando en una piscina",
              "Alguien se queja de que llueve mucho",
              "Alguien limpia la casa con agua",
            ],
            correctIndex: 0,
          },
          {
            sentence: "I need to buy some bread and milk from the store.",
            translation:
              "Necesito comprar algo de pan y leche en la tienda.",
            options: [
              "Alguien está cocinando en su casa",
              "Alguien necesita ir a comprar al supermercado",
              "Alguien está vendiendo productos",
              "Alguien describe su desayuno favorito",
            ],
            correctIndex: 1,
          },
          {
            sentence: "The weather is beautiful today. Let's go to the park!",
            translation:
              "El clima está hermoso hoy. ¡Vamos al parque!",
            options: [
              "Alguien se queja de la lluvia",
              "Alguien quiere quedarse en casa",
              "Alguien sugiere ir al parque porque hace buen tiempo",
              "Alguien mira la televisión",
            ],
            correctIndex: 2,
          },
          {
            sentence: "My phone is on the table next to the chair.",
            translation:
              "Mi teléfono está sobre la mesa al lado de la silla.",
            options: [
              "Alguien perdió su teléfono",
              "Alguien describe dónde está su teléfono",
              "Alguien compró un teléfono nuevo",
              "Alguien está hablando por teléfono",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    title: "Tomando vuelo",
    description:
      "Tiempos verbales complejos, conversación fluida y comprensión auditiva para situaciones del mundo real.",
    color: "#7AAEE8",
    bgLight: "#E6F1FB",
    textColor: "#185FA5",
    modules: [
      {
        id: "past-future",
        name: "Past & Future Tenses",
        description:
          "Aprendé a hablar del pasado y del futuro con confianza usando tiempos verbales correctos.",
        quiz: [
          {
            question: '¿Cuál es el pasado de "go"?',
            options: ["goed", "went", "gone", "going"],
            correctIndex: 1,
          },
          {
            question: '"I will travel to London next year" habla del:',
            options: ["Pasado", "Presente", "Futuro", "Condicional"],
            correctIndex: 2,
          },
          {
            question: 'Completá: "She ___ a great movie last night."',
            options: ["watch", "watches", "watched", "watching"],
            correctIndex: 2,
          },
          {
            question: '"Were you at the party?" es una pregunta sobre:',
            options: [
              "Si vas a ir a la fiesta",
              "Si estás en la fiesta ahora",
              "Si estuviste en la fiesta",
              "Si te gustan las fiestas",
            ],
            correctIndex: 2,
          },
          {
            question: '"I am going to study medicine" expresa:',
            options: [
              "Una rutina",
              "Un plan futuro",
              "Algo del pasado",
              "Una sugerencia",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Cuál es correcta? "They ___ in Paris for 3 years."',
            options: ["live", "lived", "living", "lives"],
            correctIndex: 1,
          },
          {
            question: '"Did you eat breakfast?" es una pregunta en:',
            options: ["Presente simple", "Pasado simple", "Futuro", "Presente perfecto"],
            correctIndex: 1,
          },
          {
            question: '"Tomorrow I will wake up early" — "will" indica:',
            options: ["Pasado", "Presente", "Futuro", "Condición"],
            correctIndex: 2,
          },
        ],
        wordSearch: {
          words: [
            { word: "WENT", translation: "Fue/Fui" },
            { word: "WILL", translation: "Va a (futuro)" },
            { word: "CAME", translation: "Vino/Vine" },
            { word: "TOOK", translation: "Tomó/Tomé" },
            { word: "MADE", translation: "Hizo/Hice" },
            { word: "GAVE", translation: "Dio/Di" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Yesterday",
            correctEmoji: "📅",
            options: ["📅", "🔮", "⏰", "🎯"],
          },
          {
            word: "Travel",
            correctEmoji: "✈️",
            options: ["🏠", "✈️", "🛋️", "📚"],
          },
          {
            word: "Dream",
            correctEmoji: "💭",
            options: ["💭", "💪", "💰", "💡"],
          },
          {
            word: "Birthday",
            correctEmoji: "🎂",
            options: ["🎄", "🎂", "🎃", "🎆"],
          },
          {
            word: "Graduate",
            correctEmoji: "🎓",
            options: ["🎓", "🏆", "📜", "🎪"],
          },
          {
            word: "Wedding",
            correctEmoji: "💒",
            options: ["🏥", "💒", "🏫", "🏰"],
          },
        ],
        situations: [
          {
            sentence: "I went to the beach last summer and it was amazing!",
            translation:
              "Fui a la playa el verano pasado y fue increíble!",
            options: [
              "Alguien planea ir a la playa este verano",
              "Alguien cuenta una experiencia pasada en la playa",
              "Alguien describe la playa en general",
              "Alguien invita a ir a la playa ahora",
            ],
            correctIndex: 1,
          },
          {
            sentence: "We are going to move to a new apartment next month.",
            translation:
              "Nos vamos a mudar a un departamento nuevo el mes que viene.",
            options: [
              "Ya se mudaron al departamento",
              "Están buscando departamento sin éxito",
              "Tienen un plan de mudanza para el futuro cercano",
              "Están decorando su departamento actual",
            ],
            correctIndex: 2,
          },
          {
            sentence: "Did you finish your homework before dinner?",
            translation:
              "¿Terminaste tu tarea antes de la cena?",
            options: [
              "Un padre pregunta si la tarea ya fue completada",
              "Un profesor asigna tarea nueva",
              "Alguien va a empezar su tarea",
              "Alguien está haciendo su tarea ahora",
            ],
            correctIndex: 0,
          },
          {
            sentence: "She will become a doctor after she graduates from university.",
            translation:
              "Ella se va a convertir en doctora después de graduarse de la universidad.",
            options: [
              "Ella ya es doctora",
              "Ella está estudiando para ser doctora en el futuro",
              "Ella decidió no ser doctora",
              "Ella trabaja en un hospital ahora",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "reading",
        name: "Reading comprensivo",
        description:
          "Mejorá tu comprensión lectora con textos de nivel intermedio y vocabulario contextual.",
        quiz: [
          {
            question: '"However" en un texto sirve para:',
            options: [
              "Agregar información",
              "Dar un ejemplo",
              "Mostrar contraste",
              "Concluir",
            ],
            correctIndex: 2,
          },
          {
            question: '"Meanwhile" significa:',
            options: ["Finalmente", "Mientras tanto", "Además", "Sin embargo"],
            correctIndex: 1,
          },
          {
            question: 'Si un texto dice "In conclusion...", ¿qué viene después?',
            options: [
              "Más ejemplos",
              "Un resumen o idea final",
              "Una nueva idea",
              "Una pregunta",
            ],
            correctIndex: 1,
          },
          {
            question: '"According to the article..." introduce:',
            options: [
              "Una opinión personal",
              "Información del texto",
              "Una pregunta",
              "Un dato inventado",
            ],
            correctIndex: 1,
          },
          {
            question: '"Furthermore" es similar a:',
            options: ["But", "Moreover", "Although", "Instead"],
            correctIndex: 1,
          },
          {
            question: 'Un "paragraph" es:',
            options: [
              "Una oración",
              "Un grupo de oraciones sobre una idea",
              "El título del texto",
              "La última palabra",
            ],
            correctIndex: 1,
          },
          {
            question: '"The main idea" de un texto se refiere a:',
            options: [
              "Un detalle menor",
              "El tema central del texto",
              "El nombre del autor",
              "La fecha de publicación",
            ],
            correctIndex: 1,
          },
          {
            question: '"Summarize" significa:',
            options: ["Copiar todo", "Resumir", "Traducir", "Ignorar"],
            correctIndex: 1,
          },
        ],
        wordSearch: {
          words: [
            { word: "STORY", translation: "Historia" },
            { word: "TOPIC", translation: "Tema" },
            { word: "FACTS", translation: "Hechos" },
            { word: "IDEAS", translation: "Ideas" },
            { word: "LEARN", translation: "Aprender" },
            { word: "THINK", translation: "Pensar" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Library",
            correctEmoji: "📚",
            options: ["🏪", "📚", "🏥", "🎭"],
          },
          {
            word: "Newspaper",
            correctEmoji: "📰",
            options: ["📰", "📖", "📝", "📫"],
          },
          {
            word: "Author",
            correctEmoji: "✍️",
            options: ["🎤", "✍️", "🎨", "📸"],
          },
          {
            word: "Dictionary",
            correctEmoji: "📖",
            options: ["📖", "📱", "🖥️", "📺"],
          },
          {
            word: "Letter",
            correctEmoji: "✉️",
            options: ["📦", "✉️", "🗂️", "📋"],
          },
          {
            word: "Magazine",
            correctEmoji: "📕",
            options: ["📕", "🎬", "🎵", "🎮"],
          },
        ],
        situations: [
          {
            sentence:
              "The article states that climate change is affecting many species worldwide.",
            translation:
              "El artículo dice que el cambio climático está afectando a muchas especies en todo el mundo.",
            options: [
              "Se habla de un artículo sobre animales en un zoológico",
              "Se menciona información de un artículo sobre cambio climático",
              "Alguien opina personalmente sobre el clima",
              "Se describe el pronóstico del tiempo",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "In summary, the experiment showed that plants grow faster with more sunlight.",
            translation:
              "En resumen, el experimento mostró que las plantas crecen más rápido con más luz solar.",
            options: [
              "Se está empezando a describir un experimento",
              "Se dan instrucciones para plantar",
              "Se concluye con los resultados de un experimento",
              "Se pide ayuda para un proyecto de ciencias",
            ],
            correctIndex: 2,
          },
          {
            sentence:
              "Although the movie received bad reviews, it became very popular among young audiences.",
            translation:
              "Aunque la película recibió malas críticas, se volvió muy popular entre el público joven.",
            options: [
              "La película fue un fracaso total",
              "La película gustó a todos",
              "A pesar de las malas críticas, la película tuvo éxito con los jóvenes",
              "Los jóvenes escribieron malas críticas de la película",
            ],
            correctIndex: 2,
          },
          {
            sentence:
              "Can you identify the main idea of the second paragraph?",
            translation:
              "¿Podés identificar la idea principal del segundo párrafo?",
            options: [
              "Un profesor pide que escribas un párrafo",
              "Un profesor te pide que encuentres la idea central de un párrafo",
              "Alguien quiere que traduzcas un texto",
              "Alguien te pide que leas en voz alta",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "speaking",
        name: "Expresión oral",
        description:
          "Practicá tu expresión oral con frases útiles para conversaciones cotidianas y profesionales.",
        quiz: [
          {
            question:
              '¿Cuál es más formal? "Can I..." o "Could I..."?',
            options: ["Can I", "Could I", "Son iguales", "Ninguna"],
            correctIndex: 1,
          },
          {
            question: '"I would like to..." es una forma educada de:',
            options: [
              "Rechazar algo",
              "Pedir algo",
              "Quejarse",
              "Despedirse",
            ],
            correctIndex: 1,
          },
          {
            question: '"In my opinion..." se usa para:',
            options: [
              "Dar un dato objetivo",
              "Expresar una opinión personal",
              "Hacer una pregunta",
              "Dar una orden",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Qué significa "I agree with you"?',
            options: [
              "No estoy de acuerdo",
              "Estoy de acuerdo contigo",
              "No te entiendo",
              "Tengo una pregunta",
            ],
            correctIndex: 1,
          },
          {
            question: '"Could you repeat that, please?" se usa cuando:',
            options: [
              "Entendiste perfectamente",
              "No escuchaste o no entendiste algo",
              "Querés cambiar de tema",
              "Estás enojado",
            ],
            correctIndex: 1,
          },
          {
            question: '"I\'m sorry, I didn\'t catch that" es similar a:',
            options: [
              "Estoy triste",
              "No te escuché bien",
              "No me importa",
              "Estoy de acuerdo",
            ],
            correctIndex: 1,
          },
          {
            question: '"Let me think about it" expresa:',
            options: [
              "Rechazo inmediato",
              "Acuerdo total",
              "Necesidad de pensar antes de responder",
              "Que no querés hablar",
            ],
            correctIndex: 2,
          },
          {
            question: '"What do you think about...?" se usa para:',
            options: [
              "Dar tu opinión",
              "Pedir la opinión de alguien",
              "Cambiar de tema",
              "Terminar una conversación",
            ],
            correctIndex: 1,
          },
        ],
        wordSearch: {
          words: [
            { word: "SPEAK", translation: "Hablar" },
            { word: "AGREE", translation: "Acordar" },
            { word: "THINK", translation: "Pensar" },
            { word: "SHARE", translation: "Compartir" },
            { word: "VOICE", translation: "Voz" },
            { word: "REPLY", translation: "Responder" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Microphone",
            correctEmoji: "🎤",
            options: ["🎤", "🔊", "📻", "🎧"],
          },
          {
            word: "Conversation",
            correctEmoji: "💬",
            options: ["📞", "💬", "📧", "📢"],
          },
          {
            word: "Presentation",
            correctEmoji: "📊",
            options: ["📊", "📝", "🖥️", "🎬"],
          },
          {
            word: "Question",
            correctEmoji: "❓",
            options: ["❗", "❓", "💡", "🔔"],
          },
          {
            word: "Interview",
            correctEmoji: "🤝",
            options: ["🤝", "👋", "✋", "🙏"],
          },
          {
            word: "Debate",
            correctEmoji: "🗣️",
            options: ["🗣️", "🤫", "😶", "👂"],
          },
        ],
        situations: [
          {
            sentence: "Excuse me, could you please speak a little slower?",
            translation:
              "Disculpe, ¿podría hablar un poco más despacio, por favor?",
            options: [
              "Alguien está enojado porque le hablan rápido",
              "Alguien pide educadamente que hablen más despacio",
              "Alguien quiere que le repitan todo el discurso",
              "Alguien se va porque no entiende",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "I think we should consider other options before making a decision.",
            translation:
              "Creo que deberíamos considerar otras opciones antes de tomar una decisión.",
            options: [
              "Alguien ya tomó la decisión final",
              "Alguien sugiere explorar más opciones antes de decidir",
              "Alguien rechaza todas las opciones disponibles",
              "Alguien no quiere participar en la decisión",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "I see your point, but I respectfully disagree because...",
            translation:
              "Entiendo tu punto, pero respetuosamente no estoy de acuerdo porque...",
            options: [
              "Alguien acepta la opinión del otro completamente",
              "Alguien discute de forma grosera",
              "Alguien expresa desacuerdo de manera educada",
              "Alguien no escuchó lo que dijeron",
            ],
            correctIndex: 2,
          },
          {
            sentence:
              "To wrap up, I'd like to thank everyone for attending today's meeting.",
            translation:
              "Para terminar, me gustaría agradecer a todos por asistir a la reunión de hoy.",
            options: [
              "La reunión está empezando",
              "Alguien se queja de la reunión",
              "La reunión está terminando con un agradecimiento",
              "Alguien llega tarde a la reunión",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    title: "Fluidez total",
    description:
      "Inglés académico y profesional, escritura avanzada y preparación para certificaciones internacionales.",
    color: "#9B7AE8",
    bgLight: "#EEEDFE",
    textColor: "#534AB7",
    modules: [
      {
        id: "business",
        name: "Business English",
        description:
          "Dominá el inglés de negocios para reuniones, emails profesionales y presentaciones.",
        quiz: [
          {
            question: '"Please find attached the report" se usa en:',
            options: [
              "Una conversación casual",
              "Un email profesional",
              "Un mensaje de texto",
              "Una red social",
            ],
            correctIndex: 1,
          },
          {
            question: '"Deadline" significa:',
            options: ["Línea muerta", "Fecha límite", "Hora de almuerzo", "Fin de semana"],
            correctIndex: 1,
          },
          {
            question: '"KPI" en negocios se refiere a:',
            options: [
              "Un tipo de producto",
              "Un indicador clave de rendimiento",
              "Un puesto de trabajo",
              "Un tipo de reunión",
            ],
            correctIndex: 1,
          },
          {
            question: '"Stakeholder" es:',
            options: [
              "Un accionista o parte interesada",
              "Un tipo de inversión",
              "Un documento legal",
              "Un departamento",
            ],
            correctIndex: 0,
          },
          {
            question: '"I\'d like to schedule a meeting" significa:',
            options: [
              "Quiero cancelar una reunión",
              "Quiero programar una reunión",
              "Quiero asistir a una reunión",
              "La reunión ya terminó",
            ],
            correctIndex: 1,
          },
          {
            question: '"ROI" se traduce como:',
            options: [
              "Retorno sobre la inversión",
              "Registro de operaciones internas",
              "Red de operaciones internacionales",
              "Reporte oficial interno",
            ],
            correctIndex: 0,
          },
          {
            question: '"Let\'s touch base next week" significa:',
            options: [
              "Vamos a jugar la semana que viene",
              "Pongámonos en contacto la semana que viene",
              "Terminemos el proyecto esta semana",
              "No hablemos hasta la semana que viene",
            ],
            correctIndex: 1,
          },
          {
            question: '"ASAP" significa:',
            options: [
              "As Slow As Possible",
              "As Soon As Possible",
              "Always Send A Paper",
              "After Several Approval Processes",
            ],
            correctIndex: 1,
          },
        ],
        wordSearch: {
          words: [
            { word: "BRAND", translation: "Marca" },
            { word: "SALES", translation: "Ventas" },
            { word: "PITCH", translation: "Propuesta" },
            { word: "ASSET", translation: "Activo" },
            { word: "AUDIT", translation: "Auditoría" },
            { word: "MERGE", translation: "Fusión" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Office",
            correctEmoji: "🏢",
            options: ["🏠", "🏢", "🏪", "🏫"],
          },
          {
            word: "Meeting",
            correctEmoji: "👥",
            options: ["👤", "👥", "👻", "🎭"],
          },
          {
            word: "Contract",
            correctEmoji: "📝",
            options: ["📝", "📱", "🖥️", "📸"],
          },
          {
            word: "Chart",
            correctEmoji: "📊",
            options: ["📊", "📚", "📰", "📋"],
          },
          {
            word: "Money",
            correctEmoji: "💰",
            options: ["🎯", "💰", "🏆", "⭐"],
          },
          {
            word: "Email",
            correctEmoji: "📧",
            options: ["📧", "📞", "📺", "📻"],
          },
        ],
        situations: [
          {
            sentence:
              "Dear Mr. Johnson, I'm writing to follow up on our previous discussion regarding the Q3 budget.",
            translation:
              "Estimado Sr. Johnson, le escribo para dar seguimiento a nuestra discusión previa sobre el presupuesto del Q3.",
            options: [
              "Un amigo le escribe a otro casualmente",
              "Un profesional hace seguimiento por email de un tema de negocio",
              "Alguien se queja del servicio al cliente",
              "Un estudiante escribe a su profesor",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "We need to pivot our strategy to adapt to the current market trends.",
            translation:
              "Necesitamos girar nuestra estrategia para adaptarnos a las tendencias actuales del mercado.",
            options: [
              "Una empresa mantiene la misma estrategia siempre",
              "Una empresa necesita cambiar su enfoque por cambios en el mercado",
              "Una empresa cierra definitivamente",
              "Un empleado renuncia a su trabajo",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "Could you send me the updated spreadsheet by end of business today?",
            translation:
              "¿Podrías enviarme la planilla actualizada antes del cierre del día laboral de hoy?",
            options: [
              "Alguien pide un documento con fecha límite para hoy",
              "Alguien quiere una reunión mañana",
              "Alguien ofrece ayuda con un proyecto",
              "Alguien cancela un pedido",
            ],
            correctIndex: 0,
          },
          {
            sentence:
              "The quarterly report shows a 15% increase in revenue compared to last year.",
            translation:
              "El reporte trimestral muestra un incremento del 15% en ingresos comparado con el año pasado.",
            options: [
              "La empresa perdió dinero este trimestre",
              "Se presentan resultados financieros positivos",
              "Se planifica el presupuesto del año siguiente",
              "Se anuncia una nueva contratación",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "academic-writing",
        name: "Escritura académica",
        description:
          "Aprendé a escribir ensayos, reportes y textos académicos con estructura y vocabulario avanzado.",
        quiz: [
          {
            question: 'Un "thesis statement" es:',
            options: [
              "La conclusión del ensayo",
              "La idea principal que se defiende en el ensayo",
              "Un ejemplo del texto",
              "Una cita textual",
            ],
            correctIndex: 1,
          },
          {
            question: '"Furthermore" y "Moreover" son conectores de:',
            options: ["Contraste", "Causa", "Adición", "Tiempo"],
            correctIndex: 2,
          },
          {
            question: 'En escritura académica, se debe evitar:',
            options: [
              "Usar datos y evidencia",
              "Usar lenguaje informal y slang",
              "Citar fuentes",
              "Usar párrafos organizados",
            ],
            correctIndex: 1,
          },
          {
            question: '"Consequently" indica:',
            options: [
              "Contraste",
              "Causa y efecto / consecuencia",
              "Tiempo",
              "Ejemplo",
            ],
            correctIndex: 1,
          },
          {
            question: 'La estructura básica de un ensayo incluye:',
            options: [
              "Solo el cuerpo",
              "Introducción, cuerpo y conclusión",
              "Solo introducción y conclusión",
              "Título y bibliografía",
            ],
            correctIndex: 1,
          },
          {
            question: '"Paraphrase" significa:',
            options: [
              "Copiar textualmente",
              "Decir lo mismo con palabras propias",
              "Traducir a otro idioma",
              "Eliminar información",
            ],
            correctIndex: 1,
          },
          {
            question: '"Peer review" es:',
            options: [
              "Revisión del profesor",
              "Revisión por compañeros/pares",
              "Auto-evaluación",
              "Corrección automática",
            ],
            correctIndex: 1,
          },
          {
            question: '"Bibliography" o "References" va al:',
            options: [
              "Inicio del ensayo",
              "Medio del ensayo",
              "Final del ensayo",
              "No se incluye",
            ],
            correctIndex: 2,
          },
        ],
        wordSearch: {
          words: [
            { word: "ESSAY", translation: "Ensayo" },
            { word: "QUOTE", translation: "Cita" },
            { word: "DRAFT", translation: "Borrador" },
            { word: "CLAIM", translation: "Afirmación" },
            { word: "PROOF", translation: "Prueba" },
            { word: "SCOPE", translation: "Alcance" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Research",
            correctEmoji: "🔬",
            options: ["🔬", "🎮", "🎸", "🏈"],
          },
          {
            word: "University",
            correctEmoji: "🎓",
            options: ["🎓", "🏪", "🏥", "🏠"],
          },
          {
            word: "Document",
            correctEmoji: "📄",
            options: ["📱", "📄", "🖥️", "📺"],
          },
          {
            word: "Pencil",
            correctEmoji: "✏️",
            options: ["✏️", "🖌️", "🔧", "🔨"],
          },
          {
            word: "Globe",
            correctEmoji: "🌍",
            options: ["🌍", "⚽", "🎾", "🏐"],
          },
          {
            word: "Science",
            correctEmoji: "🧪",
            options: ["🧪", "🎨", "🎭", "🎬"],
          },
        ],
        situations: [
          {
            sentence:
              "This essay will argue that renewable energy is essential for sustainable development.",
            translation:
              "Este ensayo argumentará que la energía renovable es esencial para el desarrollo sostenible.",
            options: [
              "Es el cierre de un ensayo sobre energía",
              "Es la introducción de un ensayo con una tesis clara",
              "Es un artículo de periódico sobre energía solar",
              "Es una publicidad de paneles solares",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "According to Smith (2023), the results of the study suggest a strong correlation between education and income.",
            translation:
              "Según Smith (2023), los resultados del estudio sugieren una fuerte correlación entre educación e ingresos.",
            options: [
              "El autor da su opinión personal sin evidencia",
              "Se cita una fuente académica para respaldar una afirmación",
              "Se cuenta una anécdota personal",
              "Se describe un evento histórico",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "In conclusion, the evidence presented in this paper demonstrates that early intervention programs significantly improve outcomes.",
            translation:
              "En conclusión, la evidencia presentada en este trabajo demuestra que los programas de intervención temprana mejoran significativamente los resultados.",
            options: [
              "Se introduce un nuevo tema de investigación",
              "Se presenta una hipótesis nueva",
              "Se cierra un trabajo académico resumiendo la evidencia",
              "Se pide más tiempo para completar la investigación",
            ],
            correctIndex: 2,
          },
          {
            sentence:
              "Please revise your draft and ensure all citations follow APA format.",
            translation:
              "Por favor revisá tu borrador y asegurate de que todas las citas sigan el formato APA.",
            options: [
              "Un profesor pide que empiecen un nuevo ensayo",
              "Un profesor da instrucciones de revisión y formato",
              "Un estudiante entrega su trabajo final",
              "Alguien está leyendo un libro",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "certifications",
        name: "Prep. certificaciones",
        description:
          "Preparate para exámenes internacionales como IELTS, TOEFL y Cambridge con estrategias y práctica.",
        quiz: [
          {
            question: 'El examen IELTS evalúa:',
            options: [
              "Solo gramática",
              "Listening, Reading, Writing y Speaking",
              "Solo vocabulario",
              "Solo conversación",
            ],
            correctIndex: 1,
          },
          {
            question: 'En IELTS, la banda máxima es:',
            options: ["5", "7", "9", "10"],
            correctIndex: 2,
          },
          {
            question: '"Skimming" es una técnica de lectura para:',
            options: [
              "Leer cada palabra cuidadosamente",
              "Obtener la idea general rápidamente",
              "Memorizar vocabulario",
              "Escribir resúmenes",
            ],
            correctIndex: 1,
          },
          {
            question: '"Scanning" se usa para:',
            options: [
              "Entender el tono del autor",
              "Buscar información específica rápidamente",
              "Leer todo el texto lentamente",
              "Practicar pronunciación",
            ],
            correctIndex: 1,
          },
          {
            question: 'En el TOEFL, la sección "Integrated Writing" requiere:',
            options: [
              "Escribir una historia creativa",
              "Combinar información de una lectura y un audio",
              "Traducir un texto",
              "Completar espacios en blanco",
            ],
            correctIndex: 1,
          },
          {
            question: 'Un "FCE" (First Certificate in English) es nivel:',
            options: ["A2", "B1", "B2", "C1"],
            correctIndex: 2,
          },
          {
            question: 'Para mejorar "listening", se recomienda:',
            options: [
              "Leer muchos libros",
              "Escuchar podcasts y ver contenido en inglés",
              "Solo estudiar gramática",
              "Memorizar listas de palabras",
            ],
            correctIndex: 1,
          },
          {
            question: '"Time management" en un examen se refiere a:',
            options: [
              "Llegar temprano al examen",
              "Administrar bien el tiempo durante el examen",
              "Estudiar mucho tiempo antes",
              "Pedir tiempo extra",
            ],
            correctIndex: 1,
          },
        ],
        wordSearch: {
          words: [
            { word: "SCORE", translation: "Puntaje" },
            { word: "LEVEL", translation: "Nivel" },
            { word: "SKILL", translation: "Habilidad" },
            { word: "FOCUS", translation: "Enfoque" },
            { word: "TIMER", translation: "Cronómetro" },
            { word: "PAPER", translation: "Papel/Examen" },
          ],
          gridSize: 10,
        },
        pictureMatch: [
          {
            word: "Exam",
            correctEmoji: "📝",
            options: ["📝", "📱", "📺", "🎮"],
          },
          {
            word: "Certificate",
            correctEmoji: "📜",
            options: ["📜", "📦", "📫", "📁"],
          },
          {
            word: "Headphones",
            correctEmoji: "🎧",
            options: ["🎧", "🎤", "🔊", "📻"],
          },
          {
            word: "Clock",
            correctEmoji: "⏰",
            options: ["📅", "⏰", "🔔", "⏳"],
          },
          {
            word: "Medal",
            correctEmoji: "🏅",
            options: ["🏅", "🎗️", "🏆", "⭐"],
          },
          {
            word: "Notebook",
            correctEmoji: "📓",
            options: ["📓", "📱", "💻", "🖨️"],
          },
        ],
        situations: [
          {
            sentence:
              "You will have 60 minutes to complete the reading section. Begin now.",
            translation:
              "Tendrán 60 minutos para completar la sección de lectura. Comiencen ahora.",
            options: [
              "Un profesor da tarea para casa",
              "Un examinador da instrucciones para una sección del examen",
              "Alguien lee un libro en la biblioteca",
              "Un estudiante pide más tiempo",
            ],
            correctIndex: 1,
          },
          {
            sentence:
              "Listen to the recording carefully and answer questions 1 through 10.",
            translation:
              "Escuchá la grabación cuidadosamente y respondé las preguntas 1 a 10.",
            options: [
              "Instrucciones para un ejercicio de listening en un examen",
              "Alguien pide que escuches música",
              "Un profesor explica un tema nuevo",
              "Alguien recomienda un podcast",
            ],
            correctIndex: 0,
          },
          {
            sentence:
              "I've been preparing for the IELTS for three months and I feel much more confident now.",
            translation:
              "Estuve preparándome para el IELTS durante tres meses y me siento mucho más seguro ahora.",
            options: [
              "Alguien decidió no tomar el examen",
              "Alguien acaba de descubrir qué es el IELTS",
              "Alguien habla de su preparación exitosa para el IELTS",
              "Alguien fracasó en el examen IELTS",
            ],
            correctIndex: 2,
          },
          {
            sentence:
              "Your overall band score is 7.5, which meets the requirements for most universities.",
            translation:
              "Tu puntaje general es 7.5, lo cual cumple los requisitos de la mayoría de universidades.",
            options: [
              "Un estudiante recibe un puntaje bajo",
              "Un estudiante recibe un resultado que le permite postularse a universidades",
              "Una universidad rechaza a un estudiante",
              "Alguien estudia para subir su puntaje",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

// ============================================================
// Ebook Data — Content, chapters, and comprehension questions
// ============================================================

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  questions: ComprehensionQuestion[];
}

export interface EbookData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  level: string;
  price: string;
  description: string;
  color: string;
  bgLight: string;
  textColor: string;
  pages: number;
  chapters: Chapter[];
}

export const ebooksData: EbookData[] = [
  {
    id: "a1",
    title: "Ebook A1 — Fundamentos",
    subtitle: "Tu primera guía para aprender inglés desde cero",
    tag: "Beginner",
    level: "A1",
    price: "$9.990",
    description:
      "Este ebook cubre los fundamentos del inglés: el alfabeto, saludos, presentaciones, números, colores, y las estructuras más básicas para comenzar a comunicarte. Ideal para quienes nunca estudiaron inglés o quieren repasar las bases.",
    color: "#8DC87A",
    bgLight: "#EAF5E5",
    textColor: "#3B6D11",
    pages: 48,
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1: Greetings & Introductions",
        content: `# Greetings & Introductions

When we meet someone for the first time, we use **greetings** to start a conversation. The most common greeting in English is **"Hello"** or **"Hi"**. These can be used at any time of the day.

## Time-specific greetings

- **Good morning** — Used from sunrise until noon (12:00 PM)
- **Good afternoon** — Used from noon until around 5:00 or 6:00 PM
- **Good evening** — Used from around 5:00 or 6:00 PM onwards
- **Good night** — Used when saying goodbye at night, or before going to sleep

## Introducing yourself

When you want to tell someone your name, you can say:
- "My name is [name]." — *Mi nombre es [nombre].*
- "I'm [name]." — *Soy [nombre].*
- "Nice to meet you." — *Mucho gusto.*

## Example conversation

> **Anna:** Hello! My name is Anna. What's your name?
> **Ben:** Hi Anna! I'm Ben. Nice to meet you!
> **Anna:** Nice to meet you too, Ben! How are you?
> **Ben:** I'm fine, thank you. And you?
> **Anna:** I'm great, thanks!

## Key vocabulary

| English | Spanish |
|---------|---------|
| Hello / Hi | Hola |
| Good morning | Buen día |
| Good afternoon | Buenas tardes |
| Good evening | Buenas noches (saludo) |
| Good night | Buenas noches (despedida) |
| Goodbye / Bye | Adiós |
| See you later | Nos vemos |
| Nice to meet you | Mucho gusto |
| How are you? | ¿Cómo estás? |
| I'm fine | Estoy bien |`,
        questions: [
          {
            question: '¿Cuál es el saludo más común en inglés?',
            options: ["Good night", "Hello / Hi", "See you", "Goodbye"],
            correctIndex: 1,
          },
          {
            question: '"Good morning" se usa desde:',
            options: [
              "El mediodía hasta la noche",
              "El amanecer hasta el mediodía",
              "Las 6 PM en adelante",
              "Solo al despertar",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Qué responde Ben cuando Anna se presenta?',
            options: [
              "Goodbye, Anna",
              "I'm Ben. Nice to meet you!",
              "See you later",
              "Good night",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "ch2",
        title: "Chapter 2: Numbers & Colors",
        content: `# Numbers & Colors

## Numbers 1-20

Learning numbers is essential for everyday life. Here are the numbers from 1 to 20:

| Number | English | Number | English |
|--------|---------|--------|---------|
| 1 | One | 11 | Eleven |
| 2 | Two | 12 | Twelve |
| 3 | Three | 13 | Thirteen |
| 4 | Four | 14 | Fourteen |
| 5 | Five | 15 | Fifteen |
| 6 | Six | 16 | Sixteen |
| 7 | Seven | 17 | Seventeen |
| 8 | Eight | 18 | Eighteen |
| 9 | Nine | 19 | Nineteen |
| 10 | Ten | 20 | Twenty |

## Colors

Colors are adjectives that describe the appearance of objects. The basic colors are:

- 🔴 **Red** — Rojo
- 🟠 **Orange** — Naranja
- 🟡 **Yellow** — Amarillo
- 🟢 **Green** — Verde
- 🔵 **Blue** — Azul
- 🟣 **Purple** — Morado/Violeta
- ⚫ **Black** — Negro
- ⚪ **White** — Blanco
- 🟤 **Brown** — Marrón
- 💗 **Pink** — Rosa

## Example sentences

- "I have **three** cats." — *Tengo tres gatos.*
- "The sky is **blue**." — *El cielo es azul.*
- "She has **two** **red** apples." — *Ella tiene dos manzanas rojas.*
- "There are **five** **green** trees in the park." — *Hay cinco árboles verdes en el parque.*

## Asking about colors and numbers

- "What color is it?" — *¿De qué color es?*
- "How many do you have?" — *¿Cuántos tenés?*
- "What number is this?" — *¿Qué número es este?*`,
        questions: [
          {
            question: '¿Cómo se dice el número 15 en inglés?',
            options: ["Fiveteen", "Fifteen", "Fifthteen", "Fifty"],
            correctIndex: 1,
          },
          {
            question: '¿Cuál es el color "Green" en español?',
            options: ["Gris", "Grande", "Verde", "Naranja"],
            correctIndex: 2,
          },
          {
            question: '"How many do you have?" pregunta sobre:',
            options: [
              "El color de algo",
              "La cantidad de algo",
              "El nombre de algo",
              "El tamaño de algo",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "ch3",
        title: "Chapter 3: The Alphabet & Spelling",
        content: `# The Alphabet & Spelling

The English alphabet has **26 letters**: 5 vowels (A, E, I, O, U) and 21 consonants.

## The Alphabet

**A** /eɪ/ · **B** /biː/ · **C** /siː/ · **D** /diː/ · **E** /iː/ · **F** /ɛf/ · **G** /dʒiː/ · **H** /eɪtʃ/ · **I** /aɪ/ · **J** /dʒeɪ/ · **K** /keɪ/ · **L** /ɛl/ · **M** /ɛm/ · **N** /ɛn/ · **O** /oʊ/ · **P** /piː/ · **Q** /kjuː/ · **R** /ɑːr/ · **S** /ɛs/ · **T** /tiː/ · **U** /juː/ · **V** /viː/ · **W** /ˈdʌbəljuː/ · **X** /ɛks/ · **Y** /waɪ/ · **Z** /ziː/

## Spelling your name

When someone asks you to spell your name, you say each letter individually:

> "My name is Carlos. C-A-R-L-O-S."

**Useful phrases:**
- "How do you spell that?" — *¿Cómo se deletrea eso?*
- "Can you spell your name, please?" — *¿Podés deletrear tu nombre, por favor?*
- "It's spelled M-A-R-I-A." — *Se deletrea M-A-R-I-A.*

## Vowels vs. Consonants

The **5 vowels** are the most important sounds:
- **A, E, I, O, U**

All other letters are **consonants**. Vowels are important because every English word needs at least one vowel sound.

## Common spelling challenges

Some letters sound similar and can be confusing:
- **B** /biː/ vs. **V** /viː/
- **G** /dʒiː/ vs. **J** /dʒeɪ/
- **M** /ɛm/ vs. **N** /ɛn/

**Tip:** Practice saying the alphabet out loud every day until you feel comfortable!`,
        questions: [
          {
            question: '¿Cuántas letras tiene el alfabeto inglés?',
            options: ["24", "25", "26", "27"],
            correctIndex: 2,
          },
          {
            question: '¿Cuántas vocales hay en el alfabeto inglés?',
            options: ["4", "5", "6", "7"],
            correctIndex: 1,
          },
          {
            question: '"How do you spell that?" pregunta:',
            options: [
              "Cómo se pronuncia algo",
              "Cómo se deletrea algo",
              "Qué significa algo",
              "Dónde se encuentra algo",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: "a2",
    title: "Ebook A2 — Conversación",
    subtitle: "Frases esenciales para comunicarte en el día a día",
    tag: "Beginner",
    level: "A2",
    price: "$11.990",
    description:
      "Llevá tu inglés básico al siguiente nivel con este ebook enfocado en conversación cotidiana. Aprendé frases para ir de compras, pedir comida, dar direcciones y mucho más.",
    color: "#E8A87A",
    bgLight: "#FDF0E8",
    textColor: "#9B5B2B",
    pages: 56,
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1: At the Restaurant",
        content: `# At the Restaurant

Going to a restaurant is one of the most common situations where you'll need English. Let's learn the key phrases!

## Making a reservation

> **You:** Hello, I'd like to make a reservation for tonight.
> **Host:** Of course! How many people?
> **You:** A table for two, please.
> **Host:** What time?
> **You:** At 8 o'clock, please.
> **Host:** Perfect. Your name?
> **You:** Maria González.

## Ordering food

When the waiter comes to take your order:

- "I'd like the chicken, please." — *Me gustaría el pollo, por favor.*
- "Can I have the pasta?" — *¿Puedo pedir la pasta?*
- "I'll have the soup as a starter." — *Voy a pedir la sopa de entrada.*
- "What do you recommend?" — *¿Qué recomiendan?*

## Asking about the menu

- "What's the special today?" — *¿Cuál es el especial de hoy?*
- "Does this dish contain nuts?" — *¿Este plato contiene nueces?*
- "Is this spicy?" — *¿Es picante?*
- "Can I see the dessert menu?" — *¿Puedo ver el menú de postres?*

## Paying

- "Can I have the bill, please?" — *¿Me trae la cuenta, por favor?*
- "Do you accept credit cards?" — *¿Aceptan tarjeta de crédito?*
- "Keep the change." — *Quedate con el cambio.*

## Key vocabulary

| English | Spanish |
|---------|---------|
| Menu | Menú |
| Starter / Appetizer | Entrada |
| Main course | Plato principal |
| Dessert | Postre |
| Drink / Beverage | Bebida |
| Bill / Check | Cuenta |
| Waiter / Waitress | Mesero/a |
| Tip | Propina |`,
        questions: [
          {
            question: '"I\'d like to make a reservation" se usa para:',
            options: [
              "Pedir la cuenta",
              "Reservar una mesa",
              "Quejarse de la comida",
              "Pedir el menú",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Cómo se pide la cuenta en inglés?',
            options: [
              "I'd like the chicken",
              "Can I have the bill?",
              "What's the special today?",
              "A table for two, please",
            ],
            correctIndex: 1,
          },
          {
            question: '"Starter" o "Appetizer" significa:',
            options: ["Postre", "Plato principal", "Entrada", "Bebida"],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "ch2",
        title: "Chapter 2: Shopping",
        content: `# Shopping

Whether you're buying clothes, electronics, or groceries, knowing how to shop in English is essential!

## Entering a store

The shop assistant might say:
- "Can I help you?" — *¿Puedo ayudarte?*
- "Are you looking for something specific?" — *¿Buscás algo en particular?*

You can reply:
- "I'm just looking, thanks." — *Solo estoy mirando, gracias.*
- "Yes, I'm looking for a jacket." — *Sí, estoy buscando una campera.*

## Asking about products

- "How much is this?" — *¿Cuánto cuesta esto?*
- "How much does this cost?" — *¿Cuánto sale esto?*
- "Do you have this in a different size?" — *¿Tienen esto en otro talle?*
- "Do you have this in blue?" — *¿Tienen esto en azul?*
- "Is this on sale?" — *¿Esto está en oferta?*

## Trying on clothes

- "Can I try this on?" — *¿Puedo probarme esto?*
- "Where is the fitting room?" — *¿Dónde está el probador?*
- "It's too big / too small." — *Es muy grande / muy chico.*
- "It fits perfectly!" — *¡Me queda perfecto!*

## Paying

- "I'll take this one." — *Me llevo este.*
- "Can I pay by card?" — *¿Puedo pagar con tarjeta?*
- "Do you have a bag?" — *¿Tienen bolsa?*

## Common sizes

| Size | Abbreviation |
|------|-------------|
| Extra Small | XS |
| Small | S |
| Medium | M |
| Large | L |
| Extra Large | XL |`,
        questions: [
          {
            question: '"How much is this?" pregunta sobre:',
            options: [
              "El color del producto",
              "El precio del producto",
              "El tamaño del producto",
              "La marca del producto",
            ],
            correctIndex: 1,
          },
          {
            question: '"Can I try this on?" se usa para:',
            options: [
              "Pedir un descuento",
              "Probarse una prenda de ropa",
              "Devolver un producto",
              "Pedir un talle diferente",
            ],
            correctIndex: 1,
          },
          {
            question: 'Si algo es "too small", significa que:',
            options: [
              "Es perfecto",
              "Es muy grande",
              "Es muy chico",
              "Es muy caro",
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "ch3",
        title: "Chapter 3: Giving Directions",
        content: `# Giving Directions

Being able to ask for and give directions is very important when traveling or living in an English-speaking country.

## Asking for directions

- "Excuse me, how do I get to the train station?" — *Disculpe, ¿cómo llego a la estación de tren?*
- "Where is the nearest pharmacy?" — *¿Dónde queda la farmacia más cercana?*
- "Is there a bank near here?" — *¿Hay un banco cerca de acá?*
- "Can you show me on the map?" — *¿Me podés mostrar en el mapa?*

## Giving directions

- "Go straight." — *Andá derecho.*
- "Turn left / Turn right." — *Doblá a la izquierda / derecha.*
- "It's on the corner." — *Está en la esquina.*
- "It's next to the supermarket." — *Está al lado del supermercado.*
- "It's across from the park." — *Está enfrente del parque.*
- "It's two blocks away." — *Está a dos cuadras.*
- "Take the first left." — *Tomá la primera a la izquierda.*

## Prepositions of place

| Preposition | Spanish | Example |
|-------------|---------|---------|
| Next to | Al lado de | The bank is next to the school. |
| Across from | Enfrente de | The café is across from the library. |
| Between | Entre | The shop is between the bank and the pharmacy. |
| On the corner of | En la esquina de | It's on the corner of Main St. and 5th Ave. |
| Behind | Detrás de | The parking lot is behind the building. |
| In front of | Delante de | There's a fountain in front of the museum. |

## Example dialogue

> **Tourist:** Excuse me, how do I get to the museum?
> **Local:** Sure! Go straight for two blocks, then turn right. The museum is on the left, next to the library.
> **Tourist:** Thank you so much!
> **Local:** You're welcome! It's about a 5-minute walk.`,
        questions: [
          {
            question: '"Turn left" significa:',
            options: [
              "Doblá a la derecha",
              "Andá derecho",
              "Doblá a la izquierda",
              "Volvé para atrás",
            ],
            correctIndex: 2,
          },
          {
            question: '"Across from" se traduce como:',
            options: ["Detrás de", "Al lado de", "Enfrente de", "Lejos de"],
            correctIndex: 2,
          },
          {
            question: 'En el diálogo, ¿dónde está el museo?',
            options: [
              "A la izquierda, al lado de la biblioteca",
              "A la derecha, detrás de la biblioteca",
              "En la esquina, enfrente del parque",
              "A dos cuadras a la izquierda",
            ],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "b1",
    title: "Ebook B1 — Progreso",
    subtitle: "Mejorá tu fluidez con textos y ejercicios intermedios",
    tag: "Intermediate",
    level: "B1",
    price: "$13.990",
    description:
      "Este ebook te ayuda a avanzar de un nivel básico a intermedio. Incluye textos más complejos, expresiones idiomáticas, y ejercicios de comprensión que desafían tu inglés.",
    color: "#7AAEE8",
    bgLight: "#E6F1FB",
    textColor: "#185FA5",
    pages: 72,
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1: Everyday Idioms",
        content: `# Everyday Idioms

An **idiom** is a phrase that has a different meaning from the literal meaning of each word. Idioms make your English sound more natural and fluent!

## Common Idioms

### 1. "Break the ice"
**Meaning:** To start a conversation in a social situation, especially with someone you don't know.
**Example:** "The teacher told a joke to break the ice on the first day of class."

### 2. "Hit the nail on the head"
**Meaning:** To describe exactly what is causing a situation or problem.
**Example:** "You hit the nail on the head — the issue is poor communication."

### 3. "Under the weather"
**Meaning:** To feel sick or unwell.
**Example:** "I'm feeling a bit under the weather today, so I'll stay home."

### 4. "A piece of cake"
**Meaning:** Something that is very easy to do.
**Example:** "The test was a piece of cake! I finished in 20 minutes."

### 5. "Let the cat out of the bag"
**Meaning:** To reveal a secret accidentally.
**Example:** "She let the cat out of the bag about the surprise party."

### 6. "Once in a blue moon"
**Meaning:** Something that happens very rarely.
**Example:** "I only eat fast food once in a blue moon."

### 7. "Cost an arm and a leg"
**Meaning:** To be very expensive.
**Example:** "That car costs an arm and a leg! I can't afford it."

### 8. "The ball is in your court"
**Meaning:** It's your turn to make a decision or take action.
**Example:** "I've done everything I can. The ball is in your court now."

## How to use idioms

Idioms should be used in **informal** conversations. In formal writing (academic essays, business reports), it's better to use direct language instead.

**Tip:** Learn idioms in context! Don't try to translate them word by word — focus on the overall meaning.`,
        questions: [
          {
            question: '"A piece of cake" significa que algo es:',
            options: [
              "Delicioso",
              "Muy fácil",
              "Muy caro",
              "Muy raro",
            ],
            correctIndex: 1,
          },
          {
            question: '"Under the weather" se usa cuando alguien:',
            options: [
              "Está afuera con lluvia",
              "Se siente enfermo",
              "Está muy contento",
              "Estudia el clima",
            ],
            correctIndex: 1,
          },
          {
            question: '¿Dónde NO deberías usar idioms?',
            options: [
              "En conversaciones casuales",
              "Con amigos",
              "En escritura académica formal",
              "En mensajes de texto",
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "ch2",
        title: "Chapter 2: Phrasal Verbs",
        content: `# Phrasal Verbs

**Phrasal verbs** are combinations of a verb + a preposition (or adverb) that create a new meaning. They are extremely common in everyday English!

## Essential Phrasal Verbs

### Look
- **Look up** — Buscar (en un diccionario, en internet)
  - "I need to look up this word."
- **Look after** — Cuidar
  - "She looks after her younger brother."
- **Look forward to** — Esperar con ansias
  - "I'm looking forward to the weekend!"

### Get
- **Get up** — Levantarse
  - "I get up at 7 AM every day."
- **Get along with** — Llevarse bien con
  - "I get along well with my coworkers."
- **Get over** — Superar (algo)
  - "It took him months to get over the breakup."

### Turn
- **Turn on / Turn off** — Encender / Apagar
  - "Turn off the lights before you leave."
- **Turn down** — Rechazar / Bajar (volumen)
  - "She turned down the job offer."
- **Turn up** — Aparecer / Subir (volumen)
  - "He turned up late to the meeting."

### Put
- **Put on** — Ponerse (ropa)
  - "Put on your jacket, it's cold outside."
- **Put off** — Posponer
  - "Don't put off your homework!"
- **Put up with** — Tolerar
  - "I can't put up with this noise anymore."

### Give
- **Give up** — Rendirse / Dejar (un hábito)
  - "Never give up on your dreams!"
- **Give back** — Devolver
  - "Please give back the book when you're done."

## Tips for learning phrasal verbs

1. **Learn them in context** — Don't memorize lists, read and listen to examples
2. **Practice with sentences** — Write your own sentences using each phrasal verb
3. **Group by verb** — Study all phrasal verbs with "get", then "look", etc.`,
        questions: [
          {
            question: '"Look forward to" significa:',
            options: [
              "Mirar hacia adelante físicamente",
              "Esperar algo con ansias",
              "Buscar algo que se perdió",
              "Cuidar a alguien",
            ],
            correctIndex: 1,
          },
          {
            question: '"Turn down" puede significar:',
            options: [
              "Encender",
              "Rechazar o bajar el volumen",
              "Aparecer en algún lugar",
              "Levantarse de la cama",
            ],
            correctIndex: 1,
          },
          {
            question: '"Give up" se traduce como:',
            options: ["Dar más", "Devolver", "Rendirse o dejar un hábito", "Regalar"],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "ch3",
        title: "Chapter 3: Connectors & Linking Words",
        content: `# Connectors & Linking Words

**Connectors** (also called **linking words**) are words and phrases that connect ideas in a text. They help your writing and speaking flow more naturally.

## Types of Connectors

### Addition (Agregar información)
- **And** — Y
- **Also** — También
- **Furthermore** — Además
- **Moreover** — Es más
- **In addition** — Adicionalmente

**Example:** "She speaks English. **Furthermore**, she is learning French."

### Contrast (Mostrar contraste)
- **But** — Pero
- **However** — Sin embargo
- **Although / Even though** — Aunque
- **On the other hand** — Por otro lado
- **Nevertheless** — No obstante

**Example:** "The movie was long. **However**, it was very entertaining."

### Cause & Effect (Causa y efecto)
- **Because** — Porque
- **Therefore** — Por lo tanto
- **As a result** — Como resultado
- **Consequently** — Consecuentemente
- **Due to** — Debido a

**Example:** "He studied hard. **Therefore**, he passed the exam."

### Sequence (Secuencia / Orden)
- **First / Firstly** — Primero
- **Then / Next** — Luego
- **After that** — Después de eso
- **Finally** — Finalmente
- **Meanwhile** — Mientras tanto

**Example:** "**First**, preheat the oven. **Then**, mix the ingredients. **Finally**, bake for 30 minutes."

### Conclusion
- **In conclusion** — En conclusión
- **To sum up** — Para resumir
- **In summary** — En resumen
- **All in all** — En general

**Example:** "**In conclusion**, learning connectors will significantly improve your writing."

## Practice tip

When writing, try to use at least 3-4 different connectors. This shows variety and makes your text more engaging!`,
        questions: [
          {
            question: '"However" es un conector de:',
            options: ["Adición", "Contraste", "Causa y efecto", "Secuencia"],
            correctIndex: 1,
          },
          {
            question: '"Therefore" indica:',
            options: [
              "Contraste",
              "Adición",
              "Consecuencia / Causa y efecto",
              "Secuencia temporal",
            ],
            correctIndex: 2,
          },
          {
            question: '¿Cuál de estos es un conector de conclusión?',
            options: ["Furthermore", "Meanwhile", "In summary", "Because"],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: "b2",
    title: "Ebook B2 — Dominio",
    subtitle: "Llevá tu inglés al nivel profesional",
    tag: "Intermediate",
    level: "B2",
    price: "$15.990",
    description:
      "Este ebook está diseñado para estudiantes que quieren alcanzar un nivel intermedio-alto. Cubre temas complejos como condicionales, voz pasiva, reported speech y expresiones avanzadas.",
    color: "#9B7AE8",
    bgLight: "#EEEDFE",
    textColor: "#534AB7",
    pages: 84,
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1: Conditionals",
        content: `# Conditionals

**Conditionals** are sentences that describe situations and their possible results. There are four main types in English.

## Zero Conditional — General truths

**Structure:** If + present simple, present simple
**Use:** For things that are always true.

- "If you heat water to 100°C, it boils."
- "If you don't sleep enough, you feel tired."

## First Conditional — Real possibilities

**Structure:** If + present simple, will + infinitive
**Use:** For things that are likely to happen in the future.

- "If it rains tomorrow, I **will** stay home."
- "If you study hard, you **will** pass the exam."
- "I **won't** go out if it's too cold."

## Second Conditional — Hypothetical situations

**Structure:** If + past simple, would + infinitive
**Use:** For imaginary or unlikely situations in the present/future.

- "If I **had** a million dollars, I **would** travel the world."
- "If I **were** you, I **would** accept the job."
- "She **wouldn't** buy that car if it **weren't** on sale."

**Note:** We use "were" instead of "was" with "I" in formal English: "If I were..."

## Third Conditional — Past hypotheticals

**Structure:** If + past perfect, would have + past participle
**Use:** For imagining different outcomes of past situations.

- "If I **had studied** more, I **would have passed** the exam."
- "If she **had left** earlier, she **wouldn't have** missed the train."
- "They **would have won** if they **had practiced** more."

## Summary

| Conditional | Time | Likelihood | Example |
|-------------|------|------------|---------|
| Zero | Any time | Always true | If you heat ice, it melts. |
| First | Future | Likely | If it rains, I will take an umbrella. |
| Second | Present/Future | Unlikely/Imaginary | If I were rich, I would travel. |
| Third | Past | Impossible (past) | If I had known, I would have helped. |`,
        questions: [
          {
            question: "El segundo condicional se usa para:",
            options: [
              "Verdades generales",
              "Situaciones hipotéticas o improbables",
              "Posibilidades reales del futuro",
              "Situaciones pasadas que no ocurrieron",
            ],
            correctIndex: 1,
          },
          {
            question:
              '"If I had studied more, I would have passed" es un ejemplo del:',
            options: [
              "Zero conditional",
              "First conditional",
              "Second conditional",
              "Third conditional",
            ],
            correctIndex: 3,
          },
          {
            question:
              'En el second conditional, usamos "were" en lugar de "was" porque:',
            options: [
              "Es un error gramatical común",
              "Es la forma formal para situaciones hipotéticas",
              "Solo se usa en preguntas",
              "Es opcional y no importa",
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "ch2",
        title: "Chapter 2: Passive Voice",
        content: `# Passive Voice

The **passive voice** is used when we want to focus on the action or the object, rather than the person doing the action.

## Active vs. Passive

| | Active | Passive |
|---|--------|---------|
| Focus | On who does the action | On the action itself |
| Structure | Subject + verb + object | Object + be + past participle |
| Example | "Shakespeare **wrote** Hamlet." | "Hamlet **was written** by Shakespeare." |

## How to form the passive

**be (conjugated) + past participle**

### Present Simple Passive
- "English **is spoken** in many countries."
- "The rooms **are cleaned** every day."

### Past Simple Passive
- "The Eiffel Tower **was built** in 1889."
- "These photos **were taken** last summer."

### Present Perfect Passive
- "The report **has been completed**."
- "Three new employees **have been hired**."

### Future Passive
- "The results **will be announced** tomorrow."
- "A new school **is going to be built** next year."

## When to use the passive

1. **When the doer is unknown:** "My bike **was stolen**." (We don't know who stole it)
2. **When the doer is obvious:** "The criminal **was arrested**." (Obviously by the police)
3. **In formal/academic writing:** "The experiment **was conducted** in a controlled environment."
4. **To emphasize the action:** "Over 100 houses **were destroyed** by the hurricane."

## "By" — mentioning the doer

Use **"by"** when you want to mention who performed the action:
- "This book **was written by** J.K. Rowling."
- "The painting **was created by** Picasso."

If the doer is not important or is unknown, you can omit "by":
- "The meeting **has been cancelled**." ✓`,
        questions: [
          {
            question: "La voz pasiva se usa cuando queremos enfocarnos en:",
            options: [
              "Quién hace la acción",
              "La acción o el objeto",
              "El tiempo verbal",
              "El lugar donde ocurre",
            ],
            correctIndex: 1,
          },
          {
            question: '"The Eiffel Tower was built in 1889" está en:',
            options: [
              "Voz activa, presente",
              "Voz activa, pasado",
              "Voz pasiva, presente",
              "Voz pasiva, pasado",
            ],
            correctIndex: 3,
          },
          {
            question: 'Se usa "by" en la voz pasiva para:',
            options: [
              "Hacer la oración más larga",
              "Indicar cuándo ocurrió la acción",
              "Mencionar quién realizó la acción",
              "Convertir la oración a activa",
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "ch3",
        title: "Chapter 3: Reported Speech",
        content: `# Reported Speech

**Reported speech** (also called **indirect speech**) is used when we tell someone what another person said, without using their exact words.

## Direct vs. Reported Speech

| Direct Speech | Reported Speech |
|--------------|----------------|
| She said, "I **am** happy." | She said (that) she **was** happy. |
| He said, "I **will** help you." | He said (that) he **would** help me. |
| They said, "We **have** finished." | They said (that) they **had** finished. |

## Tense changes (Backshift)

When reporting speech, the tenses usually shift back:

| Direct | Reported |
|--------|----------|
| Present simple → | Past simple |
| Present continuous → | Past continuous |
| Past simple → | Past perfect |
| Present perfect → | Past perfect |
| Will → | Would |
| Can → | Could |
| May → | Might |

## Reporting verbs

Common reporting verbs:
- **said** — dijo
- **told** (+ person) — le dijo a
- **asked** — preguntó
- **explained** — explicó
- **mentioned** — mencionó
- **promised** — prometió
- **suggested** — sugirió

**Important:** "told" always needs a person: "He **told me** / **told her** / **told them**"

## Reporting questions

For **yes/no questions**, use "if" or "whether":
- Direct: "Do you speak English?"
- Reported: He asked me **if/whether** I spoke English.

For **wh-questions**, keep the question word:
- Direct: "Where do you live?"
- Reported: She asked me **where** I lived.

**Note:** In reported questions, the word order changes to statement order (no inversion).

## Examples in context

> **Direct:** Maria said, "I'm going to the store."
> **Reported:** Maria said that she was going to the store.

> **Direct:** Tom asked, "Can you help me?"
> **Reported:** Tom asked if I could help him.

> **Direct:** The teacher said, "You must study for the test."
> **Reported:** The teacher said that we had to study for the test.`,
        questions: [
          {
            question:
              'En reported speech, "I am happy" se convierte en:',
            options: [
              "She said she is happy",
              "She said she was happy",
              "She said she will be happy",
              "She said she has been happy",
            ],
            correctIndex: 1,
          },
          {
            question:
              '¿Cuál es la diferencia entre "said" y "told"?',
            options: [
              "Son exactamente iguales",
              '"told" siempre necesita una persona (told me, told her)',
              '"said" es más formal',
              '"told" se usa solo en preguntas',
            ],
            correctIndex: 1,
          },
          {
            question:
              'Para reportar una pregunta de sí/no, usamos:',
            options: [
              "What o where",
              "If o whether",
              "That",
              "Because",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

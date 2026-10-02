import type { MissionStory } from "@/types/content";

/**
 * Placeholder mission stories and photos. These intentionally avoid real
 * places, dates, or claims — replace every field with your own experience.
 * The gallery, timeline, and lightbox all render from this data.
 */
export const missionStories: MissionStory[] = [
  {
    title: "Arriving and Finding My Footing",
    location: "Iquitos, Peru",
    date: "2023-11-15",
    body: "The first few weeks of being in Peru were a blur. I remember the heat, walking for 12+ hours a day, not understanding anyone, and my apartment smelling like chickens. Even though it was hard, I immediately grew a deep love for the people and the culture.",
    photos: [
      {
        url: "/mission/arriving-1.jpg",
        caption: "I loved the amazon, the nature always amazed me. ",
        location: "Amazon rainforest, Peru",
        date: "2020-01-20",
        width: 576,
        height: 710,
      },
      {
        url: "/mission/arriving-2.jpg",
        caption: "There were always kids out in the streets yelling at us and playing soccer.",
        location: "Amazon rainforest, Peru",
        date: "2020-02-02",
        width: 1024,
        height: 768,
      },
      {
        url: "/mission/arriving-3.jpg",
        caption: "This is my first companion Elder Colque. He was from Lima and taught me so much, he was the best.",
        location: "Amazon rainforest, Peru",
        date: "2020-02-18",
        width: 1024,
        height: 768,
      },
    ],
  },
  {
    title: "Lifelong Friends",
    location: "Contamana, Peru",
    date: "2024-05-05",
    body: "Once I got comfortable in the main city of Iquitos, I got sent off to the small village of Contamana which was an 8 hour boat ride on the amazon river to any main city. Although remote and small, missionary work there was new and booming and I met lifelong friends there. There, I was even more fully immersed into the jungle life and my missionary work.",
    photos: [
      {
        url: "/mission/friends-1.jpg",
        caption: "The baptism day of a family I became really close with.",
        location: "Contamana, Peru",
        date: "2024-05-10",
        width: 768,
        height: 1024,
      },
      {
        url: "/mission/friends-2.jpg",
        caption: "Lots of people had monkeys as pets. I would always play with them everytime I saw them",
        location: "Contamana, Peru",
        date: "2024-06-01",
        width: 768,
        height: 1024,
      },
      {
        url: "/mission/friends-3.jpg",
        caption: "I would always hang out with the kids for a bit after a lesson with the family",
        location: "Contamana, Peru",
        date: "2024-06-20",
        width: 768,
        height: 1024,
      },
    ],
  },
  {
    title: "Hitting my Stride",
    location: "Pucallpa, Peru",
    date: "2025-01-12",
    body: "After over a year in Peru, I felt more Peruvian than I did gringo. I found so much joy with the other missionaries, in our work, and in teaching and leading others.",
    photos: [
      {
        url: "/mission/stride-1.jpg",
        caption: "We had a family that we would teach that we had to cross this bridge to get there.",
        location: "Pucallpa, Peru",
        date: "2025-01-15",
        width: 768,
        height: 1024,
      },
      {
        url: "/mission/stride-2.jpg",
        caption: "These two returned missionaries from the ward were the best and would always come teach with us.",
        location: "Pucallpa, Peru",
        date: "2025-02-05",
        width: 1024,
        height: 768,
      },
      {
        url: "/mission/stride-3.jpg",
        caption: "Some good friends from our mission that I got close with.",
        location: "Pucallpa, Peru",
        date: "2025-03-01",
        width: 768,
        height: 1024,
      },
    ],
  },
  {
    title: "Coming Home Changed",
    location: "Iquitos, Peru",
    date: "2025-08-05",
    body: "I came home with more gratitude, discipline, and a deeper sense of purpose. I was sad to leave all of my friends and the culture. I was deeply impacted by so many lives of people I met in my time there. The principles I learned on my mission are still how I strive to live my life today.",
    photos: [
      {
        url: "/mission/home-1.jpg",
        caption: "This is my last area in Peru. It was a jungle town that was a bit higher elevation so it was a bit cooler than Iquitos. It was a great place to end in.",
        location: "Iquitos, Peru",
        date: "2025-06-25",
        width: 768,
        height: 1024,
      },
    ],
  },
];

/** Flat list of all mission photos for the gallery view. */
export const missionPhotos = missionStories.flatMap((s) => s.photos);

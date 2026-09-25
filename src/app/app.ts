// app.component.ts:

import { Component } from "@angular/core";
import { MyData } from "./Shared/Models/my-data";

@Component({
  imports: [],
  selector: "app-root",
  styleUrl: "./app.scss",
  templateUrl: "./app.html",
})
export class App {
  characters: MyData[] = [
    {
      id: 1,
      name: "Billy “Bill” Denbrough",
      quote:
        "I go home and all I see is that " +
        "Georgie isn't there. " +
        "His clothes, his toys, " +
        "his stupid stuffed animals... but he isn't.",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Jaeden Lieberher (Jaeden Martell)",
      character_type: "Protagonist",
      description:
        "William Billy Denbrough is the brave, " +
        "stuttering leader of the Losers' Club in IT (2017). " +
        "Driven by the survivor's guilt, " +
        "he seeks revenge on Pennywise, " +
        "The Dancing Clown for killing his little brother, George.",
    },
    {
      id: 2,
      name: "George “Georgie” Denbrough",
      quote: "(Referring to the boat) She?... She. Thanks, Billy.",
      age: 6,
      gender: "Male",
      status_alive: false,
      played_by: "Jackson Robert Scott",
      character_type: "Catalyst",
      description:
        "George Elmer Denbrough is a sweet, young boy, " +
        "whose death causes deep trauma and survivor’s guilt for Bill, " +
        "driving the Losers' Club to hunt the evil entity",
    },
    {
      id: 3,
      name: "Pennywise, The Dancing Clown (AKA Deadlights)",
      quote:
        "No! I'll take him! I'll take all of you! " +
        "I'll feast on your flesh as I feed on your fear..." +
        "Or...you'll just leave us be..." +
        "I will take him. Only him, and I will have my long rest " +
        "and you will all live to " +
        "grow and thrive and lead *happy* lives, " +
        "until old age takes you back to the weeds.",
      age: "Unknown (Possibly 1000000000)",
      gender: "She (True physical); IT (Cosmetic).",
      status_alive: true,
      played_by: "Bill Skarsgård",
      character_type: "Antagonist",
      description:
        "An ancient, shape-shifting cosmic entity that " +
        "preys on the fears of children in " +
        "Derry, Maine, every 27 years. " +
        "He is responsible for the death of George Elmer Denbrough.",
    },
    {
      id: 4,
      name: "Rich “Richie” Tozier",
      quote:
        "(Censored version:) I told you, Bill. I fricking told you. " +
        "I don't wanna die. It's your fault. " +
        "You punched me in the face, " +
        "you made me walk through crappy water, " +
        "you dragged me into a damn crackhead house! " +
        "And now...I'm gonna have to kill this fricking clown.",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Finn Wolfhard",
      character_type: "Co-Protagonist",
      description:
        "Rich Tozier is the fast-talking, " +
        "wisecracking comic relief of the Losers' Club. " +
        "Due to his non-stop jokes, sarcasm, and impressions " +
        "to deal with fear and trauma, " +
        "He is nicknamed as “Trashmouth.”",
    },
    {
      id: 5,
      name: "Stanley “Stan” Uris",
      quote: "No! No next time, Bill!",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Wyatt Oleff",
      character_type: "Supporting Character",
      description:
        "Stanley Uris is a cautious, methodical " +
        "member of the Losers' Club who is the son of a local rabbi. " +
        "He is the most logical thinker in the group.",
    },
    {
      id: 6,
      name: 'Eddie "Edds" Kaspbrak',
      quote:
        "[To Richie Tozier] -puffs- Have you ever " +
        "heard of a staph infection?",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Jack Dylan Grazer",
      character_type: "Supporting Character",
      description:
        "Eddie Kaspbrak is the shortest, " +
        "most fragile, and hyper-anxious " +
        "member of the Losers' Club. " +
        "He is dominated by his fiercely " +
        "overprotective mother, Sonia, " +
        "who convinces him he is sickly and asthmatic.",
    },
    {
      id: 7,
      name: "Beverly “Bev” Marsh",
      quote:
        "[To the Losers] This is what it wants. " +
        "It wants to divide us. " +
        "We were all together when we hurt it. " +
        "That's why we're still alive!",
      age: 13,
      gender: "Female",
      status_alive: true,
      played_by: "Sophia Lillis",
      character_type: "Co-Protagonist",
      description:
        "Beverly Marsh is the lone female " +
        "member of the Losers' Club, " +
        "who is a brave, resilient, and fiercely " +
        "independent adolescent. She carries heavy emotional " +
        "pain from severe bullying at school " +
        "and abuse at home by her father, Alvin Marsh.",
    },
    {
      id: 8,
      name: "Michael “Mike” Hanlon",
      quote:
        "My grandfather thinks this town is cursed. " +
        "He says that all the bad things " +
        "that happened in this town are because of one thing. " +
        "An evil thing that feeds off the people of Derry.",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Chosen Jacobs",
      character_type: "Supporting Character",
      description:
        "Michael Hanlon is a resilient, isolated " +
        "African-American teenager " +
        "who becomes the final core member of the Losers' Club.",
    },
    {
      id: 9,
      name: "Benjamin “Ben” Hanscom",
      quote:
        "[Shouting after Beverly] Please don't go girl! " +
        "That's the name of another..." +
        "[to himself] New Kids On The Block song.",
      age: 13,
      gender: "Male",
      status_alive: true,
      played_by: "Jeremy Dylan Taylor",
      character_type: "Supporting Character",
      description:
        "Benjamin Hanscom is a new kid " +
        "who is overweight, soft-spoken, and deeply intelligent. " +
        "He may be shy but he is also a bookworm.",
    },
    // So on, so forth.
    // ...Might OR might not add more characters to the array.
  ];

  protected toggleStatus(character: MyData): void {
    character.status_alive = !character.status_alive;
  }
}

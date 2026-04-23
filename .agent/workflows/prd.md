---
description: Product Requirements Document (PRD): "Worship or Love Song?"
---



1. Product Overview
A mobile-first, interactive browser game designed as a marketing funnel for the upcoming play Fear & Wonder. Users are presented with highly emotive lyrics and must guess if they belong to an early-2000s worship song or a secular love song.

2. User Flow & Core Features

    Start Screen: Catchy title, brief instructions ("Guess the context of these yearning lyrics"), and a "Start Game" button.

    Gameplay Loop (The "Cards"):

        Displays one lyric prominently.

        Two distinct interaction buttons: [ 🙌 Worship ] and [ 👩‍❤️‍👨 Love Song ].

        Upon selection: The UI immediately reveals whether the user was right or wrong, displaying the Song Title, Artist, and Release Year.

        A "Next Lyric" button appears to advance the state.

    Progress & Scoring: A simple visual indicator (e.g., "Question 3 of 13") and a running score.

    Resolution/End Screen:

        Final score display with a playful dynamic message based on performance (e.g., "Are you a youth pastor or just a romantic?").

        Call to Action (CTA): A prominent link to buy tickets or learn more about the premiere of Fear & Wonder in NYC.

        Social share button.

3. Technical Constraints

    Frontend: React or Vue (Single Page Application).

    Styling: Tailwind CSS for rapid, responsive UI development.

    State Management: Local component state (current question index, score, user's current guess).

    Data Source: A static JSON array containing the lyric dataset.
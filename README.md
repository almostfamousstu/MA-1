# ROADMAP

# Product Requirements Document (PRD)

## Product Name

**Ethereal Roadmap 2026**

## Overview

Ethereal Roadmap 2026 is an **interactive, web-based presentation tool** designed to propose and guide stakeholders through the 2026 roadmap in a visually immersive and intuitive way. Built using **Three.js**, the app will leverage 3D space, smooth camera movements, and sleek design to provide an **engaging, modern, and ethereal experience**.

---

## Objectives

* Provide an engaging and non-traditional way of presenting a yearly roadmap.
* Allow users to **explore four quarters (Q1–Q4)** as interactive 3D bodies.
* Enable seamless navigation between roadmap categories and content without breaking immersion.
* Deliver a **calm, guided experience** with smooth transitions and no abrupt interactions.

---

## Target Audience

* Executives and senior leadership.
* Product and strategy teams.
* Stakeholders reviewing or aligning on the 2026 roadmap.

---

## User Experience Principles

1. **Immersive**: The user feels like they’re “floating through” the roadmap rather than flipping slides.
2. **Intuitive**: Minimal learning curve—clicks, scrolls, and simple navigation.
3. **Ethereal aesthetic**: Modern, sleek, airy visual style with glowing edges, soft gradients, and fluid animations.
4. **Fluid motion**: All camera changes should feel cinematic, avoiding “snap” repositioning.

---

## Key Features & Requirements

### 1. Roadmap Bodies (Quarters)

* Four interactive 3D spheres (or other ethereal geometric bodies), each representing a **quarter of 2026**.
* Hover states: bodies glow or pulse and slowly rotate when hovered.
* Clicking a body transitions the camera smoothly to focus on it.

### 2. Category Carousel

* Upon selecting a quarter, a **scrollable carousel** appears (mouse wheel interaction).
* Four options displayed as panels or floating cards:

  * **Micro-Automation**
  * **Administration**
  * **R&D**
  * **Culture**
* Carousel is horizontally scrollable and cycles infinitely.
* Navigation buttons (“Back” and “Next”) appear under the carousel to move between quarters.
* All panels, buttons or floating cards should have vertex and/or fragment shaders that animate a subtle ripple effect emanating from the origin of the click

### 3. Category Detail View

* Clicking a category hides the carousel and reveals a **text body** describing the selected initiative.
* Includes a **“Back” button** to return to the carousel without losing place.

### 4. Quarter Navigation

* Under the carousel:

  * **Back button** → takes user to the previous quarter.
  * **Next button** → takes user to the next quarter.
* Edge cases:

  * **Q1 Back** → resets to initial camera position.
  * **Q4 Next** → resets to initial camera position.

### 5. Camera & Transitions

* All movement transitions are **eased (cubic-bezier or similar)**, mimicking guided flight.
* Camera pans and zooms slowly to each quarter or selection.
* No snapping allowed—motion must always feel deliberate and continuous.

### 6. Style & Aesthetic

* **Theme**: Modern, sleek, ethereal.
* Visual elements:

  * Soft glowing highlights.
  * Transparent or semi-opaque panels for text.
  * Gradients (cool tones, e.g., blue-violet-cyan).
  * Subtle particle effects for depth.
* Typography: Minimalist sans-serif, light weights.
* Animations: Slow fades, glows, and scaling transitions.

---

## Technical Requirements

### Framework

* **Three.js** for 3D rendering.
* **GSAP or Three.js built-in easing** for smooth animations.
* **GLSL** for custom vertex and fragment shaders. Use something like 3D Perlin or Simplex Noise function for the vertex displacement

### Components

1. **Scene & Camera**

   * Perspective camera with smooth orbit and position transitions.
   * Central neutral position for reset states.

2. **Quarter Bodies**

   * Four 3D models (spheres or glowing orbs).
   * Click interaction triggers carousel display.

3. **Carousel System**

   * Scroll event listeners for cycling.
   * “Back” and “Next” quarter navigation buttons.

4. **Content Display**

   * Text overlays inside of floating panels (Three.js CSS3DRenderer or WebGL plane materials).
   * Dynamic content loading per selection.

5. **Navigation & State Management**

   * State machine for:

     * Idle camera (overview mode).
     * Quarter focus mode.
     * Category detail mode.

---

## Success Metrics

* Smooth performance on modern browsers (60fps target).
* No noticeable lag or snapping in camera transitions.
* Stakeholders find it intuitive and immersive in testing sessions.

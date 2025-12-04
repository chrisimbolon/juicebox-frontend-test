# Juicebox Frontend Developer Assessment  
Mobile Onboarding Flow — Frontend Implementation

This repository contains my implementation for the Juicebox Frontend Developer Code Test.  
The goal of the project is to build a responsive mobile onboarding experience based on the provided Figma design, Lottie animation assets, and visual specifications.

## 🚀 Tech Stack
- **Next.js 14 (App Router, TypeScript)**
- **TailwindCSS v4**
- **Shadcn UI components**
- **Lottie React animation**
- **GSAP micro animations**
- **CSS custom variables & Design Tokens** for pixel-perfect Figma alignment

## 🎯 Objectives Completed
| Requirement 
|------------|
| Setup Next.js + TypeScript + Tailwind + Shadcn UI 
| Import & apply custom fonts (Söhne, Bagoss TRIAL) 
| Lottie JSON animation implemented 
| Step-based navigation flow for onboarding 
| Mobile-first layout & responsive structure 
| Design-token system for scalable UI 


## 📁 Project Structure
```
src/
├── app/
│   ├── (steps)/
│   │   ├── page.tsx                 
│   │   ├── walkthrough/
│   │   │   └── page.tsx             
│   │   ├── form/
│   │   │   └── page.tsx                    
│   │   └── results/
│   │       └── page.tsx             
│   ├── globals.css                  
│   └── layout.tsx
├── components/
│   ├── CTAButton.tsx                
│   ├── Header.tsx                   
│   ├── form/
│   │   └── TextInput.tsx            
│   └── ui/
│       └── LottieAnimation.tsx
├── context/
│   └── UserContext.tsx
└── lib/
    ├── design-tokens.ts             
    └── utils.ts                     
```


###  Clone the Repository
```bash
git clone https://github.com/chrisimbolon/juicebox-frontend-test
cd juicebox-frontend-test
```

### Running the Project
```bash
npm install
npm run dev
```

Open in browser:

http://localhost:3000

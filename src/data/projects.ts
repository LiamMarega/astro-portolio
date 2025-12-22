/**
 * Projects Data Configuration
 * 
 * This file contains all project data for the Work section.
 * Adding, editing, or removing projects is simple:
 * 
 * To ADD a new project:
 * 1. Add a new object to the `projects` array
 * 2. Follow the Project interface structure
 * 3. Images are automatically handled with aspect ratio preservation
 * 
 * To EDIT a project:
 * 1. Find the project by its `id`
 * 2. Modify the desired fields
 * 
 * To REMOVE a project:
 * 1. Delete the entire project object from the array
 * 
 * Layout alternates automatically based on array index (odd/even)
 * unless you explicitly set `reverse: true/false`
 */

// =============================================================================
// Type Definitions
// =============================================================================

export interface TechStackItem {
    /** Icon source path (e.g., "/images/icons/react.svg") */
    src: string;
    /** Accessible alt text for the icon */
    alt: string;
}

export interface ProjectImage {
    /** Image source path (e.g., "/images/works/project.webp") */
    src: string;
    /** Accessible alt text describing the image */
    alt: string;
}

export interface Project {
    /** Unique identifier for the project (used for HTML id and routing) */
    id: string;
    /** Display title of the project */
    title: string;
    /** Background color class (Tailwind format: "bg-[#hexcode]") */
    bgColor: string;
    /** Text color class for title badge (Tailwind format: "text-[#hexcode]") */
    textColor: string;
    /** External link to the project (optional) */
    link?: string;
    /** Array of description paragraphs */
    description: string[];
    /** Array of project images (max 2 recommended for optimal layout) */
    images: ProjectImage[];
    /** Array of technology stack icons */
    techStack: TechStackItem[];
    /** 
     * Override automatic layout alternation
     * - `true`: Image on left, text on right
     * - `false`: Image on right, text on left
     * - `undefined`: Auto-alternates based on array position
     */
    reverse?: boolean;
    /** Whether this is a featured/priority project (loads first) */
    featured?: boolean;
}

// =============================================================================
// Tech Stack Icons - Reusable definitions
// =============================================================================

export const techIcons = {
    flutter: { src: "/images/icons/flutter.svg", alt: "Flutter framework" },
    dart: { src: "/images/icons/dart.svg", alt: "Dart programming language" },
    android: { src: "/images/icons/android-icon.svg", alt: "Android platform" },
    ios: { src: "/images/icons/ios.svg", alt: "iOS platform" },
    firebase: { src: "/images/icons/firebase.svg", alt: "Firebase backend" },
    stripe: { src: "/images/icons/stripe.svg", alt: "Stripe payment integration" },
    react: { src: "/images/icons/react.svg", alt: "React library" },
    typescript: { src: "/images/icons/typescript.svg", alt: "TypeScript language" },
    javascript: { src: "/images/icons/javascript.svg", alt: "JavaScript language" },
    html5: { src: "/images/icons/html5.svg", alt: "HTML5 markup" },
    css: { src: "/images/icons/css.svg", alt: "CSS styling" },
    metamask: { src: "/images/icons/metamask.svg", alt: "MetaMask wallet integration" },
    nodejs: { src: "/images/icons/nodejs.svg", alt: "Node.js runtime" },
    nextjs: { src: "/images/icons/nextjs.svg", alt: "Next.js framework" },
    tailwind: { src: "/images/icons/tailwind.svg", alt: "Tailwind CSS" },
} as const;

// =============================================================================
// Projects Data
// =============================================================================

export const projects: Project[] = [
    {
        id: "ferox",
        title: "Ferox app",
        bgColor: "bg-[#15432b]",
        textColor: "text-[#15432b]",
        link: "https://feroxapp.com/",
        featured: true,
        description: [
            "Ferox is a hunting social network whose objective is to unify the sector and create links between hunters.",
            "Since there is strength in numbers, it is the perfect place to come together and show that we are a united sector capable of great things.",
        ],
        images: [
            {
                src: "/images/works/feroxMock.webp",
                alt: "Ferox app mobile mockup showing hunting social network interface",
            },
        ],
        techStack: [
            techIcons.flutter,
            techIcons.dart,
            techIcons.android,
            techIcons.firebase,
            techIcons.stripe,
        ],
    },
    {
        id: "advantisAI",
        title: "ADVANTIS.AI",
        bgColor: "bg-[#22A7F2]",
        textColor: "text-[#22A7F2]",
        link: "https://www.figma.com/proto/8ShCMxzmpgONb3goAOGLBj/TARP-rebrand?node-id=139-907&t=P2Qw3j0XwZZ202Gd-1",
        description: [
            "Advantis AI is at the forefront of revolutionizing the decentralized finance (DeFi) industry through the power of artificial intelligence (AI).",
            "Your mission is to bridge the gap between technology and users, providing comprehensive tools, educational resources, and a thriving community.",
        ],
        images: [
            {
                src: "/images/works/advantis-scan.webp",
                alt: "Advantis AI scan feature interface",
            },
            {
                src: "/images/works/advantis-home.webp",
                alt: "Advantis AI home dashboard",
            },
        ],
        techStack: [
            techIcons.react,
            techIcons.typescript,
            techIcons.html5,
            techIcons.css,
            techIcons.firebase,
        ],
    },
    {
        id: "fmoney",
        title: "FMoney raffle",
        bgColor: "bg-[#629A48]",
        textColor: "text-[#629A48]",
        link: "https://www.figma.com/proto/Ic2WlwbqBiSLBOBtOX4Je4/App-megapool?node-id=262-99250&t=52OuOuXFk5eiOAq2-1",
        description: [
            "FMoney is a blockchain technology currently applied to raffles.",
            "The platform guarantees greater transparency, instant traceability, security, greater speed, and efficiency to all processes (purchase, selection of the winner, and prize claim).",
        ],
        images: [
            {
                src: "/images/works/fmoney.webp",
                alt: "FMoney raffle platform blockchain interface",
            },
        ],
        techStack: [
            techIcons.react,
            techIcons.typescript,
            techIcons.dart,
            techIcons.firebase,
            techIcons.metamask,
        ],
    },
];

export const minorProjects = [
    {
        image: "/images/works/lamshoes.webp",
        text: "LamShoes E-commerce",
    },
    {
        image: "/images/works/feroxPage.webp",
        text: "Ferox Landing Page",
    },
    {
        image: "/images/works/advantis-home.webp",
        text: "Advantis Dashboard",
    },
    {
        image: "/images/works/fmoney.webp",
        text: "FMoney Platform",
    },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all projects, optionally sorted by featured status
 */
export function getProjects(sortByFeatured = true): Project[] {
    if (sortByFeatured) {
        return [...projects].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });
    }
    return projects;
}

/**
 * Get a single project by ID
 */
export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
}

/**
 * Get total number of projects
 */
export function getProjectCount(): number {
    return projects.length;
}

/**
 * Determine if layout should be reversed based on index or explicit override
 */
export function shouldReverse(project: Project, index: number): boolean {
    if (typeof project.reverse === 'boolean') {
        return project.reverse;
    }
    // Auto-alternate: even indices = normal, odd indices = reversed
    return index % 2 !== 0;
}

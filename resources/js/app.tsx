import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Sidebar from './Components/Sidebar'; // Import the Sidebar content
import Routine from './Components/Routine'; // Import the Routine content
import IncludeRoutine from './Components/IncludeRoutine'; // Import the Include Routine content

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const sidebarElement = document.getElementById('react-sidebar');

if (sidebarElement) {
    createRoot(sidebarElement).render(<Sidebar />);
}

const routineElement = document.getElementById('react-routine');

if (routineElement) {
    createRoot(routineElement).render(<Routine />);
}
const includeRoutineElement = document.getElementById('react-include-routine');

if (includeRoutineElement) {
    createRoot(includeRoutineElement).render(<IncludeRoutine />);
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
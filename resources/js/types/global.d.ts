import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

declare global {
    interface Window {
        axios: AxiosInstance;
        Inertia: typeof Inertia;
    }

    var route: typeof ziggyRoute;
}

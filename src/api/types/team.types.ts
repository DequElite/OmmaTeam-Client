export interface TeamShortDataType {
    team: {
        id: string;
        name: string;
        leader: {
            email: string;
        };
    };
    assigned_tasks: {
        id: string;
    }[];
}

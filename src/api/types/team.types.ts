export interface TeamShortDataType {
    team: {
        id: string;
        leader: {
            email: string;
        };
    };
    assigned_tasks: {
        id: string;
    }[];
}

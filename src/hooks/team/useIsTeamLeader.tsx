import { useNavigate } from "@tanstack/react-router";
import { TeamDataType } from "../../api/types/team.types";
import { useEffect } from "react";

interface useIsTeamLeaderProps {
    isSuccess: boolean;
    data: TeamDataType | undefined;
    redirect?: boolean;
}

export default function useIsTeamLeader({ isSuccess, data, redirect = true }: useIsTeamLeaderProps): boolean {
    const navigate = useNavigate();

    const isLeader = isSuccess && data?.isLeader;

    useEffect(() => {
        if (!redirect) return; 

        const isNotLeader = isSuccess && !data?.isLeader;
        if (isNotLeader) {
            console.log('redirect')
            navigate({ to: '/', replace: true });
        }
    }, [isSuccess, data, redirect, navigate]);

    return Boolean(isLeader);
}

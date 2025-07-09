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

    const isNotLeader = isSuccess && !data?.isLeader;

    useEffect(() => {
        if (isNotLeader && redirect) {
            navigate({ to: '/', replace: true });
        }
    }, [isNotLeader, redirect, navigate]);

    return !isNotLeader;
}

import { useNavigate } from "@tanstack/react-router";
import { TeamDataType } from "../../api/types/team.types";
import { useEffect } from "react";

interface useIsTeamLeaderProps {
    isSuccess: boolean;
    data: TeamDataType | undefined;
}

export default function useIsTeamLeader({ isSuccess, data }: useIsTeamLeaderProps){
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && !data?.isLeader) {
            navigate({ to: '/', replace: true });
        }
    }, [isSuccess, data, navigate]);
}
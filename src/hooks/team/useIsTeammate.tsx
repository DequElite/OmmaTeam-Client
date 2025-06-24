import { useNavigate } from "@tanstack/react-router";
import { TeamDataType } from "../../api/types/team.types";
import { useEffect } from "react";

interface useISTeammateProps {
    isSuccess: boolean;
    data: TeamDataType | undefined;
}

export default function useIsTeammate({ isSuccess, data }: useISTeammateProps){
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && !data?.isTeammate) {
            navigate({ to: '/', replace: true });
        }
    }, [isSuccess, data, navigate]);
}
import { useQuery } from "@tanstack/react-query";
import { TeamService } from "../api/services/Team.service";
import { useAppSelector } from "../store/store";
import { useMessageBox } from "../contexts/MessageBoxContext/useMessageBox";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { TeamDataType } from "../api/types/team.types";

const teamService = new TeamService();

interface ValidationErrorResponse {
  _errors?: string[];
  id?: {
    _errors?: string[];
  };
  [key: string]: any; 
}

export default function useTeamLoad(teamId: string) {
    const navigate = useNavigate();

    const { updateState } = useMessageBox();

    const { data, isLoading, isSuccess, isError, error } = useQuery<TeamDataType, AxiosError>({
        queryKey: ['team', teamId],
        queryFn: () => teamService.getTeamData({ id: teamId }).then(res => res.data.team),
        enabled: Boolean(teamId),
        staleTime: 1000 * 60 * 10,
    });

    useEffect(() => {
        if (isError && error) {
            const status = error?.response?.status;
            const errorData = error as ValidationErrorResponse;
            if (
                status === 400 ||
                (errorData.id && Array.isArray(errorData.id._errors) && errorData.id._errors.includes("Invalid uuid"))
            ) {
                updateState({
                    isOpened: true,
                    desc: 'User and teamId not exists',
                    type: 'error'
                })
                navigate({ to: "/", replace: true });
            } else if (status === 401) {
                updateState({
                    isOpened: true,
                    desc: 'Unauthorized',
                    type: 'error'
                })
                navigate({ to: "/auth/login", replace: true });
            } else if (status === 403) {
                updateState({
                    isOpened: true,
                    desc: "You are not a member of this team",
                    type: 'error'
                })
                navigate({ to: "/", replace: true });
            } else if (status === 404) {
                updateState({
                    isOpened: true,
                    desc: "Team not found",
                    type: 'error'
                })
                navigate({ to: "/", replace: true });
            } 
        } 
    }, [isError, error, navigate, updateState]);

    return {data, isLoading, isSuccess, isError}

}
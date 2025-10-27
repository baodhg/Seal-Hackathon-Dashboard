import { useEffect } from "react";
import { RealtimeManager } from "../service/realtimeManager";

export const useRealtimeCommits = (onNewCommit) => {
    useEffect(() => {
        const unsubscribe = RealtimeManager.listenCommits(onNewCommit);
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [onNewCommit]);
};

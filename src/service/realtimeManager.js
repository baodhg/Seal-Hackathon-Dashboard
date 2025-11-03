import { listenFirebaseCommits } from "./realtimeProviders/firebaseProvider.js"; // sau này thêm

export const RealtimeManager = {
    listenCommits(onNewCommit) {
        return listenFirebaseCommits(onNewCommit);
    },
};

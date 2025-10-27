import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded, onChildChanged } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Khởi tạo Firebase App (chỉ 1 lần)
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const listenFirebaseCommits = (onNewCommit) => {
    // Giả sử commit của Đại vương được lưu ở path /commits
    const commitsRef = ref(db, "commit");

    console.log("🔥 [Firebase] Listening for new commits...");

    // Lắng nghe khi có node con mới được thêm vào
    const unsubscribe = onChildAdded(commitsRef, (snapshot) => {
        const commit = snapshot.val();
        if (commit) {
            console.log("✅ [Firebase] New commit:", commit);
            onNewCommit(commit);
        }
    });

    onChildChanged(commitsRef, (snapshot) => {
        console.log("🟠 Commit bị cập nhật:", snapshot.val());
        const commit = snapshot.val();
        if (commit) {
            console.log("✅ [Firebase] New commit:", commit);
            onNewCommit(commit);
        }
    });

    // Trả về hàm cleanupe m
    return () => unsubscribe();
};

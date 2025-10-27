export function convertCommitsToHeatmap(data) {

    const hours = [7, 8, 9, 10, 11, 12, 13, 14];
    const SLOT_COUNT = 4;
    const SLOT_MINUTES = 60 / SLOT_COUNT;

    return data.map(repo => {
        const heatmap = {};

        for (const h of hours) heatmap[h] = new Array(SLOT_COUNT).fill(0);

        (repo.commits || []).forEach(commit => {
            const d = new Date(commit.timestamp);
            const hour = d.getHours();

            if (hour < 7 || hour > 14) return;
            const slot = Math.floor(d.getMinutes() / SLOT_MINUTES);
            try {
                heatmap[hour][slot] += 1;
            } catch (error) {
                console.log(`Error with commit at ${commit.commit_sha}`);
                console.log(`commits:`, commit);
                console.log(`Commit time: ${commit.timestamp}, Parsed hour: ${hour}`);
            }
        });
        return {
            repo_full_name: repo.repo_full_name,
            heatmap,
            highlight: !!repo.highlight,
        };
    });
}

export function sortReposByLatestCommit(repos = []) {
    // Precompute latest commit time cho từng repo (O(n))
    const processed = repos.map(repo => {
        const latestCommitTime = repo.commits?.length
            ? Math.max(...repo.commits.map(c => new Date(c.timestamp).getTime()))
            : 0; // 0 cho repo chưa có commit
        return { ...repo, latestCommitTime };
    });

    // Sort theo latestCommitTime giảm dần (O(n log n))
    return processed.sort((a, b) => b.latestCommitTime - a.latestCommitTime);
}

// 🎨 30 màu OKLCH cố định – tone sáng, contrast cao cho nền tối
const OKLCH_PALETTE_30 = [
    "oklch(0.70 0.28 48)",    // Yellow
    "oklch(0.70 0.28 0)",     // Red
    "oklch(0.70 0.28 264)",   // Magenta purple
    "oklch(0.70 0.28 60)",    // Lime yellow
    "oklch(0.70 0.28 240)",   // Deep violet
    "oklch(0.70 0.28 180)",   // Pure cyan-blue
    "oklch(0.70 0.28 132)",   // Sky cyan
    "oklch(0.70 0.28 72)",    // Yellow-green
    "oklch(0.70 0.28 216)",   // Blue
    "oklch(0.70 0.28 312)",   // Rose
    "oklch(0.70 0.28 36)",    // Warm yellow
    "oklch(0.70 0.28 84)",    // Green
    "oklch(0.70 0.28 108)",   // Cyan
    "oklch(0.70 0.28 120)",   // Aqua
    "oklch(0.70 0.28 144)",   // Teal
    "oklch(0.70 0.28 100)",   // Sea green
    "oklch(0.70 0.28 168)",   // Emerald
    "oklch(0.70 0.28 192)",   // Azure blue
    "oklch(0.70 0.28 204)",   // Sky blue
    "oklch(0.70 0.28 228)",   // Indigo
    "oklch(0.70 0.28 252)",   // Purple
    "oklch(0.70 0.28 276)",   // Magenta
    "oklch(0.70 0.28 288)",   // Hot pink
    "oklch(0.70 0.28 24)",    // Orange
    "oklch(0.70 0.28 300)",   // Pink
    "oklch(0.70 0.28 324)",   // Red-pink
];

// 🗺️ Lưu map repo → màu vào localStorage
export function getTeamColor(teamName) {
    if (!teamName) return '#ccc';

    const storageKey = `team-color-map`;
    let colorMap = {};

    // 🔹 Load từ localStorage
    try {
        colorMap = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
        colorMap = {};
    }

    // 🔹 Nếu repo đã có màu → trả về luôn
    if (colorMap[teamName]) return colorMap[teamName];

    // 🔹 Nếu chưa có → lấy màu tiếp theo trong palette
    const usedColors = Object.values(colorMap);
    const available = OKLCH_PALETTE_30.find(c => !usedColors.includes(c));
    const color = available || OKLCH_PALETTE_30[usedColors.length % OKLCH_PALETTE_30.length];

    // 🔹 Lưu lại để cố định lần sau (F5 vẫn giữ)
    colorMap[teamName] = color;
    localStorage.setItem(storageKey, JSON.stringify(colorMap));

    return color;
}

export function getRepoShortName(fullName) {
    if (typeof fullName !== "string") return "";

    const parts = fullName.split("/");
    return parts.length > 1 ? parts[parts.length - 1] : fullName;
}

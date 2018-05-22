// シミュレーション回数
const SIMULATE_TIME = 1000;
// 1時間に一度アクセスするユーザーの数
const NUM_OF_USER = 210;


class AccessTime {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    isAccessing(accessTime) {
        return this.start <= accessTime && accessTime < this.end;
    }
}

class User extends AccessTime {
    constructor() {
        const start = Math.random() * 60 - 1;
        const end = start + 2;
        super(start, end);
    }
}

class StatisticsResult {
    constructor(counts) {
        const len = counts.length;
        const sorted = counts.sort((a, b) => a - b);
        const sum = sorted.reduce((prev, current) => prev + current);

        this.max = sorted[len - 1];
        this.min = sorted[0];
        this.avg = sum / len;
        this.mid = sorted[parseInt(len / 2, 10)];
        const numerator = sorted.reduce((prev, current) => prev + Math.pow(this.avg - current, 2));
        this.disp = numerator / len;
        this.dev = Math.sqrt(this.disp);
    }

    toString() {
        return `最大値：${this.max}
最小値：${this.min}
平均値：${this.avg}
中央値：${this.mid}
分散：${this.disp}
標準偏差：${this.dev}`;
    }
}

const maxAccesses = [];

const accessTimes = [];

function createUsers(num) {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push(new User());
    }
    return users;
}


function run(simulateTimeArg) {
    const simulateTime = simulateTimeArg ? parseInt(simulateTimeArg) : SIMULATE_TIME;
    const maxAccesses = [];
    for (let i = 0; i < simulateTime; i++) {
        const users = createUsers(NUM_OF_USER);
        const accesses = [];
        for (let t = 0; t < 60; t++) {
            accesses.push(users.filter(u => u.isAccessing(t)).length);
        }
        const result = new StatisticsResult(accesses);
        maxAccesses.push(result.max);
    }
    // 最大値
    const maxAccessesResult = new StatisticsResult(maxAccesses);
    console.log(maxAccessesResult.toString());
}

run(process.argv[2]);
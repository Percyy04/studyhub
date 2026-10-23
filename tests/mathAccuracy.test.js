import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseScore, calculateAccuracy, aggregateStats } from "../src/lib/scoring.js";
import { evaluateMastery, MASTERY_LEVELS } from "../src/lib/masteryRules.js";

describe("1. Bộ kiểm thử phép tính và đáp án bắt buộc (Mục 6 AGENTS.md)", () => {
  it("−7 − (−4) = −7 + 4 = −3 (Trừ số âm là cộng số đối)", () => {
    const calc = -7 - -4;
    assert.equal(calc, -3);
  });

  it("(-3) × (-4) = 12 (Hai thừa số cùng dấu ra dương)", () => {
    const calc = -3 * -4;
    assert.equal(calc, 12);
  });

  it("2 + 3 × 4 = 14 (Nhân trước cộng; không phải 20)", () => {
    const calc = 2 + 3 * 4;
    assert.equal(calc, 14);
    assert.notEqual(calc, 20);
  });

  it("6/9 = 2/3 (Rút gọn phân số chia cả tử và mẫu cho 3)", () => {
    const num = 6 / 3;
    const den = 9 / 3;
    assert.equal(num, 2);
    assert.equal(den, 3);
    assert.equal(6 / 9, 2 / 3);
  });

  it("1/2 + 1/3 = 3/6 + 2/6 = 5/6", () => {
    const sum = 1 / 2 + 1 / 3;
    const expected = 5 / 6;
    assert.ok(Math.abs(sum - expected) < 1e-9);
  });

  it("2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6", () => {
    const div = (2 / 3) / (4 / 5);
    const expected = 5 / 6;
    assert.ok(Math.abs(div - expected) < 1e-9);
  });

  it("2(x + 3) = 2x + 6 (Phân phối đủ)", () => {
    // Với mọi x, 2*(x+3) === 2*x + 6
    [0, 1, 5, -3, 10].forEach((x) => {
      assert.equal(2 * (x + 3), 2 * x + 6);
    });
  });

  it("-(x - 4) = -x + 4 (Đổi dấu khi bỏ ngoặc có dấu trừ)", () => {
    [0, 1, 4, -4, 10].forEach((x) => {
      // Chuẩn hóa -0 thành 0 trong JavaScript
      const left = -(x - 4) === 0 ? 0 : -(x - 4);
      const right = -x + 4 === 0 ? 0 : -x + 4;
      assert.equal(left, right);
    });
  });

  it("2x + 3x = 5x; 2x + 3 != 5x với x != 1", () => {
    [2, 3, 4, 10].forEach((x) => {
      assert.equal(2 * x + 3 * x, 5 * x);
      assert.notEqual(2 * x + 3, 5 * x);
    });
  });
});

describe("2. Chấm điểm & Thống kê", () => {
  it("parseScore phân tích đúng định dạng hợp lệ", () => {
    assert.deepEqual(parseScore("8/10"), [8, 10]);
    assert.deepEqual(parseScore(" 16 / 20 "), [16, 20]);
    assert.deepEqual(parseScore("0/10"), [0, 10]);
  });

  it("parseScore từ chối điểm sai mẫu số hoặc lớn hơn tổng số câu", () => {
    assert.equal(parseScore("11/10"), null);
    assert.equal(parseScore("8/0"), null);
    assert.equal(parseScore("-2/10"), null);
    assert.equal(parseScore("abc"), null);
  });

  it("calculateAccuracy tính chính xác tỉ lệ", () => {
    assert.equal(calculateAccuracy(8, 10), 80);
    assert.equal(calculateAccuracy(7, 20), 35);
    assert.equal(calculateAccuracy(16, 20), 80);
  });

  it("aggregateStats tổng hợp đúng không lặp", () => {
    const dummyDays = {
      1: { score: "8/10", mastery: "Thành thạo", actualDate: "2026-10-23" },
      2: { score: "9/10", mastery: "Thành thạo", actualDate: "2026-10-24" },
      3: { score: "5/10", mastery: "Chưa vững", actualDate: "2026-10-25" },
    };
    const stats = aggregateStats(dummyDays);
    assert.equal(stats.recordedSessions, 3);
    assert.equal(stats.totalCorrect, 22);
    assert.equal(stats.totalQuestions, 30);
    assert.equal(stats.accuracyNumeric, 73);
    assert.equal(stats.masteredCount, 2);
  });
});

describe("3. Tiêu chí Thành thạo (Mastery Rules)", () => {
  it("Dưới 6/10 đánh dấu Chưa vững", () => {
    const res = evaluateMastery({ scoreStr: "5/10", independence: "Tự làm độc lập", canExplain: "Có, giải thích rõ" });
    assert.equal(res.level, MASTERY_LEVELS.NOT_SOLID);
    assert.equal(res.shouldAdvance, false);
  });

  it("6-7/10 đánh dấu Đang hình thành", () => {
    const res = evaluateMastery({ scoreStr: "7/10", independence: "Tự làm độc lập", canExplain: "Có, giải thích rõ" });
    assert.equal(res.level, MASTERY_LEVELS.DEVELOPING);
  });

  it(">= 8/10 nhưng cần hướng dẫn từng bước thì chưa cho chuyển", () => {
    const res = evaluateMastery({ scoreStr: "9/10", independence: "Cần hướng dẫn từng bước", canExplain: "Có, giải thích rõ" });
    assert.equal(res.level, MASTERY_LEVELS.DEVELOPING);
    assert.equal(res.shouldAdvance, false);
  });

  it(">= 8/10 + Tự làm độc lập + Giải thích rõ => Có thể chuyển", () => {
    const res = evaluateMastery({ scoreStr: "9/10", independence: "Tự làm độc lập", canExplain: "Có, giải thích rõ" });
    assert.equal(res.level, MASTERY_LEVELS.READY_TO_ADVANCE);
    assert.equal(res.shouldAdvance, true);
  });

  it("Đạt chuẩn và có bài ôn sau 2-3 ngày tốt => Vững bền", () => {
    const res = evaluateMastery({
      scoreStr: "9/10",
      independence: "Tự làm độc lập",
      canExplain: "Có, giải thích rõ",
      reviewScoreStr: "5/5",
    });
    assert.equal(res.level, MASTERY_LEVELS.SOLID_RETAINED);
    assert.equal(res.shouldAdvance, true);
  });
});

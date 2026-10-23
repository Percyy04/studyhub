import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeMathText,
  evaluateAnswer,
  evaluateFollowUp,
} from "../src/lib/challengeEvaluator.js";
import { LESSONS } from "../src/data/lessons/index.js";

describe("5. Kiểm thử Thuật toán Chấm Thử thách Tư duy (Challenge Evaluator)", () => {
  const day1Challenge = LESSONS[1].challenge;

  it("1. Chuẩn hóa chuỗi toán học an toàn (dấu âm unicode, toán tử, khoảng trắng)", () => {
    const raw = "  −8   −   (−5) =  −3  ";
    const norm = normalizeMathText(raw);
    assert.equal(norm, "- 8 - ( - 5 ) = - 3");
  });

  it("2. Từ chối câu trả lời rỗng hoặc chỉ toàn khoảng trắng", () => {
    const res1 = evaluateAnswer("", day1Challenge);
    assert.equal(res1.isEvaluated, false);
    assert.equal(res1.isEmpty, true);

    const res2 = evaluateAnswer("   \n\t  ", day1Challenge);
    assert.equal(res2.isEvaluated, false);
    assert.equal(res2.isEmpty, true);
  });

  it("3. Câu trả lời chuẩn mực đạt trọn vẹn cả 3 tiêu chí của bài An", () => {
    const fullAnswer =
      "Bạn An sai ở bước 1 vì chỉ nhìn thấy hai dấu trừ rồi lấy 8 + 5 = 13. Quy tắc chuẩn là: Trừ một số âm phải đổi thành cộng số đối: −8 − (−5) = −8 + 5. Kết quả đúng phải là −3 chứ không phải −13.";

    const res = evaluateAnswer(fullAnswer, day1Challenge);
    assert.equal(res.isEvaluated, true);
    assert.equal(res.preliminaryScore, 3);
    assert.equal(res.maxScore, 3);

    const c1 = res.criteriaResults.find((c) => c.id === "c1");
    const c2 = res.criteriaResults.find((c) => c.id === "c2");
    const c3 = res.criteriaResults.find((c) => c.id === "c3");

    assert.equal(c1.status, "passed");
    assert.equal(c2.status, "passed");
    assert.equal(c3.status, "passed");
  });

  it("4. Câu trả lời có từ khóa nhưng sai bản chất (khen An đúng, kết quả -13)", () => {
    const deceptiveAnswer =
      "An làm đúng rồi, vì thấy hai dấu trừ nên lấy 8 + 5 = 13 và kết quả là -13.";

    const res = evaluateAnswer(deceptiveAnswer, day1Challenge);
    const c1 = res.criteriaResults.find((c) => c.id === "c1");
    const c3 = res.criteriaResults.find((c) => c.id === "c3");

    // Không được chấm đúng tiêu chí 1 hay tiêu chí 3
    assert.equal(c1.status, "failed");
    assert.equal(c3.status, "failed");
    assert.notEqual(res.preliminaryScore, 3);
  });

  it("5. Câu trả lời đúng bằng cách diễn đạt tự nhiên khác (vẫn được ghi nhận)", () => {
    const naturalAnswer =
      "An nhầm dấu ở bước 1. Gặp trừ cho âm 5 thì phải biến thành cộng 5, lấy âm 8 cộng 5 thì ra âm 3.";

    const res = evaluateAnswer(naturalAnswer, day1Challenge);
    assert.equal(res.isEvaluated, true);
    assert.equal(res.preliminaryScore, 3);

    const c1 = res.criteriaResults.find((c) => c.id === "c1");
    const c2 = res.criteriaResults.find((c) => c.id === "c2");
    const c3 = res.criteriaResults.find((c) => c.id === "c3");

    assert.equal(c1.status, "passed");
    assert.equal(c2.status, "passed");
    assert.equal(c3.status, "passed");
  });

  it("6. Câu trả lời một phần (chỉ nêu kết quả -3 mà không giải thích quy tắc)", () => {
    const partialAnswer = "Kết quả đúng của bài toán là -3.";

    const res = evaluateAnswer(partialAnswer, day1Challenge);
    const c1 = res.criteriaResults.find((c) => c.id === "c1");
    const c2 = res.criteriaResults.find((c) => c.id === "c2");
    const c3 = res.criteriaResults.find((c) => c.id === "c3");

    assert.equal(c3.status, "passed");
    assert.notEqual(c2.status, "passed");
    assert.equal(res.preliminaryScore, 1);
  });

  it("7. Kiểm tra hiểu bài (Follow-up Check: -6 - (-2) = ?)", () => {
    const followUpConfig = day1Challenge.pedagogicalSolution.followUpCheck;

    // Trường hợp nhập đúng -4
    const resCorrect = evaluateFollowUp("-4", followUpConfig);
    assert.equal(resCorrect.isCorrect, true);
    assert.ok(resCorrect.feedback.includes("Chính xác"));

    // Trường hợp nhầm thành -8 (trừ tiếp 2)
    const resMistake8 = evaluateFollowUp("-8", followUpConfig);
    assert.equal(resMistake8.isCorrect, false);
    assert.ok(resMistake8.feedback.includes("trừ tiếp 2"));

    // Trường hợp nhầm thành 4 dương
    const resMistake4 = evaluateFollowUp("4", followUpConfig);
    assert.equal(resMistake4.isCorrect, false);
  });
});

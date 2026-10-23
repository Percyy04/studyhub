import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { LESSONS } from "../src/data/lessons/index.js";
import { CURRICULUM } from "../src/data/curriculum.js";
import { ERROR_TAXONOMY } from "../src/data/errorTaxonomy.js";

describe("4. Kiểm tra cấu trúc và tính toàn vẹn của Lộ trình 14 Ngày", () => {
  it("Curriculum có đủ 14 ngày chuẩn thứ tự", () => {
    assert.equal(CURRICULUM.length, 14);
    CURRICULUM.forEach((item, idx) => {
      assert.equal(item.day, idx + 1);
      assert.ok(item.topic);
      assert.ok(item.goal);
    });
  });

  it("Mỗi ngày từ 1 đến 14 đều có đầy đủ dữ liệu thực tế, không có placeholder", () => {
    for (let day = 1; day <= 14; day++) {
      const lesson = LESSONS[day];
      assert.ok(lesson, `Ngày ${day} phải tồn tại`);
      assert.equal(lesson.day, day);
      assert.ok(lesson.topic, `Ngày ${day} thiếu topic`);
      assert.ok(lesson.concept, `Ngày ${day} thiếu concept`);
      assert.ok(lesson.concept.content, `Ngày ${day} thiếu concept.content`);
      assert.ok(lesson.workedExamples && lesson.workedExamples.length >= 2, `Ngày ${day} phải có ít nhất 2 ví dụ từng bước`);
      assert.ok(lesson.challenge, `Ngày ${day} phải có thử thách tư duy`);
      assert.ok(lesson.summary, `Ngày ${day} phải có tóm tắt cuối bài`);

      // Kiểm tra số lượng câu tự luyện theo quy định:
      // Day 6: >= 12; Day 7: >= 20; Day 14: >= 20; các ngày khác: >= 10
      const questionCount = (lesson.independentPractice || []).length;
      if (day === 6) {
        assert.ok(questionCount >= 12, `Ngày 6 phải có ít nhất 12 câu tự luyện (hiện có: ${questionCount})`);
      } else if (day === 7) {
        assert.ok(questionCount >= 20, `Ngày 7 phải có ít nhất 20 câu kiểm tra giữa chặng (hiện có: ${questionCount})`);
      } else if (day === 14) {
        assert.ok(questionCount >= 20, `Ngày 14 phải có ít nhất 20 câu kiểm tra cuối chặng (hiện có: ${questionCount})`);
      } else {
        assert.ok(questionCount >= 10, `Ngày ${day} phải có ít nhất 10 câu tự luyện (hiện có: ${questionCount})`);
      }

      // Kiểm tra tính hợp lệ của từng câu hỏi
      lesson.independentPractice.forEach((q, qIdx) => {
        assert.ok(q.id, `Ngày ${day} câu ${qIdx + 1} thiếu id`);
        assert.ok(q.prompt, `Ngày ${day} câu ${qIdx + 1} thiếu prompt`);
        assert.ok(Array.isArray(q.choices) && q.choices.length >= 2, `Ngày ${day} câu ${qIdx + 1} thiếu choices`);
        assert.ok(q.correctAnswer, `Ngày ${day} câu ${qIdx + 1} thiếu correctAnswer`);
        assert.ok(q.explanation, `Ngày ${day} câu ${qIdx + 1} thiếu explanation`);

        const hasCorrectChoice = q.choices.some((c) => c.id === q.correctAnswer);
        assert.ok(hasCorrectChoice, `Ngày ${day} câu ${q.id}: correctAnswer "${q.correctAnswer}" phải nằm trong danh sách choices`);
      });
    }
  });

  it("Bài kiểm tra Ngày 7 và Ngày 14 không bị lặp lại toàn bộ câu hỏi", () => {
    const day07Prompts = new Set(LESSONS[7].independentPractice.map((q) => q.prompt));
    const day14Prompts = new Set(LESSONS[14].independentPractice.map((q) => q.prompt));

    let overlapCount = 0;
    day14Prompts.forEach((p) => {
      if (day07Prompts.has(p)) overlapCount++;
    });

    // Ngày 14 phải là bộ câu hỏi mới độc lập, không trùng lặp toàn bộ
    assert.ok(overlapCount < 5, `Ngày 14 phải có câu hỏi mới độc lập, không lặp ngày 7 (trùng: ${overlapCount})`);
  });

  it("11 mã lỗi E1 - H1 đầy đủ trong ERROR_TAXONOMY", () => {
    const expectedCodes = ["E1", "E2", "E3", "F1", "F2", "F3", "A1", "A2", "A3", "X1", "H1"];
    expectedCodes.forEach((code) => {
      assert.ok(ERROR_TAXONOMY[code], `Mã lỗi ${code} phải có trong taxonomy`);
      assert.ok(ERROR_TAXONOMY[code].name);
      assert.ok(ERROR_TAXONOMY[code].wrongExample);
      assert.ok(ERROR_TAXONOMY[code].correctExample);
      assert.ok(ERROR_TAXONOMY[code].remedy);
    });
  });
});

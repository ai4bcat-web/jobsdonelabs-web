import { describe, it, expect } from "vitest";
import { isBotPush } from "./github-webhook.js";

describe("isBotPush", () => {
  it("returns true for the og.png auto-commit message", () => {
    const event = {
      ref: "refs/heads/main",
      head_commit: { message: "chore: auto-generate missing og.png [skip ci]" },
    };
    expect(isBotPush(event)).toBe(true);
  });

  it("returns true for any commit containing [skip ci]", () => {
    const event = {
      head_commit: { message: "fix: something minor [skip ci]" },
    };
    expect(isBotPush(event)).toBe(true);
  });

  it("returns false for a normal human commit", () => {
    const event = {
      ref: "refs/heads/main",
      head_commit: { message: "feat: add new blog post about AI" },
    };
    expect(isBotPush(event)).toBe(false);
  });

  it("returns false when head_commit is null", () => {
    const event = { ref: "refs/heads/main", head_commit: null };
    expect(isBotPush(event)).toBe(false);
  });

  it("returns false when head_commit is missing", () => {
    const event = { ref: "refs/heads/main" };
    expect(isBotPush(event)).toBe(false);
  });

  it("returns false when message field is not a string", () => {
    const event = { head_commit: { message: 42 } };
    expect(isBotPush(event)).toBe(false);
  });
});

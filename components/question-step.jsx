"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { questions } from "@/data/questions";
import { saveAnswer, getAnswer, getAllAnswers } from "@/lib/localStorage";
import { trackEvent } from "@/lib/analytics";

export default function QuestionStep({ stepId }) {
  const router = useRouter();
  const question = questions.find((q) => q.id === stepId);
  const [answer, setAnswer] = useState(() => getAnswer(stepId));
  const [error, setError] = useState("");
  const [questionStartTime] = useState(() => Date.now());

  useEffect(() => {
    trackEvent("question_viewed", {
      question_id: stepId,
      question_title: question?.title,
    });
  }, [stepId, question?.title]);

  if (!question) {
    router.push("/");
    return null;
  }

  const isLastStep = stepId === questions.length;
  const progress = (stepId / questions.length) * 100;
  const minLength = question.minLength || 10;
  const currentLength = answer.trim().length;
  const isValid = currentLength >= minLength;

  const handleNext = () => {
    setError("");

    if (!isValid) {
      setError(
        `Your answer needs at least ${minLength} characters. Add more detail.`,
      );

      trackEvent("question_validation_error", {
        question_id: stepId,
        question_title: question.title,
        answer_length: currentLength,
        required_length: minLength,
      });

      return;
    }

    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    saveAnswer(stepId, answer);

    trackEvent("question_completed", {
      question_id: stepId,
      question_title: question.title,
      answer_length: answer.length,
      time_spent_seconds: timeSpent,
    });

    if (isLastStep) {
      const allAnswers = getAllAnswers();
      const totalCharacters = Object.values(allAnswers).join("").length;

      trackEvent("brief_generated", {
        total_characters: totalCharacters,
        total_time_on_site_seconds: timeSpent,
      });

      router.push("/brief");
    } else {
      router.push(`/step/${stepId + 1}`);
    }
  };

  const handleBack = () => {
    trackEvent("navigated_back", {
      from_question: stepId,
      had_answer: answer.trim().length > 0,
    });

    if (answer.trim()) {
      saveAnswer(stepId, answer);
    }

    if (stepId === 1) {
      router.push("/");
    } else {
      router.push(`/step/${stepId - 1}`);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-4 md:space-y-6">
      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground font-medium">
            Question {stepId} of {questions.length}
          </span>
          <span className="font-bold tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Card */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl md:text-2xl">
            {question.title}
          </CardTitle>
          <CardDescription className="text-sm md:text-base leading-relaxed">
            {question.prompt}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Textarea */}
          <div className="space-y-2">
            <Textarea
              placeholder={question.placeholder}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              rows={8}
              className="resize-none font-sans text-sm md:text-base p-3 md:p-4 focus-visible:ring-primary min-h-[200px]"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Minimum {minLength} characters</span>
              <span className={isValid ? "text-green-600 font-medium" : ""}>
                {currentLength} / {minLength}
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Examples */}
          <div className="grid gap-3 p-3 md:p-4 rounded-xl bg-muted/50 border text-xs md:text-sm">
            <div className="flex gap-2 items-start">
              <span className="text-red-500 font-bold flex-shrink-0">✕</span>
              <p className="text-muted-foreground italic">
                {question.badExample}
              </p>
            </div>
            <div className="flex gap-2 items-start border-t pt-3">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span>
              <p className="text-foreground font-medium">
                {question.goodExample}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleBack}
              variant="outline"
              size="lg"
              className="w-20 md:w-24"
            >
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back</span>
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              className="flex-1 font-semibold"
              disabled={!isValid}
            >
              {isLastStep ? (
                <>
                  <span className="hidden sm:inline">Generate Brief</span>
                  <span className="sm:hidden">Generate</span>
                  <CheckCircle2 className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Keyboard Shortcut Hint */}
          <p className="text-xs text-center text-muted-foreground hidden md:block">
            Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> +{" "}
            <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> to continue
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { saveIdea, isFlowComplete } from "@/lib/localStorage";
import { ArrowRight } from "lucide-react";

export default function LandingHero() {
  const [idea, setIdea] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleStart = () => {
    setError("");

    if (idea.trim().length < 20) {
      setError(
        "Your idea needs at least 20 characters. Add a bit more detail.",
      );
      return;
    }

    saveIdea(idea);
    router.push("/step/1");
  };

  const handleContinue = () => {
    router.push("/brief");
  };

  const hasCompletedFlow = typeof window !== "undefined" && isFlowComplete();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 md:py-16">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mb-2">
          <span>Free MVP Structuring Tool</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          Turn your messy idea into a 7-day MVP scope
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          In 20 minutes. No BS. Just forced clarity.
        </p>
      </div>

      {/* Completed Flow Banner */}
      {hasCompletedFlow && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
          <AlertDescription className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <p className="font-medium text-green-900 dark:text-green-100">
                You have a completed brief
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Ready to view or start fresh
              </p>
            </div>
            <Button
              onClick={handleContinue}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-700 hover:bg-green-100"
            >
              View Brief →
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Start here</CardTitle>
          <CardDescription className="text-base">
            Describe your idea. Be messy. We&apos;ll structure it together.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Example: I want to build something that helps freelancers manage client feedback because email threads are chaotic..."
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                setError(""); // Clear error on typing
              }}
              rows={6}
              className="resize-none text-sm md:text-base"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Minimum 20 characters</span>
              <span className={idea.length >= 20 ? "text-green-600" : ""}>
                {idea.length} / 20
              </span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleStart}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {hasCompletedFlow ? "Start New Brief" : "Start Structuring"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          No signup. No AI. Just 5 forced-specificity questions.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>✓ Free forever</span>
          <span>✓ No data collection</span>
        </div>
      </div>
    </div>
  );
}

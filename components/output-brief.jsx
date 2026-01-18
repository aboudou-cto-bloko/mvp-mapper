"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Download,
  RotateCcw,
  ExternalLink,
  Check,
  Loader2,
} from "lucide-react";
import { getAllAnswers, getIdea, clearAllData } from "@/lib/localStorage";
import { questions } from "@/data/questions";
import { pdf } from "@react-pdf/renderer";
import { BriefPDFDocument } from "@/lib/generatePDF";

export default function OutputBrief() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [briefData] = useState(() => {
    if (typeof window === "undefined") return null;

    const answers = getAllAnswers();
    const idea = getIdea();

    if (!answers || Object.keys(answers).length < 5) {
      return "INCOMPLETE";
    }

    return {
      idea,
      problem: answers[1] || "",
      icp: answers[2] || "",
      feature: answers[3] || "",
      nonFeatures: answers[4] || "",
      buildScope: answers[5] || "",
    };
  });

  useEffect(() => {
    if (briefData === "INCOMPLETE") {
      router.push("/");
    }
  }, [briefData, router]);

  const handleCopy = async () => {
    if (!briefData || briefData === "INCOMPLETE") return;
    const text = formatBriefAsText(briefData);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!briefData || briefData === "INCOMPLETE") return;

    try {
      setIsDownloading(true);

      // Générer le PDF
      const doc = <BriefPDFDocument briefData={briefData} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();

      // Créer le nom du fichier avec timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `mvp-brief-${timestamp}.pdf`;

      // Télécharger
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try copying the text instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Start a new brief? This will clear your current data.")) {
      clearAllData();
      router.push("/");
    }
  };

  if (!briefData || briefData === "INCOMPLETE") return null;

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Your MVP Brief
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Save this. Build from this. Launch from this.
        </p>
      </header>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopy}
          variant="default"
          className="flex-1 h-11 md:h-12 text-sm md:text-base"
          disabled={isDownloading}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Copy Text Brief</span>
              <span className="sm:hidden">Copy Brief</span>
            </>
          )}
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="flex-1 h-11 md:h-12 text-sm md:text-base"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="ghost"
          size="icon"
          className="h-11 md:h-12 w-11 md:w-12 text-destructive sm:flex-shrink-0"
          title="Start new brief"
          disabled={isDownloading}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Brief Content */}
      <div className="grid gap-4 md:gap-6">
        {/* Original Idea */}
        <Card className="border-2 border-primary/20 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs md:text-sm uppercase tracking-wider text-primary">
              Original Idea
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg md:text-xl font-medium italic text-foreground/80 leading-relaxed">
              &quot;{briefData.idea}&quot;
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <BriefSection
          title="The Problem"
          content={briefData.problem}
          question={questions[0]}
        />
        <BriefSection
          title="Target User (ICP)"
          content={briefData.icp}
          question={questions[1]}
        />
        <BriefSection
          title="Core Feature"
          content={briefData.feature}
          question={questions[2]}
        />
        <BriefSection
          title="Out of Scope (v1)"
          content={briefData.nonFeatures}
          question={questions[3]}
        />
        <BriefSection
          title="7-Day Build Roadmap"
          content={briefData.buildScope}
          question={questions[4]}
        />
      </div>

      {/* Footer */}
      <footer className="mt-8 md:mt-12 p-6 md:p-8 bg-muted/50 rounded-2xl border border-dashed text-center space-y-4">
        <div className="space-y-1">
          <p className="font-semibold text-sm md:text-base text-foreground">
            Ready to start building?
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Built with Project Clarity frameworks
          </p>
        </div>
        <Button
          variant="link"
          asChild
          className="text-primary text-sm md:text-base"
        >
          <a
            href="https://x.com/buildsByAB"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share your progress on X
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </Button>
      </footer>
    </div>
  );
}

function BriefSection({ title, content, question }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 border-b pb-3">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs uppercase font-semibold opacity-70 leading-relaxed">
          {question.prompt}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6">
        <p className="whitespace-pre-wrap font-sans leading-relaxed text-sm md:text-base text-foreground">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}

function formatBriefAsText(data) {
  return `
MVP BRIEF - ${new Date().toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORIGINAL IDEA:
"${data.idea}"

THE PROBLEM:
${data.problem}

TARGET USER (ICP):
${data.icp}

CORE FEATURE:
${data.feature}

OUT OF SCOPE (v1):
${data.nonFeatures}

7-DAY BUILD ROADMAP:
${data.buildScope}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built with Project Clarity
`.trim();
}

import QuestionStep from "@/components/question-step";

export default async function StepPage({ params }) {
  const { id } = await params;
  const stepId = parseInt(id);

  return <QuestionStep key={stepId} stepId={stepId} />;
}

export interface MethodStep {
  n: string;
  title: string;
  body: string;
}

export const METHOD: readonly MethodStep[] = [
  {
    n: '1',
    title: 'One brief, evaluated properly',
    body: 'Interior, supplies, film or uniforms — every project starts with the same discipline: materials, methods and partners weighed for value, not just cost.',
  },
  {
    n: '2',
    title: 'Vision turned into a plan',
    body: 'Concepts become drawings, shot lists or spec sheets — whatever the discipline needs to move from idea to execution without guesswork.',
  },
  {
    n: '3',
    title: 'The right partner for the job',
    body: 'We select and supervise the best local maker, crew or supplier for each phase, and stay accountable for what they deliver.',
  },
  {
    n: '4',
    title: 'Delivered, not just handed over',
    body: 'Sourced, produced, filmed or fitted — every discipline ends the same way: on the date we said, to the standard we promised.',
  },
] as const;

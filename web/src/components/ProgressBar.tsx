interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const progressStyles = {
    width: `${props.progress}%`
  }
  return (
    <div className="w-full h-3 mt-4 bg-zinc-700 rounded-xl">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados neste dia!"
        aria-valuenow={props.progress}
        className="h-3 rounded-full bg-violet-600"
        style={progressStyles}
      />
    </div>
  );
}


import clsx from 'clsx';

export default function PriorityStatus({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-sky-400 text-white': priority === 'Low',
          'bg-violet-400 text-white': priority === 'Medium',
          'bg-rose-500 text-white': priority === 'High',
        },
      )}
    >
      {priority === 'Low' ? (
        <>
          Low
        </>
      ) : null}
      {priority === 'Medium' ? (
        <>
          Medium
        </>
      ) : null}
      {priority === 'High' ? (
        <>
          High
        </>
      ) : null}
    </span>
  );
}
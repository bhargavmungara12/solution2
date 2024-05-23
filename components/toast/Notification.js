
export const Notification = ({ title, description }) => {
  return (
    <div>
      <div className={`font-bold break-words leading-6 text-base`}>{title}</div>
      <div className="text-sm font-semibold break-words text-grey-400">
        {description}
      </div>
    </div>
  );
};

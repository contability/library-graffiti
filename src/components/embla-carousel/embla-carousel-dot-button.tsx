type DotButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const DotButton: React.FC<DotButtonProps> = ({
  children,
  className,
  ...restProps
}) => (
  <button type="button" className={className} {...restProps}>
    {children}
  </button>
);

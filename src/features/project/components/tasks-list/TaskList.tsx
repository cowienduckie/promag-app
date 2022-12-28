// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TaskList = (props: any) => {
  const { children, innerRef, ...otherProps } = props;

  return (
    <div ref={innerRef} {...otherProps}>
      {children}
    </div>
  );
};
